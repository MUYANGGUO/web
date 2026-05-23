---
title: "LeetCode 291 Word Pattern II - Hard"
date: "2021-01-01"
excerpt: 291. Word Pattern II
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 291
comments: true
---

### 291. Word Pattern II — Hard

[Open on LeetCode](https://leetcode.com/problems/word-pattern-ii/)

## Problem

291. Word Pattern II

Given a pattern and a string str, find if str follows the same pattern.

Here follow means a full match, such that there is a bijection between a letter in pattern and a non-empty substring in str.

 

Example 1:

Input: pattern = "abab", str = "redblueredblue"
Output: true
Example 2:

Input: pattern = "aaaa", str = "asdasdasdasd"
Output: true
Example 3:

Input: pattern = "aabb", str = "xyzabcxzyabc"
Output: false

## Solution

```python
### DFS:


class Solution:
    def wordPatternMatch(self, pattern: str, string: str) -> bool:
        
        return self.is_match(pattern, string, {}, set())
    
    def is_match(self, pattern, string, mapping, used):
        
        if not pattern:
            return not string
        
        char = pattern[0]
        
        ### 如果mapping里已经有当前的char
        if char in mapping:
            word = mapping[char]
            ### startwith is a python function cheking prefix of a string, if contain, return true, else return false
            if not string.startswith(word):
                return False
            return self.is_match(pattern[1:], string[len(word):], mapping, used)
        ### 如果没有当前的char
        for i in range(len(string)):
            word = string[:i + 1]
            if word in used:
                continue
            
            used.add(word)
            ### 添加进mapping
            mapping[char] = word
            
            if self.is_match(pattern[1:], string[i + 1:], mapping, used):
                return True
            
            del mapping[char]
            used.remove(word)
            
        
        return False
```
