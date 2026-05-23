---
title: "LeetCode 312 Burst Balloons - Hard"
date: "2021-01-01"
excerpt: "Given n balloons, indexed from 0 to n-1. Each balloon is painted with a number on it represented by array nums. You are asked to burst al…"
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 312
comments: true
---

### 312. Burst Balloons — Hard

[Open on LeetCode](https://leetcode.com/problems/burst-balloons/)

## Problem

Given n balloons, indexed from 0 to n-1. Each balloon is painted with a number on it represented by array nums. You are asked to burst all the balloons. If the you burst balloon i you will get nums[left] * nums[i] * nums[right] coins. Here left and right are adjacent indices of i. After the burst, the left and right then becomes adjacent.

Find the maximum coins you can collect by bursting the balloons wisely.

Note:

You may imagine nums[-1] = nums[n] = 1. They are not real therefore you can not burst them.
0 ≤ n ≤ 500, 0 ≤ nums[i] ≤ 100
Example:

Input: [3,1,5,8]
Output: 167 
Explanation: nums = [3,1,5,8] --> [3,5,8] -->   [3,8]   -->  [8]  --> []
             coins =  3*1*5      +  3*5*8    +  1*3*8      + 1*8*1   = 167


描述
中文
English
有n个气球，编号为0到n-1，每个气球都有一个分数，存在nums数组中。每次吹气球i可以得到的分数为 nums[left] * nums[i] * nums[right]，left和right分别表示i气球相邻的两个气球。当i气球被吹爆后，其左右两气球即为相邻。要求吹爆所有气球，得到最多的分数。

你可以假设nums[-1] = nums[n] = 1。-1和n位置上的气球不真实存在，因此不能吹爆它们。
0 ≤ n ≤ 500, 0 ≤ nums[i] ≤ 100
您在真实的面试中是否遇到过这个题？  
样例
样例 1:

输入：[4, 1, 5, 10]
输出：270
解释：
nums = [4, 1, 5, 10] 吹爆 1, 得分 4 * 1 * 5 = 20
nums = [4, 5, 10]   吹爆 5, 得分 4 * 5 * 10 = 200 
nums = [4, 10]   吹爆 4, 得分 1 * 4 * 10 = 40
nums = [10]   吹爆 10, 得分 1 * 10 * 1 = 10
总得分 20 + 200 + 40 + 10 = 270
样例 2:

输入：[3,1,5]
输出：35
解释：
nums = [3, 1, 5] 吹爆 1, 得分 3 * 1 * 5 = 15
nums = [3, 5] 吹爆 3, 得分 1 * 3 * 5 = 15
nums = [5] 吹爆 5, 得分 1 * 5 * 1 = 5
总得分 15 + 15 + 5  = 35
相关题目

https://www.lintcode.com/problem/burst-balloons/description?_from=ladder&&fromId=91

https://www.lintcode.com/problem/stone-game/description

## Solution

```python
class Solution:
    def maxCoins(self, nums: List[int]) -> int:
                
        ### transfer function
        ### f[i][j] = max_{i < k < j} (f[i][k] + f[j][k] + a[i]*a[k]*a[j])
        n = len(nums)
        if n == 0:
            return 0
        nums = [1] + nums + [1]

        f = [[0] * (n + 2) for _ in range(n + 2)]

        
        for i in range(n + 1, -1, -1):
            for j in range(i + 2, n + 2):
                for k in range(i + 1, j):
                 
                    f[i][j] = max(f[i][j], f[i][k] +  f[k][j] + nums[i] * nums[j] * nums[k])

        return f[0][n + 1]
```
