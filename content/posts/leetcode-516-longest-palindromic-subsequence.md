---
title: "LeetCode 516 Longest Palindromic Subsequence - Medium"
date: "2021-01-01"
excerpt: 516. Longest Palindromic Subsequence
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 516
comments: true
---

### 516. Longest Palindromic Subsequence — Medium

[Open on LeetCode](https://leetcode.com/problems/longest-palindromic-subsequence/)

## Problem

516. Longest Palindromic Subsequence 

Medium

Given a string s, find the longest palindromic subsequence's length in s. You may assume that the maximum length of s is 1000.

Example 1:
Input:

"bbbab"
Output:
4
One possible longest palindromic subsequence is "bbbb".
Example 2:
Input:

"cbbd"
Output:
2
One possible longest palindromic subsequence is "bb".

## Solution

```python
### 区间型动态规划，用区间起点和终点作为维度

### 重点是 要按照区间长度 for loop， j - i

class Solution:
    def longestPalindromeSubseq(self, s: str) -> int:
        ### DP problem:
        
        if not s:
            return 0
        
        
        n = len(s)
        dp = [[0] * n for _ in range(n)]
        
        ### initialization: consider the boundary cases, and initial cases:
        
        ### 1. length = 1 cases:
        
        for i in range(n):
            dp[i][i] = 1
        
        max_len = 1
        
        for i in range(n-1):
            if s[i] == s[i+1]:
                dp[i][i+1] = 2
                max_len = 2
            else:
                dp[i][i+1] = 1
        
        ### after getting the length 1, 2 cases, 1: length = 1, diagonals, 2: if neighbors are equal, then dp matrix is 2, else still is 1 as start
        
        ### Now construct the rest cases in DP matrix:

        ### 这里一定是根据区间长度 进行 for loop！
        for length in range(3, n + 1):
            for left in range(n - length + 1):
                ### why? left + len - 1 < n 所以要这么枚举。
                right = left + length - 1
                
                ### first check if cutting the end, or head of the sequence is still palindromic subsequences: if not, dp[left][right] should be equal, if one of them is, then dp[left][right] is it now.
                dp[left][right] = max( dp[left][right-1], dp[left + 1][right] )
                
                ### check expanding to both sides, containing both end and head. update dp[left][right] from inner sequence by adding 2. 
                if s[left] == s[right] and ( dp[left][right] < dp[left + 1][right - 1] + 2):
                    dp[left][right] = dp[left + 1][right - 1] + 2
                
                if dp[left][right] > max_len:
                    max_len = dp[left][right]
                    
        return max_len

class Solution:
    # @param {string} s the maximum length of s is 1000
    # @return {int} the longest palindromic subsequence's length
    def longestPalindromeSubseq(self, s):
        # Write your code here
        length = len(s)
        if length == 0:
            return 0
        dp = [[0 for _ in xrange(length)] for __ in xrange(length)]
        for i in xrange(length - 1, -1, -1):
            dp[i][i] = 1
            for j in xrange(i + 1, length):
                if s[i] == s[j]:
                    dp[i][j] = dp[i + 1][j - 1] + 2
                else:
                    dp[i][j] = max(dp[i + 1][j], dp[i][j - 1])
        return dp[0][length - 1]
```
