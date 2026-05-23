---
title: "LeetCode 20 Valid Parentheses - Easy"
date: "2021-01-01"
excerpt: 20. Valid Parentheses
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 20
comments: true
---

### 20. Valid Parentheses — Easy

[Open on LeetCode](https://leetcode.com/problems/valid-parentheses/)

## Problem

20. Valid Parentheses

Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Note that an empty string is also considered valid.

Example 1:

Input: "()"
Output: true
Example 2:

Input: "()[]{}"
Output: true
Example 3:

Input: "(]"
Output: false
Example 4:

Input: "([)]"
Output: false
Example 5:

Input: "{[]}"
Output: true

## Solution

```python
### https://leetcode.com/problems/valid-parentheses/solution/

### Solution, using Hash + Stack:

class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        map = { "]":"[", "}":"{", ")":"(" }
        for p in s:
            # if p is left parentheses, put it in the stack
            if p in map.values():
                stack.append(p)
            # if p is right paretheses, 
            # check if stack has anything, and pop the top element and check if matches, 
            # Otherwise return False      
            elif p in map:
                if stack and stack.pop() == map[p]:
                    continue
                return False
        # Finally check if stack is empty
        return stack == []
```
