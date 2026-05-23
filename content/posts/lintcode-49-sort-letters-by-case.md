---
title: "LintCode 49 Sort Letters By Case - Medium"
date: "2021-01-01"
excerpt: 49. Sort Letters by Case
kind: leetcode
tags:
  - LintCode
  - Medium
  - Python
order: 49
comments: true
---

### 49. Sort Letters By Case — Medium

[Open on LintCode](https://www.lintcode.com/problem/49/)

## Problem

49. Sort Letters by Case

Given a string which contains only letters. Sort it by lower case first and upper case second.

Example
Example 1:
	Input:  "abAcD"
	Output:  "acbAD"

Example 2:
	Input: "ABC"
	Output:  "ABC"
	
Challenge
Do it in one-pass and in-place.

Notice
It's NOT necessary to keep the original order of lower-case letters and upper case letters.

## Solution

```python
class Solution:
    """
    @param: chars: The letter array you should sort by Case
    @return: nothing
    """
    def sortLetters(self, chars):
        # write your code here
        # 定义左右指针并初始化
        left = 0
        right = len(chars) - 1

        # 两指针相向移动，交会则结束
        while left <= right:
            # 左指针向右移动，直到找到第一个大写字母
            while left <= right and chars[left] >= 'a' and chars[left] <= 'z':
                left += 1

            # 右指针向左移动，直到找到第一个小写字母
            while left <= right and chars[right] >= 'A' and chars[right] <= 'Z':
                right -= 1

            # 将左边的大写字母和右边的小写字母交换位置
            if left <= right:
                tmp = chars[left]
                chars[left] = chars[right]
                chars[right] = tmp
                left += 1
                right -= 1
```
