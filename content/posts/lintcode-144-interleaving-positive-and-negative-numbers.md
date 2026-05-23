---
title: "LintCode 144 Interleaving Positive And Negative Numbers - Medium"
date: "2021-01-01"
excerpt: 144. Interleaving Positive and Negative Numbers
kind: leetcode
tags:
  - LintCode
  - Medium
  - Python
order: 144
comments: true
---

### 144. Interleaving Positive And Negative Numbers — Medium

[Open on LintCode](https://www.lintcode.com/problem/144/)

## Problem

144. Interleaving Positive and Negative Numbers

Given an array with positive and negative integers. Re-range it to interleaving with positive and negative integers.

Example
Example 1

Input : [-1, -2, -3, 4, 5, 6]
Outout : [-1, 5, -2, 4, -3, 6]
Explanation :  any other reasonable answer.
Challenge
Do it in-place and without extra memory.

Notice
You are not necessary to keep the original order of positive integers or negative integers.

## Solution

```python
class Solution:
    """
    @param: A: An integer array.
    @return: nothing
    """
    def rerange(self, A):

        pos, neg = 0, 0
        for num in A:
            if num > 0:
                pos += 1
            else:
                neg += 1
                
        ### partition in-place
        self.partition(A, pos > neg)
        
        ### interleave in-place
        self.interleave(A, pos == neg)
            
    def partition(self, A, start_positive):
        ### use flag to arrange the partition
        flag = 1 if start_positive else -1
        left, right = 0, len(A) - 1
        while left <= right:
            while left <= right and A[left] * flag > 0:
                left += 1
            while left <= right and A[right] * flag < 0:
                right -= 1
            if left <= right:
                A[left], A[right] = A[right], A[left]
                left += 1
                right -= 1
    
    def interleave(self, A, has_same_length):
        left, right = 1, len(A) - 1
        ### according the length we need to determine the pointer start position
        
        ### EX:
        ### equal length:
        ### -----+++++
        ###  L      R
        ### -+---+++-+
        ###    L  R
        ### -+-+-+-+-+
        
        if has_same_length:
            right = len(A) - 2
            
        while left < right:
            A[left], A[right] = A[right], A[left]
            left, right = left + 2, right - 2
```
