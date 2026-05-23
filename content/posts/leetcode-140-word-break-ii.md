---
title: "LeetCode 140 Word Break II - Hard"
date: "2021-01-01"
excerpt: "140. Word Break II -- Hard"
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 140
comments: true
---

### 140. Word Break II — Hard

[Open on LeetCode](https://leetcode.com/problems/word-break-ii/)

## Problem

140. Word Break II -- Hard

Given a non-empty string s and a dictionary wordDict containing a list of non-empty words, add spaces in s to construct a sentence where each word is a valid dictionary word. Return all such possible sentences.

Note:

The same word in the dictionary may be reused multiple times in the segmentation.
You may assume the dictionary does not contain duplicate words.

Example 1:
Input:
s = "catsanddog"
wordDict = ["cat", "cats", "and", "sand", "dog"]
Output:
[
  "cats and dog",
  "cat sand dog"
]

Example 2:
Input:
s = "pineapplepenapple"
wordDict = ["apple", "pen", "applepen", "pine", "pineapple"]
Output:
[
  "pine apple pen apple",
  "pineapple pen apple",
  "pine applepen apple"
]
Explanation: Note that you are allowed to reuse a dictionary word.

Example 3:
Input:
s = "catsandog"
wordDict = ["cats", "dog", "sand", "and", "cat"]
Output:
[]

## Solution

```python
class Solution:
    def __init__(self):
        self.res = []
        
    def dfs(self, s, path, dp, ind, word_dict):
        if not dp[ind + len(s)]:
            return
        if dp[ind+len(s)]:
            if not s:
                self.res.append(path.strip())
                return
            
            for i in range(1, len(s)+1):
                if s[:i] in word_dict:
                    self.dfs(s[i:], path+ " " + s[:i], dp, ind+i, word_dict)
                    
                    
    def word_break1(self, s, word_dict):
        N = len(s)
        dp = [False] * (N+1)
        dp[0] =True
        for i in range(1, len(s) + 1):
            for j in range(i):
                if dp[j] and s[j:i] in word_dict:
                    dp[i] = True
        return dp
        
    def wordBreak(self, s: str, wordDict: List[str]) -> List[str]:
        if not s:
            return [""]
        wordDict = set(wordDict)
        dp = self.word_break1(s, wordDict)
        print(dp)
        self.dfs(s, "", dp, 0, wordDict)
        return self.res
```
