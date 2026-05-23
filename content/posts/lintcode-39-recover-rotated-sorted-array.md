---
title: "LintCode 39 Recover Rotated Sorted Array - Easy"
date: "2021-01-01"
excerpt: 39. Recover Rotated Sorted Array
kind: leetcode
tags:
  - LintCode
  - Easy
  - Python
order: 39
comments: true
---

### 39. Recover Rotated Sorted Array — Easy

[Open on LintCode](https://www.lintcode.com/problem/39/)

## Problem

39. Recover Rotated Sorted Array

Given a rotated sorted array, recover it to sorted array in-place.（Ascending）

Example
Example1:
[4, 5, 1, 2, 3] -> [1, 2, 3, 4, 5]
Example2:
[6,8,9,1,2] -> [1,2,6,8,9]

Challenge
In-place, O(1) extra space and O(n) time.

Clarification
What is rotated array?

For example, the orginal array is [1,2,3,4], The rotated array of it can be [1,2,3,4], [2,3,4,1], [3,4,1,2], [4,1,2,3]

## Solution

```python
class Solution:
    """
    @param nums: An integer array
    @return: nothing
    """
    def recoverRotatedSortedArray(self, nums):
        # write your code here
        minIndex = self.findCut(nums)
        print(minIndex)
        if minIndex == 0:
            return
        
        start, end = 0, len(nums) - 1 
        self.rotateArray(nums, start, minIndex - 1)
        self.rotateArray(nums, minIndex, end)
        self.rotateArray(nums, start, end)
    
    
    def findCut(self, nums):
        if nums is None or len(nums) < 2:
            return 0
            
        start, end = 0, len(nums) - 1
    
        while start + 1< end:
            mid = int((start + end) / 2)
            if nums[mid] > nums[end]:
                start = mid + 1
            elif nums[mid] < nums[end]:
                end = mid
            else:
                end -= 1
        if nums[start] > nums[end]:
    
            return end
        else:
            return start
    
    def rotateArray(self, nums, left, right):
        while left <= right:
            nums[left], nums[right] = nums[right], nums[left]
            left += 1 
            right -= 1
```
