---
title: "LintCode 140 Fast Power - Medium"
date: "2021-01-01"
excerpt: 140. Fast Power
kind: leetcode
tags:
  - LintCode
  - Medium
  - Python
order: 140
comments: true
---

### 140. Fast Power — Medium

[Open on LintCode](https://www.lintcode.com/problem/140/)

## Problem

140. Fast Power

Calculate the an % b where a, b and n are all 32bit non-negative integers.

Example
For 231 % 3 = 2

For 1001000 % 1000 = 0

Challenge
O(logn)

## Solution

```python
### 快速幂的算法 O(logN)：

class Solution:
    """
    @param a: A 32bit integer
    @param b: A 32bit integer
    @param n: A 32bit integer
    @return: An integer
    """
    def fastPower(self, a, b, n):
        # write your code here
        ### ending condition:
        if n == 0:
            return 1 % b ### 注意！！！ 此处必须有b，因为按照公式，始终要对因数做取模
        product = self.fastPower(a, b, n // 2)
        product = product * product % b
        if n % 2 == 1:
            product = product * a % b
        
        return product
```
