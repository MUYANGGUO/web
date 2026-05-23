---
title: "LeetCode 320 Generalized Abbreviation - Medium"
date: "2021-01-01"
excerpt: "320. Generalized Abbreviation -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 320
comments: true
---

### 320. Generalized Abbreviation — Medium

[Open on LeetCode](https://leetcode.com/problems/generalized-abbreviation/)

## Problem

320. Generalized Abbreviation -- Medium

A word's generalized abbreviation can be constructed by taking any number of non-overlapping substrings and replacing them with their respective lengths. For example, "abcde" can be abbreviated into "a3e" ("bcd" turned into "3"), "1bcd1" ("a" and "e" both turned into "1"), and "23" ("ab" turned into "2" and "cde" turned into "3").

Given a string word, return a list of all the possible generalized abbreviations of word. Return the answer in any order.


Example 1:

Input: word = "word"
Output: ["4","3d","2r1","2rd","1o2","1o1d","1or1","1ord","w3","w2d","w1r1","w1rd","wo2","wo1d","wor1","word"]

Example 2:

Input: word = "a"
Output: ["1","a"]
 

Constraints:

1 <= word.length <= 15
word consists of only lowercase English letters.

## Solution

```python
class Solution:
    def generateAbbreviations(self, word: str) -> List[str]:
        res = []
        self.helper(res, word, 0, "", 0)
        return res
    # 通过DFS对所有缩写的可能进行搜索，
    # 从字符串的第一个字符开始，
    # 依次搜索该字位符进行和不进行缩写操作后可能的情况，直到搜索至最后一位。
    def helper(self, res, word, pos, cur, count):
        if pos == len(word):
            if count > 0:
                cur = cur + str(count)
            res.append(cur)
        else:
            self.helper(res, word, pos + 1, cur, count + 1)
            if count > 0:
                cur = cur + str(count) + word[pos]
            else:
                cur = cur + word[pos]
            self.helper(res, word, pos + 1, cur, 0)
```
