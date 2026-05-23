---
title: "LeetCode 214 Shortest Palindrome - Hard"
date: "2021-01-01"
excerpt: 214. Shortest Palindrome
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 214
comments: true
---

### 214. Shortest Palindrome — Hard

[Open on LeetCode](https://leetcode.com/problems/shortest-palindrome/)

## Problem

214. Shortest Palindrome

Given a string s, you are allowed to convert it to a palindrome by adding characters in front of it. Find and return the shortest palindrome you can find by performing this transformation.

Example 1:

Input: "aacecaaa"
Output: "aaacecaaa"
Example 2:

Input: "abcd"
Output: "dcbabcd"

## Solution

```python
### Solution 1: Brute Force O(N^2)
### 从后往前每次减去一个字符后子串是否为回文串。 答案为将减去的部分翻转后接入最前面。
class Solution:
    """
    @param str: String
    @return: String
    """
    def shortestPalindrome(self, s: str) -> str:
        if not s:
            return s
        n = len(s)
        for i in range(n - 1, -1, -1):
            substr = s[:i + 1]
            if self.isPalindrome(substr):
                if i == n - 1:
                    return s 
                else:
                    return (s[i + 1:] [::-1]) + s[:]
                    
    def isPalindrome(self, str):
        left, right = 0, len(str) - 1 
        while left < right:
            if str[left] != str[right]:
                return False
            left += 1 
            right -= 1 
        
        return True


### Solution 2: Rabin-Karp Rolling Hash O(N)
class Solution:
    """
    @param str: String
    @return: String
    """
    def shortestPalindrome(self, s: str) -> str:
        if not s:
            return s
        n = len(s)
        # 31 ^ m
        MOD = 1000000
        POWER = 1
        BASE = 31
        source_hash = 0
        target_hash = 0
        end = 0
        for i in range(n):
            if i > 0:
                POWER = (POWER * BASE) % MOD
            source_hash = ( source_hash * BASE + ord(s[i]) ) % MOD
            target_hash = ( target_hash + ord(s[i]) * POWER) % MOD
            if source_hash == target_hash:
                print(source_hash, target_hash)
                if self.collisionCheck(s[0:i + 1], s[0:i + 1][::-1]):
                    end = i
        return s[end + 1:n][::-1] + s
                        
    def collisionCheck(self, source, target):
        if source == target:
            return True
        else:
            return False
```
