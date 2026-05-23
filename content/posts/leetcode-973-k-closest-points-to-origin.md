---
title: "LeetCode 973 K Closest Points To Origin - Medium"
date: "2021-01-01"
excerpt: "973. K Closest Points to Origin -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 973
comments: true
---

### 973. K Closest Points To Origin — Medium

[Open on LeetCode](https://leetcode.com/problems/k-closest-points-to-origin/)

## Problem

973. K Closest Points to Origin -- Medium

We have a list of points on the plane.  Find the K closest points to the origin (0, 0).

(Here, the distance between two points on a plane is the Euclidean distance.)

You may return the answer in any order.  The answer is guaranteed to be unique (except for the order that it is in.)

Example 1:
Input: points = [[1,3],[-2,2]], K = 1
Output: [[-2,2]]
Explanation: 
The distance between (1, 3) and the origin is sqrt(10).
The distance between (-2, 2) and the origin is sqrt(8).
Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.
We only want the closest K = 1 points from the origin, so the answer is just [[-2,2]].

Example 2:
Input: points = [[3,3],[5,-1],[-2,4]], K = 2
Output: [[3,3],[-2,4]]
(The answer [[-2,4],[3,3]] would also be accepted.)
 

Note:

1 <= K <= points.length <= 10000
-10000 < points[i][0] < 10000
-10000 < points[i][1] < 10000

## Solution

```python
# QuickSelect:
class Solution:
    def kClosest(self, points: List[List[int]], K: int) -> List[List[int]]:
        K = K - 1
        index = self.findK(points, K, 0, len(points) - 1)
        return points[:index + 1]
    
    def findK(self, arr, K, start, end):
        if start >= end:
            return start
        left, right = start, end
        target = arr[(left + right) // 2]
        while left <= right:
            while left <= right and self.smaller(arr[left], target):
                left += 1
            while left <= right and self.smaller(target, arr[right]):
                right -= 1
            if left <= right:
                arr[left], arr[right] = arr[right], arr[left]
                left += 1
                right -= 1
        if K<= right:
            return self.findK(arr, K, start, right)
        if K>= left:
            return self.findK(arr, K, left, end)
        return K
    
    def smaller(self, a1, a2):
        return self.dis(a1) < self.dis(a2)
    
    def dis(self, a):
        return a[0] * a[0] + a[1] * a[1]
```
