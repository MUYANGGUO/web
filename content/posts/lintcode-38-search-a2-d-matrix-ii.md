---
title: "LintCode 38 Search A2 D Matrix II - Medium"
date: "2021-01-01"
excerpt: 38. Search a 2D Matrix II
kind: leetcode
tags:
  - LintCode
  - Medium
  - Python
order: 38
comments: true
---

### 38. Search A2 D Matrix II — Medium

[Open on LintCode](https://www.lintcode.com/problem/38/)

## Problem

38. Search a 2D Matrix II

Write an efficient algorithm that searches for a value in an m x n matrix, return the occurrence of it.

This matrix has the following properties:

Integers in each row are sorted from left to right.
Integers in each column are sorted from up to bottom.
No duplicate integers in each row or column.
Example
Example 1:

Input:
	[[3,4]]
	target=3
Output:1
Example 2:

Input:
    [
      [1, 3, 5, 7],
      [2, 4, 7, 8],
      [3, 5, 9, 10]
    ]
    target = 3
Output:2

Challenge
O(m+n) time and O(1) extra space

## Solution

```python
class Solution:
    """
    @param matrix: A list of lists of integers
    @param target: An integer you want to search in matrix
    @return: An integer indicate the total occurrence of target in the given matrix
    """
    def searchMatrix(self, matrix, target):
        # write your code here
        m = len(matrix)
        if m == 0:
            return 0
        n = len(matrix[0])
        if n == 0:
            return 0
        
        x, y = 0, n - 1
        res = 0
        while x <= m - 1 and y >= 0:
            if matrix[x][y] == target:
                res += 1
                y -= 1
            elif matrix[x][y] < target:
                x += 1
            else:
                y -= 1
        
        return res
```
