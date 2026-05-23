---
title: "LintCode 373 Partition Arrayby Oddand Even - Easy"
date: "2021-01-01"
excerpt: 373. Partition Array by Odd and Even
kind: leetcode
tags:
  - LintCode
  - Easy
  - Python
order: 373
comments: true
---

### 373. Partition Arrayby Oddand Even — Easy

[Open on LintCode](https://www.lintcode.com/problem/373/)

## Problem

373. Partition Array by Odd and Even

Partition an integers array into odd number first and even number second.

Example
Example 1:

Input: [1,2,3,4]
Output: [1,3,2,4]
Example 2:

Input: [1,4,2,3,5,6]
Output: [1,3,5,4,2,6]
Challenge
Do it in-place.

Notice
The answer is not unique. All you have to do is give a vaild answer.

## Solution

```python
class Solution:
    """
    @param: nums: an array of integers
    @return: nothing
    """
    def partitionArray(self, A):
        # write your code here
        left, right = 0, len(A) - 1
        while left <= right:
            while left <= right and A[left] % 2 != 0:
                left += 1
            while left <= right and A[right] % 2 == 0:
                right -= 1
            
            if left <= right:
                A[left], A[right] = A[right], A[left]
                left += 1
                right -= 1
        return A
```
