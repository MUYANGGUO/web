---
title: "LeetCode 136 Single Number - Easy"
date: "2021-01-01"
excerpt: "136. Single Number -- Easy"
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 136
comments: true
---

### 136. Single Number — Easy

[Open on LeetCode](https://leetcode.com/problems/single-number/)

## Problem

136. Single Number -- Easy

Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.

Follow up: Could you implement a solution with a linear runtime complexity and without using extra memory?

Example 1:
Input: nums = [2,2,1]
Output: 1

Example 2:
Input: nums = [4,1,2,1,2]
Output: 4

Example 3:
Input: nums = [1]
Output: 1
 

Constraints:
1 <= nums.length <= 3 * 104
-3 * 104 <= nums[i] <= 3 * 104
Each element in the array appears twice except for one element which appears only once.

## Solution

```python
### Bit Manipulation with XOR
class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        a = 0
        for i in nums:
            a ^= i
        return a
```
