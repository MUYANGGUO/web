---
title: "LeetCode 1143 Longest Common Subsequence - Medium"
date: "2021-01-01"
excerpt: "Given two strings text1 and text2, return the length of their longest common subsequence."
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 1143
comments: true
---

### 1143. Longest Common Subsequence — Medium

[Open on LeetCode](https://leetcode.com/problems/longest-common-subsequence/)

## Problem

Given two strings text1 and text2, return the length of their longest common subsequence.

A subsequence of a string is a new string generated from the original string with some characters(can be none) deleted without changing the relative order of the remaining characters. (eg, "ace" is a subsequence of "abcde" while "aec" is not). A common subsequence of two strings is a subsequence that is common to both strings.

 

If there is no common subsequence, return 0.

 

Example 1:

Input: text1 = "abcde", text2 = "ace" 
Output: 3  
Explanation: The longest common subsequence is "ace" and its length is 3.
Example 2:

Input: text1 = "abc", text2 = "abc"
Output: 3
Explanation: The longest common subsequence is "abc" and its length is 3.
Example 3:

Input: text1 = "abc", text2 = "def"
Output: 0
Explanation: There is no such common subsequence, so the result is 0.
 

Constraints:

1 <= text1.length <= 1000
1 <= text2.length <= 1000
The input strings consist of lowercase English characters only.

## Solution

```python
### 经典题目！

### 双序列型DP：
class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        ### DP problem:
        m = len(text1)
        n = len(text2)
        if m == 0 or n == 0:
            return 0
        if not m or not n:
            return 0
        ### f[i][j] represents the longest common subsequence length in A[0...i-1] and B[0...j-1]
        f = [[0] * (n + 1) for _ in range(m + 1)]
        
        for i in range(m + 1):
            for j in range(n + 1):
                ### initialization
                if i == 0 or j == 0:
                    f[i][j] = 0
                    continue
                ### if the tail of A and B are a pair to be counted:
                if text1[i - 1] == text2[j - 1]:
                    f[i][j] = max(f[i][j], f[i - 1][j - 1] + 1)
                ### if the tail of A not counted or tail of the B not counted:
                else:
                    f[i][j] = max(f[i][j], f[i - 1][j], f[i][j - 1])
        
        return f[m][n]



### 1-D 数组优化：
class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        n = len(text1) + 1
        m = len(text2) + 1
        # Use only 1D array for store result because we only need to get result from previous line and current line
        dp = [0] * m
        
        for i in range(1, n):
            prev_diagonal = 0
            for j in range(1, m):
                temp = dp[j]
                
                if text1[i - 1] == text2[j - 1]:
                    dp[j] = prev_diagonal + 1
                else:
                    # dp[j - 1]: left element, this has overriden
                    # dp[j]: top element because at this point top element hasn't overriden
                    dp[j] = max(dp[j - 1], dp[j])
                
                prev_diagonal = temp
                
        return dp[m - 1]
```
