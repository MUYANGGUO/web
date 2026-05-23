---
title: "LeetCode 977 Squares Of A Sorted Array - Easy"
date: "2021-01-01"
excerpt: "Given an array of integers A sorted in non-decreasing order, return an array of the squares of each number, also in sorted non-decreasing…"
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 977
comments: true
---

### 977. Squares Of A Sorted Array — Easy

[Open on LeetCode](https://leetcode.com/problems/squares-of-a-sorted-array/)

## Problem

Given an array of integers A sorted in non-decreasing order, return an array of the squares of each number, also in sorted non-decreasing order.

 

Example 1:

Input: [-4,-1,0,3,10]
Output: [0,1,9,16,100]
Example 2:

Input: [-7,-3,2,3,11]
Output: [4,9,9,49,121]
 

Note:

1 <= A.length <= 10000
-10000 <= A[i] <= 10000
A is sorted in non-decreasing order.

## Solution

```python
### Array Problem:

### General Solution O(NlogN) :
class Solution(object):
    def sortedSquares(self, A):
        return sorted(x*x for x in A)


### Double Pointers O(N):

# We can use two pointers to read the positive and negative parts of the array - one pointer j in the positive direction, and another i in the negative direction.
# Now that we are reading two increasing arrays (the squares of the elements), we can merge these arrays together using a two-pointer technique.
class Solution(object):
    def sortedSquares(self, A):
        N = len(A)
        # i, j: negative, positive parts
        j = 0
        while j < N and A[j] < 0:
            j += 1
        i = j - 1

        ans = []
        while 0 <= i and j < N:
            if A[i]**2 < A[j]**2:
                ans.append(A[i]**2)
                i -= 1
            else:
                ans.append(A[j]**2)
                j += 1

        while i >= 0:
            ans.append(A[i]**2)
            i -= 1
        while j < N:
            ans.append(A[j]**2)
            j += 1

        return ans
```
