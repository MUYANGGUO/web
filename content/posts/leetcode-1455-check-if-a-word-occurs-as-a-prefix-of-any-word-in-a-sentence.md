---
title: "LeetCode 1455 Check If A Word Occurs As A Prefix Of Any Word In A Sentence - Easy"
date: "2021-01-01"
excerpt: 1455. Check If a Word Occurs As a Prefix of Any Word in a Sentence
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 1455
comments: true
---

### 1455. Check If A Word Occurs As A Prefix Of Any Word In A Sentence — Easy

[Open on LeetCode](https://leetcode.com/problems/check-if-a-word-occurs-as-a-prefix-of-any-word-in-a-sentence/)

## Problem

1455. Check If a Word Occurs As a Prefix of Any Word in a Sentence

Given a sentence that consists of some words separated by a single space, and a searchWord.

You have to check if searchWord is a prefix of any word in sentence.

Return the index of the word in sentence where searchWord is a prefix of this word (1-indexed).

If searchWord is a prefix of more than one word, return the index of the first word (minimum index). If there is no such word return -1.

A prefix of a string S is any leading contiguous substring of S.

 

Example 1:

Input: sentence = "i love eating burger", searchWord = "burg"
Output: 4
Explanation: "burg" is prefix of "burger" which is the 4th word in the sentence.
Example 2:

Input: sentence = "this problem is an easy problem", searchWord = "pro"
Output: 2
Explanation: "pro" is prefix of "problem" which is the 2nd and the 6th word in the sentence, but we return 2 as it's the minimal index.
Example 3:

Input: sentence = "i am tired", searchWord = "you"
Output: -1
Explanation: "you" is not a prefix of any word in the sentence.
Example 4:

Input: sentence = "i use triple pillow", searchWord = "pill"
Output: 4
Example 5:

Input: sentence = "hello from the other side", searchWord = "they"
Output: -1

## Solution

```python
class Solution:
    def isPrefixOfWord(self, sentence: str, searchWord: str) -> int:
        if not sentence:
            return -1

        for i, word in enumerate(sentence.split(' ')):
            if word.startswith(searchWord):
                return i + 1
        
        return -1
```
