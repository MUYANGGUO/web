---
title: "LeetCode 500 Keyboard Row - Easy"
date: "2021-01-01"
excerpt: "500. Keyboard Row -- Easy"
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 500
comments: true
---

### 500. Keyboard Row — Easy

[Open on LeetCode](https://leetcode.com/problems/keyboard-row/)

## Problem

500. Keyboard Row -- Easy

Given a List of words, return the words that can be typed using letters of alphabet on only one row's of American keyboard like the image below.


Example:
Input: ["Hello", "Alaska", "Dad", "Peace"]
Output: ["Alaska", "Dad"]
 
Note:

You may use one character in the keyboard more than once.
You may assume the input string will only contain letters of alphabet.

## Solution

```python
class Solution:
    def findWords(self, words: List[str]) -> List[str]:
        res = []
        map = {'q': 0, 'Q': 0, 'w': 0, 'W': 0, 'e': 0, 'E': 0, 
                 'r': 0, 'R': 0, 'T': 0, 't': 0, 'U': 0, 'u': 0,
                 'I': 0, 'i': 0, 'O': 0, 'o': 0, 'P': 0, 'p': 0,
                 'Y': 0, 'y': 0,
                 
                 'A': 1, 'a': 1, 'S': 1, 's': 1, 'D': 1, 'd': 1, 
                 'F': 1, 'f': 1, 'G': 1, 'g': 1, 'H': 1, 'h': 1, 
                 'J': 1, 'j': 1, 'K': 1, 'k': 1 ,'L': 1, 'l': 1,
                 
                 'Z': 2, 'z': 2, 'X': 2, 'x': 2, 'C': 2, 'c': 2, 
                 'V': 2, 'v': 2, 'B': 2, 'b': 2, 'N': 2, 'n': 2, 
                 'M': 2, 'm': 2
                }
        
        for word in words:
            curRow = map[word[0]]
            isValid = True
            for char in word:
                if map[char] != curRow:
                    isValid = False
                    break
            if isValid:
                res.append(word)
        
        return res
```
