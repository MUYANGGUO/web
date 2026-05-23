---
title: "LeetCode 695 Max Area Of Island - Medium"
date: "2021-01-01"
excerpt: "695. Max Area of Island -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 695
comments: true
---

### 695. Max Area Of Island — Medium

[Open on LeetCode](https://leetcode.com/problems/max-area-of-island/)

## Problem

695. Max Area of Island -- Medium

Given a non-empty 2D array grid of 0's and 1's, an island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.

Find the maximum area of an island in the given 2D array. (If there is no island, the maximum area is 0.)

Example 1:

[[0,0,1,0,0,0,0,1,0,0,0,0,0],
 [0,0,0,0,0,0,0,1,1,1,0,0,0],
 [0,1,1,0,1,0,0,0,0,0,0,0,0],
 [0,1,0,0,1,1,0,0,1,0,1,0,0],
 [0,1,0,0,1,1,0,0,1,1,1,0,0],
 [0,0,0,0,0,0,0,0,0,0,1,0,0],
 [0,0,0,0,0,0,0,1,1,1,0,0,0],
 [0,0,0,0,0,0,0,1,1,0,0,0,0]]
Given the above grid, return 6. Note the answer is not 11, because the island must be connected 4-directionally.
Example 2:

[[0,0,0,0,0,0,0,0]]
Given the above grid, return 0.
Note: The length of each dimension in the given grid does not exceed 50.

## Solution

```python
# DFS:
class Solution:
    def maxAreaOfIsland(self, grid: List[List[int]]) -> int:
        if not grid: return
        rows, cols = len(grid), len(grid[0])
        max_area = float('-inf')
        for i in range(rows):
            for j in range(cols):
                if grid[i][j] == 1:
                    max_area = max(max_area,self.dfs(grid,i,j,1))
        return max(0,max_area)
    def dfs(self,grid,i,j,count):
        grid[i][j] = 0
        for m,n in [(i-1,j),(i+1,j),(i,j-1),(i,j+1)]:
            if(m>=0 and m<len(grid) and n>=0 and n<len(grid[0]) and grid[m][n] == 1):
                count = 1 + self.dfs(grid,m,n,count)
        return count
    
# BFS:
class Solution:
    def maxAreaOfIsland(self, grid: List[List[int]]) -> int:
        
        if not grid or not grid[0]: 
            return 0 
        n, m = len(grid), len(grid[0])
        _max = 0 
        for i in range(n):
            for j in range(m):
                if grid[i][j]:
                    _max = max(_max, self.bfs(grid, i, j))    
        return _max 

    def bfs(self, grid, x, y):
        MOVES = [(1,0),(-1,0),(0,-1),(0,1)]
        _max = 1 
        grid[x][y] = False 
        queue = deque([(x, y)])
        while queue:
            cur_x, cur_y = queue.popleft()
            for dx, dy in MOVES:
                nx, ny = cur_x + dx, cur_y + dy 
                if not self.is_valid(grid, nx, ny):
                    continue 
                grid[nx][ny] = False 
                queue.append((nx, ny))
                _max += 1 
        return _max 
        
    def is_valid(self, grid, x, y):
        n, m = len(grid), len(grid[0])
        if x < 0 or x >= n or y < 0 or y >= m or not grid[x][y]:
            return False 
        return True
```
