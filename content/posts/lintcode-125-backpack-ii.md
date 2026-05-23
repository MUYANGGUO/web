---
title: "LintCode 125 Backpack II - Medium"
date: "2021-01-01"
excerpt: 有 n 个物品和一个大小为 m 的背包. 给定数组 A 表示每个物品的大小和数组 V 表示每个物品的价值.
kind: leetcode
tags:
  - LintCode
  - Medium
  - Python
order: 125
comments: true
---

### 125. Backpack II — Medium

[Open on LintCode](https://www.lintcode.com/problem/125/)

## Problem

有 n 个物品和一个大小为 m 的背包. 给定数组 A 表示每个物品的大小和数组 V 表示每个物品的价值.

问最多能装入背包的总价值是多大?

A[i], V[i], n, m 均为整数
你不能将物品进行切分
你所挑选的要装入背包的物品的总大小不能超过 m
每个物品只能取一次
您在真实的面试中是否遇到过这个题？  
样例
样例 1:

输入: m = 10, A = [2, 3, 5, 7], V = [1, 5, 2, 4]
输出: 9
解释: 装入 A[1] 和 A[3] 可以得到最大价值, V[1] + V[3] = 9 
样例 2:

输入: m = 10, A = [2, 3, 8], V = [2, 5, 8]
输出: 10
解释: 装入 A[0] 和 A[2] 可以得到最大价值, V[0] + V[2] = 10
挑战
O(nm) 空间复杂度可以通过, 不过你可以尝试 O(m) 空间复杂度吗?

## Solution

```python
class Solution:
    """
    @param m: An integer m denotes the size of a backpack
    @param A: Given n items with size A[i]
    @param V: Given n items with value V[i]
    @return: The maximum value
    """
    def backPackII(self, m, A, V):
        # write your code here
        n = len(A)
        if n == 0:
            return 0
        
        
        f = [[-1] * (m + 1) for _ in range(n + 1)]
        
        f[0][0] = 0
        
        for i in range(1, n + 1):
            for w in range(m + 1):
                # not picked the last item:
                f[i][w] = f[i - 1][w]
                
                # picked the last item:
                if w >= A[i - 1] and f[i - 1][w - A[i - 1]] != -1:
                    f[i][w] = max(f[i][w],f[i - 1][w - A[i - 1]] + V[i - 1])
                    
        res = 0
        for w in range(m + 1):
            if f[n][w] != -1:
                res = max(res, f[n][w])
                
        return res
```
