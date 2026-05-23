---
title: "LeetCode 852 Peak Index In A Mountain Array - Easy"
date: "2021-01-01"
excerpt: 852. Peak Index in a Mountain Array
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 852
comments: true
---

### 852. Peak Index In A Mountain Array — Easy

[Open on LeetCode](https://leetcode.com/problems/peak-index-in-a-mountain-array/)

## Problem

852. Peak Index in a Mountain Array

Let's call an array A a mountain if the following properties hold:

A.length >= 3
There exists some 0 < i < A.length - 1 such that A[0] < A[1] < ... A[i-1] < A[i] > A[i+1] > ... > A[A.length - 1]
Given an array that is definitely a mountain, return any i such that A[0] < A[1] < ... A[i-1] < A[i] > A[i+1] > ... > A[A.length - 1].

Example 1:

Input: [0,1,0]
Output: 1
Example 2:

Input: [0,2,1,0]
Output: 1

## Solution

```python
class Solution:
    def peakIndexInMountainArray(self, A):
        if not A:
            return -1
        
        start, end = 0, len(A) - 1
        
        while start + 1 < end:
            mid = int((start + end) / 2)
            if A[mid] > A[mid + 1]:
                end = mid
            else:
                start = mid
            
        if A[start] >= A[end]:
            return start
        else:
            return end
```
