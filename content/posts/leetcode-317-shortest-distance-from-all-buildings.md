---
title: "LeetCode 317 Shortest Distance From All Buildings - Hard"
date: "2021-01-01"
excerpt: "317. Shortest Distance from All Buildings -- Hard"
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 317
comments: true
---

### 317. Shortest Distance From All Buildings — Hard

[Open on LeetCode](https://leetcode.com/problems/shortest-distance-from-all-buildings/)

## Problem

317. Shortest Distance from All Buildings -- Hard

You want to build a house on an empty land which reaches all buildings in the shortest amount of distance. You can only move up, down, left and right. You are given a 2D grid of values 0, 1 or 2, where:

Each 0 marks an empty land which you can pass by freely.
Each 1 marks a building which you cannot pass through.
Each 2 marks an obstacle which you cannot pass through.
Example:

Input: [[1,0,2,0,1],[0,0,0,0,0],[0,0,1,0,0]]

1 - 0 - 2 - 0 - 1
|   |   |   |   |
0 - 0 - 0 - 0 - 0
|   |   |   |   |
0 - 0 - 1 - 0 - 0

Output: 7 

Explanation: Given three buildings at (0,0), (0,4), (2,2), and an obstacle at (0,2),
             the point (1,2) is an ideal empty land to build a house, as the total 
             travel distance of 3+3+1=7 is minimal. So return 7.
Note:
There will be at least one building. If it is not possible to build such house according to the above rules, return -1.

## Solution

```python
class Solution:
    def shortestDistance(self, grid: List[List[int]]) -> int:
        #本题采用bfs的方法，记录每个起点到每个空点的距离，并且相加起来，找到最小值即可。
        if not grid:
            return 0
        m = len(grid)
        n = len(grid[0])
        dist = [[float('inf') for j in range(n)] for i in range(m)]
        reachable_count = [[0 for j in range(n)] for i in range(m)]
        min_dist = float('inf')
        buildings = 0
        for i in range(m):
            for j in range(n):
                if grid[i][j] == 1:
                    self.bfs(grid, i, j, dist, m, n, reachable_count)
                    buildings += 1
        for i in range(m):
            for j in range(n):
                if reachable_count[i][j] == buildings and dist[i][j] < min_dist:
                    min_dist = dist[i][j]
        return min_dist if min_dist != float('inf') else -1
    def bfs(self, grid, i, j, dist, m, n, reachable_count):
        visited = [[False for y in range(n)] for x in range(m)]
        visited[i][j] = True
        q = collections.deque([(i,j, 0)])
        while q:
            i, j, l = q.popleft()
            if dist[i][j] == float('inf'):
                dist[i][j] = 0
            dist[i][j] += l
            for x, y in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nx, ny = i+x, j+y
                if nx > -1 and nx < m and ny > -1 and ny < n and not visited[nx][ny]:
                    visited[nx][ny] = True
                    if grid[nx][ny] == 0:
                        q.append((nx, ny, l+1))
                        reachable_count[nx][ny] += 1
```
