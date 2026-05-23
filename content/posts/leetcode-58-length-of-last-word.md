---
title: "LeetCode 58 Length Of Last Word - Easy"
date: "2021-01-01"
excerpt: 58. Length of Last Word
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 58
comments: true
---

### 58. Length Of Last Word — Easy

[Open on LeetCode](https://leetcode.com/problems/length-of-last-word/)

## Problem

58. Length of Last Word

Given a string s consists of upper/lower-case alphabets and empty space characters ' ', return the length of last word (last word means the last appearing word if we loop from left to right) in the string.

If the last word does not exist, return 0.

Note: A word is defined as a maximal substring consisting of non-space characters only.

Example:

Input: "Hello World"
Output: 5

## Solution

```python
class Solution:
    def lengthOfLastWord(self, s: str) -> int:
        p, length = len(s), 0
        while p > 0:
            p -= 1
            # we're in the middle of the last word
            if s[p] != ' ':
                length += 1
            # here is the end of last word
            elif length > 0:
                return length

        return length
```
