---
title: "LeetCode 268 Missing Number - Easy"
date: "2021-01-01"
excerpt: 268. Missing Number
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 268
comments: true
---

### 268. Missing Number — Easy

[Open on LeetCode](https://leetcode.com/problems/missing-number/)

## Problem

268. Missing Number

Given an array containing n distinct numbers taken from 0, 1, 2, ..., n, find the one that is missing from the array.

Example 1:

Input: [3,0,1]
Output: 2
Example 2:

Input: [9,6,4,2,3,5,7,0,1]
Output: 8
Note:
Your algorithm should run in linear runtime complexity. Could you implement it using only constant extra space complexity?

## Solution

```python
class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        num_set = set(nums)
        n = len(nums) + 1
        for number in range(n):
            if number not in num_set:
                return number
```
