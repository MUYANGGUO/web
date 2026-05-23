---
title: "LeetCode 88 Merge Sorted Array - Easy"
date: "2021-01-01"
excerpt: "Given two sorted integer arrays nums1 and nums2, merge nums2 into nums1 as one sorted array."
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 88
comments: true
---

### 88. Merge Sorted Array — Easy

[Open on LeetCode](https://leetcode.com/problems/merge-sorted-array/)

## Problem

Given two sorted integer arrays nums1 and nums2, merge nums2 into nums1 as one sorted array.

Note:

The number of elements initialized in nums1 and nums2 are m and n respectively.
You may assume that nums1 has enough space (size that is greater or equal to m + n) to hold additional elements from nums2.
Example:

Input:
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6],       n = 3

Output: [1,2,2,3,5,6]

## Solution

```python
class Solution:
    def merge(self, nums1, m, nums2, n):
        """
        Do not return anything, modify nums1 in-place instead.
        """
      
        ptr1 = 0
        ptr2 = 0
        temp = []

        while ptr1 < m and ptr2 <n:

            if nums2[ptr2] <= nums1[ptr1]:
                temp.append(nums2[ptr2])
                ptr2+=1
            else:
                temp.append(nums1[ptr1])
                ptr1+=1
      
        if ptr1>=m:
            temp=temp+nums2[ptr2:]
        else:
            temp = temp+nums1[ptr1:m]
        nums1[:] = temp
```
