---
title: "LeetCode 209 Minimum Size Subarray Sum - Medium"
date: "2021-01-01"
excerpt: 209. Minimum Size Subarray Sum
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 209
comments: true
---

### 209. Minimum Size Subarray Sum — Medium

[Open on LeetCode](https://leetcode.com/problems/minimum-size-subarray-sum/)

## Problem

209. Minimum Size Subarray Sum

Given an array of n positive integers and a positive integer s, find the minimal length of a contiguous subarray of which the sum ≥ s. If there isn't one, return 0 instead.

Example: 

Input: s = 7, nums = [2,3,1,2,4,3]
Output: 2
Explanation: the subarray [4,3] has the minimal length under the problem constraint.

Follow up:
If you have figured out the O(n) solution, try coding another solution of which the time complexity is O(n log n).

## Solution

```python
# 同向双指针 模板题：

class Solution:
    def minSubArrayLen(self, s: int, nums: List[int]) -> int:
        if not nums:
            return 0
        right = 0
        SUM = 0
        res = float('inf')
        for left in range(len(nums)):
            while right < len(nums) and SUM < s:
                SUM += nums[right]
                right += 1
            if SUM >= s:
                res = min(res, right - left)
            SUM -= nums[left]
        if res == float('inf'):
            return 0
        return res
```
