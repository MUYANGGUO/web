---
title: "LeetCode 264 Ugly Number II - Medium"
date: "2021-01-01"
excerpt: 264. Ugly Number II
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 264
comments: true
---

### 264. Ugly Number II — Medium

[Open on LeetCode](https://leetcode.com/problems/ugly-number-ii/)

## Problem

264. Ugly Number II

Write a program to find the n-th ugly number.

Ugly numbers are positive numbers whose prime factors only include 2, 3, 5. 

Example:

Input: n = 10
Output: 12
Explanation: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12 is the sequence of the first 10 ugly numbers.
Note:  

1 is typically treated as an ugly number.
n does not exceed 1690.

## Solution

```python
### 次优解 O(NlogN), Heap:


class Solution:
    def nthUglyNumber(self, n):
        heap = [1]
        visited = set([1])
        
        val = None
        for i in range(n):
            val = heapq.heappop(heap)
            for factor in [2, 3, 5]:
                if val * factor not in visited:
                    visited.add(val * factor)
                    heapq.heappush(heap, val * factor)
            
        return val
```
