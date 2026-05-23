---
title: "LeetCode 16 3 Sum Closest - Medium"
date: "2021-01-01"
excerpt: 16. 3Sum Closest
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 16
comments: true
---

### 16. 3 Sum Closest — Medium

[Open on LeetCode](https://leetcode.com/problems/3-sum-closest/)

## Problem

16. 3Sum Closest

Given an array nums of n integers and an integer target, find three integers in nums such that the sum is closest to target. Return the sum of the three integers. You may assume that each input would have exactly one solution.

Example 1:

Input: nums = [-1,2,1,-4], target = 1
Output: 2
Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).
 

Constraints:

3 <= nums.length <= 10^3
-10^3 <= nums[i] <= 10^3
-10^4 <= target <= 10^4

## Solution

```python
### Two Pointers:

class Solution:
    def threeSumClosest(self, nums, target):
        if not nums or len(nums) < 3:
            return 
        
        nums.sort()
        
        res = None
        ### iterate the target, after sorting, reducing the searching range each time.
        for i in range(len(nums) - 2):
            left = i + 1
            right = len(nums) - 1
            while left < right:
                SUM = nums[i] + nums[left] + nums[right]
                if res == None:
                    res = SUM
                if abs(SUM - target) < abs(res - target):
                    #update res
                    res = SUM
                if SUM > target:
                    right -= 1
                elif SUM == target:
                    return SUM
                else:
                    left += 1
                    
        return res
```
