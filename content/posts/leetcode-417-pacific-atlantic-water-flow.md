---
title: "LeetCode 417 Pacific Atlantic Water Flow - Medium"
date: "2021-01-01"
excerpt: "417. Pacific Atlantic Water Flow -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 417
comments: true
---

### 417. Pacific Atlantic Water Flow — Medium

[Open on LeetCode](https://leetcode.com/problems/pacific-atlantic-water-flow/)

## Problem

417. Pacific Atlantic Water Flow -- Medium

Given an m x n matrix of non-negative integers representing the height of each unit cell in a continent, the "Pacific ocean" touches the left and top edges of the matrix and the "Atlantic ocean" touches the right and bottom edges.

Water can only flow in four directions (up, down, left, or right) from a cell to another one with height equal or lower.

Find the list of grid coordinates where water can flow to both the Pacific and Atlantic ocean.

Note:

The order of returned grid coordinates does not matter.
Both m and n are less than 150.
 

Example:

Given the following 5x5 matrix:

  Pacific ~   ~   ~   ~   ~ 
       ~  1   2   2   3  (5) *
       ~  3   2   3  (4) (4) *
       ~  2   4  (5)  3   1  *
       ~ (6) (7)  1   4   5  *
       ~ (5)  1   1   2   4  *
          *   *   *   *   * Atlantic

Return:

[[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]] (positions with parentheses in above matrix).

## Solution

```python
class Solution:
    def pacificAtlantic(self, matrix: List[List[int]]) -> List[List[int]]:
        #从四周往内部dfs，最后判断哪些点两个大洋都可达。
        if not matrix: return []
        pacific,atlantic = set(),set()
        m,n = len(matrix),len(matrix[0])
        for i in range(n):
            self.dfs(0, i, matrix, pacific, 0)
            self.dfs(m - 1, i, matrix, atlantic, 0)
        for i in range(m):
            self.dfs(i, 0, matrix, pacific, -1)
            self.dfs(i, n - 1, matrix, atlantic, 0)
        return list(pacific&atlantic)
        
    def dfs(self, x, y, matrix, visit, height):
        m,n = len(matrix),len(matrix[0])
        if x < 0 or x >= m or y < 0 or y >= n or (x,y) in visit:
            return
        if matrix[x][y] < height:
            return
        visit.add((x,y))
        self.dfs(x - 1, y, matrix, visit, matrix[x][y]) 
        self.dfs(x + 1, y, matrix, visit, matrix[x][y]) 
        self.dfs(x, y - 1, matrix, visit, matrix[x][y]) 
        self.dfs(x, y + 1, matrix, visit, matrix[x][y])
```
