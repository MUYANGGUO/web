---
title: "LeetCode 221 Maximal Square - Medium"
date: "2021-01-01"
excerpt: "Given a 2D binary matrix filled with 0's and 1's, find the largest square containing only 1's and return its area."
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 221
comments: true
---

### 221. Maximal Square — Medium

[Open on LeetCode](https://leetcode.com/problems/maximal-square/)

## Problem

Given a 2D binary matrix filled with 0's and 1's, find the largest square containing only 1's and return its area.

Example:

Input: 

1 0 1 0 0
1 0 1 1 1
1 1 1 1 1
1 0 0 1 0

Output: 4

## Solution

```python
class Solution:
    def maximalSquare(self, matrix: List[List[str]]) -> int:
        # write your code here
        ### 此题要从正方形的右下角出发来思考。
        ### 如果正方形的右下角是 f[i][j], 而且 此点上的数是 1    
        ### 那么 如果存在 以：
        ### f[i - 1][j], f[i][j - 1], f[i - 1][j - 1] 为右下角坐标的边长为L1, L2, L3
        ### 的正方形，那么 必存在 f[i][j] 为右下角，边长为 min(L1, L2, L3) + 1 的边长的正方形。
        if not matrix:
            return 0
        
        n = len(matrix)
        m = len(matrix[0])

        
        f = [[0] * m for _ in range(n)]
        
        ### initialization of first column, first row
        for i in range(n):
            if matrix[i][0] == "0":
                f[i][0] = 0
            else:
                f[i][0] = 1
                
        for i in range(m):
            if matrix[0][i] == "0":
                f[0][i] = 0
            else:
                f[0][i] = 1
        
         
        for i in range(1, n):
            for j in range(1, m):
                if matrix[i][j] == "0":
                    continue
                ### if matrix[i][j] 是 1：
                f[i][j] = min(f[i - 1][j], f[i][j - 1], f[i - 1][j - 1]) + 1

        res = 0
        for i in range(n):
            res = max(res, max(f[i][:]))
            
        ### 因为要求面积， 所以平方
        return res * res
```
