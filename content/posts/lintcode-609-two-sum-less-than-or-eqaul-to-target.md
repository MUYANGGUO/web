---
title: "LintCode 609 Two Sum-Less Than Or Eqaul To Target - Medium"
date: "2021-01-01"
excerpt: "609. Two Sum - Less than or equal to target"
kind: leetcode
tags:
  - LintCode
  - Medium
  - Python
order: 609
comments: true
---

### 609. Two Sum-Less Than Or Eqaul To Target — Medium

[Open on LintCode](https://www.lintcode.com/problem/609/)

## Problem

609. Two Sum - Less than or equal to target
中文English
Given an array of integers, find how many pairs in the array such that their sum is less than or equal to a specific target number. Please return the number of pairs.

Example
Example 1:

Input: nums = [2, 7, 11, 15], target = 24. 
Output: 5. 
Explanation:
2 + 7 < 24
2 + 11 < 24
2 + 15 < 24
7 + 11 < 24
7 + 15 < 24
Example 2:

Input: nums = [1], target = 1. 
Output: 0.

## Solution

```python
class Solution:
    """
    @param nums: an array of integer
    @param target: an integer
    @return: an integer
    """
    def twoSum5(self, A, K):
        # write your code here
        if not A:
            return 0
        
        A.sort()
        res = 0
        left, right = 0, len(A) - 1
        while left < right:
            if A[left] + A[right] > K:
                right -= 1
            else:
                ### 这里计算一下当前left符合条件的可能性应该是right-left个，并且加到总和里。
                res += right - left
                ### 再更新left的指针。
                left += 1
        return res
```
