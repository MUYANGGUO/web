---
title: "LeetCode 759 Employee Free Time - Hard"
date: "2021-01-01"
excerpt: "759. Employee Free Time -- Hard"
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 759
comments: true
---

### 759. Employee Free Time — Hard

[Open on LeetCode](https://leetcode.com/problems/employee-free-time/)

## Problem

759. Employee Free Time -- Hard

We are given a list schedule of employees, which represents the working time for each employee.

Each employee has a list of non-overlapping Intervals, and these intervals are in sorted order.

Return the list of finite intervals representing common, positive-length free time for all employees, also in sorted order.

(Even though we are representing Intervals in the form [x, y], the objects inside are Intervals, not lists or arrays. For example, schedule[0][0].start = 1, schedule[0][0].end = 2, and schedule[0][0][0] is not defined).  Also, we wouldn't include intervals like [5, 5] in our answer, as they have zero length.


Example 1:
Input: schedule = [[[1,2],[5,6]],[[1,3]],[[4,10]]]
Output: [[3,4]]
Explanation: There are a total of three employees, and all common
free time intervals would be [-inf, 1], [3, 4], [10, inf].
We discard any intervals that contain inf as they aren't finite.

Example 2:
Input: schedule = [[[1,3],[6,7]],[[2,4]],[[2,5],[9,12]]]
Output: [[5,6],[7,9]]
 

Constraints:
1 <= schedule.length , schedule[i].length <= 50
0 <= schedule[i].start < schedule[i].end <= 10^8

## Solution

```python
### Use Sort, Merge Interval:

"""
# Definition for an Interval.
class Interval:
    def __init__(self, start: int = None, end: int = None):
        self.start = start
        self.end = end
"""

class Solution:
    def employeeFreeTime(self, schedule: '[[Interval]]') -> '[Interval]':
        # flatten:
        flatten_schedules = []
        for employee_intervals in schedule:
            for employee_interval in employee_intervals:
                flatten_schedules.append([employee_interval.start, employee_interval.end])
        flatten_schedules.sort()
        merged_schedules = self.merge(flatten_schedules)
        
        # find the gap:
        gap = []
        for i in range(len(merged_schedules) - 1):
            start = merged_schedules[i][1]
            end = merged_schedules[i + 1][0]
            gap.append(Interval(start, end))
        
        return gap
        
    
    def merge(self, intervals):
        res = []
        for interval in intervals:
            self.push_back(interval, res)
        return res
    
    def push_back(self, interval, res):
        if not res:
            res.append(interval)
            return
        last_end = res[-1][-1]
        cur_start =  interval[0]
        if cur_start > last_end:
            res.append(interval)
        else:
            res[-1][-1] = max(res[-1][-1], interval[1])
        
        return 

# Use Sweeping Line:
"""
# Definition for an Interval.
class Interval:
    def __init__(self, start: int = None, end: int = None):
        self.start = start
        self.end = end
"""

class Solution:
    def employeeFreeTime(self, schedule: '[[Interval]]') -> '[Interval]':
        # why open = 0, because we want it after sorting, it should be before than close, if two events have same start time
        OPEN, CLOSE = 0, 1
        events = []
        for emp in schedule:
            for iv in emp:
                events.append((iv.start, OPEN))
                events.append((iv.end, CLOSE))

        events.sort()
        ans = []
        prev = None
        bal = 0
        for t, status in events:
            # found gap, when open, and close are equal
            if bal == 0 and prev is not None:
                ans.append(Interval(prev, t))
                
            bal += 1 if status is OPEN else -1
            prev = t

        return ans
```
