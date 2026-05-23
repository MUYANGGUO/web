---
title: "LeetCode 52 N-Queens II - Hard"
date: "2021-01-01"
excerpt: "52. N-Queens II"
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 52
comments: true
---

### 52. N-Queens II — Hard

[Open on LeetCode](https://leetcode.com/problems/n-queens-ii/)

## Problem

52. N-Queens II

The n-queens puzzle is the problem of placing n queens on an n×n chessboard such that no two queens attack each other.

Given an integer n, return the number of distinct solutions to the n-queens puzzle.

Example:

Input: 4
Output: 2
Explanation: There are two distinct solutions to the 4-queens puzzle as shown below.
[
 [".Q..",  // Solution 1
  "...Q",
  "Q...",
  "..Q."],

 ["..Q.",  // Solution 2
  "Q...",
  "...Q",
  ".Q.."]
]

## Solution

```python
class Solution:

    ### use class global variable to pass/modify value in recursions
    results = 0

    def totalNQueens(self, n):
        self.search(n, [], self.results)
        return self.results
    
    def search(self, n, cols, results):
        row = len(cols)
        if row == n:
            self.results += 1
            return
        
        for col in range(n):
            if not self.is_valid(cols, row, col):
                continue
            cols.append(col)
            self.search(n, cols, results)
            cols.pop()
    
    def is_valid(self, cols, row, col):
        for r, c in enumerate(cols):
            ### 直线
            if c == col:
                return False
            ### 双斜线
            if r - c == row - col or r + c == row + col:
                return False
        return True
```
