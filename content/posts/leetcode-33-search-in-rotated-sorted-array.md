---
title: "LeetCode 33 Search In Rotated Sorted Array - Medium"
date: "2021-01-01"
excerpt: 33. Search in Rotated Sorted Array
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 33
comments: true
---

### 33. Search In Rotated Sorted Array — Medium

[Open on LeetCode](https://leetcode.com/problems/search-in-rotated-sorted-array/)

## Problem

33. Search in Rotated Sorted Array

Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.

(i.e., [0,1,2,4,5,6,7] might become [4,5,6,7,0,1,2]).

You are given a target value to search. If found in the array return its index, otherwise return -1.

You may assume no duplicate exists in the array.

Your algorithm's runtime complexity must be in the order of O(log n).

Example 1:

Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
Example 2:

Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1

## Solution

```python
### One Pass Binary Search Solution:
class Solution:
    def search(self, A, target):
        if not A:
            return -1

        start, end = 0, len(A) - 1
        while start + 1 < end:
            mid = (start + end) // 2
            if A[mid] >= A[start]:
                if A[start] <= target <= A[mid]:
                    end = mid
                else:
                    start = mid
            else:
                if A[mid] <= target <= A[end]:
                    start = mid
                else:
                    end = mid
                    
        if A[start] == target:
            return start
        if A[end] == target:
            return end
        return -1
```
