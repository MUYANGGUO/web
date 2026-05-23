---
title: "LeetCode 741 Cherry Pickup - Hard"
date: "2021-01-01"
excerpt: "741. Cherry Pickup -- Hard"
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 741
comments: true
---

### 741. Cherry Pickup — Hard

[Open on LeetCode](https://leetcode.com/problems/cherry-pickup/)

## Problem

741. Cherry Pickup -- Hard

In a N x N grid representing a field of cherries, each cell is one of three possible integers.

0 means the cell is empty, so you can pass through;
1 means the cell contains a cherry, that you can pick up and pass through;
-1 means the cell contains a thorn that blocks your way.
 
Your task is to collect maximum number of cherries possible by following the rules below:

Starting at the position (0, 0) and reaching (N-1, N-1) by moving right or down through valid path cells (cells with value 0 or 1);
After reaching (N-1, N-1), returning to (0, 0) by moving left or up through valid path cells;
When passing through a path cell containing a cherry, you pick it up and the cell becomes an empty cell (0);
If there is no valid path between (0, 0) and (N-1, N-1), then no cherries can be collected.
 

 

Example 1:
Input: grid =
[[0, 1, -1],
 [1, 0, -1],
 [1, 1,  1]]
Output: 5
Explanation: 
The player started at (0, 0) and went down, down, right right to reach (2, 2).
4 cherries were picked up during this single trip, and the matrix becomes [[0,1,-1],[0,0,-1],[0,0,0]].
Then, the player went left, up, up, left to return home, picking up one more cherry.
The total number of cherries picked up is 5, and this is the maximum possible.
 

Note:
grid is an N by N 2D array, with 1 <= N <= 50.
Each grid[i][j] is an integer in the set {-1, 0, 1}.
It is guaranteed that grid[0][0] and grid[N-1][N-1] are not -1.

## Solution

```python
### DP
class Solution:
    def cherryPickup(self, grid: List[List[int]]) -> int:
        n = len(grid)
        dp = [[[-1] *(n) for _ in range(n)] for _ in range(n)]
        dp[0][0][0] = grid[0][0]
        for x1 in range(n):
            for y1 in range(n):
                for x2 in range(n):
                    y2 = x1 + y1 - x2
                    if dp[x1][y1][x2] >= 0:
                        # updated before
                        continue
                    if y2 < 0 or y2 > n - 1:
                        # out of boundary
                        continue
                    if grid[x1][y1] < 0 or grid[x2][y2] < 0:
                        continue
                    choice1 = max(dp[x1 - 1][y1][x2], dp[x1][y1 - 1][x2])
                    choice2 = max(dp[x1 - 1][y1][x2 - 1], dp[x1][y1 - 1][x2 -1])
                    final_choice = max(choice1, choice2)
                    if final_choice == -1:
                        continue
                    dp[x1][y1][x2] = final_choice + grid[x1][y1]
                    if x1 != x2:
                        dp[x1][y1][x2] += grid[x2][y2]
                        
        return max(0, dp[n - 1][n - 1][n - 1])
```
