---
title: "LeetCode 162 Find Peak Element - Medium"
date: "2021-01-01"
excerpt: 162. Find Peak Element
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 162
comments: true
---

### 162. Find Peak Element — Medium

[Open on LeetCode](https://leetcode.com/problems/find-peak-element/)

## Problem

162. Find Peak Element

A peak element is an element that is greater than its neighbors.

Given an input array nums, where nums[i] ≠ nums[i+1], find a peak element and return its index.

The array may contain multiple peaks, in that case return the index to any one of the peaks is fine.

You may imagine that nums[-1] = nums[n] = -∞.

Example 1:

Input: nums = [1,2,3,1]
Output: 2
Explanation: 3 is a peak element and your function should return the index number 2.
Example 2:

Input: nums = [1,2,1,3,5,6,4]
Output: 1 or 5 
Explanation: Your function can return either index number 1 where the peak element is 2, 
             or index number 5 where the peak element is 6.

## Solution

```python
class Solution:
    def findPeakElement(self, nums):
        ### return any peak
        ### Binary Search
        ### 1 2 1 3 5 6 4
        ### S     M     E
        ### since num[-1] is negative infinity
        ### if we have  nums[mid - 1] < nums[mid], we know there must be a peak at [mid, :]
        ### otherwise, peak should be contained in left part
        if not nums:
            return None
        
        start, end = 0, len(nums) - 1
        while start + 1 < end:
            mid = int((start + end) / 2)
            if nums[mid - 1] < nums[mid]:
                start = mid
            else:
                end = mid
        
        if nums[start] > nums[end]:
            return start
        else:
            return end
```
