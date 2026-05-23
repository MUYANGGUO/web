---
title: "LeetCode 132 Palindrome Partitioning II - Hard"
date: "2021-01-01"
excerpt: "Given a string s, partition s such that every substring of the partition is a palindrome."
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 132
comments: true
---

### 132. Palindrome Partitioning II — Hard

[Open on LeetCode](https://leetcode.com/problems/palindrome-partitioning-ii/)

## Problem

Given a string s, partition s such that every substring of the partition is a palindrome.

Return the minimum cuts needed for a palindrome partitioning of s.

Example:

Input: "aab"
Output: 1
Explanation: The palindrome partitioning ["aa","b"] could be produced using 1 cut.

## Solution

```python
class Solution:
    def minCut(self, s: str) -> int:
        ### 划分型动态规划
        n = len(s)
        if not s or n == 0:
            return 0
        
        palin = [[False] * n for _ in range(n)]
  
        for mid in range(n):
            self.isPalin(s, palin, mid, mid)
            self.isPalin(s, palin, mid, mid + 1)
 

        MAX = float('Inf')
        ### 使用序列型DP来计数
        f = [MAX for _ in range(n + 1)]
        f[0] = 0
        # s[0...i-1]
        for i in range(1, n + 1):
            # s[j...i-1]
            for j in range(i):
                # from left to right, j to i - 1
                if palin[j][i - 1]:
                    f[i] = min(f[i], f[j] + 1)
                    
        return f[n] - 1; # 减1 是因为求的是划分的次数，不是段数，所以要-1
    
    def isPalin(self, s, palin, left, right):
        while left >= 0 and right < len(s) and s[left] == s[right]:
            palin[left][right] = True
            left -= 1
            right += 1
```
