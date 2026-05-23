---
title: "LeetCode 78 Subsets - Medium"
date: "2021-01-01"
excerpt: 17. Subsets
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 78
comments: true
---

### 78. Subsets — Medium

[Open on LeetCode](https://leetcode.com/problems/subsets/)

## Problem

17. Subsets

Given a set of distinct integers, return all possible subsets.

Example
Example 1:

Input: [0]
Output:
[
  [],
  [0]
]
Example 2:

Input: [1,2,3]
Output:
[
  [3],
  [1],
  [2],
  [1,2,3],
  [1,3],
  [2,3],
  [1,2],
  []
]
Challenge
Can you do it in both recursively and iteratively?

Notice
Elements in a subset must be in non-descending order.
The solution set must not contain duplicate subsets.

## Solution

```python
### 第一种二分搜索树的BFS：

class Solution:
    """
    @param nums: A set of numbers
    @return: A list of lists
    """
    def subsets(self, nums):
        # write your code here
        if not nums:
            return [[]]
        
        queue = [[]]
        index = 0
        while index < len(queue):
            subset = queue[index]
            index += 1
            for num in nums:
                if subset and subset[-1] >= num:
                    continue
                queue.append(subset + [num])
        
        return queue


### 第二种二分搜索树的BFS：

class Solution:
    """
    @param nums: A set of numbers
    @return: A list of lists
    """
    def subsets(self, nums):
        # write your code here
        if not nums:
            return [[]]
        
        queue = [[]]
        for num in sorted(nums):
            for i in range(len(queue)):
                subset = list(queue[i])
                subset.append(num)
                queue.append(subset)
        
        return queue
```
