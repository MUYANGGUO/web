---
title: "LeetCode 336 Palindrome Pairs - Hard"
date: "2021-01-01"
excerpt: 336. Palindrome Pairs
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 336
comments: true
---

### 336. Palindrome Pairs — Hard

[Open on LeetCode](https://leetcode.com/problems/palindrome-pairs/)

## Problem

336. Palindrome Pairs

Given a list of unique words, find all pairs of distinct indices (i, j) in the given list, so that the concatenation of the two words, i.e. words[i] + words[j] is a palindrome.

Example 1:

Input: ["abcd","dcba","lls","s","sssll"]
Output: [[0,1],[1,0],[3,2],[2,4]] 
Explanation: The palindromes are ["dcbaabcd","abcddcba","slls","llssssll"]
Example 2:

Input: ["bat","tab","cat"]
Output: [[0,1],[1,0]] 
Explanation: The palindromes are ["battab","tabbat"]

## Solution

```python
### Solution 1: Hash:

class Solution:
    def palindromePairs(self, words: List[str]) -> List[List[int]]:
        res = []
        table = {}
        if not words:
            return res
            
        for index, word in enumerate(words):
            table[word] = index
        
        for index, word in enumerate(words):
            for i in range(len(word) + 1):
                ### 前缀，后缀
                left, right = word[:i], word[i:]
                
                if self.isPalindrome(left):
                    reversedRight = right[::-1]
                    if reversedRight in table and table[reversedRight] != index:
                        res.append([table[reversedRight], index])
                        
                if len(right) > 0 and self.isPalindrome(right):
                    reversedLeft = left[::-1]
                    if reversedLeft in table and table[reversedLeft] != index:
                        res.append([index, table[reversedLeft]])
        return res
                
    def isPalindrome(self, s):
        return s == s[::-1]



### Solution 2: Trie:

class TrieNode:
    def __init__(self):
        self.next = collections.defaultdict(TrieNode)
        self.ending_word = -1
        self.palindrome_suffixes = []

class Solution:
    def palindromePairs(self, words):

        # Create the Trie and add the reverses of all the words.
        trie = TrieNode()
        for i, word in enumerate(words):
            word = word[::-1] # We want to insert the reverse.
            current_level = trie
            for j, c in enumerate(word):
                # Check if remainder of word is a palindrome.
                if word[j:] == word[j:][::-1]:# Is the word the same as its reverse?
                    current_level.palindrome_suffixes.append(i)
                # Move down the trie.
                current_level = current_level.next[c]
            current_level.ending_word = i

        # Look up each word in the Trie and find palindrome pairs.
        solutions = []
        for i, word in enumerate(words):
            current_level = trie
            for j, c in enumerate(word):
                # Check for case 3.
                if current_level.ending_word != -1:
                    if word[j:] == word[j:][::-1]: # Is the word the same as its reverse?
                        solutions.append([i, current_level.ending_word])
                if c not in current_level.next:
                    break
                current_level = current_level.next[c]
            else: # Case 1 and 2 only come up if whole word was iterated.
                # Check for case 1.
                if current_level.ending_word != -1 and current_level.ending_word != i:
                    solutions.append([i, current_level.ending_word])
                # Check for case 2.
                for j in current_level.palindrome_suffixes:
                    solutions.append([i, j])
        return solutions
```
