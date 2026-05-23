---
title: "LeetCode 37 Suudku Solver - Hard"
date: "2021-01-01"
excerpt: 37. Sudoku Solver
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 37
comments: true
---

### 37. Suudku Solver — Hard

[Open on LeetCode](https://leetcode.com/problems/suudku-solver/)

## Problem

37. Sudoku Solver

Write a program to solve a Sudoku puzzle by filling the empty cells.

A sudoku solution must satisfy all of the following rules:

Each of the digits 1-9 must occur exactly once in each row.
Each of the digits 1-9 must occur exactly once in each column.
Each of the the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.
Empty cells are indicated by the character '.'.


A sudoku puzzle...


...and its solution numbers marked in red.

Note:

The given board contain only digits 1-9 and the character '.'.
You may assume that the given Sudoku puzzle will have a single unique solution.
The given board size is always 9x9.

## Solution

```python
### 1. 暴力DFS：


class Solution:
    def solveSudoku(self, board):
        """
        Do not return anything, modify board in-place instead.
        """
        used = self.initial_used(board)
        self.dfs(board, 0, used)
        
        
    def initial_used(self, board):
        used = {
            'row': [set() for _ in range(9)],
            'col': [set() for _ in range(9)],
            'box': [set() for _ in range(9)],
        }
        
        for i in range(9):
            for j in range(9):
                if board[i][j] == '.':
                    continue
                used['row'][i].add(board[i][j])
                used['col'][j].add(board[i][j])
                used['box'][i // 3 * 3 + j // 3].add(board[i][j])
                
        return used
        
    def dfs(self, board, index, used):
        if index == 81:
            return True
            
        i, j = index // 9, index % 9
        if board[i][j] != '.':
            return self.dfs(board, index + 1, used)
        
        for val in range(1, 10):
            ### 注意题目里都是str
            val = str(val)
            if not self.is_valid(i, j, val, used):
                continue
            
            board[i][j] = val
            used['row'][i].add(val)
            used['col'][j].add(val)
            used['box'][i // 3 * 3 + j // 3].add(val)
            
            if self.dfs(board, index + 1, used):
                return True
            
            used['box'][i // 3 * 3 + j // 3].remove(val)
            used['col'][j].remove(val)
            used['row'][i].remove(val)
            board[i][j] = '.'
        
        return False
            
    def is_valid(self, i, j, val, used):
        if val in used['row'][i]:
            return False
        if val in used['col'][j]:
            return False
        if val in used['box'][i // 3 * 3 + j // 3]:
            return False
        return True




### 2. 优化搜索顺序 优先最小可能方案数 的DFS：


class Solution:
    def solveSudoku(self, board):
        used = self.initial_used(board)
        self.dfs(board, used)
        
    def initial_used(self, board):
        used = {
            'row': [set() for _ in range(9)],
            'col': [set() for _ in range(9)],
            'box': [set() for _ in range(9)],
        }
        
        for i in range(9):
            for j in range(9):
                if board[i][j] == '.':
                    continue
                used['row'][i].add(board[i][j])
                used['col'][j].add(board[i][j])
                used['box'][i // 3 * 3 + j // 3].add(board[i][j])
                
        return used
        
    def dfs(self, board, used):
        i, j, choices = self.get_least_choices_grid(board, used)
        
        if i is None:
            return True
        
        for val in choices:
            val = str(val)
            board[i][j] = val
            used['row'][i].add(val)
            used['col'][j].add(val)
            used['box'][i // 3 * 3 + j // 3].add(val)
            
            if self.dfs(board, used):
                return True
            
            used['box'][i // 3 * 3 + j // 3].remove(val)
            used['col'][j].remove(val)
            used['row'][i].remove(val)
            board[i][j] = '.'
            
        return False
            
    def get_least_choices_grid(self, board, used):
        x, y, choices = None, None, ['.'] * 10
        
        for i in range(9):
            for j in range(9):
                if board[i][j] != '.':
                    continue
                vals = []
                for val in range(1, 10):
                    val = str(val)
                    if self.is_valid(i, j, val, used):
                        vals.append(val)
                if len(vals) < len(choices):
                    x, y, choices = i, j, vals
                    
        return x, y, choices
            
    def is_valid(self, i, j, val, used):
        if val in used['row'][i]:
            return False
        if val in used['col'][j]:
            return False
        if val in used['box'][i // 3 * 3 + j // 3]:
            return False
        return True
```
