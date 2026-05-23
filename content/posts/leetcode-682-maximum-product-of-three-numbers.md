---
title: "LeetCode 682 Maximum Product Of Three Numbers - Easy"
date: "2021-01-01"
excerpt: "628. Maximum Product of Three Numbers -- Easy"
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 682
comments: true
---

### 682. Maximum Product Of Three Numbers — Easy

[Open on LeetCode](https://leetcode.com/problems/maximum-product-of-three-numbers/)

## Problem

628. Maximum Product of Three Numbers -- Easy

Given an integer array, find three numbers whose product is maximum and output the maximum product.

Example 1:
Input: [1,2,3]
Output: 6
 

Example 2:
Input: [1,2,3,4]
Output: 24
 
Note:
The length of the given array will be in range [3,104] and all elements are in the range [-1000, 1000].
Multiplication of any three numbers in the input won't exceed the range of 32-bit signed integer.

## Solution

```python
# Using Sort, considering negative numbers so we need to check the first three and the last three product.
class Solution:
    def maximumProduct(self, nums):
        nums.sort()
        return max(nums[0]*nums[1]*nums[-1], nums[-3]*nums[-2]*nums[-1])

# Not using sort, simply trasverse the list， 很有意思的多种variable打擂台的方式, 同时仍然需要考虑negative number，所以同时要maintain两个最小值：
class Solution:
    def maximumProduct(self, nums: List[int]) -> int:
        max1 = max2 = max3 = float("-inf")
        min1 = min2 = float("inf")
        for num in nums: 
            if num > max1:
                max1, max2, max3 = num, max1, max2
            elif num > max2:
                max2, max3 = num, max2
            elif num > max3:
                max3 = num
                
            if num < min1:
                min1, min2 = num, min1
            elif num < min2:
                min2 = num
        return max(max2*max3, min1*min2) * max1
```
