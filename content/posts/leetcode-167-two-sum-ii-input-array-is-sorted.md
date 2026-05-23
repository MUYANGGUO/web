---
title: "LeetCode 167 Two Sum II-Input Array Is Sorted - Easy"
date: "2021-01-01"
excerpt: "Given an array of integers that is already sorted in ascending order, find two numbers such that they add up to a specific target number."
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 167
comments: true
---

### 167. Two Sum II-Input Array Is Sorted — Easy

[Open on LeetCode](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)

## Problem

Given an array of integers that is already sorted in ascending order, find two numbers such that they add up to a specific target number.

The function twoSum should return indices of the two numbers such that they add up to the target, where index1 must be less than index2.

Note:

Your returned answers (both index1 and index2) are not zero-based.
You may assume that each input would have exactly one solution and you may not use the same element twice.
Example:

Input: numbers = [2,7,11,15], target = 9
Output: [1,2]
Explanation: The sum of 2 and 7 is 9. Therefore index1 = 1, index2 = 2.

## Solution

```python
### Since given numbers are sorted, we should use two pointers to solve. Because compared to Hashmap method, two pointer is O(1) in space complexity for already sorted list, is better.

class Solution:
    def twoSum(self, numbers, target):
        if not numbers:
            return
        ### numbers is sorted , so use two pointers is better, because it saves space
        left, right = 0, len(numbers) - 1
        while left < right:
            if numbers[left] + numbers[right] > target:
                right -= 1
            elif numbers[left] + numbers[right] < target:
                left += 1
            else:
                return [left + 1, right + 1]
        return
```
