---
title: "LeetCode 242 Valid Anagram - Easy"
date: "2021-01-01"
excerpt: 242. Valid Anagram
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 242
comments: true
---

### 242. Valid Anagram — Easy

[Open on LeetCode](https://leetcode.com/problems/valid-anagram/)

## Problem

242. Valid Anagram

Given two strings s and t , write a function to determine if t is an anagram of s.

Example 1:

Input: s = "anagram", t = "nagaram"
Output: true
Example 2:

Input: s = "rat", t = "car"
Output: false
Note:
You may assume the string contains only lowercase alphabets.

Follow up:
What if the inputs contain unicode characters? How would you adapt your solution to such case?

## Solution

```python
# use two lists
class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        s.lower()
        t.lower()
        m = len(s)
        n = len(t)
        if m != n:
            return False
        counts_s = [0]*26
        counts_t = [0]*26
        for char_s, char_t in zip(s, t):
            if char_s.isalpha():
                counts_s[ord(char_s) - ord('a')] += 1
            if char_t.isalpha():
                counts_t[ord(char_t) - ord('a')] += 1
        
        for count_s, count_t in zip(counts_s, counts_t):
            if count_s == count_t:
                continue
            else:
                return False  
        return True
        
# use hashmap
class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        s.lower()
        t.lower()
        counter = dict()
        for char in s:
            if char.isalpha():
                counter[char] = counter.get(char, 0) + 1
        
        for char_t in t:
            if char_t.isalpha():
                if char_t in counter:
                    counter[char_t] -= 1
                else:
                    return False
        
        return all(x == 0 for x in counter.values())

# use hashmap, one pass
class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        s.lower()
        t.lower()
        map = dict()
        if len(s) != len(t):
            return False
        for char_s, char_t in zip(s, t):
            if char_s.isalpha():
                map[char_s] = map.get(char_s, 0) + 1
                if map[char_s] == 0:
                    del map[char_s]

            if char_t.isalpha():
                map[char_t] = map.get(char_t, 0) - 1
                if map[char_t] == 0:
                    del map[char_t]
        return len(map) == 0
```
