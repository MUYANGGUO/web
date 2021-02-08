---
layout: leetcode-page
title: "Leetcode 5 Longest Palindromic Substring - Medium"
date: 2021-01-01
order: 5
excerpt: ""
leetcode: true
tags: [Leetcode]
comments: true
---

<h2> 5. Longest Palindromic Substring - Medium  </h2>

[Go to Leetcode](https://leetcode.com/problems/longest-palindromic-substring/)

Given a string s, return the longest palindromic substring in s.

<code>
Example 1:
</code>

```
Input: s = "babad"
Output: "bab"
Note: "aba" is also a valid answer.
```

<code>
Example 2:
</code>

```
Input: s = "cbbd"
Output: "bb"
```

<code>
Example 3:
</code>

```
Input: s = "a"
Output: "a"
```

<code>
Solution 1:
</code>

<code>
DP, Space O(N^2), Time O(N^2)
</code>

``` python
class Solution:
    def longestPalindrome(self, s: str) -> str:
        if not s:
            return s
        n = len(s)
        # DP, DP[x][y] meaning s[x][y] is a palindrome or not.
        dp = [[False] * n for _ in range(n)]
        # Initialization
        # for length = 1
        for i in range(n):
            dp[i][i] = True
        # for length = 2
        for i in range(1, n):
            dp[i][i - 1] = True
        ### condition is : f[i][j] = (s[i] == s[j] and f[i + 1][j - 1])
        ### when length = 2, Eg. f[0][1] = (s[0] == s[1] and f[1][0])
        ### if i > j，initialize as such f[i][i - 1] = True，so we can compare s[i] s[i-1]
            
        longest, start, end = 1, 0, 0
        # update DP according length
        for length in range(1, n):
            for i in range(n - length):
                # update j accordingly
                j = i + length
                dp[i][j] = s[i] == s[j] and dp[i + 1][j - 1]
                if dp[i][j] and length + 1 > longest:
                    longest = length + 1
                    start, end = i, j

        return s[start:end + 1]
```

