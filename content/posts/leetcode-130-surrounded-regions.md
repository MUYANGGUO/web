---
title: "LeetCode 130 Surrounded Regions - Medium"
date: "2021-01-01"
excerpt: "130. Surrounded Regions -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 130
comments: true
---

### 130. Surrounded Regions — Medium

[Open on LeetCode](https://leetcode.com/problems/surrounded-regions/)

## Problem

130. Surrounded Regions -- Medium

Given a 2D board containing 'X' and 'O' (the letter O), capture all regions surrounded by 'X'.

A region is captured by flipping all 'O's into 'X's in that surrounded region.

Example:

X X X X
X O O X
X X O X
X O X X
After running your function, the board should be:

X X X X
X X X X
X X X X
X O X X
Explanation:

Surrounded regions shouldn’t be on the border, which means that any 'O' on the border of the board are not flipped to 'X'. Any 'O' that is not on the border and it is not connected to an 'O' on the border will be flipped to 'X'. Two cells are connected if they are adjacent cells connected horizontally or vertically.

## Solution

```python
class Solution:
    def solve(self, board: List[List[str]]) -> None:
        """
        Do not return anything, modify board in-place instead.
        """
        if len(board) == 0 or len(board[0]) == 0:
            return ;
        n,m = len(board),len(board[0])
        def dfs(x,y):
            #保证当前点在图中
            if x < 0 or y < 0 or x >= n or y >= m:
                return ;
            if board[x][y] != 'O':
                return ;
            board[x][y] = '*'
            dfs( x + 1, y);
            dfs( x - 1, y);
            dfs( x , y + 1);
            dfs( x , y - 1);
        def is_border(x,y):#判断是否边界
            if x == 0 or y == 0 or x == n - 1 or y == m - 1:
                return True
            return False

        #四周向中间搜 从是border的地方找出不可能被翻转的结果
        for i in range(n):
            for j in range(m):
                if is_border(i,j) == False:
                    continue
                if board[i][j] == 'O':
                    dfs(i,j)
        #遍历图，更新结果
        for i in range(n):
            for j in range(m):
                if board[i][j] == 'O':
                    board[i][j] = 'X'
                elif board[i][j] == '*':
                    board[i][j] = 'O'
```
