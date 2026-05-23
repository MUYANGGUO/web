---
title: "LeetCode 325 Maximum Size Subarray Sum Equals K - Medium"
date: "2021-01-01"
excerpt: 325. Maximum Size Subarray Sum Equals k
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 325
comments: true
---

### 325. Maximum Size Subarray Sum Equals K — Medium

[Open on LeetCode](https://leetcode.com/problems/maximum-size-subarray-sum-equals-k/)

## Problem

325. Maximum Size Subarray Sum Equals k

Given an array nums and a target value k, find the maximum length of a subarray that sums to k. If there isn't one, return 0 instead.

Note:
The sum of the entire nums array is guaranteed to fit within the 32-bit signed integer range.

Example 1:

Input: nums = [1, -1, 5, -2, 3], k = 3
Output: 4 
Explanation: The subarray [1, -1, 5, -2] sums to 3 and is the longest.
Example 2:

Input: nums = [-2, -1, 2, 1], k = 1
Output: 2 
Explanation: The subarray [-1, 2] sums to 1 and is the longest.
Follow Up:
Can you do it in O(n) time?

## Solution

```python
### Two Sum type, Prefix Sum problem:

class Solution:
    def maxSubArrayLen(self, nums: List[int], k: int) -> int:
        if not nums:
            return 0
        # 这题的本质是two sum问题
        # 先建立一个prefixSUM
        # 然后对prefixSUM进行two sum 找 curr-k
        # 注意边界条件
        Hash = {}
        prefixSUM = [0] * (len(nums) + 1)
        maxLen = float('-inf')
        
        for i in range(len(prefixSUM)):
            if i - 1 >= 0:
                prefixSUM[i] = prefixSUM[i - 1] + nums[i - 1]
            diff = prefixSUM[i] - k
            if diff in Hash and Hash[diff] <= i:
                maxLen = max(maxLen, i - Hash[diff])
            if prefixSUM[i] not in Hash:
                Hash[prefixSUM[i]] = i
                    
        if maxLen == float('-inf'):
            return 0
        return maxLen
```
