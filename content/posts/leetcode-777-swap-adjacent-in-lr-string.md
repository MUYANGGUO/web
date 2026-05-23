---
title: "LeetCode 777 Swap Adjacent In LR String - Medium"
date: "2021-01-01"
excerpt: "777. Swap Adjacent in LR String -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 777
comments: true
---

### 777. Swap Adjacent In LR String — Medium

[Open on LeetCode](https://leetcode.com/problems/swap-adjacent-in-lr-string/)

## Problem

777. Swap Adjacent in LR String -- Medium

In a string composed of 'L', 'R', and 'X' characters, like "RXXLRXRXL", a move consists of either replacing one occurrence of "XL" with "LX", or replacing one occurrence of "RX" with "XR". Given the starting string start and the ending string end, return True if and only if there exists a sequence of moves to transform one string to the other.


Example 1:
Input: start = "RXXLRXRXL", end = "XRLXXRRLX"
Output: true
Explanation: We can transform start to end following these steps:
RXXLRXRXL ->
XRXLRXRXL ->
XRLXRXRXL ->
XRLXXRRXL ->
XRLXXRRLX

Example 2:
Input: start = "X", end = "L"
Output: false

Example 3:
Input: start = "LLR", end = "RRL"
Output: false

Example 4:
Input: start = "XL", end = "LX"
Output: true

Example 5:
Input: start = "XLLR", end = "LXLX"
Output: false
 

Constraints:
1 <= start.length <= 104
start.length == end.length
Both start and end will only consist of characters in 'L', 'R', and 'X'.

## Solution

```python
#找规律：
class Solution:
    def canTransform(self, start: str, end: str) -> bool:
        if len(start) != len(end): return False
        A = [(s, idx) for idx, s in enumerate(start) if s == 'L' or s == 'R']
        B = [(e, idx) for idx, e in enumerate(end) if e == 'L' or e == 'R']
        if len(A) != len(B): return False
        for (s, i), (e, j) in zip(A, B):
            if s != e: return False
            if s == 'L':
                if i < j:
                    return False
            if s == 'R':
                if i > j:
                    return False
        return True
    
# Alternatively:
class Solution:
    def canTransform(self, start: str, end: str) -> bool:
        if start.replace('X','')!=end.replace('X',''): return False
        l1=l2=r1=r2=0
        for v1,v2 in zip(start,end):
            if v1=='L': l1+=1
            elif v1=='R': r1+=1
            if v2=='L': l2+=1
            elif v2=='R': r2+=1
            if l1>l2 or r1<r2: return False
        return True
```
