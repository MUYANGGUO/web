---
title: "LintCode 604 Window Sum - Easy"
date: "2021-01-01"
excerpt: 604. Window Sum
kind: leetcode
tags:
  - LintCode
  - Easy
  - Python
order: 604
comments: true
---

### 604. Window Sum — Easy

[Open on LintCode](https://www.lintcode.com/problem/604/)

## Problem

604. Window Sum

Given an array of n integers, and a moving window(size k), move the window at each iteration from the start of the array, find the sum of the element inside the window at each moving.

Example
Example 1

Input：array = [1,2,7,8,5], k = 3
Output：[10,17,20]
Explanation：
1 + 2 + 7 = 10
2 + 7 + 8 = 17
7 + 8 + 5 = 20

## Solution

```python
class Solution:
    """
    @param nums: a list of integers.
    @param k: length of window.
    @return: the sum of the element inside the window at each moving.
    """
    def winSum(self, nums, k):
        # write your code here
        if not nums or len(nums) < k:
            return []
            
        result = []
        j = 0
        window_sum = 0
        for i in range(len(nums)):
            while j < len(nums) and j - i < k:
                window_sum += nums[j]
                j += 1
            if j - i == k:
                result.append(window_sum)
            
            ### 在iterate 之前，从窗口中剪掉之前的第一个数
            window_sum -= nums[i]
        
        return result
```
