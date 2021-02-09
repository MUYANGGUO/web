---
layout: leetcode-page
title: "Leetcode 10 Regular Expression Matching- Hard"
date: 2021-01-01
order: 10
excerpt: ""
leetcode: true
tags: [Leetcode]
comments: true
---

<h2> 10. Regular Expression Matching - Hard  </h2>

[Go to Leetcode](https://leetcode.com/problems/regular-expression-matching/)

Given an input string (s) and a pattern (p), implement regular expression matching with support for '.' and '*' where: 

    - '.' Matches any single character.​​​​
    
    - '*' Matches zero or more of the preceding element.
  
The matching should cover the entire input string (not partial).

<code>
Examples:
</code>

```
Input: s = "aa", p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".

Input: s = "aa", p = "a*"
Output: true
Explanation: '*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes "aa".

Input: s = "ab", p = ".*"
Output: true
Explanation: ".*" means "zero or more (*) of any character (.)".

Input: s = "aab", p = "c*a*b"
Output: true
Explanation: c can be repeated 0 times, a can be repeated 1 time. Therefore, it matches "aab".

Input: s = "mississippi", p = "mis*is*p*."
Output: false
```

<code>
Solution 1:
</code>

<code>
DP, Space O(NM), Time O(NM)
</code>

```python
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
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
```

<code>
Solution 2:
</code>

<code>
DP， Optimized with rotate array, Space O(2N), Time O(NM)
</code>

``` python
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        m = len(s)
        n = len(p)
        dp = [[False] * (n + 1) for _ in range(2)]
        for i in range(m + 1):
            for j in range(n + 1):
                if i == 0 and j == 0:
                    dp[i % 2][j] = True
                    continue
                if j == 0:
                    dp[i % 2][j] = False
                    continue
                if p[j - 1] == '*':
                    # c*
                    # remove c*
                    if j > 1:
                        dp[i % 2][j] = dp[i % 2][j - 2]
                    # hold c*
                    # check whether s ending is c
                    if i > 0 and j > 1 and (p[j - 2] == s[i - 1] or p[j - 2] == '.'):
                        dp[i % 2][j] = dp[i % 2][j] or dp[(i - 1) % 2][j]
                else:
                    if i > 0 and j > 0 and (p[j - 1] == s[i - 1] or p[j - 1] == '.'):
                        dp[i % 2][j] = dp[(i - 1) % 2][j - 1]
                    else:
                        dp[i % 2][j] = False
        return dp[m % 2][n]
```
