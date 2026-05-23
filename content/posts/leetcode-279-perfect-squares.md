---
title: "LeetCode 279 Perfect Squares - Medium"
date: "2021-01-01"
excerpt: "Given a positive integer n, find the least number of perfect square numbers (for example, 1, 4, 9, 16, ...) which sum to n."
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 279
comments: true
---

### 279. Perfect Squares — Medium

[Open on LeetCode](https://leetcode.com/problems/perfect-squares/)

## Problem

Given a positive integer n, find the least number of perfect square numbers (for example, 1, 4, 9, 16, ...) which sum to n.

Example 1:

Input: n = 12
Output: 3 
Explanation: 12 = 4 + 4 + 4.
Example 2:

Input: n = 13
Output: 2
Explanation: 13 = 4 + 9.

## Solution

```python
#### DP method: 必须掌握

class Solution:
    def numSquares(self, n: int) -> int:
        # 分段问题 DP
        # 划分型动态规划
        # 最后一步： 关注最优策略中最后一个完全平方数 j^2
        MAX = float('Inf')
        f = [MAX for _ in range(n + 1)]

        f[0] = 0
        for i in range(1, n + 1):
            j =1 
            while j * j <= i:
                
                f[i] = min(f[i], f[i - j * j ] + 1)
        
                j += 1
  
        return f[n]


#### 数学方法 四平方和定理：
class Solution:
    def isSquare(self, n: int) -> bool:
        sq = int(math.sqrt(n))
        return sq*sq == n

    def numSquares(self, n: int) -> int:
        # four-square and three-square theorems
        while (n & 3) == 0:
            n >>= 2      # reducing the 4^k factor from number
        if (n & 7) == 7: # mod 8
            return 4

        if self.isSquare(n):
            return 1
        # check if the number can be decomposed into sum of two squares
        for i in range(1, int(n**(0.5)) + 1):
            if self.isSquare(n - i*i):
                return 2
        # bottom case from the three-square theorem
        return 3


### Greedy， or Greedy + BFS 的方法：

# https://community.particle.io/t/calling-https-url-google-docs-from-spark-core-is-it-possible/4825/11
```
