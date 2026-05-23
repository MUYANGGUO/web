---
title: "LintCode 612 K Closest Points - Medium"
date: "2021-01-01"
excerpt: 612. K Closest Points
kind: leetcode
tags:
  - LintCode
  - Medium
  - Python
order: 612
comments: true
---

### 612. K Closest Points — Medium

[Open on LintCode](https://www.lintcode.com/problem/612/)

## Problem

612. K Closest Points

Given some points and an origin point in two-dimensional space, find k points which are nearest to the origin.
Return these points sorted by distance, if they are same in distance, sorted by the x-axis, and if they are same in the x-axis, sorted by y-axis.

Example
Example 1:

Input: points = [[4,6],[4,7],[4,4],[2,5],[1,1]], origin = [0, 0], k = 3 
Output: [[1,1],[2,5],[4,4]]
Example 2:

Input: points = [[0,0],[0,9]], origin = [3, 1], k = 1
Output: [[0,0]]

## Solution

```python
### 利用堆的解法：

"""
Definition for a point.
class Point:
    def __init__(self, a=0, b=0):
        self.x = a
        self.y = b
"""
import heapq

class Solution:
    """
    @param points: a list of points
    @param origin: a point
    @param k: An integer
    @return: the k closest points
    """
    def kClosest(self, points, origin, k):
        # write your code here
        heap = []
        for point in points:
            dist = self.getDistance(point, origin)
            ### 此处取负值，并且用最小堆maintain，堆顶其实对应的就是实际的最大值，这样我们其实用最大堆的概念，不断踢出堆顶，保留的都是小的。
            heapq.heappush(heap, (-dist, -point.x, -point.y))
            ### 如果长度超出k，就把堆顶的“最大”踢出
            if len(heap) > k:
                heapq.heappop(heap)
        ### 剩下的heap就是最近的k个距离和点
        ret = []
        while len(heap) > 0:
            ### pop 出来取负回去以后仍然是最大的数，所以最后ret要reverse
            _, x, y = heapq.heappop(heap)
            ret.append(Point(-x, -y))

        ret.reverse()
        return ret

    def getDistance(self, a, b):
        return (a.x - b.x) ** 2 + (a.y - b.y) **
```
