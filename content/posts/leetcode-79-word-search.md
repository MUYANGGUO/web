---
title: "LeetCode 79 Word Search - Medium"
date: "2021-01-01"
excerpt: "79. Word Search -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 79
comments: true
---

### 79. Word Search — Medium

[Open on LeetCode](https://leetcode.com/problems/word-search/)

## Problem

79. Word Search -- Medium

Given a 2D board and a word, find if the word exists in the grid.

The word can be constructed from letters of sequentially adjacent cell, where "adjacent" cells are those horizontally or vertically neighboring. The same letter cell may not be used more than once.

Example:

board =
[
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
]

Given word = "ABCCED", return true.
Given word = "SEE", return true.
Given word = "ABCB", return false.
 

Constraints:
board and word consists only of lowercase and uppercase English letters.
1 <= board.length <= 200
1 <= board[i].length <= 200
1 <= word.length <= 10^3

## Solution

```python
### DFS:

class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        m = len(board)
        n = len(board[0])
        self.found = False
        visited = set()
        for i in range(m):
            for j in range(n):
                self.dfs(board, i, j, 0, word, visited)
                if self.found == True:
                    return True
                    
        return self.found
    
    def dfs(self, board, x, y, ind, word, visited):
        if self.found == True:
            return 
        if ind == len(word):
            self.found = True
            return
        if (x < 0 or x >= len(board)) or (y < 0 or y >= len(board[0])) or (x,y) in visited or board[x][y] != word[ind]:
            return
        visited.add((x, y))
        for dx, dy in [[0, 1], [0, -1], [-1, 0], [1, 0]]:
            self.dfs(board, x + dx, y + dy, ind + 1, word, visited)
        visited.remove((x, y))
```
