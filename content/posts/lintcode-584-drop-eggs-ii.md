---
title: "LintCode 584 Drop Eggs II - Medium"
date: "2021-01-01"
excerpt: 584. Drop Eggs II
kind: leetcode
tags:
  - LintCode
  - Medium
  - Python
order: 584
comments: true
---

### 584. Drop Eggs II — Medium

[Open on LintCode](https://www.lintcode.com/problem/584/)

## Problem

584. Drop Eggs II

There is a building of n floors. If an egg drops from the k th floor or above, it will break. If it's dropped from any floor below, it will not break.

You're given m eggs, Find k while minimize the number of drops for the worst case. Return the number of drops in the worst case.

Example
Example 1:

Input: m = 2, n = 100 
Output: 14
Example 2:

Input: m = 2, n = 36 
Output: 8

## Solution

```python
### DP :


class Solution:
    """
    @param m: the number of eggs
    @param n: the number of floors
    @return: the number of drops in the worst case
    """
    def dropEggs2(self, K, N):
        # write your code here
        # m is egg count, n is the floors
        # let dp[i][j] refer having i egg, j floor, minimum thow times to determine a k in the worst situation
        # suppose at k th floor egg will break:
        # thow at k, if break, then search from 1 to k - 1 floor with the i - 1 eggs
        # else not break: search from k to j with i eggs (because not break before)
        # 以上两种情况涵盖了i个鸡蛋， j层楼，的两种情况，取其中的最大值，就是最坏情况。
        
        # so 1 + max(dp[i - 1][k - 1], dp[i][j - k]) 为可能是dp[i][j]
        
        # 同时我们要保证dp[i][j] 最小，所以 dp[i][j] = min(dp[i][j], 1 + max(dp[i - 1][k - 1], dp[i][j - k]))
        
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
                    mid = (start + end) // 2                   
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



### DP + Binary Search Pruning + Rolling Array :


class Solution:
    """
    @param m: the number of eggs
    @param n: the number of floors
    @return: the number of drops in the worst case
    """
    def dropEggs2(self, m, n):
        # write your code here
        dp = [[float('inf')] * (n + 1) for _ in range(2)]
        for i in range(n + 1):
            dp[0][i] = 0
            dp[1][i] = i
        
        for i in range(2, m + 1):
            dp[i % 2][1] = 1
            dp[i % 2][0] = 0
            
            for j in range(2, n+ 1):
                dp[i % 2][j] = float('inf')
                ### determine the correct f for the drop
                ### binary search find f
                start, end = 1, j
                while start <= end: 
                    mid = (start + end) // 2                   
                    broke = dp[(i - 1) % 2][mid - 1]
                    non_broke = dp[i % 2][j - mid]
                    
                    if broke > non_broke:
                        end = mid - 1
                    else:
                        start = mid + 1
               
                    dp[i % 2][j] = min(dp[i % 2][j], 1 + max(broke, non_broke))
        
        return dp[m % 2][n]
```
