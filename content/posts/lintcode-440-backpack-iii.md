---
title: "LintCode 440 Backpack III - Medium"
date: "2021-01-01"
excerpt: "给定 n 种物品, 每种物品都有无限个. 第 i 个物品的体积为 A[i], 价值为 V[i]."
kind: leetcode
tags:
  - LintCode
  - Medium
  - Python
order: 440
comments: true
---

### 440. Backpack III — Medium

[Open on LintCode](https://www.lintcode.com/problem/440/)

## Problem

给定 n 种物品, 每种物品都有无限个. 第 i 个物品的体积为 A[i], 价值为 V[i].

再给定一个容量为 m 的背包. 问可以装入背包的最大价值是多少?

不能将一个物品分成小块.
放入背包的物品的总大小不能超过 m.
您在真实的面试中是否遇到过这个题？  
样例
样例 1:

输入: A = [2, 3, 5, 7], V = [1, 5, 2, 4], m = 10
输出: 15
解释: 装入三个物品 1 (A[1] = 3, V[1] = 5), 总价值 15.
样例 2:

输入: A = [1, 2, 3], V = [1, 2, 3], m = 5
输出: 5
解释: 策略不唯一. 比如, 装入五个物品 0 (A[0] = 1, V[0] = 1).

## Solution

```python
### 时间优化了： 从O(nmm) 优化到如下 O(nm), 利用画图（表格）的推演，可以知道如何将重复计算的地方优化。

class Solution:
    """
    @param A: an integer array
    @param V: an integer array
    @param m: An integer
    @return: an array
    """
    def backPackIII(self, A, V, m):
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
                if w >= A[i - 1] and f[i][w - A[i - 1]] != -1:
                    f[i][w] = max(f[i][w],f[i][w - A[i - 1]] + V[i - 1])
                    
        res = 0
        for w in range(m + 1):
            if f[n][w] != -1:
                res = max(res, f[n][w])
                
        return res


### 终极的空间优化：
class Solution:
    """
    @param A: an integer array
    @param V: an integer array
    @param m: An integer
    @return: an array
    """
    def backPackIII(self, A, V, m):
        # write your code here
        n = len(A)
        if n == 0:
            return 0
        
        
        f = [-1] * (m + 1)
        f[0] = 0
        
        for i in range(1, n + 1):
            # 根据此题的依赖关系，应该是从左往右替换数组中的元素。
            for w in range(A[i - 1], m + 1):
                # old: f[w]
                # new: f[w - A[i - 1]]
                if f[w - A[i - 1]] != -1:
                    f[w] = max(f[w],f[w - A[i - 1]] + V[i - 1])
                    
        res = 0
        for w in range(m + 1):
            if f[w] != -1:
                res = max(res, f[w])
                
        return res
```
