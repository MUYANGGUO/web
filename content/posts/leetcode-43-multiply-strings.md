---
title: "LeetCode 43 Multiply Strings - Medium"
date: "2021-01-01"
excerpt: "43. Multiply Strings -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 43
comments: true
---

### 43. Multiply Strings — Medium

[Open on LeetCode](https://leetcode.com/problems/multiply-strings/)

## Problem

43. Multiply Strings -- Medium

Given two non-negative integers num1 and num2 represented as strings, return the product of num1 and num2, also represented as a string.

Note: You must not use any built-in BigInteger library or convert the inputs to integer directly.

Example 1:
Input: num1 = "2", num2 = "3"
Output: "6"

Example 2:
Input: num1 = "123", num2 = "456"
Output: "56088"
 

Constraints:

1 <= num1.length, num2.length <= 200
num1 and num2 consist of digits only.
Both num1 and num2 do not contain any leading zero, except the number 0 itself.

## Solution

```python
class Solution:
    def multiply(self, num1: str, num2: str) -> str:
        dict = {"0": 0,"1":1 ,"2":2 ,"3": 3,"4": 4,"5":5 ,"6": 6,"7": 7,"8":8,"9":9 }
        xlen = len(num1)
        ylen = len(num2)
        x =y =0
        for i,n in enumerate(num1):
            x += (10**(xlen - (i+1)) * dict[n])
        for i,n in enumerate(num2):
            y += (10**(ylen - (i+1)) * dict[n])
        return str(x * y)
```
