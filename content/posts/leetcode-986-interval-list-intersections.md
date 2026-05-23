---
title: "LeetCode 986 Interval List Intersections - Medium"
date: "2021-01-01"
excerpt: 986. Interval List Intersections
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 986
comments: true
---

### 986. Interval List Intersections — Medium

[Open on LeetCode](https://leetcode.com/problems/interval-list-intersections/)

## Problem

986. Interval List Intersections

Given two lists of closed intervals, each list of intervals is pairwise disjoint and in sorted order.

Return the intersection of these two interval lists.

(Formally, a closed interval [a, b] (with a <= b) denotes the set of real numbers x with a <= x <= b.  The intersection of two closed intervals is a set of real numbers that is either empty, or can be represented as a closed interval.  For example, the intersection of [1, 3] and [2, 4] is [2, 3].)

Example 1:

Input: A = [[0,2],[5,10],[13,23],[24,25]], B = [[1,5],[8,12],[15,24],[25,26]]
Output: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]
 
Note:

0 <= A.length < 1000
0 <= B.length < 1000
0 <= A[i].start, A[i].end, B[i].start, B[i].end < 10^9

## Solution

```python
class Solution:
    def intervalIntersection(self, A: List[List[int]], B: List[List[int]]) -> List[List[int]]:
        res = []
        curr_A = 0
        curr_B = 0
        while curr_A < len(A) and curr_B < len(B):
            ### 对起点求max，对终点求min，来判断是否有交集
            low = max(A[curr_A][0], B[curr_B][0])
            high = min(A[curr_A][1], B[curr_B][1])
            ### 存在交集的条件：
            if low <= high:
                res.append([low, high])
            # Remove the interval with the smallest endpoint
            if A[curr_A][1] < B[curr_B][1]:
                curr_A += 1
            else:
                curr_B += 1
        return res
```
