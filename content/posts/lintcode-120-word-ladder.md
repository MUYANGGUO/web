---
title: "LintCode 120 Word Ladder - Hard"
date: "2021-01-01"
excerpt: 120. Word Ladder
kind: leetcode
tags:
  - LintCode
  - Hard
  - Python
order: 120
comments: true
---

### 120. Word Ladder — Hard

[Open on LintCode](https://www.lintcode.com/problem/120/)

## Problem

120. Word Ladder

Given two words (start and end), and a dictionary, find the shortest transformation sequence from start to end, output the length of the sequence.
Transformation rule such that:

Only one letter can be changed at a time
Each intermediate word must exist in the dictionary. (Start and end words do not need to appear in the dictionary )
Example
Example 1:

Input：start = "a"，end = "c"，dict =["a","b","c"]
Output：2
Explanation：
"a"->"c"
Example 2:

Input：start ="hit"，end = "cog"，dict =["hot","dot","dog","lot","log"]
Output：5
Explanation：
"hit"->"hot"->"dot"->"dog"->"cog"

Notice
Return 0 if there is no such transformation sequence.
All words have the same length.
All words contain only lowercase alphabetic characters.
You may assume no duplicates in the word list.
You may assume beginWord and endWord are non-empty and are not the same.

## Solution

```python
### BFS :

class Solution:
    """
    @param: start: a string
    @param: end: a string
    @param: dict: a set of string
    @return: An integer
    """
    def ladderLength(self, start, end, dict):
        # write your code here
        ### BFS solution
        if end not in dict:
            dict.add(end)
        queue = collections.deque([start])
        visited = set([start])
        
        distance = 0
        while queue:
            distance += 1
            for i in range(len(queue)):
                word = queue.popleft()
                if word == end:
                    return distance
                
                for next_word in self.get_next_words(word):
                    if next_word not in dict or next_word in visited:
                        continue
                    queue.append(next_word)
                    visited.add(next_word) 

        return 0
        
    # O(26 * L^2)
    # L is the length of word
    def get_next_words(self, word):
        words = []
        for i in range(len(word)):
            left, right = word[:i], word[i + 1:]
            for char in 'abcdefghijklmnopqrstuvwxyz':
                if word[i] == char:
                    continue
                words.append(left + char + right)
        return words
```
