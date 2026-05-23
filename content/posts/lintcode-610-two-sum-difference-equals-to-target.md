---
title: "LintCode 610 Two Sum-Difference Equals To Target - Medium"
date: "2021-01-01"
excerpt: "610. Two Sum - Difference equals to target"
kind: leetcode
tags:
  - LintCode
  - Medium
  - Python
order: 610
comments: true
---

### 610. Two Sum-Difference Equals To Target — Medium

[Open on LintCode](https://www.lintcode.com/problem/610/)

## Problem

610. Two Sum - Difference equals to target

Given an sorted array of integers, find two numbers that their difference equals to a target value.
return a list with two number like [num1, num2] that the difference of num1 and num2 equals to target value, and num1 is less thannum2.

Example
Example 1:

Input: nums = [2, 7, 15, 24], target = 5 
Output: [2, 7] 
Explanation:
(7 - 2 = 5)
Example 2:

Input: nums = [1, 1], target = 0
Output: [1, 1] 
Explanation:
(1 - 1 = 0)
Notice
It's guaranteed there is only one available solution.
Note: Extra space is prohibited

## Solution

```python
class Solution:
    """
    @param nums: an array of Integer
    @param target: an integer
    @return: [num1, num2] (num1 < num2)
    """
    def twoSum7(self, nums, target):
        # write your code here
        if not nums:
            return 
        
        ### since the nums array given is sorted:
        start, end = 0, 0
        target = abs(target)
        while start <= len(nums) - 1 and end <= len(nums) - 1:
            if start == end:
                end += 1
            else:
                if nums[end] - nums[start] > target:
                    start += 1
                elif nums[end] - nums[start] == target:
                    return [nums[start], nums[end]]
                elif nums[end] - nums[start] < target:
                    end += 1
                
        return [-1, -1]
```
