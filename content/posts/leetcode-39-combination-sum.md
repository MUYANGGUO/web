---
title: "LeetCode 39 Combination Sum - Medium"
date: "2021-01-01"
excerpt: 39. Combination Sum
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 39
comments: true
---

### 39. Combination Sum — Medium

[Open on LeetCode](https://leetcode.com/problems/combination-sum/)

## Problem

39. Combination Sum

Given a set of candidate numbers (candidates) (without duplicates) and a target number (target), find all unique combinations in candidates where the candidate numbers sums to target.

The same repeated number may be chosen from candidates unlimited number of times.

Note:

All numbers (including target) will be positive integers.
The solution set must not contain duplicate combinations.
Example 1:

Input: candidates = [2,3,6,7], target = 7,
A solution set is:
[
  [7],
  [2,2,3]
]
Example 2:

Input: candidates = [2,3,5], target = 8,
A solution set is:
[
  [2,2,2,2],
  [2,3,3],
  [3,5]
]

## Solution

```python
class Solution:
    def combinationSum(self, candidates, target):
        # write your code here
        ### 利用set来去重
        candidates = sorted(list(set(candidates)))
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
            # [2] => [2,2]
            combination.append(candidates[i])
            ### 下次递归还是 i 为start index，这样就能重复选择。
            self.dfs(candidates, target - candidates[i], i, combination, results)
            # [2,2] => [2]
            combination.pop()  # backtracking
```
