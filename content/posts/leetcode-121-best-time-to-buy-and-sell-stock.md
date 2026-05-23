---
title: "LeetCode 121 Best Time To Buy And Sell Stock - Easy"
date: "2021-01-01"
excerpt: Say you have an array for which the ith element is the price of a given stock on day i.
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 121
comments: true
---

### 121. Best Time To Buy And Sell Stock — Easy

[Open on LeetCode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)

## Problem

Say you have an array for which the ith element is the price of a given stock on day i.

If you were only permitted to complete at most one transaction (i.e., buy one and sell one share of the stock), design an algorithm to find the maximum profit.

Note that you cannot sell a stock before you buy one.

Example 1:

Input: [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
             Not 7-1 = 6, as selling price needs to be larger than buying price.
Example 2:

Input: [7,6,4,3,1]
Output: 0
Explanation: In this case, no transaction is done, i.e. max profit = 0.

## Solution

```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        if not prices:
            return 0
        n = len(prices)
        if n == 1:
            return 0
        minimum = prices[0]
        profit = 0
        for i in range(1, n):
            profit = max(prices[i] - minimum, profit)
            minimum = min(minimum, prices[i])
        
        return profit
```
