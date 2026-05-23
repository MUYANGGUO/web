---
title: "LeetCode 485 Max Consecutive Ones - Easy"
date: "2021-01-01"
excerpt: "Given a binary array, find the maximum number of consecutive 1s in this array."
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 485
comments: true
---

### 485. Max Consecutive Ones — Easy

[Open on LeetCode](https://leetcode.com/problems/max-consecutive-ones/)

## Problem

Given a binary array, find the maximum number of consecutive 1s in this array.

Example 1:
Input: [1,1,0,1,1,1]
Output: 3
Explanation: The first two digits or the last three digits are consecutive 1s.
    The maximum number of consecutive 1s is 3.
Note:

The input array will only contain 0 and 1.
The length of input array is a positive integer and will not exceed 10,000

## Solution

```python
### Array Problem:

class Solution:
    def findMaxConsecutiveOnes(self, nums: List[int]) -> int:
        if not nums:
            return 0
        
        n = len(nums)
        temp = 0
        res = 0
        for num in nums:
            if num == 1:
                temp += 1
            else:
                temp = 0
            res = max(res, temp)
        return res
```
