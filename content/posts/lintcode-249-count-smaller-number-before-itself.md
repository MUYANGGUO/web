---
title: "LintCode 249 Count Smaller Number Before Itself - Hard"
date: "2021-01-01"
excerpt: Description
kind: leetcode
tags:
  - LintCode
  - Hard
  - Python
order: 249
comments: true
---

### 249. Count Smaller Number Before Itself — Hard

[Open on LintCode](https://www.lintcode.com/problem/249/)

## Problem

Description

Give you an integer array (index from 0 to n-1, where n is the size of this array, data value from 0 to 10000) . For each element Ai in the array, count the number of element before this element Ai is smaller than it and return count number array.

Before you do this, we suggest you complete the following three questions: Segment Tree Build， Segment Tree Query II，and Count Of Smaller Number 。

Have you met this question in a real interview?  
Example
Example 1:

Input:
[1,2,7,8,5]
Output:
[0,1,2,3,2]
Example 2:

Input:
[7,8,2,1,3]
Output:
[0,1,0,0,2]

## Solution

```python
class Block:
    def __init__(self):
        self.total = 0
        self.counter = {}
        
        
class BlockArray:
    def __init__(self, max_value):
        self.blocks = [
            Block()
            for _ in range(max_value // 100 + 1)
        ]
    
    def count_smaller(self, value):
        count = 0
        block_index = value // 100
        for i in range(block_index):
            count += self.blocks[i].total
        
        counter = self.blocks[block_index].counter
        for val in counter:
            if val < value:
                count += counter[val]
        return count
        
    def insert(self, value):
        block_index = value // 100
        block = self.blocks[block_index]
        block.total += 1
        block.counter[value] = block.counter.get(value, 0) + 1


class Solution:
    """
    @param A: an integer array
    @return: A list of integers includes the index of the first number and the index of the last number
    """
    def countOfSmallerNumberII(self, A):
        if not A:
            return []

        block_array = BlockArray(10000)
        results = []
        for a in A:
            count = block_array.count_smaller(a)
            results.append(count)
            block_array.insert(a)
        return results
```
