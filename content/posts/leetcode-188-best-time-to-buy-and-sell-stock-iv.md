---
title: "LeetCode 188 Best Time To Buy And Sell Stock IV - Hard"
date: "2021-01-01"
excerpt: "Say you have an array for which the i-th element is the price of a given stock on day i."
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 188
comments: true
---

### 188. Best Time To Buy And Sell Stock IV — Hard

[Open on LeetCode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/)

## Problem

Say you have an array for which the i-th element is the price of a given stock on day i.

Design an algorithm to find the maximum profit. You may complete at most k transactions.

Note:
You may not engage in multiple transactions at the same time (ie, you must sell the stock before you buy again).

Example 1:

Input: [2,4,1], k = 2
Output: 2
Explanation: Buy on day 1 (price = 2) and sell on day 2 (price = 4), profit = 4-2 = 2.
Example 2:

Input: [3,2,6,5,0,3], k = 2
Output: 7
Explanation: Buy on day 2 (price = 2) and sell on day 3 (price = 6), profit = 6-2 = 4.
             Then buy on day 5 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.

## Solution

```python
class Solution:
    def maxProfit(self, K: int, prices: List[int]) -> int:
        # write your code here
        if not prices or len(prices) <= 1:
            return 0
        
        # tricky solution in case of K >= m // 2
        m = len(prices)
        if K >= m // 2:
            res = self.unlimited_buy_sell(prices)
            return res
        
        res = [[0 for _ in range(2 * K + 1)] for _ in range(m + 1)]
        # initialize
        for i in range(1, 2 * K + 1):
            res[0][i] = -sys.maxsize
        
        # according to different stages -> solve
        for i in range(1, m + 1):
            for j in range(1, 2 * K + 1):
                if j % 2:
                    res[i][j] = res[i - 1][j - 1]
                    if i >= 2:
                        res[i][j] = max(res[i][j], res[i - 1][j] + prices[i - 1] - prices[i - 2])
                else:
                    res[i][j] = res[i - 1][j]
                    if i >= 2:
                        res[i][j] = max(res[i][j], res[i - 1][j - 1] + prices[i - 1] - prices[i - 2])
        
        # return the max in stages 0,2,4 ...
        max_res = 0
        for i in range(0, 2 * K + 1, 2):
            max_res = max(max_res, res[m][i])
        
        return max_res
    
    def unlimited_buy_sell(self, prices):
        profit = 0
        
        for i in range(1, len(prices)):
            if prices[i] > prices[i - 1]:
                profit += prices[i] - prices[i - 1]
        
        return profit


### Soluton 2 :

class Solution:
    def maxProfit(self, k: int, prices: List[int]) -> int:
        # write your code here
        n = len(prices)
        if n == 0 or k == 0:
            return 0
            
        
        ### if K > n / 2 其实等于买卖股票II，任意多次数。
        if k >  n / 2:
            res = 0
            for i in range(n - 1):
                if prices[i + 1] - prices[i] > 0:
                    res += prices[i + 1] - prices[i]
            return res
            
        ### divide the N days into 5 phases, see ppt
        MIN = - float('Inf')
        f = [[0] * (2 * k + 1 + 1 ) for _ in range(n + 1)]
        
        now = 0
        old = 0
        for i in range(1, 2 * k + 2, k):
            f[0][k] = MIN
        f[0][1] = 0
        for i in range(1, n + 1):
            old = now
            now = 1 - now
            ### phase 1, 3, 5
            for j in range(1, 2 * k + 1 + 1, 2):
                f[now][j] = f[old][j]
                if j > 1 and i > 1 and f[old][j - 1] != MIN:
                    f[now][j] = max(f[now][j], f[old][j - 1] + prices[i - 1] - prices[i - 2])
                
            ### phase 2, 4
            for j in range(2, 2 * k + 1 + 1, 2):
                f[now][j] = f[old][j - 1]
                if i > 1 and f[old][j] != MIN:
                    f[now][j] = max(f[now][j], f[old][j] + prices[i - 1] - prices[i - 2])
                
                
        res = 0
        for j in range(1, 2 * k + 1 + 1, 2):
            res = max(res, f[now][j])
        
        return res
```
