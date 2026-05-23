---
title: "LeetCode 47 Permutations II - Medium"
date: "2021-01-01"
excerpt: 47. Permutations II
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 47
comments: true
---

### 47. Permutations II — Medium

[Open on LeetCode](https://leetcode.com/problems/permutations-ii/)

## Problem

47. Permutations II

Given a collection of numbers that might contain duplicates, return all possible unique permutations.

Example:

Input: [1,1,2]
Output:
[
  [1,1,2],
  [1,2,1],
  [2,1,1]
]

## Solution

```python
class Solution:
    def permuteUnique(self, nums):
        ### 这题的关键操作是去重 比如
        ###  [1, 2', 2'']  chose, not choosing [1, 2'', 2']
        ### 那么选择的顺序应该是  [1] [1 2'] [1 2' 2'']
        ### 那么关键操作是先排序
        nums.sort()
        if not nums:
            return [[]]
        ### 注意这里visited 不能用set了，因为会有重复数组写进去 比如 [1, 2', 2''], 但一定是按照顺序写进去的。
        visited = [False] * len(nums)
        permutations = []
        self.dfs(nums, [], visited, permutations)
        return permutations
    
    ### 定义：找到以permutation为开头的所有排列
    def dfs(self, nums, permutation, visited, permutations):
        ### 出口
        if len(permutation) == len(nums):
            permutations.append(list(permutation))
            return
    
        ### 分解
        for i in range(len(nums)):
            if visited[i]:
                # [] -> [1], [2], [3]
                continue
                
            ### 去重：如果当前的数和上一个数一样，但是上一个数并没有算进去，那么说明当前的数和当前的数往后都是无效的。
            
            if i > 0 and nums[i - 1] == nums[i] and not visited[i - 1]:
                continue
            permutation.append(nums[i])
            visited[i] = True
            self.dfs(nums, permutation, visited, permutations)
            permutation.pop()
            visited[i] = False
```
