---
title: "LintCode 394 Coin In Line - Medium"
date: "2021-01-01"
excerpt: 描述
kind: leetcode
tags:
  - LintCode
  - Medium
  - Python
order: 394
comments: true
---

### 394. Coin In Line — Medium

[Open on LintCode](https://www.lintcode.com/problem/394/)

## Problem

描述

有 n 个硬币排成一条线。两个参赛者轮流从右边依次拿走 1 或 2 个硬币，直到没有硬币为止。拿到最后一枚硬币的人获胜。

请判定 先手玩家 必胜还是必败?

若必胜, 返回 true, 否则返回 false.

您在真实的面试中是否遇到过这个题？  
样例
样例 1:

输入: 1
输出: true
样例 2:

输入: 4
输出: true
解释: 
先手玩家第一轮拿走一个硬币, 此时还剩三个.
这时无论后手玩家拿一个还是两个, 下一次先手玩家都可以把剩下的硬币拿完.
挑战
O(1) 时间复杂度且O(1) 存储。

## Solution

```python
### 博弈型的DP为通解，数学解更巧妙，也要理解。
### 这题的解题思路，就是划出先手对于目前情况的树图，如果下一层有自己为先手必败，那么上一层自己为先手 一定是必胜的，因为可以使得对手在下一句必败。
### 如果下一层全部都是自己为先手必胜，那么显而易见，上一局如果自己是先手，一定是必败的。
### 根据此逻辑从f[0] = False, f[1] = True, 拟推回到f[n] 即可。

class Solution:
    """
    @param n: An integer
    @return: A boolean which equals to true if the first player will win
    """
    def firstWillWin(self, n):
        # write your code here
        if n == 0:
            return False
            
        f = [False] * (n + 1)
        f[0] = False
        f[1] = True
        for i in range(2, n + 1):
            f[i] = f[i - 1] == False or f[i - 2] == False
        
        return f[n]


class Solution:
    """
    @param n: An integer
    @return: A boolean which equals to true if the first player will win
    """
    def firstWillWin(self, n):
        return bool(n % 3)
```
