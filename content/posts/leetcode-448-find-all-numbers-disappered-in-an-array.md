---
title: "LeetCode 448 Find All Numbers Disappered In An Array - Easy"
date: "2021-01-01"
excerpt: "448. Find All Numbers Disappeared in an Array -- Easy"
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 448
comments: true
---

### 448. Find All Numbers Disappered In An Array — Easy

[Open on LeetCode](https://leetcode.com/problems/find-all-numbers-disappered-in-an-array/)

## Problem

448. Find All Numbers Disappeared in an Array -- Easy

Given an array of integers where 1 ≤ a[i] ≤ n (n = size of array), some elements appear twice and others appear once.

Find all the elements of [1, n] inclusive that do not appear in this array.

Could you do it without extra space and in O(n) runtime? You may assume the returned list does not count as extra space.

Example:

Input:
[4,3,2,7,8,2,3,1]

Output:
[5,6]

## Solution

```python
### O(N), O(1)
class Solution:
    def findDisappearedNumbers(self, nums: List[int]) -> List[int]:
        for i in range(len(nums)):
            value = nums[i]
            index = abs(value) - 1
            # color
            if nums[index] > 0:
                nums[index] *= -1
        res = []
        for i in range(1, len(nums) + 1):
            if nums[i - 1] > 0:
                res.append(i)
        
        return res

# O(N), O(N)
class Solution:
    def findDisappearedNumbers(self, nums: List[int]) -> List[int]:
        hash_table = set(nums)
        result = []    
        for num in range(1, len(nums) + 1):
            if num not in hash_table:
                result.append(num)
                
        return result
```
