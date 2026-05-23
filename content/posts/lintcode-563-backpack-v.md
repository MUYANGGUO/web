---
title: "LintCode 563 Backpack V - Medium"
date: "2021-01-01"
excerpt: 描述
kind: leetcode
tags:
  - LintCode
  - Medium
  - Python
order: 563
comments: true
---

### 563. Backpack V — Medium

[Open on LintCode](https://www.lintcode.com/problem/563/)

## Problem

描述

给出 n 个物品, 以及一个数组, nums[i] 代表第i个物品的大小, 保证大小均为正数, 正整数 target 表示背包的大小, 找到能填满背包的方案数。
每一个物品只能使用一次

您在真实的面试中是否遇到过这个题？  
样例
给出候选物品集合 [1,2,3,3,7] 以及 target 7

结果的集合为:
[7]
[1,3,3]
返回 2

## Solution

```python
### 计数型 背包问题 DP

### DP 1 没有空间优化版本

class Solution:
    """
    @param nums: an integer array and all positive numbers
    @param target: An integer
    @return: An integer
    """
    def backPackV(self, nums, target):
        # write your code here
        n = len(nums)
        if n==0:
            return 0
            
        f = [[0] * (target + 1) for _ in range(n + 1)]
        
        f[0][0] = 1

        
        for i in range(1, n + 1):
            for w in range(target + 1):
                # case 1: not pick last item
                f[i][w] = f[i - 1][w]
                # case 2: picked last item
                if w >= nums[i - 1]:
                    f[i][w] = f[i][w] + f[i - 1][w - nums[i - 1]]
        

        return f[n][target]



### DP 2 ： 1 维数组 终极空间优化版本：


class Solution:
    """
    @param nums: an integer array and all positive numbers
    @param target: An integer
    @return: An integer
    """
    def backPackV(self, nums, target):
        # write your code here
        n = len(nums)
        if n==0:
            return 0
            
        f = [0] * (target + 1)
        
        f[0]= 1

        ### ultimate optimization ---
        for i in range(1, n + 1):
            
            ### actually w lower case can just be nums[i - 1]
            for w in range(target, nums[i - 1] - 1, -1):
                # if w >= nums[i - 1]:
                    ## 1-D array replacement for f[w] space optimization
                f[w] += f[w - nums[i - 1]]
        ### ultimate optimization  ---

        ### regular optimization ---
        # for i in range(1, n + 1):      
        #     for w in range(target, -1, -1):
        #         if w >= nums[i - 1]:
        #             f[w] = f[w] + f[w - nums[i - 1]]
        ### regular optimization ---

        


        return f[target]
```
