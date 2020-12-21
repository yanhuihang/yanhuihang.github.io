---
title: 教务系统细分查询功能兼容谷歌/WebKit方案
date: 2020-12-21T13:06:46+08:00
# draft: true
---

# 问题

在教务系统查成绩的时候，点击相应分数会得到平时成绩、期中成绩、期末成绩等细分，但是这个功能不支持非IE的浏览器。本文将提供一个可以在使用谷歌、WebKit等非IE内核浏览器上查看细分的解决方案。

# 步骤

## 1

来到查分页面，

![](/jw2.PNG)

按F12打开开发者工具，选择Console（控制台）选项卡：

![](/jw.PNG)

## 2

将以下代码[^footnote]黏贴到`>`形状提示符处，并按回车执行。

```js
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('5 f=!!0.7;4(!f&&!!(0.a)){0.w=e(){0.a.9=u}}4(0.7==t){0.7=e(j,6,3){4(0.9){r("o！n");0.k.q()}0.9=B;4(6)5 6=6;4(3)5 3=3.8(/(C)|(y)/x,"").8(/;/g,\',\').8(/\\:/g,"=");5 A=(0.b.c-h(3.m(/c[\\s]*=[\\s]*([\\d]+)/i)[1]))/2;5 z=(0.b.l-h(3.m(/l[\\s]*=[\\s]*([\\d]+)/i)[1]))/2;0.k=0.v(j,"p",3)}}',39,39,'window|||features|if|var|mixedVar|showModalDialog|replace|hasOpenWindow|opener|screen|width||function|has_showModalDialog||parseInt||url|myNewWindow|height|match|请先处理它|您已经打开了一个窗口|_0|focus|alert||undefined|false|open|οnbefοreunlοad|ig|px|top|left|true|dialog'.split('|'),0,{}))
```

![](/jw1.PNG)

## 3

完成。现在就可以像IE一样点击分数查看细分了。

![](/jw3.PNG)

[^footnote]: 代码转自CSDN@夏木炎https://blog.csdn.net/xm393392625/article/details/80361186（细微修改）