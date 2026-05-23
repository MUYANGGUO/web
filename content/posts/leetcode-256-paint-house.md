---
title: "LeetCode 256 Paint House - Easy"
date: "2021-01-01"
excerpt: "There are a row of n houses, each house can be painted with one of the three colors: red, blue or green. The cost of painting each house …"
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 256
comments: true
---

### 256. Paint House — Easy

[Open on LeetCode](https://leetcode.com/problems/paint-house/)

## Problem

There are a row of n houses, each house can be painted with one of the three colors: red, blue or green. The cost of painting each house with a certain color is different. You have to paint all the houses such that no two adjacent houses have the same color.

The cost of painting each house with a certain color is represented by a n x 3 cost matrix. For example, costs[0][0] is the cost of painting house 0 with color red; costs[1][2] is the cost of painting house 1 with color green, and so on... Find the minimum cost to paint all houses.

Note:
All costs are positive integers.

Example:

Input: [[17,2,17],[16,16,5],[14,3,19]]
Output: 10
Explanation: Paint house 0 into blue, paint house 1 into green, paint house 2 into blue. 
             Minimum cost: 2 + 5 + 3 = 10.

## Solution

```python
class Solution:
    def minCost(self, costs: List[List[int]]) -> int:
        ### DP problem
        ### 最后一个房子的颜色只有三种可能
        ### 用f来记录之前此房子为此颜色的最小cost（与其他两种颜色的cost相比,取min）。
        n = len(costs)
        if n == 0:
            return 0
        MAX= float("Inf")
        f = [[MAX] * 3 for _ in range(n+1)]
        f[0][0] = f[0][1] = f[0][2] = 0
     
        for i in range(1, n+1):
            f[i][0] = min(f[i-1][1] + costs[i-1][1], f[i-1][2] + costs[i-1][2])
            f[i][1] = min(f[i-1][2] + costs[i-1][2], f[i-1][0] + costs[i-1][0])
            f[i][2] = min(f[i-1][0] + costs[i-1][0], f[i-1][1] + costs[i-1][1])
            
        return min(f[n])
```
