---
title: "LeetCode 1089 Duplicate Zeros - Easy"
date: "2021-01-01"
excerpt: "Given a fixed length array arr of integers, duplicate each occurrence of zero, shifting the remaining elements to the right."
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 1089
comments: true
---

### 1089. Duplicate Zeros — Easy

[Open on LeetCode](https://leetcode.com/problems/duplicate-zeros/)

## Problem

Given a fixed length array arr of integers, duplicate each occurrence of zero, shifting the remaining elements to the right.

Note that elements beyond the length of the original array are not written.

Do the above modifications to the input array in place, do not return anything from your function.

 

Example 1:

Input: [1,0,2,3,0,4,5,0]
Output: null
Explanation: After calling your function, the input array is modified to: [1,0,0,2,3,0,0,4]
Example 2:

Input: [1,2,3]
Output: null
Explanation: After calling your function, the input array is modified to: [1,2,3]

## Solution

```python
class Solution:
    def duplicateZeros(self, arr):
        ptr = 0
        while ptr <= (len(arr)-2):
            if arr[ptr] == 0:
                arr[ptr+1:] = arr[ptr:-1]
                ptr += 2
            else:
                ptr += 1
                


class Solution:
    def duplicateZeros(self, arr: List[int]):
        """
        Do not return anything, modify arr in-place instead.
        """
        ptr = 0
        while ptr <= (len(arr)-2):
            if arr[ptr] == 0:
                arr.pop()
                arr.insert(ptr,0)
                
                ptr += 2
            else:
                ptr += 1
```
