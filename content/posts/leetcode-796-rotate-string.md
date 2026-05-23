---
title: "LeetCode 796 Rotate String - Easy"
date: "2021-01-01"
excerpt: "796. Rotate String -- Easy"
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 796
comments: true
---

### 796. Rotate String — Easy

[Open on LeetCode](https://leetcode.com/problems/rotate-string/)

## Problem

796. Rotate String -- Easy

We are given two strings, A and B.
A shift on A consists of taking string A and moving the leftmost character 
to the rightmost position. 
For example, if A = 'abcde', then it will be 'bcdea' after one shift on A. Return True if and only if A can become B after some number of shifts on A.

Example 1:
Input: A = 'abcde', B = 'cdeab'
Output: true

Example 2:
Input: A = 'abcde', B = 'abced'
Output: false
Note:

A and B will have length at most 100.

## Solution

```python
### brutal
class Solution:
    def rotateString(self, A, B):
        return len(A) == len(B) and B in A+A

### rolling Hash:
class Solution:
    def rotateString(self, A: str, B: str) -> bool:
        # Write your code here
        if not A and not B:
            return True
        if len(A) != len(B):
            return False
        source = A + A
        MOD = 1000000
        highest_power = 1
        # highest power
        for i in range(len(B)):
            highest_power = (highest_power * 31) % MOD
            
        target_code = 0
        for i in range(len(B)):
            target_code = (target_code * 31 + ord(B[i])) % MOD
            
        hash_code = 0
        for i in range(len(source)):
            hash_code = (hash_code * 31 + ord(source[i])) % MOD
            if i < len(B) - 1:
                continue
            if i >= len(B):
                hash_code = hash_code - (ord(source[i-len(B)]) * highest_power) % MOD
                if hash_code < 0:
                    # keep the loop correct, just in case hash_code is less than zero
                    hash_code += MOD
            ## double check, avoid the collision
            if hash_code == target_code:
                if source[i - len(B) + 1: i + 1] == B:
                    return True
                    
        return False
```
