---
title: "LeetCode 63 Unique Paths II - Medium"
date: "2021-01-01"
excerpt: "A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below)."
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 63
comments: true
---

### 63. Unique Paths II — Medium

[Open on LeetCode](https://leetcode.com/problems/unique-paths-ii/)

## Problem

A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).

The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).

Now consider if some obstacles are added to the grids. How many unique paths would there be?



An obstacle and empty space is marked as 1 and 0 respectively in the grid.

Note: m and n will be at most 100.

Example 1:

Input:
[
  [0,0,0],
  [0,1,0],
  [0,0,0]
]
Output: 2
Explanation:
There is one obstacle in the middle of the 3x3 grid above.
There are two ways to reach the bottom-right corner:
1. Right -> Right -> Down -> Down
2. Down -> Down -> Right -> Right

## Solution

```python
class Solution:
    def uniquePathsWithObstacles(self, obstacleGrid: List[List[int]]) -> int:
        
        ### 坐标型的DP
        
        ### 首先判断， 在右下角，上一步只可能来自， (m-1,n-1-1) or (m-1-1, n-1)
        
        ### 那么 每个f[i][j] = f[i][j-1] + f[i-1][j]
        
        ### f[i][j] represents the total path to be here
        
        ### construct the matrix 
        
        m, n = len(obstacleGrid), len(obstacleGrid[0])

        
        # check corner cases
        if m <= 1 or n <= 1:
            for i in range(m):
                for j in range(n):
                    if obstacleGrid[i][j] == 1:
                        return 0
                    
                
                
                
            
        ### construct f
        
        f = [[1] * n for _ in range(m)]
        ### initial 条件
        ### 1. f[0][0] = 1
        ### 2. 第一行在出现block之前为1，之后都为0
        ### 3. 第一列在出现blcok之前为1，之后都为0
        ### 4. 出现block的地方为0
            
        for i in range(n):
            if obstacleGrid[0][i] == 1:
                for j in range(i,n):
                    f[0][j] = 0
                # why f[0][i:n] = 0 not works?
                break
                
        for i in range(m):
            if obstacleGrid[i][0] == 1:
                for j in range(i,m):
                    f[j][0] = 0
                break
        
        for i in range(1,m):
            for j in range(1,n):            
                if obstacleGrid[i][j] == 1:
                    f[i][j] = 0
                else:
                ### now start the transfer function
                    f[i][j] = f[i][j-1] + f[i-1][j]

        
        return f[m-1][n-1]
```
