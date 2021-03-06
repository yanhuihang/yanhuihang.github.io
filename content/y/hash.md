---
title: 使用哈希值对用户敏感数据进行匿名化
summary: JavaScript
---

前些天在搞招新配套的查询系统，界面大概是这样的：

![image-20200925200903889](/typora-user-images/image-20200925200903889.png)

策略很简单，用户在输入框中输入姓名和学号，程序在数据库里比较一下数据，把结果返回给前端。

随后发现了一个问题：我们的数据库环境不是可信的，我们不能把姓名和学号明文存进数据库。解决方法就是不存明文，而是存一个哈希签名，因为我们只会做一个“查询”操作。

代码如下：

```javascript
const MD5 = new Hashes.MD5;

function hash(a, b)
{
	var r = MD5.hex(a + b);
	return r.slice(0, 10);
}
```

这样明文数据就变成了像这样的签名：

```
[
	["6d79495557",0],
	["fea8f4659b",0],
	["1cc1abd55d",0],
	["42cacc1408",0],
	["3eda035231",0],
	["da6b63ceca",0],
	["cc8ee00c24",0],
	["96a0455ee9",0],
	["d10fd66c3b",0],
	["e4f1d45516",0],
	["68a1335ace",0],
	["4bac9d85a6",0],
	["de0ce41727",0],
	["c78075f052",0]
];
```

具体演示一下，假设有一项数据像这样：

```
姓名：王小明
学号：20191008888
```

进行签名处理：

```
> hash('王小明', 20191008888)
< "a78c8d2d02"
```

最后放进数据库里的就只有一个`a78c8d2d02`，攻击者无法获知原信息，学生数据得到了保密。