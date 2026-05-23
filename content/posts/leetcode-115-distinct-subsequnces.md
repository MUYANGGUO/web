---
title: "LeetCode 115 Distinct Subsequnces - Hard"
date: "2021-01-01"
excerpt: "Given a string S and a string T, count the number of distinct subsequences of S which equals T."
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 115
comments: true
---

### 115. Distinct Subsequnces — Hard

[Open on LeetCode](https://leetcode.com/problems/distinct-subsequnces/)

## Problem

Given a string S and a string T, count the number of distinct subsequences of S which equals T.

A subsequence of a string is a new string which is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (ie, "ACE" is a subsequence of "ABCDE" while "AEC" is not).

It's guaranteed the answer fits on a 32-bit signed integer.

Example 1:

Input: S = "rabbbit", T = "rabbit"
Output: 3
Explanation:
As shown below, there are 3 ways you can generate "rabbit" from S.
(The caret symbol ^ means the chosen letters)

rabbbit
^^^^ ^^
rabbbit
^^ ^^^^
rabbbit
^^^ ^^^
Example 2:

Input: S = "babgbag", T = "bag"
Output: 5
Explanation:
As shown below, there are 5 ways you can generate "bag" from S.
(The caret symbol ^ means the chosen letters)

babgbag
^^ ^
babgbag
^^    ^
babgbag
^    ^^
babgbag
  ^  ^^
babgbag
    ^^^

## Solution

```python
### 此题和longest common subsequence 解题思路一致。但operator是加法。这里要仔细理解以下种类的含义。这题很难。


class Solution:
    def numDistinct(self, S: str, T: str) -> int:

        # write your code here
        m = len(S)
        n = len(T)
        
        if not T:
            return 1
        
        f = [[0] * (n + 1) for _ in range(m + 1)]
        
        for i in range(m + 1):
            for j in range(n + 1):
                if j == 0 and i == 0:
                    f[i][j] = 1
                    continue
                if j == 0:
                    f[i][j] = 1
                    continue
     
                if i > 0 and j > 0:
                    if S[i - 1] != T[j - 1]:
                        f[i][j] = f[i - 1][j]
                    else:
                        f[i][j] = f[i - 1][j] + f[i - 1][j - 1]
        return f[m][n]





### 动态数组的空间优化：

class Solution:
    def numDistinct(self, S: str, T: str) -> int:

        # write your code here
        m = len(S)
        n = len(T)
        
        if not T:
            return 1
        
        f = [[0] * (n + 1) for _ in range(2)]
        now, old = 0, 0
        for i in range(m + 1):
            old = now
            now = 1 - now
            for j in range(n + 1):
                if j == 0 and i == 0:
                    f[now][j] = 1
                    continue
                if j == 0:
                    f[now][j] = 1
                    continue
     
                if i > 0 and j > 0:
                    if S[i - 1] != T[j - 1]:
                        f[now][j] = f[old][j]
                    else:
                        f[now][j] = f[old][j] + f[old][j - 1]
        return f[now][n]
```
