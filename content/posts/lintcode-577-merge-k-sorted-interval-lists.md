---
title: "LintCode 577 Merge K Sorted Interval Lists - Medium"
date: "2021-01-01"
excerpt: 577. Merge K Sorted Interval Lists
kind: leetcode
tags:
  - LintCode
  - Medium
  - Python
order: 577
comments: true
---

### 577. Merge K Sorted Interval Lists — Medium

[Open on LintCode](https://www.lintcode.com/problem/577/)

## Problem

577. Merge K Sorted Interval Lists

Description

Merge K sorted interval lists into one sorted interval list. You need to merge overlapping intervals too.

Have you met this question in a real interview?  
Example
Example1

Input: [
  [(1,3),(4,7),(6,8)],
  [(1,2),(9,10)]
]
Output: [(1,3),(4,8),(9,10)]
Example2

Input: [
  [(1,2),(5,6)],
  [(3,4),(7,8)]
]
Output: [(1,2),(3,4),(5,6),(7,8)]

## Solution

```python
### Heap :
"""
Definition of Interval.
class Interval(object):
    def __init__(self, start, end):
        self.start = start
        self.end = end
"""
import heapq


class Solution:
    """
    @param intervals: the given k sorted interval lists
    @return:  the new sorted interval list
    """
    def mergeKSortedIntervalLists(self, intervals):
        result = []
        heap = []
        for index, array in enumerate(intervals):
            if len(array) == 0:
                continue
            heapq.heappush(heap, (array[0].start, array[0].end, index, 0))
             
        while len(heap):
            start, end, x, y = heap[0]
            heapq.heappop(heap)
            self.append_and_merge(result, Interval(start, end))
            if y + 1 < len(intervals[x]):
                heapq.heappush(heap, (intervals[x][y + 1].start, intervals[x][y + 1].end, x, y + 1))
            
        return result
        
    def append_and_merge(self, intervals, interval):
        if not intervals:
            intervals.append(interval)
            return
        
        last_interval = intervals[-1]
        if last_interval.end < interval.start:
            intervals.append(interval)
            return
        
        last_interval.end = max(last_interval.end, interval.end)

### Sorting :

class Solution:
    """
    @param intervals: the given k sorted interval lists
    @return:  the new sorted interval list
    """
    def mergeKSortedIntervalLists(self, intervals):
        # write your code here
        arr = []
        for i in intervals:
            for j in i:
                arr.append(j)
        arr = sorted(arr, key=lambda o: o.start)
        ans = []
        if (len(arr) == 0) :
            return ans 
        ans.append(arr[0])
        for i in range(1, len(arr)):
            if (ans[len(ans) - 1].end >= arr[i].start):
                ans[len(ans) - 1].end = max(ans[len(ans) - 1].end, arr[i].end)
            else :
                ans.append(arr[i])
        return ans
```
