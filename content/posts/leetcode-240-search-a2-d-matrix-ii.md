---
title: "LeetCode 240 Search A2 D Matrix II - Medium"
date: "2021-01-01"
excerpt: 240. Search a 2D Matrix II
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 240
comments: true
---

### 240. Search A2 D Matrix II — Medium

[Open on LeetCode](https://leetcode.com/problems/search-a2-d-matrix-ii/)

## Problem

240. Search a 2D Matrix II

Write an efficient algorithm that searches for a value in an m x n matrix. This matrix has the following properties:

Integers in each row are sorted in ascending from left to right.
Integers in each column are sorted in ascending from top to bottom.
Example:

Consider the following matrix:

[
  [1,   4,  7, 11, 15],
  [2,   5,  8, 12, 19],
  [3,   6,  9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
]
Given target = 5, return true.

Given target = 20, return false.

## Solution

```python
### https://leetcode.com/problems/search-a-2d-matrix-ii/solution/



class Solution:
    def searchMatrix(self, matrix, target):
        """
        :type matrix: List[List[int]]
        :type target: int
        :rtype: bool
        """
        ### start from the top-right corner:
        m = len(matrix)
        if m == 0:
            return False
        n = len(matrix[0])
        if n == 0:
            return False
        
        x, y = 0, n - 1
        
        while x <= m - 1 and y >= 0:
            if matrix[x][y] == target:
                return True
            elif matrix[x][y] < target:
                x += 1
            else:
                y -= 1
        
        return False
```
