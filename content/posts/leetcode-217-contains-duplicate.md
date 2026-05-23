---
title: "LeetCode 217 Contains Duplicate - Easy"
date: "2021-01-01"
excerpt: "217. Contains Duplicate -- Easy"
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 217
comments: true
---

### 217. Contains Duplicate — Easy

[Open on LeetCode](https://leetcode.com/problems/contains-duplicate/)

## Problem

217. Contains Duplicate -- Easy

Given an array of integers, find if the array contains any duplicates.

Your function should return true if any value appears at least twice in the array, and it should return false if every element is distinct.

Example 1:
Input: [1,2,3,1]
Output: true

Example 2:
Input: [1,2,3,4]
Output: false

Example 3:
Input: [1,1,1,3,3,4,3,2,4,2]
Output: true

## Solution

```python
class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        return len(set(nums)) != len(nums)
```
