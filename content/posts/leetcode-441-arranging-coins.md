---
title: "LeetCode 441 Arranging Coins - Easy"
date: "2021-01-01"
excerpt: "441. Arranging Coins -- Easy"
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 441
comments: true
---

### 441. Arranging Coins — Easy

[Open on LeetCode](https://leetcode.com/problems/arranging-coins/)

## Problem

441. Arranging Coins -- Easy

You have a total of n coins that you want to form in a staircase shape, where every k-th row must have exactly k coins.

Given n, find the total number of full staircase rows that can be formed.

n is a non-negative integer and fits within the range of a 32-bit signed integer.

Example 1:
n = 5
The coins can form the following rows:
¤
¤ ¤
¤ ¤
Because the 3rd row is incomplete, we return 2.

Example 2:
n = 8
The coins can form the following rows:
¤
¤ ¤
¤ ¤ ¤
¤ ¤
Because the 4th row is incomplete, we return 3.

## Solution

```python
class Solution:
    def arrangeCoins(self, n: int) -> int:
        left, right = 0, n
        while left + 1 < right:
            mid = int((left + right)/2)
            mid_val = mid * (mid + 1) // 2
            if mid_val == n:
                return mid
            elif mid_val < n:
                left = mid
            else:
                right = mid
                
        if right * (right + 1) // 2 <= n:
            return right
        if left * (left + 1) // 2 <= n:
            return left
```
