---
title: "LeetCode 62 Unique Paths - Medium"
date: "2021-01-01"
excerpt: "A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below)."
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 62
comments: true
---

### 62. Unique Paths — Medium

[Open on LeetCode](https://leetcode.com/problems/unique-paths/)

## Problem

A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).

The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).

How many possible unique paths are there?


Above is a 7 x 3 grid. How many possible unique paths are there?

 

Example 1:

Input: m = 3, n = 2
Output: 3
Explanation:
From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
1. Right -> Right -> Down
2. Right -> Down -> Right
3. Down -> Right -> Right
Example 2:

Input: m = 7, n = 3
Output: 28
 

Constraints:

1 <= m, n <= 100
It's guaranteed that the answer will be less than or equal to 2 * 10 ^ 9.

## Solution

```python
### Brute Solution Recusion
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        if m == 1 or n == 1:
            return 1
        
        return self.uniquePaths(m - 1, n) + self.uniquePaths(m, n - 1)

### DP
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        
        # DP problem:
        # Sub question:
        # robot went to (m-1, n-2), and (m-2, n-1) before last step to (m-1, n-1)
        # if both have X paths, Y paths, then to the last step will have X+Y paths 
        
        # So we can define the transition function:
        # f[i][j] = f[i-1][j] + f[i][j-1]
        
        # construct a status matrix m X n
        
        f = [[1] * n for _ in range(m) ] ### Here I just initialized all elements to be 1, but in fact, only the first row and first column should be 1

        
        ### Let us do top to bottom strategy, based on the transfer function dependency relations
        
        for i in range(1,m):
            for j in range(1,n):
                f[i][j] = f[i-1][j] + f[i][j-1]
        

        return f[m-1][n-1]
```
