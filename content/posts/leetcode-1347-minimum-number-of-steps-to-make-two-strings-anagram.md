---
title: "LeetCode 1347 Minimum Number Of Steps To Make Two Strings Anagram - Medium"
date: "2021-01-01"
excerpt: "1347. Minimum Number of Steps to Make Two Strings Anagram -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 1347
comments: true
---

### 1347. Minimum Number Of Steps To Make Two Strings Anagram — Medium

[Open on LeetCode](https://leetcode.com/problems/minimum-number-of-steps-to-make-two-strings-anagram/)

## Problem

1347. Minimum Number of Steps to Make Two Strings Anagram -- Medium

Given two equal-size strings s and t. In one step you can choose any character of t and replace it with another character.

Return the minimum number of steps to make t an anagram of s.

An Anagram of a string is a string that contains the same characters with a different (or the same) ordering.


Example 1:
Input: s = "bab", t = "aba"
Output: 1
Explanation: Replace the first 'a' in t with b, t = "bba" which is anagram of s.

Example 2:
Input: s = "leetcode", t = "practice"
Output: 5
Explanation: Replace 'p', 'r', 'a', 'i' and 'c' from t with proper characters to make t anagram of s.

Example 3:
Input: s = "anagram", t = "mangaar"
Output: 0
Explanation: "anagram" and "mangaar" are anagrams. 

Example 4:
Input: s = "xxyyzz", t = "xxyyzz"
Output: 0

Example 5:
Input: s = "friend", t = "family"
Output: 4

## Solution

```python
class Solution:
    def minSteps(self, s: str, t: str) -> int:
        res = 0
        s = collections.Counter(s)
        t = collections.Counter(t)
        for char in s.keys():
            res += max(s[char] - t[char], 0)
        return res
```
