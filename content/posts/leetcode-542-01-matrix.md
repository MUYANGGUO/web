---
title: "LeetCode 542 01 Matrix - Medium"
date: "2021-01-01"
excerpt: 542. 01 Matrix
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 542
comments: true
---

### 542. 01 Matrix — Medium

[Open on LeetCode](https://leetcode.com/problems/01-matrix/)

## Problem

542. 01 Matrix

Given a matrix consists of 0 and 1, find the distance of the nearest 0 for each cell.

The distance between two adjacent cells is 1.

Example 1:

Input:
[[0,0,0],
 [0,1,0],
 [0,0,0]]

Output:
[[0,0,0],
 [0,1,0],
 [0,0,0]]
Example 2:

Input:
[[0,0,0],
 [0,1,0],
 [1,1,1]]

Output:
[[0,0,0],
 [0,1,0],
 [1,2,1]]
 

Note:

The number of elements of the given matrix will not exceed 10,000.
There are at least one 0 in the given matrix.
The cells are adjacent in only four directions: up, down, left and right.

## Solution

```python
### BFS:

from collections import deque

class Solution:
    def updateMatrix(self, matrix: List[List[int]]) -> List[List[int]]:
        
        m, n = len(matrix), len(matrix[0])
        queue = deque()
        directions = [(0, 1),(0, -1),(1, 0), (-1, 0)]
        for i in range(m):
            for j in range(n):
                if matrix[i][j] != 0:
                    matrix[i][j] = - 1
                    continue
                ### queue is all zero cells to start, as they have a depth initialization of 0
                queue.append((i, j))
        
        while queue:
            x, y = queue.popleft()
            #pop 出来一个点 开始BFS
            for dx, dy in directions:
                new_x, new_y = x + dx, y + dy
                # 判断边界条件 非法情况忽略
                if not self.isValid(new_x, new_y, matrix):
                    continue
                # 如果neigbor depth大于等于0 忽略，
                # 因为说明neighbor数字为0或者已经被更新过，也就是说有上层邻居更新过，非常巧妙地去重方式。
                if matrix[new_x][new_y] >= 0:
                    continue
                matrix[new_x][new_y] = matrix[x][y] + 1
                queue.append((new_x, new_y))
        return matrix
            
    def isValid(self, x, y, matrix):
        if 0 <= x <len(matrix) and 0 <= y < len(matrix[0]):
            return True
        return False
```
