---
title: "LeetCode 227 Basic Calculator II - Medium"
date: "2021-01-01"
excerpt: "227. Basic Calculator II -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 227
comments: true
---

### 227. Basic Calculator II — Medium

[Open on LeetCode](https://leetcode.com/problems/basic-calculator-ii/)

## Problem

227. Basic Calculator II -- Medium

Given a string s which represents an expression, evaluate this expression and return its value. 

The integer division should truncate toward zero.


Example 1:

Input: s = "3+2*2"
Output: 7
Example 2:

Input: s = " 3/2 "
Output: 1
Example 3:

Input: s = " 3+5 / 2 "
Output: 5
 

Constraints:

1 <= s.length <= 3 * 105
s consists of integers and operators ('+', '-', '*', '/') separated by some number of spaces.
s represents a valid expression.
All the integers in the expression are non-negative integers in the range [0, 231 - 1].
The answer is guaranteed to fit in a 32-bit integer.

## Solution

```python
class Solution:
    def calculate(self, s: str) -> int:
        #通过栈来实现运算，按顺序读取字符串，
        #将第一个数入栈。之后遇到+，将下一个数num入栈；遇到-，则将-num入栈；
        #遇到乘或除，先将上一个数出栈，与当前数进行运算后，再将结果入栈。
        #读取完整个字符串后，将栈中所有的数相加即运算结果。
        if not s:
            return "0"
        stack, num, sign = [], 0, "+"
        for i in range(len(s)):
            if s[i].isdigit():
                num = num*10+ord(s[i])-ord("0")
            if (not s[i].isdigit() and not s[i].isspace()) or i == len(s)-1:
                if sign == "-":
                    stack.append(-num)
                elif sign == "+":
                    stack.append(num)
                elif sign == "*":
                    stack.append(stack.pop()*num)
                else:
                    tmp = stack.pop()
                    if tmp//num < 0 and tmp%num != 0:
                        stack.append(tmp//num+1)
                    else:
                        stack.append(tmp//num)
                sign = s[i]
                num = 0
        return sum(stack)
```
