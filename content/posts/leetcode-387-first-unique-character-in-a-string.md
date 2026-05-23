---
title: "LeetCode 387 First Unique Character In A String - Easy"
date: "2021-01-01"
excerpt: 387. First Unique Character in a String
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 387
comments: true
---

### 387. First Unique Character In A String — Easy

[Open on LeetCode](https://leetcode.com/problems/first-unique-character-in-a-string/)

## Problem

387. First Unique Character in a String

Given a string, find the first non-repeating character in it and return its index. If it doesn't exist, return -1.

Examples:

s = "leetcode"
return 0.

s = "loveleetcode"
return 2.

## Solution

```python
class Solution:
    def firstUniqChar(self, s: str) -> int:
        counter = {}
        for char in s:
            counter[char] = counter.get(char, 0) + 1
        
        for i, char in enumerate(s):
            if counter[char] == 1:
                return i
        
        return -1
```
