---
title: "LeetCode 18 4 Sum - Medium"
date: "2021-01-01"
excerpt: 18. 4Sum
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 18
comments: true
---

### 18. 4 Sum — Medium

[Open on LeetCode](https://leetcode.com/problems/4-sum/)

## Problem

18. 4Sum

Given an array nums of n integers and an integer target, are there elements a, b, c, and d in nums such that a + b + c + d = target? Find all unique quadruplets in the array which gives the sum of target.

Note:

The solution set must not contain duplicate quadruplets.

Example:

Given array nums = [1, 0, -1, 0, -2, 2], and target = 0.

A solution set is:
[
  [-1,  0, 0, 1],
  [-2, -1, 1, 2],
  [-2,  0, 0, 2]
]

## Solution

```python
### a + b + c + d = target
### 1. sort nums
### 2. iterate a
### 3. iterate b
### 4. new target is target - a - b for the rest of the sorted array
### 5. Then the problem is converted to TwoSum.

class Solution:
    def fourSum(self, nums, target):
        if not nums or len(nums) < 4:
            return
        
        nums.sort()
        n = len(nums)
        res = []
        for i in range(n):
            if i > 0 and nums[i - 1] == nums[i]:
                continue
            for j in range(i + 1, n):
                if j > i + 1 and nums[j - 1] == nums[j]:
                    continue
                
                ### Now convert the 4 sum to 2 Sum problem with the rest array.
                new_target = target - nums[i] - nums[j]
                left, right = j + 1, n - 1
                while left < right:

                    
                    if nums[left] + nums[right] > new_target:
                        right -= 1
                    elif nums[left] + nums[right] == new_target:
                        res.append([nums[i], nums[j], nums[left], nums[right]])
                        left += 1
                        right -= 1
                        while left < right and nums[left - 1] == nums[left]:
                            left += 1
                        while left < right and nums[right + 1] == nums[right]:
                            right -= 1

                    else:
                        left += 1
    
        return res

class Solution:
    def fourSum(self, nums, target):
        if not nums or len(nums) < 4:
            return
        ### 先sort
        nums.sort()
        n = len(nums)
        res = []
        for i in range(n):
            ### 去重a
            if i > 0 and nums[i - 1] == nums[i]:
                continue
            for j in range(i + 1, n):
                ### 去重b
                ### 这里 j > i + 1 是十分必要的，因为要避免 nums[i] = nums[j] at j = i + 1 被跳过的情况。
                if j > i + 1 and nums[j - 1] == nums[j]:
                    continue
                ### Now convert the 4 sum to 2 Sum problem with the rest array.
                new_target = target - nums[i] - nums[j]
                self.twoSum(nums, i, j, n - 1, new_target, res)
        return res
    
    def twoSum(self, nums, i, j, end, new_target, res):
        left, right = j + 1, end
        while left < right:
            if nums[left] + nums[right] > new_target:
                right -= 1
            elif nums[left] + nums[right] == new_target:
                res.append([nums[i], nums[j], nums[left], nums[right]])
                left += 1
                right -= 1
                while left < right and nums[left - 1] == nums[left]:
                    left += 1
                while left < right and nums[right + 1] == nums[right]:
                    right -= 1
            else:
                left += 1
        return
```
