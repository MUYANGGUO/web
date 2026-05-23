---
title: "LeetCode 1274 Number Of Ships In A Rectangle - Hard"
date: "2021-01-01"
excerpt: "1274. Number of Ships in a Rectangle -- Hard"
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 1274
comments: true
---

### 1274. Number Of Ships In A Rectangle — Hard

[Open on LeetCode](https://leetcode.com/problems/number-of-ships-in-a-rectangle/)

## Problem

1274. Number of Ships in a Rectangle -- Hard

(This problem is an interactive problem.)

On the sea represented by a cartesian plane, each ship is located at an integer point, and each integer point may contain at most 1 ship.

You have a function Sea.hasShips(topRight, bottomLeft) which takes two points as arguments and returns true if and only if there is at least one ship in the rectangle represented by the two points, including on the boundary.

Given two points, which are the top right and bottom left corners of a rectangle, return the number of ships present in that rectangle.  It is guaranteed that there are at most 10 ships in that rectangle.

Submissions making more than 400 calls to hasShips will be judged Wrong Answer.  Also, any solutions that attempt to circumvent the judge will result in disqualification.

Example :
Input: 
ships = [[1,1],[2,2],[3,3],[5,5]], topRight = [4,4], bottomLeft = [0,0]
Output: 3
Explanation: From [0,0] to [4,4] we can count 3 ships within the range.
 
Constraints:
On the input ships is only given to initialize the map internally. You must solve this problem "blindfolded". In other words, you must find the answer using the given hasShips API, without knowing the ships position.
0 <= bottomLeft[0] <= topRight[0] <= 1000
0 <= bottomLeft[1] <= topRight[1] <= 1000

## Solution

```python
# """
# This is Sea's API interface.
# You should not implement it, or speculate about its implementation
# """
#class Sea(object):
#    def hasShips(self, topRight: 'Point', bottomLeft: 'Point') -> bool:
#
#class Point(object):
#	def __init__(self, x: int, y: int):
#		self.x = x
#		self.y = y

class Solution(object):
    def countShips(self, sea: 'Sea', topRight: 'Point', bottomLeft: 'Point') -> int:
        x2 = bottomLeft.x
        y2 = bottomLeft.y
        x1 = topRight.x
        y1 = topRight.y
        if x1 < x2 or y1 < y2:
            return 0
        if not sea.hasShips(topRight, bottomLeft):
            return 0
        if x1 == x2 and y1 == y2:
            return 1
        midx = int((x1 + x2) / 2)
        midy = int((y1 + y2) / 2)
        a = self.countShips(sea, Point(midx, midy), Point(x2,y2))
        b = self.countShips(sea, Point(x1, midy), Point(midx + 1, y2))
        c = self.countShips(sea, Point(midx, y1), Point(x2, midy + 1))
        d = self.countShips(sea, Point(x1, y1), Point(midx + 1, midy + 1))
        return a + b + c + d
```
