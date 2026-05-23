---
title: "LeetCode 91 Decode Ways - Medium"
date: "2021-01-01"
excerpt: "A message containing letters from A-Z is being encoded to numbers using the following mapping:"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 91
comments: true
---

### 91. Decode Ways — Medium

[Open on LeetCode](https://leetcode.com/problems/decode-ways/)

## Problem

A message containing letters from A-Z is being encoded to numbers using the following mapping:

'A' -> 1
'B' -> 2
...
'Z' -> 26
Given a non-empty string containing only digits, determine the total number of ways to decode it.

Example 1:

Input: "12"
Output: 2
Explanation: It could be decoded as "AB" (1 2) or "L" (12).
Example 2:

Input: "226"
Output: 3
Explanation: It could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).

## Solution

```python
class Solution:
    def numDecodings(self, s: str) -> int:
        # write your code here
        
        ### DP problem
        ### Suppose for last character after decoding, was 1 digit, thus, n-2 digits before could have X ways
        ### Suppose for last character after decoding, was from 2 digits, thus, n-3 digits before could have Y ways.
        ### All the X + Y ways are for the last character decoding.
        
        ### Thus we can come up with the transfer function as follows:
        ### f[i] = f[i-2] + f[i-1]
        
        n = len(s)
        if n == 0:
            return 0
        f = [0] * (n+1)
    
        f[0] = 1
        for i in range(1, n+1):
            f[i] = 0
            # last one digit
            if s[i-1] != '0':
                f[i] += f[i - 1]
                
            if i>=2 and (s[i - 2] == '1' or (s[i - 2] == '2' and s[i - 1] <= '6')):
                f[i] += f[i - 2]
        
        return f[n]
```
