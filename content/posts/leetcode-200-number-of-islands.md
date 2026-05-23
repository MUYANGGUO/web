---
title: "LeetCode 200 Number Of Islands - Medium"
date: "2021-01-01"
excerpt: 200. Number of Islands
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 200
comments: true
---

### 200. Number Of Islands — Medium

[Open on LeetCode](https://leetcode.com/problems/number-of-islands/)

## Problem

200. Number of Islands

Given a 2d grid map of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

Example 1:

Input:
11110
11010
11000
00000

Output: 1
Example 2:

Input:
11000
11000
00100
00011

Output: 3

## Solution

```python
### BFS:

DIRECTIONS = [(-1, 0), (1, 0), (0, -1), (0, 1)]

class Solution:

    def numIslands(self, grid: List[List[str]]) -> int:
        n = len(grid)
        if n == 0:
            return 0
        m = len(grid[0])
        if m == 0:
            return 0

        
        islands = 0
        visited = set()
        for i in range(len(grid)):
            for j in range(len(grid[0])):
                if grid[i][j] == "1" and (i, j) not in visited:
                    self.bfs(grid, i, j, visited)
                    islands += 1
                    
        return islands     
        
    def bfs(self, grid, x, y, visited):
        queue = collections.deque([(x, y)])
        visited.add((x, y))
        while queue:
            cur_x, cur_y = queue.popleft()
            for dx, dy in DIRECTIONS:
                next_x = cur_x + dx
                next_y = cur_y + dy
                if (next_x, next_y) in visited:
                    continue
                if not self.is_valid(grid, next_x, next_y):
                    continue
                queue.append((next_x, next_y))
                visited.add((next_x, next_y))
                
    
    def is_valid(self, grid, x, y):
        n, m = len(grid), len(grid[0])
        if x < 0 or x >= n or y < 0 or y >= m:
            return False
        return grid[x][y] == "1"
```
