---
title: "LeetCode 17 Letter Combinations Of A Phone Number - Medium"
date: "2021-01-01"
excerpt: 17. Letter Combinations of a Phone Number
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 17
comments: true
---

### 17. Letter Combinations Of A Phone Number — Medium

[Open on LeetCode](https://leetcode.com/problems/letter-combinations-of-a-phone-number/)

## Problem

17. Letter Combinations of a Phone Number

Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent.

A mapping of digit to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.



Example:

Input: "23"
Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
Note:

Although the above answer is in lexicographical order, your answer could be in any order you want.

## Solution

```python
### Recursive DFS:


KEYBOARD = {
    '2':'abc',
    '3':'def',
    '4':'ghi',
    '5':'jkl',
    '6':'mno',
    '7':'pqrs',
    '8':'tuv',
    '9':'wxyz'
}

class Solution:
    def letterCombinations(self, digits):
        if not digits:
            return []
        
        res = []
        self.dfs(digits, 0, [], res)
        return res
        
    def dfs(self, digits, start, chars, res):
        if start == len(digits):
            ### 通过创建string 完成类似deepcopy的操作。
            res.append(''.join(chars))
            return
        
        for letter in KEYBOARD[digits[start]]:
            chars.append(letter)
            self.dfs(digits, start + 1, chars, res)
            chars.pop()
```
