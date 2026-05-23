---
title: "LeetCode 265 Paint House II - Hard"
date: "2021-01-01"
excerpt: "There are a row of n houses, each house can be painted with one of the k colors. The cost of painting each house with a certain color is …"
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 265
comments: true
---

### 265. Paint House II — Hard

[Open on LeetCode](https://leetcode.com/problems/paint-house-ii/)

## Problem

There are a row of n houses, each house can be painted with one of the k colors. The cost of painting each house with a certain color is different. You have to paint all the houses such that no two adjacent houses have the same color.

The cost of painting each house with a certain color is represented by a n x k cost matrix. For example, costs[0][0] is the cost of painting house 0 with color 0; costs[1][2] is the cost of painting house 1 with color 2, and so on... Find the minimum cost to paint all houses.

Note:
All costs are positive integers.

Example:

Input: [[1,5,3],[2,9,4]]
Output: 5
Explanation: Paint house 0 into color 0, paint house 1 into color 2. Minimum cost: 1 + 4 = 5; 
             Or paint house 0 into color 2, paint house 1 into color 0. Minimum cost: 3 + 2 = 5. 
Follow up:
Could you solve it in O(nk) runtime?

## Solution

```python
### The main strategy is the same to Paint House I problem. However, we need to optimize to O(NK), instead of comparing all the previous possible colors to find the minimum, we can first find the previous colors minimum and 2nd minimum, record these two values for the other current color iterations to use.
### In this way, we can reduce the Time complexity from O(NK^2) to O(NK).

class Solution:
    def minCostII(self, costs: List[List[int]]) -> int:
        
        if not costs:
            return 0
        n = len(costs)
        k = len(costs[0])
        
        if n == 0 or k == 0:
            return 0
        
        ### DP problem with time optimization:
        
        f = [[0] * k for _ in range(n + 1)]
        
        ### first i houses, 0, ... , i-1
        for i in range(1, n + 1):
            # find minimum and the 2nd minimum among f[i-1][0], f[i-1][1], ... , f[i-1][k-1]
            
            a = b = -1
            for t in range(k):
                if (a == -1 or f[i - 1][t] < f[i - 1][a]):
                    b = a # old minimum becomes now the 2nd minimum
                    a = t # new minimum is f[i-1][k]
                else:
                    if (b == -1 or f[i - 1][t] < f[i - 1][b]):
                        b = t
            
            for j in range(k):
                if j != a:
                    # remove an element which is NOT the minimum
                    f[i][j] = f[i - 1][a] + costs[i - 1][j]
                    
                else:
                    # remove an element which IS the minimum
                    f[i][j] = f[i - 1][b] + costs[i - 1][j]
                    
        res = float('Inf')
        for j in range(k):
            res = min(res, f[n][j])
            
        
        
        return res
```
