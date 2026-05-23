---
title: "LeetCode 361 Bomb Enemy - Medium"
date: "2021-01-01"
excerpt: ""
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 361
comments: true
---

### 361. Bomb Enemy — Medium

[Open on LeetCode](https://leetcode.com/problems/bomb-enemy/)

## Solution

```python
class Solution:
    def maxKilledEnemies(self, grid: List[List[str]]) -> int:
        if not grid or len(grid) == 0 or len(grid[0]) == 0:
            return 0


        ### DP problem:
        ### 考虑四个方向，每个格子记录其中一个方向上此格子之前的最大kill，分清况如果前面是墙，空或者是人，transfer方程的迭代有不同。
        ### 而且这四个方向的迭代有方向性，比如求上方向，那么一定是从上到下，或者从左到右access grid。 要注意dependency。
        ### 此题不能压缩空间，因为四种情况access的放系那个不同。

        row, col = len(grid), len(grid[0])
        # init
        up = [[0] * col for _ in range(row)]
        down = [[0] * col for _ in range(row)]
        left = [[0] * col for _ in range(row)]
        right = [[0] * col for _ in range(row)]
        
        # up
        for i in range(row) : 
            for j in range(col) :
                if grid[i][j] != 'W' :
                    if grid[i][j] == 'E' :
                        up[i][j] = 1
                    if i > 0 :
                        up[i][j] += up[i - 1][j]
        # down
        for i in range(row - 1, -1, -1) :
            for j in range(col) :
                if grid[i][j] != 'W' :
                    if grid[i][j] == 'E' :
                        down[i][j] = 1
                    if i + 1 < row :
                        down[i][j] += down[i + 1][j]
        # right
        for i in range(row) : 
            for j in range(col - 1, -1, -1) :
                if grid[i][j] != 'W' :
                    if grid[i][j] == 'E' :
                        right[i][j] = 1
                    if j + 1 < col :
                        right[i][j] += right[i][j + 1]
                        
        # left
        for i in range(row) : 
            for j in range(col) :
                if grid[i][j] != 'W' :
                    if grid[i][j] == 'E' :
                        left[i][j] = 1
                    if j > 0 :
                        left[i][j] += left[i][j - 1]
        
        # sum 
        res = 0
        for i in range(row):
            for j in range(col) :
                if grid[i][j] == '0' :
                    res = max(res, up[i][j] + down[i][j] + left[i][j] + right[i][j])
        
        
        return res
```
