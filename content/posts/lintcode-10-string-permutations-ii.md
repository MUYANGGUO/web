---
title: "LintCode 10 String Permutations II - Medium"
date: "2021-01-01"
excerpt: 10. String Permutation II
kind: leetcode
tags:
  - LintCode
  - Medium
  - Python
order: 10
comments: true
---

### 10. String Permutations II — Medium

[Open on LintCode](https://www.lintcode.com/problem/10/)

## Problem

10. String Permutation II

Given a string, find all permutations of it without duplicates.

Example
Example 1:

Input: "abb"
Output:
["abb", "bab", "bba"]
Example 2:

Input: "aabb"
Output:
["aabb", "abab", "baba", "bbaa", "abba", "baab"]

## Solution

```python
### 递归DFS + 去重操作：

class Solution:
    """
    @param str: A string
    @return: all permutations
    """
    def stringPermutation2(self, str):
        # write your code here
        ### 想去重，同样需要现排序
        chars = sorted(list(str))
        visited = [False] * len(chars)
        permutations = []
        self.dfs(chars, visited, [], permutations) 
        return permutations

    def dfs(self, chars, visited, permutation, permutations):
        if len(chars) == len(permutation):
            permutations.append(''.join(permutation))
            return    
        
        for i in range(len(chars)):
            if visited[i]:
                continue
            ### 去重：
            if i > 0 and chars[i] == chars[i - 1] and not visited[i - 1]:
                # a' a" b
                # => a' a" b => √
                # => a" a' b => x
                # 不能跳过一个a选下一个a
                continue

            # make changes
            visited[i] = Tru
            permutation.append(chars[i])

            # 找到所有 permutation 开头的排列
            # 找到所有 "a" 开头的
            self.dfs(chars, visited, permutation, permutations)

            # backtracking
            permutation.pop()
            visited[i] = False
```
