---
title: "LeetCode 219 Contains Duplicate II - Easy"
date: "2021-01-01"
excerpt: "219. Contains Duplicate II -- Easy"
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 219
comments: true
---

### 219. Contains Duplicate II — Easy

[Open on LeetCode](https://leetcode.com/problems/contains-duplicate-ii/)

## Problem

219. Contains Duplicate II -- Easy

Given an array of integers and an integer k, find out whether there are two distinct indices i and j in the array such that nums[i] = nums[j] and the absolute difference between i and j is at most k.

Example 1:
Input: nums = [1,2,3,1], k = 3
Output: true

Example 2:
Input: nums = [1,0,1,1], k = 1
Output: true

Example 3:
Input: nums = [1,2,3,1,2,3], k = 2
Output: false

## Solution

```python
class Solution:
    def containsNearbyDuplicate(self, nums: List[int], k: int) -> bool:
        map = dict()
        for i, v in enumerate(nums):
            if v not in map:
                map[v] = i
            else:
                diff = i - map[v]
                map[v] = i
                if diff <= k:
                    return True
        return False
```
