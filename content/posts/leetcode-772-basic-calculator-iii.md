---
title: "LeetCode 772 Basic Calculator III - Hard"
date: "2021-01-01"
excerpt: "772. Basic Calculator III -- Hard"
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 772
comments: true
---

### 772. Basic Calculator III — Hard

[Open on LeetCode](https://leetcode.com/problems/basic-calculator-iii/)

## Problem

772. Basic Calculator III -- Hard

Implement a basic calculator to evaluate a simple expression string.

The expression string contains only non-negative integers, +, -, *, / operators , open ( and closing parentheses ) and empty spaces . The integer division should truncate toward zero.

You may assume that the given expression is always valid. All intermediate results will be in the range of [-2147483648, 2147483647].

Follow up: Could you solve the problem without using built-in library functions.

 
Example 1:

Input: s = "1 + 1"
Output: 2

Example 2:

Input: s = " 6-4 / 2 "
Output: 4

Example 3:

Input: s = "2*(5+5*2)/3+(6/2+8)"
Output: 21

Example 4:

Input: s = "(2+6* 3+5- (3*14/7+2)*5)+3"
Output: -12

Example 5:

Input: s = "0"
Output: 0
 

Constraints:

1 <= s <= 104
s consists of digits, '+', '-', '*', '/', '(', ')' and ' '.
s is a valid expression.

## Solution

```python
#用栈模拟：
class Solution:
    def calculate(self, s: str) -> int:
        order = {'+': 0, '-':0, '*': 1, '/':1}
        stack = []
        num = 0
        for c in s:
            if c.isdigit():
                num = num * 10 + int(c)
                continue
            if c in order:
                # 对op单调
                while stack and stack[-1] != '(' and order[stack[-1]] >= order[c]:
                    op = stack.pop()
                    pre = stack.pop()
                    num = self.calc(pre, num, op)
                stack.append(num)
                stack.append(c)
                num = 0
                continue
            if c is '(':
                stack.append(c)
                continue
            if c is ')':
                while stack[-1] != '(':
                    op = stack.pop()
                    pre = stack.pop()
                    num = self.calc(pre, num, op)
                stack.pop()
        while stack:
            op = stack.pop()
            pre = stack.pop()
            num = self.calc(pre, num, op)
        return num
    def calc(self, a, b, op):
        if op == '+':
            return a + b
        if op == '-':
            return a - b
        if op == '*':
            return a * b
        if op == '/':
            return a // b
```
