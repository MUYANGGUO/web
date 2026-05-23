---
title: "LeetCode 28 Implementstr Str() - Easy"
date: "2021-01-01"
excerpt: Implement strStr().
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 28
comments: true
---

### 28. Implementstr Str() — Easy

[Open on LeetCode](https://leetcode.com/problems/implementstr-str/)

## Problem

Implement strStr().

Return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.

Example 1:

Input: haystack = "hello", needle = "ll"
Output: 2
Example 2:

Input: haystack = "aaaaa", needle = "bba"
Output: -1
Clarification:

What should we return when needle is an empty string? This is a great question to ask during an interview.

For the purpose of this problem, we will return 0 when needle is an empty string. This is consistent to C's strstr() and Java's indexOf().

## Solution

```python
class Solution:
    def strStr(self, haystack: str, needle: str) -> int:
        if haystack == needle:
            return 0
        
        n = len(needle)
        out = -1
        for i in range(len(haystack)-n+1):

            if haystack[i:i+n] == needle:
                return i
        
        return out
            

class Solution:
    def strStr(self, haystack: str, needle: str) -> int:
        if haystack == needle:
            return 0
        

        for i in range(len(haystack)-len(needle)+1):
            for j in range(len(needle)):
                if haystack[i+j] != needle[j]:
                    break
            else:
                return i

            ### 此处运用了 for else 这个小技巧 处理。for 里面的 break 如果被执行了，就不会执行else了。 如果 没被执行，则会进入else。
            ### 这里注意 for 和 else 是并列的。 
        
        return -1
            
### 以上两种方法是O(n^2)。 此题有O（n）的解法。 KMP 算法。 还有一个更简单的算法 Rabin-Karp 算法。

### Rabin-Karp 推荐算法
class Solution:
    def strStr(self, haystack: str, needle: str) -> int:
        ### Rabin-Karp rolling hash
        if not haystack and needle:
            return -1
        
        if not needle: 
            return 0
        # Initialization
        MOD = 1000000
        POWER = 1
        BASE = 31
        roll_hash = 0
        needle_hash = 0
        for i in range(len(needle)):
            POWER = POWER * BASE % MOD
            needle_hash = ( needle_hash * BASE + ord(needle[i]) ) % MOD
        
        for i in range(len(haystack)):
            roll_hash = (roll_hash * BASE + ord(haystack[i]) ) % MOD
            if i < len(needle) - 1:
                continue
            # abcd - a
            if i >= len(needle):
                roll_hash = (roll_hash - (ord(haystack[i-len(needle)]) * POWER) % MOD) % MOD
                if roll_hash < 0:
                    # 做循环处理
                    roll_hash += BASE
                    
            ## double check, avoid the collision
            if roll_hash == needle_hash:
                if haystack[i - len(needle) + 1: i + 1] == needle:
                    return i - len(needle) + 1
        return -1
```
