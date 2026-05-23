---
title: "LeetCode 1197 Minimum Knight Moves - Medium"
date: "2021-01-01"
excerpt: 1197. Minimum Knight Moves
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 1197
comments: true
---

### 1197. Minimum Knight Moves — Medium

[Open on LeetCode](https://leetcode.com/problems/minimum-knight-moves/)

## Problem

1197. Minimum Knight Moves

In an infinite chess board with coordinates from -infinity to +infinity, you have a knight at square [0, 0].

A knight has 8 possible moves it can make, as illustrated below. Each move is two squares in a cardinal direction, then one square in an orthogonal direction.

Return the minimum number of steps needed to move the knight to the square [x, y].  It is guaranteed the answer exists.

 
Example 1:

Input: x = 2, y = 1
Output: 1
Explanation: [0, 0] → [2, 1]
Example 2:

Input: x = 5, y = 5
Output: 4
Explanation: [0, 0] → [2, 1] → [4, 2] → [3, 4] → [5, 5]

## Solution

```python
### BFS

DIRECTIONS = [
    (-2, -1), (-2, 1), (-1, 2), (1, 2),
    (2, 1), (2, -1), (1, -2), (-1, -2),
]

class Solution:
    def minKnightMoves(self, x: int, y: int) -> int:
        ### source at (0, 0)
        ### target to (x, y)
        queue = collections.deque([(0, 0)])
        distance = {(0,0): 0}
        
        while queue:
            cur_x, cur_y = queue.popleft()
            if (cur_x, cur_y) == (x, y):
                return distance[(cur_x, cur_y)]
            
            for dx, dy in DIRECTIONS:
                next_x, next_y = cur_x + dx, cur_y + dy
                if (next_x, next_y) in distance:
                    continue
                distance[(next_x, next_y)] = distance[(cur_x, cur_y)] + 1
                queue.append((next_x, next_y))
        
        return -1
```
