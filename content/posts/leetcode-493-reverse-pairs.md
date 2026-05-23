---
title: "LeetCode 493 Reverse Pairs - Hard"
date: "2021-01-01"
excerpt: "493. Reverse Pairs -- Hard"
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 493
comments: true
---

### 493. Reverse Pairs — Hard

[Open on LeetCode](https://leetcode.com/problems/reverse-pairs/)

## Problem

493. Reverse Pairs -- Hard

Given an array nums, we call (i, j) an important reverse pair if i < j and nums[i] > 2*nums[j].

You need to return the number of important reverse pairs in the given array.

Example1:
Input: [1,3,2,3,1]
Output: 2

Example2:
Input: [2,4,3,5,1]
Output: 3
Note:
The length of the given array will not exceed 50,000.
All the numbers in the input array are in the range of 32-bit integer.

## Solution

```python
# Modified MergeSort:
class Solution:
    def reversePairs(self, A: List[int]) -> int:
        self.tmp = [0] * len(A)
        return self.mergeSort(A, 0, len(A) - 1)

    def mergeSort(self, A, l, r):
        if l >= r:
            return 0
        m = int((l + r) / 2)
        # divide and conquer
        ans = self.mergeSort(A, l, m) + self.mergeSort(A, m + 1, r)
        i, j = l, m + 1
        # find count
        while i <= m and j <= r:
            if A[i] > 2* A[j]:
                j += 1
                ans += m - i + 1
            else:
                i += 1
        # sort
        i, j, k = l, m + 1, l
        while i <= m and j <= r:
            if A[i] > A[j]:
                self.tmp[k] = A[j]
                j += 1
            else:
                self.tmp[k] = A[i]
                i += 1
            k += 1
        while i <= m:
            self.tmp[k] = A[i]
            k += 1
            i += 1
        while j <= r:
            self.tmp[k] = A[j]
            k += 1
            j += 1
        for i in range(l, r + 1):
            A[i] = self.tmp[i]
        return ans
```
