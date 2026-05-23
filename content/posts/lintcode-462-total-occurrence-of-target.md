---
title: "LintCode 462 Total Occurrence Of Target - Easy"
date: "2021-01-01"
excerpt: 462. Total Occurrence of Target
kind: leetcode
tags:
  - LintCode
  - Easy
  - Python
order: 462
comments: true
---

### 462. Total Occurrence Of Target — Easy

[Open on LintCode](https://www.lintcode.com/problem/462/)

## Problem

462. Total Occurrence of Target

Given a target number and an integer array sorted in ascending order. Find the total number of occurrences of target in the array.

Example
Example1:

Input: [1, 3, 3, 4, 5] and target = 3, 
Output: 2.
Example2:

Input: [2, 2, 3, 4, 6] and target = 4, 
Output: 1.
Example3:

Input: [1, 2, 3, 4, 5] and target = 6, 
Output: 0.
Challenge
Time complexity in O(logn)

## Solution

```python
class Solution:
    """
    @param A: A an integer array sorted in ascending order
    @param target: An integer
    @return: An integer
    """
    def totalOccurrence(self, A, target):
        # write your code here

        if not A:

            return 0

        

        #寻找第一次出现的位置

        left, right = 0, len(A) - 1

        while left + 1 < right:

            mid = left + (right - left) // 2

            if A[mid] >= target:

                right = mid

            else:

                left = mid

        

        if A[left] == target:

            first = left

        elif A[right] == target:

            first = right

        #若找不到直接返回0

        else:

            return 0

        

        #寻找最后一次出现的位置

        left, right = 0, len(A) - 1

        while left + 1 < right:

            mid = left + (right - left) // 2

            if A[mid] <= target:

                left = mid

            else:

                right = mid

        

        #注意与first的判断顺序有别，要先判右侧的

        if A[right] == target:

            last = right

        elif A[left] == target:

            last = left

        

        return last - first + 1
```
