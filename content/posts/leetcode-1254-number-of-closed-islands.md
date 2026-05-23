---
title: "LeetCode 1254 Number Of Closed Islands - Medium"
date: "2021-01-01"
excerpt: "1254. Number of Closed Islands -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 1254
comments: true
---

### 1254. Number Of Closed Islands — Medium

[Open on LeetCode](https://leetcode.com/problems/number-of-closed-islands/)

## Problem

1254. Number of Closed Islands -- Medium

Given a 2D grid consists of 0s (land) and 1s (water).  An island is a maximal 4-directionally connected group of 0s and a closed island is an island totally (all left, top, right, bottom) surrounded by 1s.

Return the number of closed islands.


Example 1:

Input: grid = [[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]]
Output: 2
Explanation: 
Islands in gray are closed because they are completely surrounded by water (group of 1s).

Example 2:

Input: grid = [[0,0,1,0,0],[0,1,0,1,0],[0,1,1,1,0]]
Output: 1

Example 3:

Input: grid = [[1,1,1,1,1,1,1],
               [1,0,0,0,0,0,1],
               [1,0,1,1,1,0,1],
               [1,0,1,0,1,0,1],
               [1,0,1,1,1,0,1],
               [1,0,0,0,0,0,1],
               [1,1,1,1,1,1,1]]
Output: 2
 

Constraints:

1 <= grid.length, grid[0].length <= 100
0 <= grid[i][j] <=1

## Solution

```python
class Solution:
    def closedIsland(self, grid: List[List[int]]) -> int:
        def dfs( i, j, visited):
            if( (i,j) in visited ):
                return
            if not self.inValidIsland and ( i== 0 or j == 0 or i == m-1 or j == n-1 ):
                self.inValidIsland = True
            visited.add((i,j))
            for x,y in directions:
                if 0 <= i+x < m and 0 <= j+y < n and grid[i+x][j+y] == 0:
                    dfs( i+x, j+y, visited )
                    
        if not grid: return 0
        m, n = len(grid), len(grid[0])
        count, visited = 0, set()
        directions = [(0,1),(1,0),(0,-1),(-1,0)]
        for i in range(m):
            for j in range(n):
                self.inValidIsland = False
                if (i,j) not in visited and grid[i][j] == 0:
                    dfs( i, j, visited )
                    count = count + (1 if( not self.inValidIsland ) else 0)
        return count
```
