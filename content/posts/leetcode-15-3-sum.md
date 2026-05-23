---
title: "LeetCode 15 3 Sum - Medium"
date: "2021-01-01"
excerpt: 15. 3Sum
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 15
comments: true
---

### 15. 3 Sum — Medium

[Open on LeetCode](https://leetcode.com/problems/3-sum/)

## Problem

15. 3Sum

Given an array nums of n integers, are there elements a, b, c in nums such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.

Note:

The solution set must not contain duplicate triplets.

Example:

Given array nums = [-1, 0, 1, 2, -1, -4],

A solution set is:
[
  [-1, 0, 1],
  [-1, -1, 2]
]

## Solution

```python
### 解法一 会超时

class Solution:
    def threeSum(self, nums):
        # write your code here
        if not nums:
            return []
        if len(nums) < 3:
            return []
        nums.sort()
        res = []
        for i in range(len(nums)):
            if nums[i] > 0:
                break
            if i > 0 and nums[i] == nums[i - 1]:
                continue
            self.twoSumII(nums, i, res)

        return res
    
    def twoSumII(self, nums, i , res):
        
        left, right = i + 1, len(nums) - 1
        target = 0 - nums[i]
        while left < right:
            ### 因为数组已经从小到大排过序了
            ### 如果左+右 比 target 大， 那么说明右过大，需要把右指针左移
            if  nums[left] + nums[right] > target:
                right -= 1
            ### 如果左+右 比 target 小， 那么说明左过小，需要把左指针右移
            elif nums[left] + nums[right] < target:
                left += 1
            else:  
                ### 如果相等
                unique = sorted(([nums[i], nums[left], nums[right]]))
                if unique not in res:
                    res.append(unique)
                left += 1
                right -= 1
    
        return


### 最佳解法：
class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        n = len(nums)
        if not nums or n < 3:
            return []
        nums.sort()
        res = []
        
        for i in range(n - 2):
            if nums[i] > 0:
                break
            if i > 0 and nums[i] == nums[i - 1]:
                continue
            
            ###
            target = -nums[i]
            start, end = i + 1, n - 1
            
            while start < end:
                if nums[start] + nums[end] < target:
                    start += 1
                elif nums[start] + nums[end] > target:
                    end -= 1
                else:
                    res.append([nums[i], nums[start], nums[end]])
                    ### avoid duplicate 
                    while start < end and nums[start] == nums[start + 1]:
                        start += 1
                    while start < end and nums[end] == nums[end - 1]:
                        end -= 1
                    start += 1
                    end -= 1
        return res
```
