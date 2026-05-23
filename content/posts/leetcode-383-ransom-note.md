---
title: "LeetCode 383 Ransom Note - Easy"
date: "2021-01-01"
excerpt: "Given an arbitrary ransom note string and another string containing letters from all the magazines, write a function that will return tru…"
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 383
comments: true
---

### 383. Ransom Note — Easy

[Open on LeetCode](https://leetcode.com/problems/ransom-note/)

## Problem

Given an arbitrary ransom note string and another string containing letters from all the magazines, write a function that will return true if the ransom note can be constructed from the magazines ; otherwise, it will return false.

Each letter in the magazine string can only be used once in your ransom note.

 

Example 1:

Input: ransomNote = "a", magazine = "b"
Output: false
Example 2:

Input: ransomNote = "aa", magazine = "ab"
Output: false
Example 3:

Input: ransomNote = "aa", magazine = "aab"
Output: true
 

Constraints:

You may assume that both strings contain only lowercase letters.

## Solution

```python
### More Solution can be found at https://leetcode.com/problems/ransom-note/solution/

### One hashmap
class Solution:
    def canConstruct(self, ransomNote: str, magazine: str) -> bool:

        counter = {}
        for i in magazine:
            if i not in counter:
                counter[i] = 1
            else:
                counter[i] += 1
        
        
        for i in ransomNote:
            if i in counter:
                counter[i] -= 1
                if counter[i] < 0:
                    return False
            else:
                return False

         return True

### two hashmaps

class Solution:
    def canConstruct(self, ransomNote: str, magazine: str) -> bool:

        ransom = {}
        for i in ransomNote:
            if i not in ransom:
                ransom[i] = 1
            else:
                ransom[i] += 1
        
        
        for r in ransom.keys():
            count = 0
            for i in magazine:
                if i == r:
                    count+=1
            if count < ransom[r]:
                return False
        
        return True
```
