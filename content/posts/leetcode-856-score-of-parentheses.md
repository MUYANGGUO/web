---
title: "LeetCode 856 Score Of Parentheses - Medium"
date: "2021-01-01"
excerpt: "856. Score of Parentheses -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 856
comments: true
---

### 856. Score Of Parentheses — Medium

[Open on LeetCode](https://leetcode.com/problems/score-of-parentheses/)

## Problem

856. Score of Parentheses -- Medium

Given a balanced parentheses string S, compute the score of the string based on the following rule:

() has score 1
AB has score A + B, where A and B are balanced parentheses strings.
(A) has score 2 * A, where A is a balanced parentheses string.
 

Example 1:

Input: "()"
Output: 1
Example 2:

Input: "(())"
Output: 2
Example 3:

Input: "()()"
Output: 2
Example 4:

Input: "(()(()))"
Output: 6
 

Note:

S is a balanced parentheses string, containing only ( and ).
2 <= S.length <= 50

## Solution

```python
class Solution:
    def scoreOfParentheses(self, S: str) -> int:
        #用stack。当碰到"("压入栈， 碰到")"，
        #往前搜索第一个"("，如果中间有数字， 取出数字求和并乘以2后压入栈 
        #没有数字就直接压入"1" stack中所有的数字相加就是答案
        stack = []
        for c in S:
            if c != ')':
                stack.append(c)
            else:
                if stack[-1] == '(':
                    stack.pop()
                    stack.append(1)
                else:
                    calc = 0
                    pre = stack.pop()
                    while pre != '(':
                        calc += pre
                        pre = stack.pop()
                    stack.append(calc * 2)
        calc = 0
        while stack:
            calc += stack.pop()
        return calc
```
