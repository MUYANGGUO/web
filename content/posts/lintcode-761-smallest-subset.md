---
title: "LintCode 761 Smallest Subset - Medium"
date: "2021-01-01"
excerpt: 761. Smallest Subset
kind: leetcode
tags:
  - LintCode
  - Medium
  - Python
order: 761
comments: true
---

### 761. Smallest Subset — Medium

[Open on LintCode](https://www.lintcode.com/problem/761/)

## Problem

761. Smallest Subset
中文English
Given an array of non-negative integers. Our task is to find minimum number of elements such that their sum should be greater than the sum of rest of the elements of the array.

Example
Example 1:

Input: nums = [3, 1, 7, 1], 
Output: 1
Example 2:

Input: nums = [2, 1, 2], 
Output: 2

## Solution

```python
### 第一种解法：利用排序，从大到小直到大于数组总和的一半：

class Solution:
    """
    @param arr:  an array of non-negative integers
    @return: minimum number of elements
    """
    def minElements(self, arr):
        # write your code here
        n = len(arr)
        totalsum = sum(arr)
        halfsum = int(totalsum / 2)
        
        arr.sort(reverse = True)
        res = 0
        curr_sum = 0
        for i in range(n):
            curr_sum += arr[i]
            res += 1
            if curr_sum > halfsum:
                return res
        
        return res

### 第二种解法，通过找子集，BFS， Binary Tree, 找到和大于数组总数和一半的子集即可。因为子集的找法是从空集慢慢增加元素个数，所以第一个返回的一定是符合条件的最短的子集
class Solution:
    """
    @param arr:  an array of non-negative integers
    @return: minimum number of elements
    """
    def minElements(self, arr):
        # write your code here
        n = len(arr)
        totalsum = sum(arr)
        halfsum = int(totalsum / 2)
        
        queue = [[]]
        index = 0
        while index < len(queue):
            subset = queue[index]
            curr_sum = sum(subset)
            index += 1
            if curr_sum > halfsum:
                return len(subset)
            for num in arr:
                if subset and subset[-1] >= num:
                    continue
                queue.append(subset + [num])
        return 0
```
