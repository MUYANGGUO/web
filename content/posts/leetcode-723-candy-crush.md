---
title: "LeetCode 723 Candy Crush - Medium"
date: "2021-01-01"
excerpt: "723. Candy Crush -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 723
comments: true
---

### 723. Candy Crush — Medium

[Open on LeetCode](https://leetcode.com/problems/candy-crush/)

## Problem

723. Candy Crush -- Medium

This question is about implementing a basic elimination algorithm for Candy Crush.

Given a 2D integer array board representing the grid of candy, different positive integers board[i][j] represent different types of candies. A value of board[i][j] = 0 represents that the cell at position (i, j) is empty. The given board represents the state of the game following the player's move. Now, you need to restore the board to a stable state by crushing candies according to the following rules:

If three or more candies of the same type are adjacent vertically or horizontally, "crush" them all at the same time - these positions become empty.
After crushing all candies simultaneously, if an empty space on the board has candies on top of itself, then these candies will drop until they hit a candy or bottom at the same time. (No new candies will drop outside the top boundary.)
After the above steps, there may exist more candies that can be crushed. If so, you need to repeat the above steps.
If there does not exist more candies that can be crushed (ie. the board is stable), then return the current board.
You need to perform the above rules until the board becomes stable, then return the current board.

Example:

Input:
board =
[[110,5,112,113,114],[210,211,5,213,214],[310,311,3,313,314],[410,411,412,5,414],[5,1,512,3,3],[610,4,1,613,614],[710,1,2,713,714],[810,1,2,1,1],[1,1,2,2,2],[4,1,4,4,1014]]
Output:
[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[110,0,0,0,114],[210,0,0,0,214],[310,0,0,113,314],[410,0,0,213,414],[610,211,112,313,614],[710,311,412,613,714],[810,411,512,713,1014]]


Note:
The length of board will be in the range [3, 50].
The length of board[i] will be in the range [3, 50].
Each board[i][j] will initially start as an integer in the range [1, 2000].

## Solution

```python
# 注意这里crush时用到一个ankor line的方法，非常intuitive，在mark时注意要排除0的问题。

class Solution:
    def candyCrush(self, board: List[List[int]]) -> List[List[int]]:
        m = len(board)
        n = len(board[0])
        needCandyCrush = False
        # check horizontally
        for i in range(m - 2):
            for j in range(n):
                if abs(board[i][j]) == abs(board[i + 1][j]) == abs(board[i + 2][j]) != 0:
                    board[i][j] = -1 * abs(board[i][j])
                    board[i + 1][j] = -1 * abs(board[i][j])
                    board[i + 2][j] = -1 * abs(board[i][j])
                    needCandyCrush = True
        # check horizontally
        for i in range(m):
            for j in range(n - 2):
                if abs(board[i][j]) == abs(board[i][j + 1]) == abs(board[i][j + 2]) != 0:
                    board[i][j]= -1 * abs(board[i][j])
                    board[i][j + 1] = -1 * abs(board[i][j])
                    board[i][j + 2] = -1 * abs(board[i][j])
                    needCandyCrush = True
        
        # crush
        for col in range(n):
            line = m - 1
            for row in range(m - 1, -1, -1):
                if board[row][col] > 0:
                    board[line][col] = board[row][col]
                    line -= 1
            for k in range(line + 1):
                board[k][col] = 0
        
        return self.candyCrush(board) if needCandyCrush else board
```
