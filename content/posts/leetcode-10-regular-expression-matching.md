---
title: "LeetCode 10 Regular Expression Matching - Hard"
date: "2021-01-01"
excerpt: "Given an input string (s) and a pattern (p), implement regular expression matching with support for '.' and '*'."
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 10
comments: true
---

### 10. Regular Expression Matching — Hard

[Open on LeetCode](https://leetcode.com/problems/regular-expression-matching/)

## Problem

Given an input string (s) and a pattern (p), implement regular expression matching with support for '.' and '*'.

'.' Matches any single character.
'*' Matches zero or more of the preceding element.
The matching should cover the entire input string (not partial).

Note:

s could be empty and contains only lowercase letters a-z.
p could be empty and contains only lowercase letters a-z, and characters like . or *.
Example 1:

Input:
s = "aa"
p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".
Example 2:

Input:
s = "aa"
p = "a*"
Output: true
Explanation: '*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes "aa".
Example 3:

Input:
s = "ab"
p = ".*"
Output: true
Explanation: ".*" means "zero or more (*) of any character (.)".
Example 4:

Input:
s = "aab"
p = "c*a*b"
Output: true
Explanation: c can be repeated 0 times, a can be repeated 1 time. Therefore, it matches "aab".
Example 5:

Input:
s = "mississippi"
p = "mis*is*p*."
Output: false

## Solution

```python
### DP type hard problem 此题的边界条件非常难写，需要仔细考虑任何一种情况。

class Solution(object):
    def isMatch(self, s, p):
        m = len(s)
        n = len(p)

        f = [[False] * (n + 1) for _ in range(m + 1)]
        
        for i in range(m + 1):
            for j in range(n + 1): ### follow the last element of p
                ### initialization 
                print(i, j)
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
                    if i > 0 and (p[j - 1] == '.' or (p[j - 1] == s[i - 1])):
                        f[i][j] = f[i - 1][j - 1]

                
                ### case 2' p[j - 1] is '*', need to check p[j - 2]
                else:
                    ## example: last two elements is c*,
                    ### delete 'c'
                    if j > 1:
                        f[i][j] = f[i][j - 2]
                    ### repeat 'c' 
                    if i > 0 and j > 1 and (p[j - 2] == '.' or (p[j - 2] == s[i - 1])):
                        f[i][j] = f[i][j] or f[i - 1][j]
                    ### satisfy either case to determine f[i][j], so use or to include the first if in second if statement.
           
        return f[m][n]
                    
### 滚动数组，注意细节。滚动数组会保留之前的结果，需要考虑相反case的时候注意覆盖。

class Solution(object):
    def isMatch(self, s, p):
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
                    if i > 0 and (p[j - 1] == '.' or (p[j - 1] == s[i - 1])):
                        f[now][j] = f[old][j - 1]
                    ### Attention!!! Must have this line !!! 这里就是在相反case的时候需要覆盖为新的赋值。
                    else:
                        f[now][j] = False

                ### case 2' p[j - 1] is '*', need to check p[j - 2]
                else:
                    ## example: last two elements is c*,
                    ### delete 'c'
                    if j > 1:
                        f[now][j] = f[now][j - 2]
                    ### repeat 'c' 
                    if i > 0 and j > 1 and (p[j - 2] == '.' or (p[j - 2] == s[i - 1])):
                        f[now][j] = f[now][j] or f[old][j]
                    ### satisfy either case to determine f[i][j], so use or to include the first if in second if statement.
           
        return f[now][n]
                    

### https://leetcode.com/problems/regular-expression-matching/solution/

class Solution(object):
    def isMatch(self, text, pattern):
        memo = {}
        def dp(i, j):
            if (i, j) not in memo:
                if j == len(pattern):
                    ans = i == len(text)
                else:
                    first_match = i < len(text) and pattern[j] in {text[i], '.'}
                    if j+1 < len(pattern) and pattern[j+1] == '*':
                        ans = dp(i, j+2) or first_match and dp(i+1, j)
                    else:
                        ans = first_match and dp(i+1, j+1)

                memo[i, j] = ans
            return memo[i, j]
```
