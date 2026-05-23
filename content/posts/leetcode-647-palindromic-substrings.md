---
title: "LeetCode 647 Palindromic Substrings - Medium"
date: "2021-01-01"
excerpt: 647. Palindromic Substrings
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 647
comments: true
---

### 647. Palindromic Substrings — Medium

[Open on LeetCode](https://leetcode.com/problems/palindromic-substrings/)

## Problem

647. Palindromic Substrings

Given a string, your task is to count how many palindromic substrings in this string.

The substrings with different start indexes or end indexes are counted as different substrings even they consist of same characters.

Example 1:

Input: "abc"
Output: 3
Explanation: Three palindromic strings: "a", "b", "c".
 

Example 2:

Input: "aaa"
Output: 6
Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".
 

Note:

The input string length won't exceed 1000.

## Solution

```python
class Solution:
    def countSubstrings(self, s):
        if not s:
            return 0
        n = len(s)
        f = [[False] * n for _ in range(n)]
        ### 区间型DP
        
        for i in range(n):
            f[i][i] = True
        for i in range(1, n):
            f[i][i - 1] = True
        
        res = n
        
        for length in range(1, n):
            for i in range(n - length):
                j = i + length
                
                f[i][j] = s[i] == s[j] and f[i + 1][j - 1]
                
                if f[i][j]:
                    res += 1
                
        return res


class Solution:
    def countSubstrings(self, s):
        if not s:
            return 0
        n = len(s)
        dp = [[0] * n for _ in range(n)]
        ans = 0
        for j in range(n):
            for i in range(j + 1):
                if(s[i] == s[j] and (j - i <= 2 or dp[i + 1][j - 1] == 1)):
                    dp[i][j] = 1
                ans += dp[i][j]
        return ans
```
