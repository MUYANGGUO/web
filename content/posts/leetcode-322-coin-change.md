---
title: "LeetCode 322 Coin Change - Medium"
date: "2021-01-01"
excerpt: ""
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 322
comments: true
---

### 322. Coin Change — Medium

[Open on LeetCode](https://leetcode.com/problems/coin-change/)

## Solution

```python
class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        # DP Problem:
        
        # Initial the DP container, this question is a 1-D DP:
        MAX = float('Inf')
        dp = [MAX for i in range(amount + 1)]
        # this time we need n+1 length container
        
        # Initial condition:
        dp[0] = 0
        
        # transfer function and main loop:
        # transfer function f(x) = min(f(x-coin_1)+1, f(x-coin_2)+1, f(x-coin_3)+1)
        
        for i in range(1, amount + 1):
        
            for coin_i in coins:
                if i >= coin_i and dp[i - coin_i] != MAX:
                    dp[i] = min(dp[i], dp[i - coin_i]+1)
        
        if dp[amount] == MAX:
            return -1
            
        return dp[amount]
```
