---
title: 哔哩哔哩弹幕用户查询小记
summary: 一次CRC32攻击
---

哔哩哔哩平台上只有视频发布者可以看到弹幕发送人。但是为了实现按发送人屏蔽弹幕的功能，播放视频时请求的弹幕数据里实际上会储存弹幕发送者uid的CRC32值。因为uid只有数字，所以从CRC32逆向求出uid是可行的。

一开始我采用的方式是直接暴力求解，速度很慢，处理一个用户需要几分钟的时间；后面采用了彩虹表来加速，在几毫秒只能就能完成数千个用户的查询。

```c
#include <ctype.h>
#include <stdio.h>

static unsigned crc32_table_polyrev[256];
#define SIZ6 1000000
static unsigned ini5_table[SIZ6]; // 1000000/1024 = 976.5. 4*976.56K，约4M
static unsigned poly_rev = 0xedb88320;

static unsigned crc32_polyrev(unsigned i)
{
	unsigned var = 0xffffffff;
	char buf[80], *s = buf;
	sprintf(s, "%d", i);
	
	for (; *s; ++s)
		var = crc32_table_polyrev[(*s ^ var) & 0xFF] ^ (var >> 8);
	
	return var;
}

static init_crc32_table_polyrev(void)
{
	unsigned i;
	
	for (i = 0; i < 256; ++i)
	{
		unsigned b = i, j;
		
		for (j = 0; j < 8; ++j)
			if (b & 1)
			{
				b >>= 1;
				b ^= poly_rev;
			}
			else
				b >>= 1;
		
		crc32_table_polyrev[i] = b;
	}
}

static void init_ini5_table(void)
{
	unsigned i;
	
	for (i = 0; i < SIZ6; ++i)
		ini5_table[i] = crc32_polyrev(i);
}

extern void init_crc32(void)
{
	init_crc32_table_polyrev();
	init_ini5_table();
}

static int crc_any(unsigned ini, unsigned char *l4_set)
{
	unsigned char *p = l4_set, *end = l4_set + 4;
	int result = 0;
	
	for (; p != end; ++p)
	{
		unsigned char order = *p ^ (ini & 0xff);
		
		if (!isdigit(order))
			return -1;
		
		result *= 10;
		result += order - '0';
		
		ini = crc32_table_polyrev[*p] ^ (ini >> 8);
	}
	
	return result;
}

static unsigned get_uid_stage1(unsigned crc32, char *last4)
{
	unsigned i;
	crc32 ^= 0xffffffff;
	
	for (i = 0; i < 4; ++i)
	{
		unsigned char f2 = crc32 >> 24;
		unsigned char table_index, adder;
		unsigned var6, j;
		
		for (j = 0; j < 256; ++j)
			if (f2 == crc32_table_polyrev[j] >> 24)
			{
				table_index = j;
				break;
			}
		if (j == 256) { NOTICE("j == 256!"); return 0; }
		
		// 查表找到对应值和对应序号
		var6 = crc32 ^ crc32_table_polyrev[j];
		crc32 = var6 << 8;
		
		// 将16进制数6位扩展到8位
		adder = table_index ^ 0x30;
		crc32 ^= adder;
		crc32 = ((crc32 >> 4) << 4);
		
		last4[3 - i] = table_index;
	}
	
	return crc32;
}

static unsigned get_uid_stage2(unsigned crc32, int *l4_index,
	unsigned char *last4)
{
	static char exception[SIZ6];
	memset(exception, 0, sizeof exception); // 每次调用都清零一遍
		// 用static只是因为太大（~1M），动态分配不太好

	while (1)
	{
		unsigned f6, f6_index, i;
		char found = 0;
	
		for (i = 0; i < SIZ6; ++i)
		{
			if ((ini5_table[i] & 0xf0f0f0f0) == (crc32 & 0xf0f0f0f0) && !exception[i])
			{
				f6 = ini5_table[i]; f6_index = i;
				found = 1; break;
			}
		}
		if (!found) { NOTICE("!found"); return 0; }
		
		*l4_index = crc_any(f6, last4);
		
		if (*l4_index == -1)
			exception[f6_index] = 1;
		else
			return f6_index;
	}
}

extern char *get_uid(unsigned crc32)
{
	unsigned i, f6_index;
	unsigned char last4[4];
	int l4_index = -1;
	static char buf[50]; // 两个32位数字，一个最多19位，空间足够
	
	crc32 = get_uid_stage1(crc32, last4);
	f6_index = get_uid_stage2(crc32, &l4_index, last4);
	sprintf(buf, "%d%d", f6_index, l4_index);
	
	return buf;
}
```
