---
title: "LeetCode 22 Generate Parentheses - Medium"
date: "2021-01-01"
excerpt: 22. Generate Parentheses
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 22
comments: true
---

### 22. Generate Parentheses — Medium

[Open on LeetCode](https://leetcode.com/problems/generate-parentheses/)

## Problem

22. Generate Parentheses

Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

For example, given n = 3, a solution set is:

[
  "((()))",
  "(()())",
  "(())()",
  "()(())",
  "()()()"
]

## Solution

```python
# Backtracking :
class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        res = []
        self.backtrack('', 0, 0, n, res)
        return res
    def backtrack(self, s, left, right, N, res):
        if len(s) == 2 * N:
            res.append(s)
            return 
        if left < N:
            self.backtrack(s + '(', left + 1, right, N, res)
        if right < left:
            self.backtrack(s + ')', left, right + 1, N, res)


# closure number:
# [(...left closure number...) ...right closure number...]
# https://www.youtube.com/watch?v=zW8qP5SCcg0&ab_channel=%E5%B0%8F%E5%B0%8F%E7%A6%8FLeetCode
class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        if n == 0:
            return [""]
        res = []
        for closure in range(n):
            for right in self.generateParenthesis(closure):
                for left in self.generateParenthesis(n - closure - 1):
                    res.append('(' + left + ')' + right)
        
        return res
```
