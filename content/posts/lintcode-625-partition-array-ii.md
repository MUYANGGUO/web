---
title: "LintCode 625 Partition Array II - Medium"
date: "2021-01-01"
excerpt: 625. Partition Array II
kind: leetcode
tags:
  - LintCode
  - Medium
  - Python
order: 625
comments: true
---

### 625. Partition Array II — Medium

[Open on LintCode](https://www.lintcode.com/problem/625/)

## Problem

625. Partition Array II

Partition an unsorted integer array into three parts:

    The front part < low
    The middle part >= low & <= high
    The tail part > high
    Return any of the possible solutions.

Example
Example 1:

Input:
[4,3,4,1,2,3,1,2]
2
3
Output:
[1,1,2,3,2,3,4,4]
Explanation:
[1,1,2,2,3,3,4,4] is also a correct answer, but [1,2,1,2,3,3,4,4] is not
Example 2:

Input:
[3,2,1]
2
3
Output:
[1,2,3]

Challenge
Do it in place.
Do it in one pass (one loop).

Notice
low <= high in all testcases.

## Solution

```python
### 三指针 One Pass 解：

class Solution:
    """
    @param nums: an integer array
    @param low: An integer
    @param high: An integer
    @return: nothing
    """
    def partition2(self, nums, low, high):
        # write your code here
        """
        Do not return anything, modify nums in-place instead.
        """
        ### one pass three pointers
        # for all idx < plow : nums[idx < plow] < low
        # curr is an index of element under consideration
        plow = curr = 0
        # for all idx > phigh : nums[idx > phigh] > high
        phigh = len(nums) - 1

        while curr <= phigh:
            if nums[curr] < low:
                nums[plow], nums[curr] = nums[curr], nums[plow]
                plow += 1
                curr += 1
            elif nums[curr] > high:
                nums[curr], nums[phigh] = nums[phigh], nums[curr]
                phigh -= 1
            else:
                curr += 1
```
