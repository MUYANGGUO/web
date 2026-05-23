---
title: "LeetCode 286 Walls And Gates - Medium"
date: "2021-01-01"
excerpt: "286. Walls and Gates -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 286
comments: true
---

### 286. Walls And Gates — Medium

[Open on LeetCode](https://leetcode.com/problems/walls-and-gates/)

## Problem

286. Walls and Gates -- Medium

You are given a m x n 2D grid initialized with these three possible values.

-1 - A wall or an obstacle.
0 - A gate.
INF - Infinity means an empty room. We use the value 231 - 1 = 2147483647 to represent INF as you may assume that the distance to a gate is less than 2147483647.
Fill each empty room with the distance to its nearest gate. If it is impossible to reach a gate, it should be filled with INF.

Example: 

Given the 2D grid:

INF  -1  0  INF
INF INF INF  -1
INF  -1 INF  -1
  0  -1 INF INF
After running your function, the 2D grid should be:

  3  -1   0   1
  2   2   1  -1
  1  -1   2  -1
  0  -1   3   4

## Solution

```python
class Solution:
    def wallsAndGates(self, rooms: List[List[int]]) -> None:
        if not rooms:
            return []
        R, C = len(rooms), len(rooms[0])
        q = collections.deque()
        for r in range(R):
            for c in range(C):
                if rooms[r][c] == 0:
                    q.append((r, c))
        while q:
            r, c = q.popleft()
            for x, y in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                if 0 <= r+x < R and 0 <= c+y < C and rooms[r+x][c+y] > rooms[r][c]:
                    rooms[r+x][c+y] = rooms[r][c] + 1
                    q.append((r+x, c+y))
```
