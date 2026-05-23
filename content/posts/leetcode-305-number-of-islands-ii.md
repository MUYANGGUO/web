---
title: "LeetCode 305 Number Of Islands II - Hard"
date: "2021-01-01"
excerpt: "305. Number of Islands II -- Hard"
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 305
comments: true
---

### 305. Number Of Islands II — Hard

[Open on LeetCode](https://leetcode.com/problems/number-of-islands-ii/)

## Problem

305. Number of Islands II -- Hard

A 2d grid map of m rows and n columns is initially filled with water. We may perform an addLand operation which turns the water at position (row, col) into a land. Given a list of positions to operate, count the number of islands after each addLand operation. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

Example:

Input: m = 3, n = 3, positions = [[0,0], [0,1], [1,2], [2,1]]
Output: [1,1,2,3]
Explanation:

Initially, the 2d grid grid is filled with water. (Assume 0 represents water and 1 represents land).

0 0 0
0 0 0
0 0 0
Operation #1: addLand(0, 0) turns the water at grid[0][0] into a land.

1 0 0
0 0 0   Number of islands = 1
0 0 0
Operation #2: addLand(0, 1) turns the water at grid[0][1] into a land.

1 1 0
0 0 0   Number of islands = 1
0 0 0
Operation #3: addLand(1, 2) turns the water at grid[1][2] into a land.

1 1 0
0 0 1   Number of islands = 2
0 0 0
Operation #4: addLand(2, 1) turns the water at grid[2][1] into a land.

1 1 0
0 0 1   Number of islands = 3
0 1 0

Follow up:

Can you do it in time complexity O(k log mn), where k is the length of the positions?

## Solution

```python
DIRECTIONS = [(0, -1), (0, 1), (-1, 0), (1, 0)]

class Solution:
    """
    @param n: An integer
    @param m: An integer
    @param operators: an array of point
    @return: an integer array
    """
    def numIslands2(self, n, m, operators):
        results = []
        island = set()
        self.size = 0
        self.father = {}
        for operator in operators:
            x, y = operator[0], operator[1]
            if (x, y) in island:
                results.append(self.size)
                continue
            island.add((x, y))
            self.father[(x, y)] = (x, y)
            self.size += 1
            for delta_x, delta_y in DIRECTIONS:
                x_ = x + delta_x
                y_ = y + delta_y
                if (x_, y_) in island:
                    self.union((x_, y_), (x, y))
            results.append(self.size)
            
        return results

    def union(self, point_a, point_b):
        root_a = self.find(point_a)
        root_b = self.find(point_b)
        if root_a != root_b:
            self.father[root_a] = root_b
            self.size -= 1
        
    def find(self, point):
        path = []
        while point != self.father[point]:
            path.append(point)
            point = self.father[point]
            
        for p in path:
            self.father[p] = point
            
        return point
```
