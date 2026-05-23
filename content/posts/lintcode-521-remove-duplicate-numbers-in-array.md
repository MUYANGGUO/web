---
title: "LintCode 521 Remove Duplicate Numbers In Array - Easy"
date: "2021-01-01"
excerpt: 521. Remove Duplicate Numbers in Array
kind: leetcode
tags:
  - LintCode
  - Easy
  - Python
order: 521
comments: true
---

### 521. Remove Duplicate Numbers In Array — Easy

[Open on LintCode](https://www.lintcode.com/problem/521/)

## Problem

521. Remove Duplicate Numbers in Array

Given an array of integers, remove the duplicate numbers in it.

You should:

Do it in place in the array.
Move the unique numbers to the front of the array.
Return the total number of the unique numbers.
Example
Example 1:

Input:
nums = [1,3,1,4,4,2]
Output:
[1,3,4,2,?,?]
4
Explanation:

Move duplicate integers to the tail of nums => nums = [1,3,4,2,?,?].
Return the number of unique integers in nums => 4.
Actually we don't care about what you place in ?, we only care about the part which has no duplicate integers.
Example 2:

Input:
nums = [1,2,3]
Output:
[1,2,3]
3

Challenge
Do it in O(n) time complexity.
Do it in O(nlogn) time without extra space.

Notice
You don't need to keep the original order of the integers.

## Solution

```python
### Hash O(n), extra space
class Solution:
    """
    @param nums: an array of integers
    @return: the number of unique integers
    """
    def deduplication(self, nums):
        # Write your code here
        if not nums:
            return 0
            
        unique = list(set(nums))
        nums[:len(unique)] = unique
        
        return len(unique)

### Two Pointers, O(nlogn), in-place
class Solution:
    """
    @param nums: an array of integers
    @return: the number of unique integers
    """
    def deduplication(self, nums):
        # Write your code here
        if not nums:
            return 0
        nums.sort()
        j = 1
        for i in range(len(nums)):
            while j < len(nums) and nums[j] == nums[i]:
                j += 1
            if j >= len(nums):
                break
            nums[i + 1] = nums[j]
        return i + 1
```
