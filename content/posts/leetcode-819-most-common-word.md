---
title: "LeetCode 819 Most Common Word - Easy"
date: "2021-01-01"
excerpt: 819. Most Common Word
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 819
comments: true
---

### 819. Most Common Word — Easy

[Open on LeetCode](https://leetcode.com/problems/most-common-word/)

## Problem

819. Most Common Word

Given a paragraph and a list of banned words, return the most frequent word that is not in the list of banned words.  It is guaranteed there is at least one word that isn't banned, and that the answer is unique.

Words in the list of banned words are given in lowercase, and free of punctuation.  Words in the paragraph are not case sensitive.  The answer is in lowercase.

Example:

Input: 
paragraph = "Bob hit a ball, the hit BALL flew far after it was hit."
banned = ["hit"]
Output: "ball"
Explanation: 
"hit" occurs 3 times, but it is a banned word.
"ball" occurs twice (and no other word does), so it is the most frequent non-banned word in the paragraph. 
Note that words in the paragraph are not case sensitive,
that punctuation is ignored (even if adjacent to words, such as "ball,"), 
and that "hit" isn't the answer even though it occurs more because it is banned.
 

Note:

1 <= paragraph.length <= 1000.
0 <= banned.length <= 100.
1 <= banned[i].length <= 10.
The answer is unique, and written in lowercase (even if its occurrences in paragraph may have uppercase symbols, and even if it is a proper noun.)
paragraph only consists of letters, spaces, or the punctuation symbols !?',;.
There are no hyphens or hyphenated words.
Words only consist of letters, never apostrophes or other punctuation symbols.

## Solution

```python
class Solution:
    def mostCommonWord(self, paragraph: str, banned: List[str]) -> str:
        normalized = ''
        for char in paragraph:
            if char.isalnum():
                normalized += char.lower()
                continue
            normalized += ' '
        words = normalized.split()
        banned = set(banned)
        most_common = dict()
        for word in words:
            if word not in banned:
                most_common[word] = most_common.get(word, 0) + 1
        max_count = max(most_common.values())
        for key in most_common:
            if most_common[key] == max_count:
                return key
        return None
```
