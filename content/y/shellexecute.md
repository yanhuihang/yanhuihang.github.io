---
title: Win32API：调用系统浏览器打开网页
summary: "`ShellExecute`"
---

 用`ShellExecute`调用`open`即可：

```c
extern void open_user_space(char *link)
{
	ShellExecute(NULL, "open", link, NULL, NULL, SW_SHOWNORMAL);
}
```

