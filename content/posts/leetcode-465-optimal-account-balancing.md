---
title: "LeetCode 465 Optimal Account Balancing - Hard"
date: "2021-01-01"
excerpt: "465. Optimal Account Balancing -- Hard"
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 465
comments: true
---

### 465. Optimal Account Balancing — Hard

[Open on LeetCode](https://leetcode.com/problems/optimal-account-balancing/)

## Problem

465. Optimal Account Balancing -- Hard

A group of friends went on holiday and sometimes lent each other money. For example, Alice paid for Bill's lunch for $10. Then later Chris gave Alice $5 for a taxi ride. We can model each transaction as a tuple (x, y, z) which means person x gave person y $z. Assuming Alice, Bill, and Chris are person 0, 1, and 2 respectively (0, 1, 2 are the person's ID), the transactions can be represented as [[0, 1, 10], [2, 0, 5]].

Given a list of transactions between a group of people, return the minimum number of transactions required to settle the debt.

Note:

A transaction will be given as a tuple (x, y, z). Note that x ≠ y and z > 0.
Person's IDs may not be linear, e.g. we could have the persons 0, 1, 2 or we could also have the persons 0, 2, 6.

Example 1:

Input:
[[0,1,10], [2,0,5]]

Output:
2

Explanation:
Person #0 gave person #1 $10.
Person #2 gave person #0 $5.

Two transactions are needed. One way to settle the debt is person #1 pays person #0 and #2 $5 each.

Example 2:

Input:
[[0,1,10], [1,0,1], [1,2,5], [2,0,5]]

Output:
1

Explanation:
Person #0 gave person #1 $10.
Person #1 gave person #0 $1.
Person #1 gave person #2 $5.
Person #2 gave person #0 $5.

Therefore, person #1 only need to give person #0 $4, and all debt is settled.

## Solution

```python
class Solution:
    def minTransfers(self, transactions: List[List[int]]) -> int:
        debt = {}
        account = []
        len = 0
        for t in transactions:
            debt[t[0]] = debt.get(t[0],0) - t[2]
            debt[t[1]] = debt.get(t[1],0) + t[2]
        for v in debt.values(): #去除收支平衡的人
            if v != 0:
                account.append(v)
                len = len + 1
        if len == 0:
            return 0
        dp = [float('inf') for x in range(0 , 1<<len)]#枚举每个组合子集，initial是inf
        for i in range(1 , 1<<len):
            sum = 0
            count = 0
            for j in range(0 , len):
                if ((1<<j) & i) != 0: #如果这个子集包含j
                    sum = sum + account[j]
                    count = count + 1
            if sum == 0: # 找到了可能settle的子问题
                dp[i] = count - 1 #除去自身，平衡最大交易数
                for j in range(1, i):# 枚举子问题的组合 bitwise 子集在i里
                    if (i & j) == j and dp[j] + dp[i - j] < dp[i]:
                        dp[i] = dp[j] + dp[i - j]
        return dp[(1<<len) - 1]
```
