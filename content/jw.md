---
title: 教务系统细分查询功能兼容谷歌/WebKit方案
date: 2020-12-21T13:06:46+08:00
# draft: true
---

# 问题

在教务系统查成绩的时候，点击相应分数会得到平时成绩、期中成绩、期末成绩等细分，但是这个功能不支持非IE的浏览器。本文将提供一个可以在使用谷歌、WebKit等非IE内核浏览器上查看细分的解决方案。

# 步骤

## 1

安装浏览器脚本[https://greasyfork.org/en/scripts/419009-广外教务系统兼容性助手](https://greasyfork.org/en/scripts/419009-%E5%B9%BF%E5%A4%96%E6%95%99%E5%8A%A1%E7%B3%BB%E7%BB%9F%E5%85%BC%E5%AE%B9%E6%80%A7%E5%8A%A9%E6%89%8B)。[^footnote]

![](/jw-script.PNG)

## 2

进入教务系统的课程成绩查询列表，脚本会自动识别。

![](/jw4.PNG)

像在IE上一样操作就可以了。

![](/jw3.PNG)

[^footnote]: 第一次安装的话请在https://greasyfork.org/查看教程。