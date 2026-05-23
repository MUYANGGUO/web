---
title: "LeetCode 402 Remove K Digits - Medium"
date: "2021-01-01"
excerpt: "402. Remove K Digits -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 402
comments: true
---

### 402. Remove K Digits — Medium

[Open on LeetCode](https://leetcode.com/problems/remove-k-digits/)

## Problem

402. Remove K Digits -- Medium

Given a non-negative integer num represented as a string, remove k digits from the number so that the new number is the smallest possible.

Note:
The length of num is less than 10002 and will be ≥ k.
The given num does not contain any leading zero.

Example 1:

Input: num = "1432219", k = 3
Output: "1219"
Explanation: Remove the three digits 4, 3, and 2 to form the new number 1219 which is the smallest.

Example 2:

Input: num = "10200", k = 1
Output: "200"
Explanation: Remove the leading 1 and the number is 200. Note that the output must not contain leading zeroes.

Example 3:

Input: num = "10", k = 2
Output: "0"
Explanation: Remove all the digits from the number and it is left with nothing which is 0.

## Solution

```python
class Solution:
    def removeKdigits(self, num: str, k: int) -> str:
        if k == 0:
            return num
        if k >= len(num):
            return "0"
        # 单调栈
        stack = []
        for i in range(len(num)):
            while stack and k > 0 and stack[-1] > num[i]:
                stack.pop()
                k -= 1 
            if num[i] != '0' or stack:
                stack.append(num[i])
        while stack and k > 0:
            stack.pop()
            k -= 1 
        if not stack:
            return '0'
        return ''.join(stack)
```
