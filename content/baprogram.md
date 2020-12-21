---
title: "先修课程依赖图生成"
date: 2020-12-08T13:06:46+08:00
# draft: true
---

下载：[https://gitee.com/yanhuihang/ba-program](https://gitee.com/yanhuihang/ba-program)

Notebook视图：[baprogram.ipynb](/baprogram-notebook.html)

预览：

```python
#!/usr/bin/env python
# coding: utf-8

from graphviz import Digraph
import re

p = re.compile('\t\\d+')
q = re.compile('《([^》]+?)》课程教学大纲')
r = re.compile('先修课程：(.+)')
b = re.compile('《([^》]+?)》')
brackets = re.compile('(.+?)（1）(.+)?（2）')

g = Digraph('测试图片')
g.graph_attr['rankdir'] = 'LR'

f = open('英文学院2019版人才培养方案(0430复核定稿）.txt')

def node(x):
    g.node(name=x, fontname="Microsoft YaHei")

def edge(a, b):
    node(a)
    node(b)
    g.edge(a, b)

def translate(s):
    if '英美文学史、英美文学选读' != s:
        s = b.match(s).group(1)

        if s == '高级交际英语2':
            s = '高级交际英语（2）'

    if '；' in s:
        s = s.split('；')
    elif '，' in s:
        s = s.split('，')
    else:
        m = brackets.match(s)

        if m:
            print(s)
            s = [ m.group(1) + '（1）', m.group(1) + '（2）' ]
        else:
            s = [ s ]

    return s
    
def work(c):
    while True:
        s = f.readline()
        m = r.match(s)
        
        if m:
            s = m.group(1).strip()
            
            if s == '无':
                s = [ '无先修课程要求' ]
            else:
                s = translate(s)
            
            for i in s:
                if '中际交际英语' in i:
                    i = i.replace('中际交际英语', '中级交际英语')
                edge(i, c)
            
            break

while True:
    s = f.readline()
    if s == '': break
    m = q.match(s.strip())
    
    if m and not p.search(s):
        course = m.group(1)
        work(course)
        
f.close()
g.view()
```