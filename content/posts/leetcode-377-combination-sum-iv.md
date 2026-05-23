---
title: "LeetCode 377 Combination Sum IV - Medium"
date: "2021-01-01"
excerpt: "Given an integer array with all positive numbers and no duplicates, find the number of possible combinations that add up to a positive in…"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 377
comments: true
---

### 377. Combination Sum IV — Medium

[Open on LeetCode](https://leetcode.com/problems/combination-sum-iv/)

## Problem

Given an integer array with all positive numbers and no duplicates, find the number of possible combinations that add up to a positive integer target.

Example:

nums = [1, 2, 3]
target = 4

The possible combination ways are:
(1, 1, 1, 1)
(1, 1, 2)
(1, 2, 1)
(1, 3)
(2, 1, 1)
(2, 2)
(3, 1)

Note that different sequences are counted as different combinations.

Therefore the output is 7.

lintCode 564. 组合总和 IV
https://www.lintcode.com/problem/combination-sum-iv/description?_from=ladder&&fromId=91

## Solution

```python
### 1D 数组 空间优化，和背包V lintCode 题目很像，但是子问题不同。
### DP

class Solution:
    def combinationSum4(self, nums: List[int], target: int) -> int:
        # write your code here
        # 最后一步：考虑背包里最后一个物品的重量是多少
    
        # f[i] 多少种组合拼成重量i  
        n = len(nums)
        if n == 0:
            return 0
        
        f = [0] * (target + 1) 
        f[0] = 1
        for i in range(target + 1):
            
            for num in nums:
                if i >= num:
                    f[i] += f[i - num]
        
        return f[target]
```
