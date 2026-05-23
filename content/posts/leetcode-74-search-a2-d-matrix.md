---
title: "LeetCode 74 Search A2 D Matrix - Medium"
date: "2021-01-01"
excerpt: 74. Search a 2D Matrix
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 74
comments: true
---

### 74. Search A2 D Matrix — Medium

[Open on LeetCode](https://leetcode.com/problems/search-a2-d-matrix/)

## Problem

74. Search a 2D Matrix

Write an efficient algorithm that searches for a value in an m x n matrix. This matrix has the following properties:

Integers in each row are sorted from left to right.
The first integer of each row is greater than the last integer of the previous row.
Example 1:

Input:
matrix = [
  [1,   3,  5,  7],
  [10, 11, 16, 20],
  [23, 30, 34, 50]
]
target = 3
Output: true
Example 2:

Input:
matrix = [
  [1,   3,  5,  7],
  [10, 11, 16, 20],
  [23, 30, 34, 50]
]
target = 13
Output: false

## Solution

```python
### Binary Search ! 此题注意处理矩阵坐标的小技巧。
class Solution:
    def searchMatrix(self, matrix, target):
        m = len(matrix)
        if m == 0:
            return False
        n = len(matrix[0])
        if n == 0:
            return False

        start, end = 0, n*m - 1
        while start + 1 < end:
            mid = int((start + end) / 2)
            pivot = matrix[mid // n][mid % n]
            if pivot == target:
                return True
            else:
                if target < pivot:
                    end = mid - 1
                else:
                    start = mid + 1
        if matrix[start // n][start % n] == target or matrix[end // n][end % n] == target:
            return True
                    
        return False
```
