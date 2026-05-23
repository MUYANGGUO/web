---
title: "LeetCode 887 Super Egg Drop - Hard"
date: "2021-01-01"
excerpt: 887. Super Egg Drop
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 887
comments: true
---

### 887. Super Egg Drop — Hard

[Open on LeetCode](https://leetcode.com/problems/super-egg-drop/)

## Problem

887. Super Egg Drop

You are given K eggs, and you have access to a building with N floors from 1 to N. 

Each egg is identical in function, and if an egg breaks, you cannot drop it again.

You know that there exists a floor F with 0 <= F <= N such that any egg dropped at a floor higher than F will break, and any egg dropped at or below floor F will not break.

Each move, you may take an egg (if you have an unbroken one) and drop it from any floor X (with 1 <= X <= N). 

Your goal is to know with certainty what the value of F is.

What is the minimum number of moves that you need to know with certainty what F is, regardless of the initial value of F?

 

Example 1:

Input: K = 1, N = 2
Output: 2
Explanation: 
Drop the egg from floor 1.  If it breaks, we know with certainty that F = 0.
Otherwise, drop the egg from floor 2.  If it breaks, we know with certainty that F = 1.
If it didn't break, then we know with certainty F = 2.
Hence, we needed 2 moves in the worst case to know what F is with certainty.
Example 2:

Input: K = 2, N = 6
Output: 3
Example 3:

Input: K = 3, N = 14
Output: 4

## Solution

```python
### DP + Binary Search Pruning:

class Solution:
    def superEggDrop(self, K: int, N: int) -> int:
        dp = [[float('inf')] * (N + 1) for _ in range(K + 1)]

        for i in range(1, N + 1):
            dp[1][i] = i
            dp[0][i] = 0
                
        for i in range(K + 1):
            dp[i][0] = 0
        
        for i in range(2, K + 1):
            for j in range(1, N + 1):
                ### determine the correct f for the drop
                ### binary search find f
                start, end = 1, j
                while start <= end: 
                    mid = int((start + end) / 2)
                    broke = dp[(i - 1)][mid - 1]
                    non_broke = dp[i][j - mid]
                    
                    if broke > non_broke:
                        end = mid - 1
                    else:
                        start = mid + 1
               
                    dp[i][j] = min(dp[i][j], 1 + max(broke, non_broke))
                
                
                # for f in range(1, j + 1):
                #     dp[i][j] = min(dp[i][j], 1 + max(dp[(i - 1)][f - 1], dp[i][j - f]))
        
        return dp[K][N]





### Maths:

class Solution(object):
    def superEggDrop(self, K, N):
        def f(x):
            ans = 0
            r = 1
            for i in range(1, K+1):
                r *= x-i+1
                r //= i
                ans += r
                if ans >= N: break
            return ans

        lo, hi = 1, N
        while lo < hi:
            mi = (lo + hi) // 2
            if f(mi) < N:
                lo = mi + 1
            else:
                hi = mi
        return lo
```
