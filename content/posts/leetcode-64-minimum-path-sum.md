---
title: "LeetCode 64 Minimum Path Sum - Medium"
date: "2021-01-01"
excerpt: "Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right which minimizes the sum of all numbers alo…"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 64
comments: true
---

### 64. Minimum Path Sum — Medium

[Open on LeetCode](https://leetcode.com/problems/minimum-path-sum/)

## Problem

Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right which minimizes the sum of all numbers along its path.

Note: You can only move either down or right at any point in time.

Example:

Input:
[
  [1,3,1],
  [1,5,1],
  [4,2,1]
]
Output: 7
Explanation: Because the path 1→3→1→1→1 minimizes the sum.

## Solution

```python
class Solution:
    def minPathSum(self, grid: List[List[int]]) -> int:
        
        ### DP problem, very similar to Unique Path problem
        ### we can use transfer function f[i][j] = min(f[i-1][j] + f[i][j-1]), here f[i][j] records the minimum sum of all numbers along the path to get here including f[i][j]'s number
        
        ### initial a matrix same size as grid
        
        ### Solution 1 : without space optimization 
        
#         m, n = len(grid), len(grid[0])
#         if m == 1:
#             return sum(grid[0][:])
#         if n == 1:
#             return sum(grid[:][0])
        
        
#         f = [[0] * n for _ in range(m)]
#         f[0][0] = grid[0][0]
        
#         for i in range(1, n):
#             f[0][i] = grid[0][i] + f[0][i-1]
            
#         for i in range(1, m):
#             f[i][0] = grid[i][0] + f[i-1][0]
            
#         for i in range(1, m):
#             for j in range(1, n):
#                 f[i][j] = min(f[i-1][j] , f[i][j-1]) + grid[i][j]

        
#         return f[m - 1][n - 1]
            
    
     
        ### Solution 1 : space optimization 滚动数组，只限于此类题目，新的depend上一行和本行
        m, n = len(grid), len(grid[0])

        f = [[0] * n for _ in range(2)]
  
 
        old = 0
        now = 0
            
        for i in range(0, m):
            
            ### SWAP now and old
            old = now
            now = 1 - now # 小技巧swap old 和 now
            
            for j in range(0, n):
                ### 将initialization的判断移到loop里
                if i == 0 and j == 0:
                    f[now][j] = grid[i][j]
                    continue
                    
                f[now][j] = float('inf')
                
                if i > 0:
                    f[now][j] = min(f[now][j] , f[old][j] + grid[i][j])
                    
                if j > 0:
                    f[now][j] = min(f[now][j] , f[now][j - 1] + grid[i][j])

        
        return f[now][n - 1]
```
