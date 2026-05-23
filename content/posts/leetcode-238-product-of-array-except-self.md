---
title: "LeetCode 238 Product Of Array Except Self - Medium"
date: "2021-01-01"
excerpt: "238. Product of Array Except Self -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 238
comments: true
---

### 238. Product Of Array Except Self — Medium

[Open on LeetCode](https://leetcode.com/problems/product-of-array-except-self/)

## Problem

238. Product of Array Except Self -- Medium

Given an array nums of n integers where n > 1,  return an array output such that output[i] is equal to the product of all the elements of nums except nums[i].

Example:
Input:  [1,2,3,4]
Output: [24,12,8,6]
Constraint: It's guaranteed that the product of the elements of any prefix or suffix of the array (including the whole array) fits in a 32 bit integer.

Note: Please solve it without division and in O(n).

Follow up:
Could you solve it with constant space complexity? (The output array does not count as extra space for the purpose of space complexity analysis.)

## Solution

```python
# 前缀积 * 后缀积：
class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        length = len(nums)
        result = [1] * length
        prefix_product = 1
        postfix_product = 1
        
        # 将第 i 个位置乘上前 i - 1 个数的积
        for i in range(length):
            result[i] *= prefix_product
            prefix_product *= nums[i]
        
        # 将第 i 个位置乘上后面数的积
        for i in range(length - 1, -1, -1):
            result[i] *= postfix_product
            postfix_product *= nums[i]
        
        return result
```
