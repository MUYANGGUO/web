---
title: "LintCode 685 First Unique Number In Data Stream - Medium"
date: "2021-01-01"
excerpt: 685. First Unique Number in Data Stream
kind: leetcode
tags:
  - LintCode
  - Medium
  - Python
order: 685
comments: true
---

### 685. First Unique Number In Data Stream — Medium

[Open on LintCode](https://www.lintcode.com/problem/685/)

## Problem

685. First Unique Number in Data Stream

Description

Given a continuous stream of data, write a function that returns the first unique number (including the last number) when the terminating number arrives. If the unique number is not found, return -1.

Have you met this question in a real interview?  
Example
Example1

Input: 
[1, 2, 2, 1, 3, 4, 4, 5, 6]
5
Output: 3
Example2

Input: 
[1, 2, 2, 1, 3, 4, 4, 5, 6]
7
Output: -1
Example3

Input: 
[1, 2, 2, 1, 3, 4]
3
Output: 3

## Solution

```python
class Solution:
    """
    @param nums: a continuous stream of numbers
    @param number: a number
    @return: returns the first unique number
    """
    def firstUniqueNumber(self, nums, number):
        # Write your code here
        counter = {}
        for num in nums:
            counter[num] = counter.get(num, 0) + 1
            if num == number:
                break
        else:
            return -1
            
        for num in nums:
            if counter[num] == 1:
                return num
            if num == number:
                break

        return -1
```
