---
title: "LeetCode 32 Longest Valid Parentheses - Hard"
date: "2021-01-01"
excerpt: "32. Longest Valid Parentheses -- Hard"
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 32
comments: true
---

### 32. Longest Valid Parentheses — Hard

[Open on LeetCode](https://leetcode.com/problems/longest-valid-parentheses/)

## Problem

32. Longest Valid Parentheses -- Hard

Given a string containing just the characters '(' and ')', find the length of the longest valid (well-formed) parentheses substring.


Example 1:

Input: s = "(()"
Output: 2
Explanation: The longest valid parentheses substring is "()".

Example 2:

Input: s = ")()())"
Output: 4
Explanation: The longest valid parentheses substring is "()()".

Example 3:

Input: s = ""
Output: 0
 

Constraints:

0 <= s.length <= 3 * 104
s[i] is '(', or ')'.

## Solution

```python
# DP:
class Solution:
    def longestValidParentheses(self, s: str) -> int:
        # write your code here
        dp = [0] * len(s)
        res = 0
        for i in range(1, len(s)):
            if s[i] == ')':
                j = i - dp[i - 1] - 1 # 当前i - i-1 长度 - 1 是需要检查的
                if j >= 0 and s[j] == '(' :	
                    #如果没越界且为右括号，
                    #那么有dp[i] = dp[i - 1] + 2
                    dp[i] = dp[i - 1] + 2
                    if j - 1 >= 0:			#还要将j - 1开头的子串加进来
                        dp[i] += dp[j - 1]
                res = max(res, dp[i])
        return res

# Stack:
class Solution:
    def longestValidParentheses(self, s: str) -> int:
        # write your code here
        stack = [-1] #相当于从-1开始index，计算长度用
        # stack里只存分界点，区分开始记录的起点
        maxlen = 0
        for i in range(len(s)):
            if s[i] == '(':
                stack.append(i)
            else:
                stack.pop()
                if not stack:
                    stack.append(i)
                else:
                    maxlen = max(maxlen,  i-stack[-1])       
        return maxlen
```
