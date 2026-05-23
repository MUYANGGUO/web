---
title: "LeetCode 850 Rectangle Area II - Hard"
date: "2021-01-01"
excerpt: "850. Rectangle Area II -- Hard"
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 850
comments: true
---

### 850. Rectangle Area II — Hard

[Open on LeetCode](https://leetcode.com/problems/rectangle-area-ii/)

## Problem

850. Rectangle Area II -- Hard

We are given a list of (axis-aligned) rectangles.  
Each rectangle[i] = [x1, y1, x2, y2] , where (x1, y1) are the coordinates of the bottom-left corner, 
and (x2, y2) are the coordinates of the top-right corner of the ith rectangle.
Find the total area covered by all rectangles in the plane.  
Since the answer may be too large, return it modulo 10^9 + 7.

Example 1:

Input: [[0,0,2,2],[1,0,2,3],[1,0,3,1]]
Output: 6
Explanation: As illustrated in the picture.
Example 2:

Input: [[0,0,1000000000,1000000000]]
Output: 49
Explanation: The answer is 10^18 modulo (10^9 + 7), which is (10^9)^2 = (-7)^2 = 49.
Note:

1 <= rectangles.length <= 200
rectanges[i].length = 4
0 <= rectangles[i][j] <= 10^9
The total area covered by all rectangles will never exceed 2^63 - 1 and thus will fit in a 64-bit signed integer.

## Solution

```python
### 两次扫描线
### LineSweeping 主要是events 的迭代。

class Solution:
    def rectangleArea(self, rectangles: List[List[int]]) -> int:
        
        def getArea(width):
            res = 0
            prev_low = 0
            for low, high in intervals:
                low = max(prev_low, low)
                if high > low:
                    res += (high - low)*width
                    prev_low = high
            return res

        MOD = 10**9 + 7
        # convert list of rectangles to events
        events = []
        for x1, y1, x2, y2 in rectangles:
            events.append((x1, 0, y1, y2)) #in
            events.append((x2, 1, y1, y2)) #out
        events.sort(key = lambda x : (x[0], x[1]))
        
        # sweep to calculate area
        intervals = []
        area = 0
        prev_x = 0
        for event in events:
            cur_x, type, low, high = event
            area += getArea(cur_x - prev_x)
            if type == 1:
                intervals.remove((low, high))
            else:
                intervals.append((low, high))
                intervals.sort()   
            prev_x = cur_x
                
        
        return area % MOD
```
