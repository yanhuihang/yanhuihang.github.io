---
title: 教务系统细分查询功能兼容谷歌/WebKit方案
date: 2020-12-21T13:06:46+08:00
# draft: true
---

# 问题

在教务系统查成绩的时候，点击相应分数会得到平时成绩、期中成绩、期末成绩等细分，但是这个功能不支持非IE的浏览器。本文将提供一个可以在使用谷歌、WebKit等非IE内核浏览器上查看细分的解决方案。

# 步骤

## 1

来到查分页面，按F12打开开发者工具，选择Console（控制台）选项卡：

![](/jw.PNG)

## 2

将以下代码[^footnote]黏贴到`>`形状提示符处，并按回车执行。

```js
var has_showModalDialog = !!window.showModalDialog;

if (!has_showModalDialog && !!(window.opener))
{
	window.οnbefοreunlοad = function ()
		{ window.opener.hasOpenWindow = false; }
}

if (window.showModalDialog == undefined)
{
	window.showModalDialog = function (url, mixedVar, features)
	{
		if (window.hasOpenWindow)
		{
			alert("您已经打开了一个窗口！请先处理它"); // 避免多次点击弹出多个窗口
			window.myNewWindow.focus();
		}
		
		window.hasOpenWindow = true;  
		if (mixedVar) var mixedVar = mixedVar;  
		// 因window.showmodaldialog 与 window.open 参数不一样，所以封装的时候用正则去格式化一下参数
		if (features) var features = features.replace(/(dialog)|(px)/ig,"").replace(/;/g,',').replace(/\:/g,"=");
		// window.open("Sample.htm",null,"height=200,width=400,status=yes,toolbar=no,menubar=no");
		// window.showModalDialog("modal.htm",obj,"dialogWidth=200px;dialogHeight=100px");
		var left = (window.screen.width - parseInt(features.match(/width[\s]*=[\s]*([\d]+)/i)[1]))/2;
		var top = (window.screen.height - parseInt(features.match(/height[\s]*=[\s]*([\d]+)/i)[1]))/2;
		window.myNewWindow = window.open(url,"_blank",features);
	}
}
```

![](/jw1.PNG)

## 3

完成。现在就可以像IE一样点击分数查看细分了。

[^footnote]: 代码转自CSDN@夏木炎https://blog.csdn.net/xm393392625/article/details/80361186（细微修改）