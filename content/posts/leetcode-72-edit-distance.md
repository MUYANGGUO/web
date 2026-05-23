---
title: "LeetCode 72 Edit Distance - Hard"
date: "2021-01-01"
excerpt: "Given two words word1 and word2, find the minimum number of operations required to convert word1 to word2."
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 72
comments: true
---

### 72. Edit Distance — Hard

[Open on LeetCode](https://leetcode.com/problems/edit-distance/)

## Problem

Given two words word1 and word2, find the minimum number of operations required to convert word1 to word2.

You have the following 3 operations permitted on a word:

Insert a character
Delete a character
Replace a character
Example 1:

Input: word1 = "horse", word2 = "ros"
Output: 3
Explanation: 
horse -> rorse (replace 'h' with 'r')
rorse -> rose (remove 'r')
rose -> ros (remove 'e')
Example 2:

Input: word1 = "intention", word2 = "execution"
Output: 5
Explanation: 
intention -> inention (remove 't')
inention -> enention (replace 'i' with 'e')
enention -> exention (replace 'n' with 'x')
exention -> exection (replace 'n' with 'c')
exection -> execution (insert 'u')

## Solution

```python
class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        ### DP problem:
        m = len(word1)
        n = len(word2)
        
        f = [[0] * (n + 1) for _ in range(m + 1)]
        
        for i in range(m + 1):
            for j in range(n + 1):
                ### when word1 is None, insert, insert, insert ... to word1 till word1 is word2
                ### after this step we need to jump to next, use continue to avoid the overwrite
                if i == 0:
                    f[0][j] = j
                    continue
                ### when word2 is None, delete, delete, delete ... from word1 till word1 is word2
                ### after this step we need to jump to next, use continue to avoid the overwrite
                if j == 0:
                    f[i][0] = i
                    continue
                if word1[i - 1] != word2[j - 1]:
                    ### delete, insert, replace
                    f[i][j] = min(f[i - 1][j], f[i][j - 1], f[i - 1][j - 1]) + 1
                else: ### no need to operate when equal
                    f[i][j] = f[i - 1][j - 1]
                
        return f[m][n]


### 滚动数组 空间优化：
class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        ### DP problem:
        m = len(word1)
        n = len(word2)
        
        f = [[0] * (n + 1) for _ in range(2)]
        old, now = 0, 0
        for i in range(m + 1):
            old = now 
            now = 1 - now
            for j in range(n + 1):
                ### when word1 is None, insert, insert, insert ... to word1 till word1 is word2
                ### after this step we need to jump to next, use continue to avoid the overwrite
                if i == 0:
                    f[now][j] = j
                    continue
                ### when word2 is None, delete, delete, delete ... from word1 till word1 is word2
                ### after this step we need to jump to next, use continue to avoid the overwrite
                if j == 0:
                    f[now][j] = i
                    continue
                if word1[i - 1] != word2[j - 1]:
                    ### delete, insert, replace
                    f[now][j] = min(f[old][j], f[now][j - 1], f[old][j - 1]) + 1
                else: ### no need to operate when equal
                    f[now][j] = f[old][j - 1]
                
        return f[now][n]
```
