---
title: "LeetCode 518 Coin Change II - Medium"
date: "2021-01-01"
excerpt: "518. Coin Change 2 -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 518
comments: true
---

### 518. Coin Change II — Medium

[Open on LeetCode](https://leetcode.com/problems/coin-change-ii/)

## Problem

518. Coin Change 2 -- Medium

You are given coins of different denominations and a total amount of money. Write a function to compute the number of combinations that make up that amount. You may assume that you have infinite number of each kind of coin.


Example 1:

Input: amount = 5, coins = [1, 2, 5]
Output: 4
Explanation: there are four ways to make up the amount:
5=5
5=2+2+1
5=2+1+1+1
5=1+1+1+1+1

Example 2:

Input: amount = 3, coins = [2]
Output: 0
Explanation: the amount of 3 cannot be made up just with coins of 2.
Example 3:

Input: amount = 10, coins = [10] 
Output: 1
 

Note:

You can assume that

0 <= amount <= 5000
1 <= coin <= 5000
the number of coins is less than 500
the answer is guaranteed to fit into signed 32-bit integer

## Solution

```python
# DP:
class Solution:
    def change(self, amount: int, coins: List[int]) -> int:
        #O(N x amount)
        dp = [0] * (amount + 1)
        dp[0] = 1 # take 0 amount, only 1 combination 
        #For each amount x, compute the number of combinations: dp[x] += dp[x - coin].
        for i in coins:
            for j in range(i, amount + 1):
                dp[j] += dp[j - i]
        return dp[amount]
```
