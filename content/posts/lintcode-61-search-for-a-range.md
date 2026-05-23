---
title: "LintCode 61 Search For A Range - Medium"
date: "2021-01-01"
excerpt: 61. Search for a Range
kind: leetcode
tags:
  - LintCode
  - Medium
  - Python
order: 61
comments: true
---

### 61. Search For A Range — Medium

[Open on LintCode](https://www.lintcode.com/problem/61/)

## Problem

61. Search for a Range

Given a sorted array of n integers, find the starting and ending position of a given target value.

If the target is not found in the array, return [-1, -1].

Example
Example 1:

Input:
[]
9
Output:
[-1,-1]

Example 2:

Input:
[5, 7, 7, 8, 8, 10]
8
Output:
[3, 4]
Challenge
O(log n) time.

## Solution

```python
class Solution:
    """
    @param A: an integer sorted array
    @param target: an integer to be inserted
    @return: a list of length 2, [index1, index2]
    """
    # 寻找左端点
    def find_first_target_num(self, A, target, n):
        left, right = 0, n - 1
        while left + 1 < right:
            mid = left + (right - left) // 2
            if A[mid] < target:
                left = mid
            else:
                right = mid
        if left < n and A[left] == target:
            return left
        if right >= 0 and A[right] == target:
            return right
        return -1
    
    # 寻找右端点
    def find_last_target_num(self, A, target, n):
        left, right = 0, n - 1
        while left + 1 < right:
            mid = left + (right - left) // 2
            if A[mid] <= target:
                left = mid
            else:
                right = mid
        if right >= 0 and A[right] == target:
            return right
        if left < n and A[left] == target:
            return left
        return -1
    
    def searchRange(self, A, target):
        n = len(A)
        interval = [-1, -1]
        interval[0] = self.find_first_target_num(A, target, n)
        interval[1] = self.find_last_target_num(A, target, n)
        return interval
```
