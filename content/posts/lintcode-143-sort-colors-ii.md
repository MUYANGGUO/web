---
title: "LintCode 143 Sort Colors II - Medium"
date: "2021-01-01"
excerpt: ""
kind: leetcode
tags:
  - LintCode
  - Medium
  - Python
order: 143
comments: true
---

### 143. Sort Colors II — Medium

[Open on LintCode](https://www.lintcode.com/problem/143/)

## Solution

```python
class Solution:
    
    """

    @param colors: A list of integer

    @param k: An integer

    @return: nothing

    """

    def sortColors2(self, colors, k):

        self.sort(colors, 0, len(colors) - 1, 1, k)

        

    def sort(self, colors, start, end, colorFrom, colorTo):

        #若处理区间长度为小于等于1或颜色区间长度为1，则不需要再进行处理

        if start >= end or colorFrom == colorTo:

            return

        #设置左右指针以及中间的颜色， 利用中点。  

        colorMid = colorFrom + (colorTo - colorFrom) // 2

        left, right = start, end

        while left <= right:

            #找到左侧大于中间颜色的位置, 注意这里colors必须是小于等于。避免左侧没有数。

            while left <= right and colors[left] <= colorMid:

                left += 1

            #找到右侧小于等于中间颜色的位置

            while left <= right and colors[right] > colorMid:

                right -= 1

            #交换左右指针指向的颜色

            if left <= right:

                colors[left], colors[right] = colors[right], colors[left]

        #继续递归处理左右两半序列

        self.sort(colors, start, right, colorFrom, colorMid)

        self.sort(colors, left, end, colorMid + 1, colorTo)
```
