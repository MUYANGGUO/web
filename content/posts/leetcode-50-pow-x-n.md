---
title: "LeetCode 50 Pow(x,n) - Medium"
date: "2021-01-01"
excerpt: "50. Pow(x, n)"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 50
comments: true
---

### 50. Pow(x,n) — Medium

[Open on LeetCode](https://leetcode.com/problems/pow-x-n/)

## Problem

50. Pow(x, n)

Implement pow(x, n), which calculates x raised to the power n (xn).

Example 1:

Input: 2.00000, 10
Output: 1024.00000
Example 2:

Input: 2.10000, 3
Output: 9.26100
Example 3:

Input: 2.00000, -2
Output: 0.25000
Explanation: 2-2 = 1/22 = 1/4 = 0.25
Note:

-100.0 < x < 100.0
n is a 32-bit signed integer, within the range [−231, 231 − 1]
Accepted

## Solution

```python
class Solution:
    def myPow(self, x, n):
        ### 矩阵快速幂
        ### 计算x的n次方，即x^n
        ### x^n = x^(n/2) * x^(n/2)
        ### So a O(n) problem can be transferred to a O(logn) Problem.
        if n == 0:
            return 1
        if n < 0:
            temp =  1 / self.myPow(x, -n // 2)
            if n % 2 == 0:
                return temp * temp
            else:
                return temp * temp * 1/x
        else:
            temp = self.myPow(x, n // 2)
            if n % 2 == 0:
                return temp * temp
            else:
                return temp * temp * x
```
