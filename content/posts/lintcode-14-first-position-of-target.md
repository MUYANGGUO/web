---
title: "LintCode 14 First Position Of Target - Easy"
date: "2021-01-01"
excerpt: 14. First Position of Target
kind: leetcode
tags:
  - LintCode
  - Easy
  - Python
order: 14
comments: true
---

### 14. First Position Of Target — Easy

[Open on LintCode](https://www.lintcode.com/problem/14/)

## Problem

14. First Position of Target

For a given sorted array (ascending order) and a target number, find the first index of this number in O(log n) time complexity.

If the target number does not exist in the array, return -1.

Example
Example 1:
	Input:  [1,4,4,5,7,7,8,9,9,10]，1
	Output: 0
	
	Explanation: 
	the first index of  1 is 0.

Example 2:
	Input: [1, 2, 3, 3, 4, 5, 10]，3
	Output: 2
	
	Explanation: 
	the first index of 3 is 2.

Example 3:
	Input: [1, 2, 3, 3, 4, 5, 10]，6
	Output: -1
	
	Explanation: 
	Not exist 6 in array.

Challenge
If the count of numbers is bigger than 2^32, can your code work properly?

## Solution

```python
class Solution:
    """
    @param nums: The integer array.
    @param target: Target to find.
    @return: The first position of target. Position starts from 0.
    """
    def binarySearch(self, nums, target):
        # write your code here
        if not nums:
            return -1
            
        start, end = 0, len(nums) - 1
        
        while start + 1 < end:
            
            mid = int((start + end) / 2)
            
            if nums[mid] == target:
                end = mid
            
            elif nums[mid] < target:
                start = mid + 1
            else:
                end = mid - 1
                
        ### out the loop, leave start, end, start + 1 = end:
        #since we are looking for first, so we should check the left part first:
        if nums[start] == target:
            return start
        
        if nums[end] == target:
            return end
        
        return -1
```
