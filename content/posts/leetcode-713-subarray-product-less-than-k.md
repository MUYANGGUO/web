---
title: "LeetCode 713 Subarray Product Less Than K - Medium"
date: "2021-01-01"
excerpt: "713. Subarray Product Less Than K -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 713
comments: true
---

### 713. Subarray Product Less Than K — Medium

[Open on LeetCode](https://leetcode.com/problems/subarray-product-less-than-k/)

## Problem

713. Subarray Product Less Than K -- Medium

Your are given an array of positive integers nums.

Count and print the number of (contiguous) subarrays where the product of all the elements in the subarray is less than k.

Example 1:
Input: nums = [10, 5, 2, 6], k = 100
Output: 8
Explanation: The 8 subarrays that have product less than 100 are: [10], [5], [2], [6], [10, 5], [5, 2], [2, 6], [5, 2, 6].
Note that [10, 5, 2] is not included as the product of 100 is not strictly less than k.
Note:

0 < nums.length <= 50000.
0 < nums[i] < 1000.
0 <= k < 10^6.

## Solution

```python
class Solution:
    def numSubarrayProductLessThanK(self, nums: List[int], k: int) -> int:
        left= 0
        prod = 1
        count = 0
        for right in range(len(nums)):
            prod *= nums[right]            
            while prod >= k and left <= right:                    
                prod /= nums[left]
                left += 1                        
            count += right - left + 1                
        return count
```
