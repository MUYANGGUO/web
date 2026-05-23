---
title: "LeetCode 415 Add Strings - Easy"
date: "2021-01-01"
excerpt: "415. Add Strings -- Easy"
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 415
comments: true
---

### 415. Add Strings — Easy

[Open on LeetCode](https://leetcode.com/problems/add-strings/)

## Problem

415. Add Strings -- Easy

Given two non-negative integers num1 and num2 represented as string, return the sum of num1 and num2.

Note:
The length of both num1 and num2 is < 5100.
Both num1 and num2 contains only digits 0-9.
Both num1 and num2 does not contain any leading zero.
You must not use any built-in BigInteger library or convert the inputs to integer directly.

## Solution

```python
class Solution:
    def addStrings(self, num1: str, num2: str) -> str:
        res = []
        addOn = 0
        p1 = len(num1) - 1
        p2 = len(num2) - 1
        while p1 >= 0 or p2 >= 0:
            x1 = ord(num1[p1]) - ord('0') if p1 >= 0 else 0
            x2 = ord(num2[p2]) - ord('0') if p2 >= 0 else 0
            addOn, value = divmod(x1 + x2 + addOn, 10)
            res.append(value)
            p1 -= 1
            p2 -= 1
        
        if addOn:
            res.append(addOn)
        
        return ''.join(str(x) for x in res[::-1])
```
