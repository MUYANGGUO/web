---
title: "LeetCode 151  Reverse Words In A String - Medium"
date: "2021-01-01"
excerpt: 151. Reverse Words in a String
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 151
comments: true
---

### 151.  Reverse Words In A String — Medium

[Open on LeetCode](https://leetcode.com/problems/reverse-words-in-a-string/)

## Problem

151. Reverse Words in a String

Given an input string, reverse the string word by word.

 

Example 1:

Input: "the sky is blue"
Output: "blue is sky the"
Example 2:

Input: "  hello world!  "
Output: "world! hello"
Explanation: Your reversed string should not contain leading or trailing spaces.
Example 3:

Input: "a good   example"
Output: "example good a"
Explanation: You need to reduce multiple spaces between two words to a single space in the reversed string.

## Solution

```python
class Solution:
    def reverseWords(self, s):
        return " ".join(reversed(s.split()))



class Solution:
    """
    @param: s: A string
    @return: A string
    """
    def reverseWords(self, s):
        # write your code here
        if not s:
            return ""
        s = self.removeDuplicateSpaces(s)
        self.reverseStr(s, 0, len(s) - 1)
        self.reverseWord(s)
        ### remove head, tail extra spaces if any
        res = ''
        i, j = 0, len(s) - 1
        while i < len(s):
            if s[i] == ' ':
                i += 1
            else:
                break
        while j > 0:
            if s[j] == ' ':
                j -= 1
            else:
                break
                
        for char in s[i:j+1]:
            res += char
    
        return res
        
        
    def removeDuplicateSpaces(self, s):  
        ### avoid str, use array
        word = []
        j = 0
        for i in range(len(s)):
            if i < j:
                continue
            while j < len(s) and s[j] != ' ':
                j += 1
            for char in s[i:j + 1]:
                word.append(char)
            while j < len(s) and s[j] == ' ':
                j += 1
        
        return word
    
    def reverseStr(self, s, start, end):
        left, right = start, end
        while left < right:
            s[left], s[right] = s[right], s[left]
            left += 1
            right -= 1
        return 
    
    def reverseWord(self, s):
        n = len(s)
        start = end = 0
        
        while start < n:
            # go to the end of the word
            while end < n and s[end] != ' ':
                end += 1
            # reverse the word
            self.reverseStr(s, start, end - 1)
            # move to the next word
            start = end + 1
            end += 1
```
