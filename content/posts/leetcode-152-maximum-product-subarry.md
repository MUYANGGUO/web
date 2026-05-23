---
title: "LeetCode 152 Maximum Product Subarry - Medium"
date: "2021-01-01"
excerpt: "Given an integer array nums, find the contiguous subarray within an array (containing at least one number) which has the largest product."
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 152
comments: true
---

### 152. Maximum Product Subarry — Medium

[Open on LeetCode](https://leetcode.com/problems/maximum-product-subarry/)

## Problem

Given an integer array nums, find the contiguous subarray within an array (containing at least one number) which has the largest product.

Example 1:

Input: [2,3,-2,4]
Output: 6
Explanation: [2,3] has the largest product 6.
Example 2:

Input: [-2,0,-1]
Output: 0
Explanation: The result cannot be 2, because [-2,-1] is not a subarray.

## Solution

```python
class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        # write your code here
        # DP
        # the problem the maximum substring  nums[i:j] is the max maxProduct
        # we consider at element j, all elements before j, has the maxProduct, value as status stored at f[j]
        # note that here if f[j] is negative, then maxProduct should be negative, and will always be negative minimum. 
        # so I came up with two situations when writing the transfer function:
        
        # f[i] = f[i-1] * nums[i-1], if nums[i-1] < 0, we want f[i-1] = min, else we want f[i-1] = max
        
        # so we need to track both min and max
        
        # and use max and min to compare, but don't forget to include the current num itself.
        
        # construct f
        
        n = len(nums)
        if n == 1:
            return nums[0]
            
        f = [0] * (n)
        g = [0] * (n)
        f[0] = nums[0]
        g[0] = nums[0]
        for i in range(1,n):
            # use both min or max to ignore the effect of if nums[i] is negative or not. 
            # in this way we always track both min and max as we advance, and dont' forget the number itself
            g[i] = min(min(nums[i] * f[i-1], nums[i] * g[i-1]), nums[i])
 
            f[i] = max(max(nums[i] * g[i-1], nums[i] * f[i-1]), nums[i])
        
        return max(f)
```
