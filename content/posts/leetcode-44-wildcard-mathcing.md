---
title: "LeetCode 44 Wildcard Mathcing - Hard"
date: "2021-01-01"
excerpt: "Given an input string (s) and a pattern (p), implement wildcard pattern matching with support for '?' and '*'."
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 44
comments: true
---

### 44. Wildcard Mathcing — Hard

[Open on LeetCode](https://leetcode.com/problems/wildcard-mathcing/)

## Problem

Given an input string (s) and a pattern (p), implement wildcard pattern matching with support for '?' and '*'.

'?' Matches any single character.
'*' Matches any sequence of characters (including the empty sequence).
The matching should cover the entire input string (not partial).

Note:

s could be empty and contains only lowercase letters a-z.
p could be empty and contains only lowercase letters a-z, and characters like ? or *.
Example 1:

Input:
s = "aa"
p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".
Example 2:

Input:
s = "aa"
p = "*"
Output: true
Explanation: '*' matches any sequence.
Example 3:

Input:
s = "cb"
p = "?a"
Output: false
Explanation: '?' matches 'c', but the second letter is 'a', which does not match 'b'.
Example 4:

Input:
s = "adceb"
p = "*a*b"
Output: true
Explanation: The first '*' matches the empty sequence, while the second '*' matches the substring "dce".
Example 5:

Input:
s = "acdcb"
p = "a*c?b"
Output: false

## Solution

```python
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        m = len(s)
        n = len(p)

        f = [[False] * (n + 1) for _ in range(m + 1)]
        
        for i in range(m + 1):
            for j in range(n + 1): ### follow the last element of p
                ### initialization 
                if i == 0 and j == 0:
                    f[i][j] = True
                    continue

                ### initialization, if p is empty, cant match with s
                if j == 0:
                    f[i][j] = False
                    continue

                ### two cases
                ### case 1' p[j - 1] is not '*'
                if p[j - 1] != '*':
                    ### Attention! must check i, if i > 0
                    if i > 0 and (p[j - 1] == '?' or (p[j - 1] == s[i - 1])):
                        f[i][j] = f[i - 1][j - 1]

                
                ### case 2' p[j - 1] is '*', 
                else:
                    ## example: last elements is abcc*,
                    ### type 1: delete '*', match empty, only when p[j - 2] == s[j - 1] or p[j - 2] == '?' 
                    ### type 2: match multiple, a slice of string
                    ### thus
                    ### type 1: * represent empty
                    f[i][j] = f[i][j - 1]
                    ### type 2: * represent multiple
                    if i > 0:
                        ### 这里的小技巧，无须iterate over j，因为虽然*假设replace multiple，他也满足这个条件。于是我们把判定交到下一步，避免了冗余。
                        f[i][j] = f[i][j] or f[i - 1][j]
                    
        return f[m][n]

### 滚动数组的优化，注意细节，相反的情况需要覆盖成新的赋值。
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        m = len(s)
        n = len(p)

        f = [[False] * (n + 1) for _ in range(2)]
        
        now = 0
        old = 0
        for i in range(m + 1):
            old = now
            now = 1 - now 
            for j in range(n + 1): ### follow the last element of p
                ### initialization 
                if i == 0 and j == 0:
                    f[now][j] = True
                    continue

                ### initialization, if p is empty, cant match with s
                if j == 0:
                    f[now][j] = False
                    continue

                ### two cases
                ### case 1' p[j - 1] is not '*'
                if p[j - 1] != '*':
                    ### Attention! must check i, if i > 0
                    if i > 0 and (p[j - 1] == '?' or (p[j - 1] == s[i - 1])):
                        f[now][j] = f[old][j - 1]
                    else:
                        f[now][j] = False

                
                ### case 2' p[j - 1] is '*', 
                else:
                    ## example: last elements is abcc*,
                    ### delete '*', match empty, only when p[j - 2] == s[j - 1] or p[j - 2] == '?' 
                    ### or match multiple, a slice of string
                    ### thus
                    ### type 1: * represent empty
                    f[now][j] = f[now][j - 1]
                    ### type 2: * represent multiple
                    if i > 0:
                        ### 这里的小技巧，无须iterate over j，因为虽然*假设replace multiple，他也满足这个条件。于是我们把判定交到下一步，避免了冗余。
                        f[now][j] = f[now][j] or f[old][j]
         
                    
        return f[now][n]
```
