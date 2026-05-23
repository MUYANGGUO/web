---
title: "LeetCode 581 Shortest Unsorted Continuous Subarray - Easy"
date: "2021-01-01"
excerpt: 581. Shortest Unsorted Continuous Subarray
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 581
comments: true
---

### 581. Shortest Unsorted Continuous Subarray — Easy

[Open on LeetCode](https://leetcode.com/problems/shortest-unsorted-continuous-subarray/)

## Problem

581. Shortest Unsorted Continuous Subarray

Given an integer array, you need to find one continuous subarray that if you only sort this subarray in ascending order, then the whole array will be sorted in ascending order, too.

You need to find the shortest such subarray and output its length.

Example 1:
Input: [2, 6, 4, 8, 10, 9, 15]
Output: 5
Explanation: You need to sort [6, 4, 8, 10, 9] in ascending order to make the whole array sorted in ascending order.
Note:
Then length of the input array is in range [1, 10,000].
The input array may contain duplicates, so ascending order here means <=.

## Solution

```python
class Solution:
    def findUnsortedSubarray(self, nums: List[int]) -> int:
        # 初步search
        # [0...start] sorted,
        # [end....n-1] sorted
        # [start + 1, .... end - 1] unsorted,
        # 第二步 filter
        # we need to make sure [0....start]'s max is less than min of unsorted
        # and [end ... n - 1]'s min is larger than max of unsorted
        if not nums or len(nums) <= 1:
            return 0
        
        start, end = 0, len(nums) - 1
        while start + 1 <= len(nums) - 1 and nums[start] <= nums[start + 1]:
            start += 1
        while end - 1 >= 0 and nums[end] >= nums[end - 1]:
            end -= 1
                    
        if start > end:
            return 0
        
        cur_min, cur_max = self.findLocalMaxMin(nums, start, end)
        
        while start > 0 and cur_min < nums[start-1]:
            start -= 1
            
        while end < len(nums) - 1 and cur_max > nums[end + 1]:
            end += 1
            
        return end - start + 1
    
    def findLocalMaxMin(self, nums, start, end):
        minVal = float('inf')
        maxVal = float('-inf')
        
        for i in range(start, end + 1):
            minVal = min(minVal, nums[i])
            maxVal = max(maxVal, nums[i])
        
        return minVal, maxVal
```
