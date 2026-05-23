---
title: "LeetCode 329 Longest Increasing Path In A Matrix - Hard"
date: "2021-01-01"
excerpt: "329. Longest Increasing Path in a Matrix -- Hard"
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 329
comments: true
---

### 329. Longest Increasing Path In A Matrix — Hard

[Open on LeetCode](https://leetcode.com/problems/longest-increasing-path-in-a-matrix/)

## Problem

329. Longest Increasing Path in a Matrix -- Hard

Given an integer matrix, find the length of the longest increasing path.

From each cell, you can either move to four directions: left, right, up or down. You may NOT move diagonally or move outside of the boundary (i.e. wrap-around is not allowed).

Example 1:

Input: nums = 
[
  [9,9,4],
  [6,6,8],
  [2,1,1]
] 
Output: 4 
Explanation: The longest increasing path is [1, 2, 6, 9].
Example 2:

Input: nums = 
[
  [3,4,5],
  [3,2,6],
  [2,2,1]
] 
Output: 4 
Explanation: The longest increasing path is [3, 4, 5, 6]. Moving diagonally is not allowed.

## Solution

```python
class Solution:
    def longestIncreasingPath(self, matrix: List[List[int]]) -> int:
        if len(matrix) == 0 or len(matrix[0]) == 0:
            return 0
        n, m = len(matrix), len(matrix[0])
        count = 0
        dp = [[0 for i in range(m)]for j in range(n)]
        computed = [[False for i in range(m)]for j in range(n)]
        for i in range(n):
            for j in range(m):
                count = max(count, self.rec(matrix, dp, computed, i, j, n, m))
        return count
    
    def rec(self, matrix, dp, computed, i, j, n, m):
        if computed[i][j]:
            return dp[i][j]
        value = 1
        if self.inrange(i+1, j, n, m) and matrix[i][j] < matrix[i+1][j]:
            value = max(value, self.rec(matrix, dp, computed, i+1, j, n, m) + 1)
        if self.inrange(i-1, j, n, m) and matrix[i][j] < matrix[i-1][j]:
            value = max(value, self.rec(matrix, dp, computed, i-1, j, n, m) + 1)
        if self.inrange(i, j+1, n, m) and matrix[i][j] < matrix[i][j+1]:
            value = max(value, self.rec(matrix, dp, computed, i, j+1, n, m) + 1)
        if self.inrange(i, j-1, n, m) and matrix[i][j] < matrix[i][j-1]:
            value = max(value, self.rec(matrix, dp, computed, i, j-1, n, m) + 1)
        dp[i][j] = value
        computed[i][j] = True
        return dp[i][j]
    
    def inrange(self, i, j, n, m):
        return 0 <= i < n and 0 <= j < m
```
