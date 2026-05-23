---
title: "LeetCode 41 First Missing Positive - Hard"
date: "2021-01-01"
excerpt: 41. First Missing Positive
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 41
comments: true
---

### 41. First Missing Positive — Hard

[Open on LeetCode](https://leetcode.com/problems/first-missing-positive/)

## Problem

41. First Missing Positive

Given an unsorted integer array, find the smallest missing positive integer.

Example 1:

Input: [1,2,0]
Output: 3
Example 2:

Input: [3,4,-1,1]
Output: 2
Example 3:

Input: [7,8,9,11,12]
Output: 1
Follow up:

Your algorithm should run in O(n) time and uses constant extra space.

## Solution

```python
### 很巧秒的使用了bucket sort的 idea，
### 时间复杂度 O（N）， 空间复杂度 O（1）
### Two-Pass Solution:

class Solution:
    def firstMissingPositive(self, nums: List[int]) -> int:
        # bucket sort idea:
        if not nums or len(nums) == 0:
            return 1
        # 先in-place 把出现的正数num发放进应该的index
        for i in range(len(nums)):
            while nums[i] > 0 and nums[i] <= len(nums) and nums[nums[i] - 1] != nums[i]:
                nums[nums[i] - 1], nums[i] = nums[i], nums[nums[i] - 1]
        # 找出当前index对应错误的数，那么就找到了missing value
        for i in range(len(nums)):
            if nums[i] != i + 1:
                return i + 1
        
        # 最后一定要再防止本来nums就全满足条件，比如[1, 2, 3, 4]这种，return的应该是5。
        return len(nums) + 1
```
