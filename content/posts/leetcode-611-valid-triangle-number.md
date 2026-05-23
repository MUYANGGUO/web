---
title: "LeetCode 611 Valid Triangle Number - Medium"
date: "2021-01-01"
excerpt: 611. Valid Triangle Number
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 611
comments: true
---

### 611. Valid Triangle Number — Medium

[Open on LeetCode](https://leetcode.com/problems/valid-triangle-number/)

## Problem

611. Valid Triangle Number

Given an array consists of non-negative integers, your task is to count the number of triplets chosen from the array that can make triangles if we take them as side lengths of a triangle.
Example 1:
Input: [2,2,3,4]
Output: 3
Explanation:
Valid combinations are: 
2,3,4 (using the first 2)
2,3,4 (using the second 2)
2,2,3

## Solution

```python
### 此题的解的个数是Cn3， 也就是说N^3
### 但我们使用O(n^2)的时间复杂度就可以解，是因为我们优化的时候是按批计数的。res = res + right - left 。


class Solution:
    def triangleNumber(self, nums):
        if not nums or len(nums) < 3:
            return 

        nums.sort()
        ### Two Pinters:
        res = 0
        ### iterate all target
        for i in range(len(nums)):
            ### Apply two pointers, two sum type
            left, right = 0, i - 1
            while left < right :
                if nums[left] + nums[right] > nums[i]:
                    ### 如果right 可以， 那么right不变，left如果取这里一次性把left到right 所有数字也可以。
                    res = res + right - left
                    right -= 1
                else:  
                    left += 1
        return res
```
