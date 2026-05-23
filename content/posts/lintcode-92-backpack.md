---
title: "LintCode 92 Backpack - Medium"
date: "2021-01-01"
excerpt: 描述
kind: leetcode
tags:
  - LintCode
  - Medium
  - Python
order: 92
comments: true
---

### 92. Backpack — Medium

[Open on LintCode](https://www.lintcode.com/problem/92/)

## Problem

描述

在n个物品中挑选若干物品装入背包，最多能装多满？假设背包的大小为m，每个物品的大小为A[i]

你不可以将物品进行切割。

您在真实的面试中是否遇到过这个题？  
样例
样例 1:
	输入:  [3,4,8,5], backpack size=10
	输出:  9

样例 2:
	输入:  [2,3,5,7], backpack size=12
	输出:  12
	
挑战
O(n x m) time and O(m) memory.

O(n x m) memory is also acceptable if you do not know how to optimize memory.


Given n items with size Ai, an integer m denotes the size of a backpack. How full you can fill this backpack?

## Solution

```python
class Solution:
    """
    @param m: An integer m denotes the size of a backpack
    @param A: Given n items with size A[i]
    @return: The maximum size
    """
    def backPack(self, m, A):
        # write your code here
        # Backpack type DP:
        # for n items in A:
        # Lets consider the last step of DP:
        # if last item is not picked, then the previous n - 1 items should try to fill up the size m - A[n - 1]. 
        # if last item is picked, then the all n items should try to fill up the size m. 
        
        # The status:
        # f[i][w] previous i items can or can not have weight w, w = 0, 1 , 2...,m
        n = len(A)
        if n==0:
            return 0
            
        f = [[False] * (m + 1) for _ in range(n + 1)]
        
        f[0][0] = True

        
        for i in range(1, n + 1):
            for w in range(m + 1):
                # case 1: not pick last item
                f[i][w] = f[i - 1][w]
                # case 2: picked last item
                if w >= A[i - 1]:
                    f[i][w] = f[i][w] or f[i - 1][w - A[i - 1]]
        
        
        for i in range(m, -1, -1):
            if f[n][i]:
                return i
        
        return 0
```
