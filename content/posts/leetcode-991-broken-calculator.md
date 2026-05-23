---
title: "LeetCode 991 Broken Calculator - Medium"
date: "2021-01-01"
excerpt: "991. Broken Calculator -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 991
comments: true
---

### 991. Broken Calculator — Medium

[Open on LeetCode](https://leetcode.com/problems/broken-calculator/)

## Problem

991. Broken Calculator -- Medium

On a broken calculator that has a number showing on its display, we can perform two operations:

Double: Multiply the number on the display by 2, or;
Decrement: Subtract 1 from the number on the display.
Initially, the calculator is displaying the number X.

Return the minimum number of operations needed to display the number Y.

Example 1:
Input: X = 2, Y = 3
Output: 2
Explanation: Use double operation and then decrement operation {2 -> 4 -> 3}.

Example 2:
Input: X = 5, Y = 8
Output: 2
Explanation: Use decrement and then double {5 -> 4 -> 8}.

Example 3:
Input: X = 3, Y = 10
Output: 3
Explanation:  Use double, decrement and double {3 -> 6 -> 5 -> 10}.

Example 4:
Input: X = 1024, Y = 1
Output: 1023
Explanation: Use decrement operations 1023 times.
 
Note:
1 <= X <= 10^9
1 <= Y <= 10^9

## Solution

```python
class Solution:
    def brokenCalc(self, X: int, Y: int) -> int:
        if X > Y: return X - Y
        res = 0
        while X < Y:
            if Y % 2 == 1:
                Y += 1
                res += 1
            Y //= 2
            res += 1
        return res + X - Y
```
