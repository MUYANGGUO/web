---
title: "LintCode 553 Two Sum-Closest To Target - Medium"
date: "2021-01-01"
excerpt: "533. Two Sum - Closest to target"
kind: leetcode
tags:
  - LintCode
  - Medium
  - Python
order: 553
comments: true
---

### 553. Two Sum-Closest To Target — Medium

[Open on LintCode](https://www.lintcode.com/problem/553/)

## Problem

533. Two Sum - Closest to target

Description

Given an array nums of n integers, find two integers in nums such that the sum is closest to a given number, target.

Return the absolute value of difference between the sum of the two integers and the target.

Have you met this question in a real interview?  
Example
Example1

Input:  nums = [-1, 2, 1, -4] and target = 4
Output: 1
Explanation:
The minimum difference is 1. (4 - (2 + 1) = 1).
Example2

Input:  nums = [-1, -1, -1, -4] and target = 4
Output: 6
Explanation:
The minimum difference is 6. (4 - (- 1 - 1) = 6).
Challenge
Do it in O(nlogn) time complexity.

## Solution

```python
class Solution:
    """
    @param nums: an integer array
    @param target: An integer
    @return: the difference between the sum and the target
    """
    def twoSumClosest(self, nums, target):
        # write your code here
        if not nums:
            return 
        
        nums.sort()
        
        left, right = 0, len(nums) - 1
        
        diff = sys.maxsize
        while left < right :
            if nums[left] + nums[right] > target:
                ### 这里注意计算diff的符号问题
                diff = min(nums[left] + nums[right] - target, diff)
                right -= 1
            elif nums[left] + nums[right] < target:
                ### 这里注意计算diff的符号问题
                diff = min(target - nums[left] - nums[right], diff)
                left += 1
            else:
                return 0
        return diff
```
