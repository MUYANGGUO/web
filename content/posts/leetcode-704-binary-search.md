---
title: "LeetCode 704 Binary Search - Easy"
date: "2021-01-01"
excerpt: "Given a sorted (in ascending order) integer array nums of n elements and a target value, write a function to search target in nums. If ta…"
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 704
comments: true
---

### 704. Binary Search — Easy

[Open on LeetCode](https://leetcode.com/problems/binary-search/)

## Problem

Given a sorted (in ascending order) integer array nums of n elements and a target value, write a function to search target in nums. If target exists, then return its index, otherwise return -1.


Example 1:

Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4

Example 2:

Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
Explanation: 2 does not exist in nums so return -1

## Solution

```python
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        return self.binarySearch(nums, 0, len(nums) - 1 , target)
    
    def binarySearch(self, nums, start, end, target):
        ### 在不可能出现的区间search那就return
        if start > end:
            return - 1
        ### 利用中点来判断，划分下一层递归的区间。
        mid = int((start + end) / 2)
        if nums[mid] == target:
            return mid
        
        if nums[mid] < target:
            return self.binarySearch(nums, mid + 1, end, target)
        
        return self.binarySearch(nums, start, mid - 1, target)
```
