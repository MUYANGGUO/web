---
title: "LintCode 1479 Can Reach The Endpoint - Easy"
date: "2021-01-01"
excerpt: 1479. Can Reach The Endpoint
kind: leetcode
tags:
  - LintCode
  - Easy
  - Python
order: 1479
comments: true
---

### 1479. Can Reach The Endpoint — Easy

[Open on LintCode](https://www.lintcode.com/problem/1479/)

## Problem

1479. Can Reach The Endpoint

Given a map size of m*n, 1 means space, 0 means obstacle, 9 means the endpoint. You start at (0,0) and return whether you can reach the endpoint.

Example
Example1

Input: 
[
	[1,1,1],
	[1,1,1],
	[1,1,9]
]
Output: true
Example2

Input: 
[
	[1,1,1],
	[1,0,0],
	[1,0,9]
]
Output: false

## Solution

```python
import queue as Queue

DIRECTIONS = [(-1, 0), (1, 0), (0, 1), (0, -1)]
SAPCE = 1
OBSTACLE = 0
ENDPOINT = 9

class Solution:
    """
    @param map: the map
    @return: can you reach the endpoint
    """
    def reachEndpoint(self, map):
        # Write your code here
        n, m = len(map), len(map[0])
        if n == 0 or m == 0:
            return False

        queue = Queue.Queue()
        queue.put((0, 0))
        
        while not queue.empty():
            curr = queue.get()
            for i in range(4):
                x = curr[0] + DIRECTIONS[i][0]
                y = curr[1] + DIRECTIONS[i][1]
                if not self.isValid(x, y, map):
                    continue
                if map[x][y] == ENDPOINT:
                    return True
                queue.put((x, y))
                
                ### 并且将走过的1变成
                map[x][y] = OBSTACLE
        
        return False
    
    def isValid(self, x, y, map):
        ### 注意不要
        if x < 0 or x >= len(map) or y < 0 or y >= len(map[0]):
            return False
        if map[x][y] == OBSTACLE:
            return False
        return True
```
