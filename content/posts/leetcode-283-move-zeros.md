---
title: "LeetCode 283 Move Zeros - Easy"
date: "2021-01-01"
excerpt: 283. Move Zeroes
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 283
comments: true
---

### 283. Move Zeros — Easy

[Open on LeetCode](https://leetcode.com/problems/move-zeros/)

## Problem

283. Move Zeroes
Easy


Given an array nums, write a function to move all 0's to the end of it while maintaining the relative order of the non-zero elements.

Example:

Input: [0,1,0,3,12]
Output: [1,3,12,0,0]
Note:

You must do this in-place without making a copy of the array.
Minimize the total number of operations.

## Solution

```python
### 无法保证minimize的普通解， 机遇swap。
class Solution:
    """
    @param nums: an integer array
    @return: nothing
    """
    def moveZeroes(self, nums):
        left, right = 0, 0
        while right < len(nums):
            if nums[right] != 0:
                nums[left], nums[right] = nums[right], nums[left]
                left += 1
            right += 1
            

### 保证minimize的最优解， 不着急swap，先赋值，最后直接改。
class Solution:
    def moveZeroes(self, nums):
        """
        Do not return anything, modify nums in-place instead.
        """
        ### minimize the write operations:
        ### EX:
        ### 1 0 2 3 0
        ### L
        ### R
        ### 1 0 2 3 0
        ###   L
        ###   R(nums[R] == 0, skip)
        ### 1 0 2 3 0
        ###   L
        ###     R(nums[R] != 0, change  L, L += 1)
        ### 1 2 2 3 0
        ###     L
        ###       R(nums[R] != 0, change  L, L += 1)
        ### 1 2 3 3 0
        ###       L
        ###         R(nums[R] == 0, skip, end of loop)
        ### 1 2 3 3 0
        ###       L (L is not zero, change to 0, L += 1)
        ### 1 2 3 0 0
        ###         L (end)
        # write your code here
        left, right = 0, 0
        while right < len(nums):
            if nums[right] != 0:
                if left != right:
                    nums[left] = nums[right]
                left += 1
            right += 1
            
        while left < len(nums):
            if nums[left] != 0:
                nums[left] = 0
            left += 1
```
