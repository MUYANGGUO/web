---
title: "LeetCode 931 Minimum Falling Path Sum - Medium"
date: "2021-01-01"
excerpt: "931. Minimum Falling Path Sum -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 931
comments: true
---

### 931. Minimum Falling Path Sum — Medium

[Open on LeetCode](https://leetcode.com/problems/minimum-falling-path-sum/)

## Problem

931. Minimum Falling Path Sum -- Medium

Given a square array of integers A, we want the minimum sum of a falling path through A.

A falling path starts at any element in the first row, and chooses one element from each row.  The next row's choice must be in a column that is different from the previous row's column by at most one.

 

Example 1:

Input: [[1,2,3],[4,5,6],[7,8,9]]
Output: 12
Explanation: 
The possible falling paths are:
[1,4,7], [1,4,8], [1,5,7], [1,5,8], [1,5,9]
[2,4,7], [2,4,8], [2,5,7], [2,5,8], [2,5,9], [2,6,8], [2,6,9]
[3,5,7], [3,5,8], [3,5,9], [3,6,8], [3,6,9]
The falling path with the smallest sum is [1,4,7], so the answer is 12.

 

Constraints:

1 <= A.length == A[0].length <= 100
-100 <= A[i][j] <= 100

## Solution

```python
class Solution:
    def minFallingPathSum(self, A: List[List[int]]) -> int:
        n, m = len(A), len(A[0])
        # state: dp[i][j] 表示从第一行走到 i,j 这个位置的最小路径和
        dp = [[0] * m for _ in range(2)]
        # initialization: dp[0][i] = A[0][i]
        for i in range(m):
            dp[0][i] = A[0][i]
        # function: dp[i][j] = min(dp[i - 1][j - 1], dp[i - 1][j], dp[i - 1][j + 1]) + A[i][j]
        for i in range(1, n):
            for j in range(0, m):
                dp[i % 2][j] = dp[(i - 1) % 2][j] + A[i][j]
                if j - 1 >= 0:
                    dp[i % 2][j] = min(dp[i % 2][j], dp[(i - 1) % 2][j - 1] + A[i][j])
                if j + 1 < len(A[0]):
                    dp[i % 2][j] = min(dp[i % 2][j], dp[(i - 1) % 2][j + 1] + A[i][j]) 
        # answer
        return min(dp[(n - 1) % 2])
```
