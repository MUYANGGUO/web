---
title: "LeetCode 252 Meeting Rooms - Easy"
date: "2021-01-01"
excerpt: "252. Meeting Rooms -- Easy"
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 252
comments: true
---

### 252. Meeting Rooms — Easy

[Open on LeetCode](https://leetcode.com/problems/meeting-rooms/)

## Problem

252. Meeting Rooms -- Easy

Given an array of meeting time intervals consisting of start and end times [[s1,e1],[s2,e2],...] (si < ei), determine if a person could attend all meetings.

Example 1:
Input: [[0,30],[5,10],[15,20]]
Output: false

Example 2:
Input: [[7,10],[2,4]]
Output: true

## Solution

```python
class Solution:
    def canAttendMeetings(self, intervals: List[List[int]]) -> bool:
        intervals.sort(key=lambda x: x[0])
        for i in range(1, len(intervals)):
            if intervals[i][0] < intervals[i-1][1]:
                return False
        return Trues
```
