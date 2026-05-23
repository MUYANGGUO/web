---
title: "LeetCode 67 Add Binary - Easy"
date: "2021-01-01"
excerpt: "67. Add Binary -- Easy"
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 67
comments: true
---

### 67. Add Binary — Easy

[Open on LeetCode](https://leetcode.com/problems/add-binary/)

## Problem

67. Add Binary -- Easy

Given two binary strings, return their sum (also a binary string).

The input strings are both non-empty and contains only characters 1 or 0.

Example 1:
Input: a = "11", b = "1"
Output: "100"

Example 2:
Input: a = "1010", b = "1011"
Output: "10101"
 
Constraints:
Each string consists only of '0' or '1' characters.
1 <= a.length, b.length <= 10^4
Each string is either "0" or doesn't contain any leading zero.

## Solution

```python
# Bit Manipulation:
class Solution:
    def addBinary(self, a: str, b: str) -> str:
        x, y = int(a, 2), int(b, 2)
        while y:
            answer = x ^ y
            carry = (x & y) << 1
            x, y = answer, carry
        return bin(x)[2:]
```
