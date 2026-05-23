---
title: "LintCode 585 Maximum Number In Mountain Sequence - Medium"
date: "2021-01-01"
excerpt: 585. Maximum Number in Mountain Sequence
kind: leetcode
tags:
  - LintCode
  - Medium
  - Python
order: 585
comments: true
---

### 585. Maximum Number In Mountain Sequence — Medium

[Open on LintCode](https://www.lintcode.com/problem/585/)

## Problem

585. Maximum Number in Mountain Sequence

Given a mountain sequence of n integers which increase firstly and then decrease, find the mountain top.

Example
Example 1:

Input: nums = [1, 2, 4, 8, 6, 3] 
Output: 8
Example 2:

Input: nums = [10, 9, 8, 7], 
Output: 10
Notice
Arrays are strictly incremented, strictly decreasing

## Solution

```python
class Solution:
    """
    @param nums: a mountain sequence which increase firstly and then decrease
    @return: then mountain top
    """
    def mountainSequence(self, nums):
        if not nums:
            return -1
            
        # find first index i so that nums[i] > nums[i + 1]
        start, end = 0, len(nums) - 1
        while start + 1 < end:
            mid = (start + end) // 2
            # mid + 1 保证不会越界
            # 因为 start 和 end 是 start + 1 < end
            if nums[mid] > nums[mid + 1]:
                end = mid
            else:
                start = mid
        
        return max(nums[start], nums[end])
```
