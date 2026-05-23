---
title: "LintCode 752 Rogue Knight Sven - Medium"
date: "2021-01-01"
excerpt: 752. 流浪剑客斯温
kind: leetcode
tags:
  - LintCode
  - Medium
  - Python
order: 752
comments: true
---

### 752. Rogue Knight Sven — Medium

[Open on LintCode](https://www.lintcode.com/problem/752/)

## Problem

752. 流浪剑客斯温
中文English
在物质位面“现实”中，有n+1个星球，分别为星球0，星球1，……，星球n。

每一个星球都有一个传送门，通过传送门可以直接到达目标星球而不经过其他的星球。

不过传送门有两个缺点。

第一，从星球i通过传送门只能到达编号比i大，且与i的差不超过limit的星球。

第二，通过传送门到达星球j，需要cost[j]个金币。

现在，流浪剑客斯温到达星球0后身上有m个金币，请问他有多少种方法通过传送门到达星球n？

Example
例1:

输入:
n = 1
m = 1, 
limit = 1
cost = [0, 1]
输出:
1
解释:
方案1：星球0→星球1
例2:

输入:
n = 1
m = 1
limit = 1
cost = [0,2]
输出:
0
解释:
无合法方案
Notice
1 <= n <= 50, 0 <= m <= 100, 1 <= limit <= 50, 0 <= cost[i] <= 100。
由于cost[0]没有意义，题目保证cost[0] = 0。

## Solution

```python
class Solution:
    """
    @param n: the max identifier of planet.
    @param m: gold coins that Sven has.
    @param limit: the max difference.
    @param cost: the number of gold coins that reaching the planet j through the portal costs.
    @return: return the number of ways he can reach the planet n through the portal.
    """
    def getNumberOfWays(self, n, m, limit, cost):
        # 综合型DP
        # 最后一步：
        # 从i 跳到n , 需要保证：i + limit >= n
        # f[i] 表示有多少种方式从星球0跳到星球i
        # 从 i 到 n 要花费 cost[n] 的金币， 所以需要知道在i 时有多少金币。
        # 所以要记录下来还剩多少金币。
        # 设f[i][j] 表示有多少种方式0 到星球i， 手里还剩j金币。
        
        # 这题是坐标+状态的综合型动态规划。
        
        # 转移方程：
        
        # f[i][j] = sum_{i - limit <= k < i} (f[k][j + cost[i]] | j + cost[i] <= m)
        
        
        f = [[0] * (m + 1) for _ in range(n + 1)]
        
        ### initialization:
        for i in range(m):
            f[0][i] = 0
        
        f[0][m] = 1
        
        for i in range(1, n + 1):
            for j in range(m + 1):
                # Sven is at planet i, with j coins, After paying cost[i]
                
                f[i][j] = 0
                
                if j + cost[i] > m:
                    continue
                for k in range(i - limit, i):
                    if k < 0:
                        continue
                    f[i][j] += f[k][j + cost[i]]
                    
                    
        res = 0
        for i in range(m + 1):
            res += f[n][i]
            
        return res
                

### 优化的方法：可以用部分和数组 将时间复杂度优化至O(nm):

### 创建一个sum 数组，减少对k的遍历。注意continue的地方要定义在出口之前。
class Solution:
    """
    @param n: the max identifier of planet.
    @param m: gold coins that Sven has.
    @param limit: the max difference.
    @param cost: the number of gold coins that reaching the planet j through the portal costs.
    @return: return the number of ways he can reach the planet n through the portal.
    """
    def getNumberOfWays(self, n, m, limit, cost):

        
        
        f = [[0] * (m + 1) for _ in range(n + 1)]
        sum_array = [[0] * (m + 1) for _ in range(n + 1)]
        
        ### initialization:
        for i in range(m):
            f[0][i] = 0
            sum_array[0][i] = 0
        
        f[0][m] = 1
        sum_array[0][m] = 1
        
        for i in range(1, n + 1):
            for j in range(m + 1):
                # Sven is at planet i, with j coins, After paying cost[i]
                
                f[i][j] = 0
                sum_array[i][j] = sum_array[i - 1][j]
                
                if j + cost[i] > m:
                    continue
                
                f[i][j] = sum_array[i - 1][j + cost[i]]
                
                if i - limit - 1 >= 0: 
                    f[i][j] -= sum_array[i - limit - 1][j + cost[i]]
                    
                sum_array[i][j] += f[i][j] # sum[i][j] = f[0][j] + ... + f[i][j]
                    
        res = 0
        for i in range(m + 1):
            res += f[n][i]
            
        return res
```
