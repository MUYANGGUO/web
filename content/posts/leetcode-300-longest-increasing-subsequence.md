---
title: "LeetCode 300 Longest Increasing Subsequence - Medium"
date: "2021-01-01"
excerpt: "Given an unsorted array of integers, find the length of longest increasing subsequence."
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 300
comments: true
---

### 300. Longest Increasing Subsequence — Medium

[Open on LeetCode](https://leetcode.com/problems/longest-increasing-subsequence/)

## Problem

Given an unsorted array of integers, find the length of longest increasing subsequence.

Example:

Input: [10,9,2,5,3,7,101,18]
Output: 4 
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4. 
Note:

There may be more than one LIS combination, it is only necessary for you to return the length.
Your algorithm should run in O(n2) complexity.
Follow up: Could you improve it to O(n log n) time complexity?

## Solution

```python
class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        ### DP coords type problem:
        
        n = len(nums)
        
        f = [0] * n
        
        
        MAX = 0
        
        for i in range(n):
            f[i] = 1
            for j in range(i):
                if nums[j] < nums[i]:
                    f[i] = max(f[i], f[j]+1)
            MAX = max(f[i], MAX)
        
        return MAX
```
