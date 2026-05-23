---
title: "LeetCode 349 Intersection Of Two Arrays - Easy"
date: "2021-01-01"
excerpt: 349. Intersection of Two Arrays
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 349
comments: true
---

### 349. Intersection Of Two Arrays — Easy

[Open on LeetCode](https://leetcode.com/problems/intersection-of-two-arrays/)

## Problem

349. Intersection of Two Arrays

Given two arrays, write a function to compute their intersection.

Example 1:

Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2]
Example 2:

Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [9,4]
Note:

Each element in the result must be unique.
The result can be in any order.

## Solution

```python
### Hashset：
class Solution:
    def intersection(self, nums1, nums2):
        return list(set(nums1).intersection(set(nums2)))

### 双指针：

class Solution:
    def intersection(self, nums1, nums2):
        res = []
        
        # sorting:
        nums1.sort()
        nums2.sort()
        
        i, j = 0, 0
        
        intersect = set()
        
        while i < len(nums1) and j < len(nums2):
            if nums1[i] < nums2[j]:
                i += 1
            elif nums1[i] > nums2[j]:
                j += 1
            else:
                intersect.add(nums1[i])
                i += 1
                j += 1
            
        for num in intersect:
            res.append(num)
        
        return res
```
