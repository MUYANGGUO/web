---
title: "LeetCode 14 Longest Common Prefix - Easy"
date: "2021-01-01"
excerpt: 14. Longest Common Prefix
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 14
comments: true
---

### 14. Longest Common Prefix — Easy

[Open on LeetCode](https://leetcode.com/problems/longest-common-prefix/)

## Problem

14. Longest Common Prefix

Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".

Example 1:

Input: ["flower","flow","flight"]
Output: "fl"
Example 2:

Input: ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.
Note:

All given inputs are in lowercase letters a-z.

## Solution

```python
# Trie Solution:

class TrieNode:
    def __init__(self):
        self.children = {}
        self.end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def add(self, word):
        if not word:
            return 
        node = self.root
        for char in word:
            # if not in the children
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        # mark when at the end of the word:
        node.end = True
        return

class Solution:
    def longestCommonPrefix(self, strs: List[str]) -> str:
        if not strs:
            return ""
        trie = Trie()
        for str in strs:
            # avoid empty str in strs
            if str == "":
                return ""
            trie.add(str)
        
        lcp = self.searchLCP(trie.root)
        return lcp
    
    def searchLCP(self, node):
        res = ''
        while node:
            # the LCP happens either at the first word end, or the first ramification happens
            # 所以这里可以return结果
            if node.end or len(node.children) > 1:
                return res
            char = list(node.children)[0]
            res += char
            node = node.children[char]
        return res
```
