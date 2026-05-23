---
title: "LintCode 545 Top K Largest Numbers II - Medium"
date: "2021-01-01"
excerpt: 545. Top k Largest Numbers II
kind: leetcode
tags:
  - LintCode
  - Medium
  - Python
order: 545
comments: true
---

### 545. Top K Largest Numbers II — Medium

[Open on LintCode](https://www.lintcode.com/problem/545/)

## Problem

545. Top k Largest Numbers II

Implement a data structure, provide two interfaces:

add(number). Add a new number in the data structure.
topk(). Return the top k largest numbers in this data structure. k is given when we create the data structure.
Example
Example1

Input: 
s = new Solution(3);
s.add(3)
s.add(10)
s.topk()
s.add(1000)
s.add(-99)
s.topk()
s.add(4)
s.topk()
s.add(100)
s.topk()
		
Output: 
[10, 3]
[1000, 10, 3]
[1000, 10, 4]
[1000, 100, 10]

Explanation:
s = new Solution(3);
>> create a new data structure, and k = 3.
s.add(3)
s.add(10)
s.topk()
>> return [10, 3]
s.add(1000)
s.add(-99)
s.topk()
>> return [1000, 10, 3]
s.add(4)
s.topk()
>> return [1000, 10, 4]
s.add(100)
s.topk()
>> return [1000, 100, 10]
Example2

Input: 
s = new Solution(1);
s.add(3)
s.add(10)
s.topk()
s.topk()

Output: 
[10]
[10]

Explanation:
s = new Solution(1);
>> create a new data structure, and k = 1.
s.add(3)
s.add(10)
s.topk()
>> return [10]
s.topk()
>> return [10]

## Solution

```python
### 利用最小堆maintain（不断踢出最小数），求最大K数：

import heapq

class Solution:
    """
    @param: k: An integer
    """
    def __init__(self, k):
        self.k = k
        self.heap = []
        
    # @param {int} num an integer
    def add(self, num):
        heapq.heappush(self.heap, num)
        if len(self.heap) > self.k:
            heapq.heappop(self.heap)

    # @return {int[]} the top k largest numbers in array
    def topk(self):
        return sorted(self.heap, reverse=True)
```
