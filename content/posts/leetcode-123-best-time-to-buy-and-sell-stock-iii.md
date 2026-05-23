---
title: "LeetCode 123 Best Time To Buy And Sell Stock III - Hard"
date: "2021-01-01"
excerpt: Say you have an array for which the ith element is the price of a given stock on day i.
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 123
comments: true
---

### 123. Best Time To Buy And Sell Stock III — Hard

[Open on LeetCode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/)

## Problem

Say you have an array for which the ith element is the price of a given stock on day i.

Design an algorithm to find the maximum profit. You may complete at most two transactions.

Note: You may not engage in multiple transactions at the same time (i.e., you must sell the stock before you buy again).

Example 1:

Input: [3,3,5,0,0,3,1,4]
Output: 6
Explanation: Buy on day 4 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
             Then buy on day 7 (price = 1) and sell on day 8 (price = 4), profit = 4-1 = 3.
Example 2:

Input: [1,2,3,4,5]
Output: 4
Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
             Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are
             engaging multiple transactions at the same time. You must sell before buying again.
Example 3:

Input: [7,6,4,3,1]
Output: 0
Explanation: In this case, no transaction is done, i.e. max profit = 0.

## Solution

```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        # write your code here
        ### DP problem
        
        n = len(prices)
        if n == 0:
            return 0
            
        ### divide the N days into 5 phases, see ppt
        MIN = - float('Inf')
        f = [[MIN] * (5 + 1) for _ in range(n + 1)]
        
        f[0][1] = 0
        for i in range(1, n + 1):
        
            ### phase 1, 3, 5 , f[i][j] = max(f[i-1][j], f[i-1][j-1] + prices_i-1 - prices_i-2)
            for j in range(1, 6, 2):
                f[i][j] = f[i - 1][j] # keep state
                
                # sell today
                if j > 1 and i > 1 and f[i - 1][j - 1] != MIN:
                    f[i][j] = max(f[i][j], f[i - 1][j - 1] + prices[i - 1] - prices[i - 2])
                
            ### phase 2, 4 , f[i][j] = max(f[i-1][j] + prices_i-1 - prices_i-2, f[i-1][j-1])
            for j in range(2, 6, 2):
                f[i][j] = f[i - 1][j - 1]
                if i > 1 and f[i - 1][j] != MIN:
                    f[i][j] = max(f[i][j], f[i - 1][j] + prices[i - 1] - prices[i - 2])
                
                
        res = 0
        for j in range(1, 6, 2):
            res = max(res, f[i][j])
        
        return res
```
