---
title: "LeetCode 258 Add Digits - Easy"
date: "2021-01-01"
excerpt: "258. Add Digits -- Easy"
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 258
comments: true
---

### 258. Add Digits — Easy

[Open on LeetCode](https://leetcode.com/problems/add-digits/)

## Problem

258. Add Digits -- Easy

Given a non-negative integer num, repeatedly add all its digits until the result has only one digit.

Example:
Input: 38
Output: 2 
Explanation: The process is like: 3 + 8 = 11, 1 + 1 = 2. 
             Since 2 has only one digit, return it.

Follow up:
Could you do it without any loop/recursion in O(1) runtime?

## Solution

```python
class Solution:
    def addDigits(self, num: int) -> int:
        digital_root = 0
        while num > 0:
            digital_root += num % 10
            num = num // 10
            
            if num == 0 and digital_root > 9:
                num = digital_root
                digital_root = 0
                
        return digital_root

# O(1) Solution with formula:

class Solution:
    def addDigits(self, num: int) -> int:
        if num == 0:
            return 0
        if num % 9 == 0:
            return 9
        return num % 9
```
