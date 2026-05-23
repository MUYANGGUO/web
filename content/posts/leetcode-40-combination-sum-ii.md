---
title: "LeetCode 40 Combination Sum II - Medium"
date: "2021-01-01"
excerpt: 40. Combination Sum II
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 40
comments: true
---

### 40. Combination Sum II — Medium

[Open on LeetCode](https://leetcode.com/problems/combination-sum-ii/)

## Problem

40. Combination Sum II

Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sums to target.

Each number in candidates may only be used once in the combination.

Note:

All numbers (including target) will be positive integers.
The solution set must not contain duplicate combinations.
Example 1:

Input: candidates = [10,1,2,7,6,1,5], target = 8,
A solution set is:
[
  [1, 7],
  [1, 2, 5],
  [2, 6],
  [1, 1, 6]
]

## Solution

```python
### 排列去重：


class Solution:
    def combinationSum2(self, candidates, target):
        # write your code here
        candidates = sorted(candidates)
        results = []
        self.dfs(candidates, target, 0, [], results)
        return results

    # 递归的定义：在candidates[start ... n-1] 中找到所有的组合，他们的和为 target
    # 和前半部分的 combination 拼起来放到 results 里
    # （找到所有以 combination 开头的满足条件的组合，放到 results）
    def dfs(self, candidates, target, start, combination, results):
        # 递归的出口：target <= 0
        if target < 0:
            return
        
        if target == 0:
            # deepcooy
            return results.append(list(combination))
            
        # 递归的拆解：挑一个数放到 combination 里
        for i in range(start, len(candidates)):
            if candidates[i]>target:
                return 
            # subset with duplicate 的判定
            if candidates[i] == candidates[i-1] and i > start:
                continue 
            # [2] => [2,2]
            combination.append(candidates[i])
            self.dfs(candidates, target - candidates[i], i + 1, combination, results)
            # [2,2] => [2]
            combination.pop()  # backtracking
```
