---
title: "LintCode 211 String Permutation - Easy"
date: "2021-01-01"
excerpt: 211. String Permutation
kind: leetcode
tags:
  - LintCode
  - Easy
  - Python
order: 211
comments: true
---

### 211. String Permutation — Easy

[Open on LintCode](https://www.lintcode.com/problem/211/)

## Problem

211. String Permutation

Given two strings, write a method to decide if one is a permutation of the other.

Example
Example 1:
	Input:  "abcd", "bcad"
	Output:  True


Example 2:
	Input: "aac", "abc"
	Output:  False

## Solution

```python
class Solution:
    """
    @param A: a string
    @param B: a string
    @return: a boolean
    """
    def Permutation(self, A, B):
        # write your code here
        A = sorted(A)
        B = sorted(B)
        return A==B
```
