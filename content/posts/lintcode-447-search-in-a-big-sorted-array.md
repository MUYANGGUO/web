---
title: "LintCode 447 Search In A Big Sorted Array - Medium"
date: "2021-01-01"
excerpt: 447. Search in a Big Sorted Array
kind: leetcode
tags:
  - LintCode
  - Medium
  - Python
order: 447
comments: true
---

### 447. Search In A Big Sorted Array — Medium

[Open on LintCode](https://www.lintcode.com/problem/447/)

## Problem

447. Search in a Big Sorted Array

Given a big sorted array with non-negative integers sorted by non-decreasing order. The array is so big so that you can not get the length of the whole array directly, and you can only access the kth number by ArrayReader.get(k) (or ArrayReader->get(k) for C++).

Find the first index of a target number. Your algorithm should be in O(log k), where k is the first index of the target number.

Return -1, if the number doesn't exist in the array.

Example
Example 1:

Input: [1, 3, 6, 9, 21, ...], target = 3
Output: 1
Example 2:

Input: [1, 3, 6, 9, 21, ...], target = 4
Output: -1

Challenge
O(logn) time, n is the first index of the given target number.

Notice
If you accessed an inaccessible index (outside of the array), ArrayReader.get will return 2,147,483,647.

## Solution

```python
class Solution:
    """
    @param reader: An instance of ArrayReader.
    @param target: An integer
    @return: An integer which is the first index of target.
    """
    def searchBigSortedArray(self, reader, target):
        # write your code here
        if not reader:
            return -1
        
        ###  这题的特点是数组假设无穷大。所以没有确定的右端点。
        ### 那么如何在logK 的时间复杂度找到target呢？
        ### 需要使用倍增法。
        
        ### 倍增
        kth = 1
        while reader.get(kth - 1) < target:
            kth = kth * 2
        
        ### now we found the right side larger than target, kth - 1 as the right
        ### 那么找到left 和 right， 对此区间再进行二分查找就可以了。
        left = kth // 2 - 1
        right = kth - 1
        while left + 1 < right:
            mid = int((left + right) / 2)
            
            if reader.get(mid) == target:
                right = mid
                
            elif reader.get(mid) < target:
                left = mid + 1
            else:
                right = mid - 1
            
        if reader.get(left) == target:
            return left 
        
        if reader.get(right) == target:
            return right
            
        return -1
```
