---
title: "LintCode 845 Greatest Common Divisor - Easy"
date: "2021-01-01"
excerpt: 845. Greatest Common Divisor
kind: leetcode
tags:
  - LintCode
  - Easy
  - Python
order: 845
comments: true
---

### 845. Greatest Common Divisor — Easy

[Open on LintCode](https://www.lintcode.com/problem/845/)

## Problem

845. Greatest Common Divisor

Given two numbers, number a and number b. Find the greatest common divisor of the given two numbers.

Example
Example1

Input: a = 10, b = 15
Output: 5
Explanation:
10 % 5 == 0
15 % 5 == 0
Example2

Input: a = 15, b = 30
Output: 15
Explanation:
15 % 15 == 0
30 % 15 == 0

Notice
In mathematics, the greatest common divisor (gcd) of two or more integers, which are not all zero, is the largest positive integer that divides each of the integers.

## Solution

```python
### 辗转相除法，又名欧几里德算法，是用来求最大公约数的一种方法。

class Solution:
    """
    @param a: the given number
    @param b: another number
    @return: the greatest common divisor of two numbers
    """
    def gcd(self, a, b):
        # write your code here
        if a > b:
            small = b
            big = a
        else:
            small = a
            big = b
        
        if small != 0:
            return self.gcd(small, big % small)
        else:
            return big
```
