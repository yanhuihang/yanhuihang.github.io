---
title: 一个适用于老旧环境的asprintf/vasprintf实现
summary: 适用于某些只有`_vsnprintf`的老平台
---

（适用于某些只有`_vsnprintf`的老平台）

```c
#include <stdlib.h> /* for malloc  */
#include <stdarg.h> /* for va_*	   */
#include <string.h> /* for strcpy  */

#define LARGE_ENOUGH_BUFFER_SIZE 256

static int vasprintf(char **strp, const char *format, va_list ap)
{
	char buffer[LARGE_ENOUGH_BUFFER_SIZE] = { 0 }, *s;

	int len,
		retval = _vsnprintf(buffer, LARGE_ENOUGH_BUFFER_SIZE - 1, format, ap);
	
	if ((len = retval) == -1) // buffer not large enough
		len = LARGE_ENOUGH_BUFFER_SIZE - 1;
		// equivalent to strlen(buffer)
			
	s = malloc(len + 1);
	
	if (!s)
		return -1;
	
	strcpy(s, buffer);	
	*strp = s;
	return retval;
}

extern int asprintf(char **strp, const char *format, ...)
{
	va_list ap;
	int retval;
	
	va_start(ap, format);
	retval = vasprintf(strp, format, ap);
	va_end(ap);
	
	return retval;
}
```
