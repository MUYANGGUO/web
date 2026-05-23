---
title: "LeetCode 122 Best Time To Buy And Sell Stock II - Easy"
date: "2021-01-01"
excerpt: Say you have an array prices for which the ith element is the price of a given stock on day i.
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 122
comments: true
---

### 122. Best Time To Buy And Sell Stock II — Easy

[Open on LeetCode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/)

## Problem

Say you have an array prices for which the ith element is the price of a given stock on day i.

Design an algorithm to find the maximum profit. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times).

Note: You may not engage in multiple transactions at the same time (i.e., you must sell the stock before you buy again).

Example 1:

Input: [7,1,5,3,6,4]
Output: 7
Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.
             Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.
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
 

Constraints:

1 <= prices.length <= 3 * 10 ^ 4
0 <= prices[i] <= 10 ^ 4

## Solution

```python
### 贪心算法， 此条件下，只要后一天价格涨就此天买后一天卖， 其他情况不操作。 此题目要注意复习greedy的证明。

class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        
        ### Greedy
        if not prices:
            return 0
        n = len(prices)
        if n == 1:
            return 0
        
        profit = 0
        for i in range(n - 1):
            if prices[i + 1] > prices[i]:
                profit += prices[i + 1] - prices[i]
                
        return profit
```
