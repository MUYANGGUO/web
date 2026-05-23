---
title: "LintCode 458 Last Position Of Target - Easy"
date: "2021-01-01"
excerpt: 458. Last Position of Target
kind: leetcode
tags:
  - LintCode
  - Easy
  - Python
order: 458
comments: true
---

### 458. Last Position Of Target — Easy

[Open on LintCode](https://www.lintcode.com/problem/458/)

## Problem

458. Last Position of Target

Find the last position of a target number in a sorted array. Return -1 if target does not exist.

Example
Example 1:

Input: nums = [1,2,2,4,5,5], target = 2
Output: 2
Example 2:

Input: nums = [1,2,2,4,5,5], target = 6
Output: -1

## Solution

```python
class Solution:
    """
    @param nums: An integer array sorted in ascending order
    @param target: An integer
    @return: An integer
    """
    def lastPosition(self, nums, target):
        # write your code here
        if not nums:
            return -1
        
        start, end = 0, len(nums) - 1
        
        while start + 1 < end:
            mid = int((start + end) / 2)
            
            if nums[mid] == target:
                ### search last part, so including current mid, and search in right half:
                start = mid
            elif nums[mid] < target:
                start = mid + 1
            else:
                end = mid - 1
        
        ### out the loop, we should have start + 1 = end:
        ### check end first since looking for last position
        if nums[end] == target:
            return end
        
        if nums[start] == target:
            return start
        
        return - 1
```
