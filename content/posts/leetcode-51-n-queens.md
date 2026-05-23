---
title: "LeetCode 51 N-Queens - Hard"
date: "2021-01-01"
excerpt: "51. N-Queens"
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 51
comments: true
---

### 51. N-Queens — Hard

[Open on LeetCode](https://leetcode.com/problems/n-queens/)

## Problem

51. N-Queens

The n-queens puzzle is the problem of placing n queens on an n×n chessboard such that no two queens attack each other.

Given an integer n, return all distinct solutions to the n-queens puzzle.

Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space respectively.

Example:

Input: 4
Output: [
 [".Q..",  // Solution 1
  "...Q",
  "Q...",
  "..Q."],

 ["..Q.",  // Solution 2
  "Q...",
  "...Q",
  ".Q.."]
]
Explanation: There exist two distinct solutions to the 4-queens puzzle as shown above.

## Solution

```python
class Solution:
    def solveNQueens(self, n):
        results = []
        self.search(n, [], results)
        return results
    
    def search(self, n, cols, results):
        row = len(cols)
        if row == n:
            results.append(self.draw_chessboard(cols))
            return
        
        for col in range(n):
            if not self.is_valid(cols, row, col):
                continue
            cols.append(col)
            self.search(n, cols, results)
            cols.pop()
    
    def draw_chessboard(self, cols):
        n = len(cols)
        board = []
        for i in range(n):
            row = ['Q' if j == cols[i] else '.' for j in range(n)]
            board.append(''.join(row))
        return board
    
    def is_valid(self, cols, row, col):
        for r, c in enumerate(cols):
            ### 直线
            if c == col:
                return False
            ### 双斜线
            if r - c == row - col or r + c == row + col:
                return False
        return True



### 优化is_valid(), 但是对整体时间复杂度并没有影响。


class Solution:
    """
    @param: n: The number of queens
    @return: All distinct solutions
    """
    def solveNQueens(self, n):
        boards = []
        visited = {
            'col': set(),
            'sum': set(),
            'diff': set(),
        }
        self.dfs(n, [], visited, boards)
        return boards
        
    def dfs(self, n, permutation, visited, boards):
        if n == len(permutation):
            boards.append(self.draw(permutation))
            return
        
        row = len(permutation)
        for col in range(n):
            if not self.is_valid(permutation, visited, col):
                continue
            permutation.append(col)
            visited['col'].add(col)
            visited['sum'].add(row + col)
            visited['diff'].add(row - col)
            self.dfs(n, permutation, visited, boards)
            visited['col'].remove(col)
            visited['sum'].remove(row + col)
            visited['diff'].remove(row - col)
            permutation.pop()

    # O(1)
    def is_valid(self, permutation, visited, col):
        row = len(permutation)
        if col in visited['col']:
            return False
        if row + col in visited['sum']:
            return False
        if row - col in visited['diff']:
            return False
        return True
        
    def draw(self, permutation):
        board = []
        n = len(permutation)
        for col in permutation:
            row_string = ''.join(['Q' if c == col else '.' for c in range(n)])
            board.append(row_string)
        return board
```
