---
title: "LeetCode 97 Interleaving String - Hard"
date: "2021-01-01"
excerpt: "Given s1, s2, s3, find whether s3 is formed by the interleaving of s1 and s2."
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 97
comments: true
---

### 97. Interleaving String — Hard

[Open on LeetCode](https://leetcode.com/problems/interleaving-string/)

## Problem

Given s1, s2, s3, find whether s3 is formed by the interleaving of s1 and s2.

Example 1:

Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
Output: true
Example 2:

Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
Output: false

Description
中文
English
给出三个字符串:s1、s2、s3，判断s3是否由s1和s2交叉构成。

Have you met this question in a real interview?  
Example
样例 1：

输入:
"aabcc"
"dbbca"
"aadbbcbcac"
输出:
true
样例 2：

输入:
""
""
"1"
输出:
false
样例 3：

输入:
"aabcc"
"dbbca"
"aadbbbaccc"
输出:
false
Challenge
要求时间复杂度为O(n2)或者更好

Related Problems 118. Distinct Subsequences

## Solution

```python
### 双序列型DP：

class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:

        m = len(s1)
        n = len(s2)
        k = len(s3)

        if m + n != k:
            return False
        if m == 0 or n == 0:
            if s1 == s3 or s2 == s3:
                return True
            else:
                return False

        f = [[False] * (n + 1) for _ in range(m + 1)]
        f[0][0] = True
        # f[i][j] represents s1[0...i-1] and s2[0...j-1] interleave to form s3[0...(i + j - 1)]
        # thus, check if s3[i + j - 1] is either from s1[i-1] or s2[j-1], then f[i-1][j] or f[i][j-1] must be true accordingly
        for i in range(m + 1):
            for j in range( n + 1):
                if i + j - 1 >= 0:
                    f[i][j] = (f[i - 1][j] and s3[i + j - 1] == s1[i - 1]) or (s3[i + j - 1] == s2[j - 1] and f[i][j - 1])
   
        return f[m][n]

### 滚动数组 空间优化版本：

class Solution:
    """
    @param s1: A string
    @param s2: A string
    @param s3: A string
    @return: Determine whether s3 is formed by interleaving of s1 and s2
    """
    def isInterleave(self, s1, s2, s3):
        # write your code here
        m = len(s1)
        n = len(s2)
        k = len(s3)

        if m + n != k:
            return False
        if m == 0 or n == 0:
            if s1 == s3 or s2 == s3:
                return True
            else:
                return False

        f = [[False] * (n + 1) for _ in range(2)]
   
        # f[i][j] represents s1[0...i-1] and s2[0...j-1] interleave to form s3[0...(i + j - 1)]
        # thus, check if s3[i + j - 1] is either from s1[i-1] or s2[j-1], then f[i-1][j] or f[i][j-1] must be true accordingly
        old = 0
        now = 0
        for i in range(m + 1):
            old = now
            now = 1 - now
            for j in range( n + 1):
                if i == 0 and j == 0:
                    f[now][0] = True
                    continue
                if i + j - 1 >= 0:
                    f[now][j] = (f[old][j] and s3[i + j - 1] == s1[i - 1]) or (s3[i + j - 1] == s2[j - 1] and f[now][j - 1])
   
        return f[now][n]
```
