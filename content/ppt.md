---
title: 演示文稿安全分发方案
date: 2021-01-16T13:06:46+08:00
---

颜汇杭，yanhuihang@126.com

2021/01/16

## 工具

1. PDF编辑器：Adobe Acrobat Pro DC
2. 虚拟打印机：doPDF

![image-20210116222659547](https://i.loli.net/2021/01/16/EYqDjcwsR7MGdez.png)

注意：虚拟打印机大都需要付费使用，我之前找了好久才找到这个doPDF，只有它是真正完全免费的。

## 第一步： 将演示文稿导出为PDF格式

PowerPoint内部的添加水印只支持图片类型的水印，很麻烦，所以我们先转换成PDF，再用PDF编辑器添加水印。

转换好之后用PDF编辑器打开PDF格式的演示文稿：

![image-20210116223137865](https://i.loli.net/2021/01/16/NzUcWVTa6wdoR5e.png)

## 第二步：添加水印

在右侧工具栏中选择【编辑】：

![image-20210116223210384](https://i.loli.net/2021/01/16/oeKEWrYXjyOAIpa.png)

 找到【水印】按钮：

![image-20210116223221686](https://i.loli.net/2021/01/16/aEnMFSXK35ryBc8.png)

点开之后就到了水印设计界面：

![image-20210116223239251](https://i.loli.net/2021/01/16/oXNKQqgn78OuvRm.png)

可以调整许多选项，如透明度、大小、字体，还可以设置旋转角度。

如果把水印内容多复制几遍，看上去就像打了好几个水印叠在一起：

![image-20210116223350853](https://i.loli.net/2021/01/16/euxMJZH4AjpmCOV.png)

设计完毕后确认，预览一下：

![image-20210116223429912](https://i.loli.net/2021/01/16/9Lqkydwluc8t51f.png)

## 第三步：文档像素化

这样水印虽然添加好了，但是还是有风险。

如图，尝试用鼠标选择一下，可以发现水印跟文档内容是分开的：

![image-20210116223701227](https://i.loli.net/2021/01/16/wtTCGZapXRYEJO1.png)

这样的话水印可以被很容易地删掉，同时文档内容也可能被篡改。

按Ctrl+P调出打印菜单，把打印机设置为虚拟打印机（doPDF），然后按【高级】进行设置：

![image-20210116224241034](https://i.loli.net/2021/01/16/W3O1xupytLrAMbK.png)

进入【高级】选项卡之后，勾选【以图片形式打印】：

![image-20210116224511369](https://i.loli.net/2021/01/16/xdFzLcVw6Jhil5S.png)

右边有一个可以调的300DPI，调整DPI（Dots Per Inch）可以设置打印的质量，数值越高就越清晰。一般来说300DPI就已经很清晰了。

一定要进入【高级】里勾选【以图片形式打印】，要不然虚拟打印机还是会把水印和文档内容分开，就达不到效果了。

这样就完成了。

尝试用PDF阅读器打开这样处理过的文档，阅读器会把它识别为扫描件：

![image-20210116230145877](https://i.loli.net/2021/01/16/cCigEusKLaoHlnz.png)

进入编辑模式可以看到，文档是由许多小块图片组成的：

![image-20210116230315750](https://i.loli.net/2021/01/16/ysM351BT9er4KCG.png)