---
title: "LintCode 1343 Sum Of Two Strings - Easy"
date: "2021-01-01"
excerpt: 1343. Sum of Two Strings
kind: leetcode
tags:
  - LintCode
  - Easy
  - Python
order: 1343
comments: true
---

### 1343. Sum Of Two Strings — Easy

[Open on LintCode](https://www.lintcode.com/problem/1343/)

## Problem

1343. Sum of Two Strings

Given you two strings which are only contain digit character. you should return the sum of each digit as string

Example
Example1:
Input:
A = "99"
B = "111"
Output: "11010"
Explanation: because 9 + 1 = 10, 9 + 1 = 10, 0 + 1 = 1,connect them，so answer is "11010"
Example2:
Input:
A = "2"
B = "321"
Output: "323"
Explanation: because 2 + 1 = 3, 2 + 0 = 2, 3 + 0 = 3, connect them，so answer is "323"
Notice
A and B are strings which are composed of numbers

## Solution

```python
class Solution:
    """
    @param A: a string
    @param B: a string
    @return: return the sum of two strings
    """
    def SumofTwoStrings(self, A, B):
        # write your code here
        if not A:
            if not B:
                return '0'
            else:
                return B
        if not B:
            return A
        
        
        len_A, len_B = len(A), len(B)
        res = ''
        while len_A > 0 and len_B > 0:
            res = str(int(A[len_A - 1]) + int(B[len_B - 1])) + res
            len_A -= 1
            len_B -= 1
        
        if len_A > 0:
            res = A[0 : len_A] + res
        if len_B > 0:
            res = B[0 : len_B] + res
        
        return res
```
