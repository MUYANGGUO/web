---
title: "LeetCode 36 Valid Sudoku - Medium"
date: "2021-01-01"
excerpt: "36. Valid Sudoku -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 36
comments: true
---

### 36. Valid Sudoku — Medium

[Open on LeetCode](https://leetcode.com/problems/valid-sudoku/)

## Problem

36. Valid Sudoku -- Medium

Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

Each row must contain the digits 1-9 without repetition.
Each column must contain the digits 1-9 without repetition.
Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
Note:

A Sudoku board (partially filled) could be valid but is not necessarily solvable.
Only the filled cells need to be validated according to the mentioned rules.
 

Example 1:

Input: board = 
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: true

Example 2:

Input: board = 
[["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: false
Explanation: Same as Example 1, except with the 5 in the top left corner being modified to 8. Since there are two 8's in the top left 3x3 sub-box, it is invalid.
 

Constraints:

board.length == 9
board[i].length == 9
board[i][j] is a digit or '.'.

## Solution

```python
class Solution:
    def isValidSudoku(self, board: List[List[str]]) -> bool:
        used = set()
        # 先枚举行，检查每行是否合法
        for row in range(9):
            used = set()
            for col in range(9):
                if not self.check_valid(board[row][col], used):
                    return False
        # 先枚举列，检查每列是否合法
        for col in range(9):
            used = set()
            for row in range(9):
                if not self.check_valid(board[row][col], used):
                    return False
        # 每个分块的左上角的坐标为(i * 3, j * 3)
        for i in range(3):
            for j in range(3):
                used = set()
                for row in range(i * 3, i * 3 + 3):
                    for col in range(j * 3, j * 3 + 3):
                        if not self.check_valid(board[row][col], used):
                            return False
        return True
    # 检查字符是否有冲突
    def check_valid(self, c, used):
        if c == '.':
            return True
        if c in used:
            return False
        used.add(c)
        return True
```
