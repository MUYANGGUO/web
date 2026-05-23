---
title: "LintCode 1375 Substring With At Least K Distinct Characters - Medium"
date: "2021-01-01"
excerpt: 1375. Substring With At Least K Distinct Characters
kind: leetcode
tags:
  - LintCode
  - Medium
  - Python
order: 1375
comments: true
---

### 1375. Substring With At Least K Distinct Characters — Medium

[Open on LintCode](https://www.lintcode.com/problem/1375/)

## Problem

1375. Substring With At Least K Distinct Characters

Given a string S with only lowercase characters.

Return the number of substrings that contains at least k distinct characters.

Example
Example 1:

Input: S = "abcabcabca", k = 4
Output: 0

Explanation: There are only three distinct characters in the string.
Example 2:

Input: S = "abcabcabcabc", k = 3
Output: 55

Explanation: Any substring whose length is not smaller than 3 contains a, b, c.
    For example, there are 10 substrings whose length are 3, "abc", "bca", "cab" ... "abc"
    There are 9 substrings whose length are 4, "abca", "bcab", "cabc" ... "cabc"
    ...
    There is 1 substring whose length is 12, "abcabcabcabc"
    So the answer is 1 + 2 + ... + 10 = 55.

Notice
10 ≤ length(S) ≤ 1,000,000
1 ≤ k ≤ 26

## Solution

```python
class Solution:
    """
    @param s: a string
    @param k: an integer
    @return: the number of substrings there are that contain at least k distinct characters
    """
    def kDistinctCharacters(self, s, k):
        # Write your code here
        left = 0
        counter = {}
        answer = 0
        for right in range(len(s)):
            counter[s[right]] = counter.get(s[right], 0) + 1
            while left <= right and len(counter) >= k:
                counter[s[left]] -= 1
                if counter[s[left]] == 0:
                    del counter[s[left]]
                left += 1
                    
            if len(counter) == k - 1 and left > 0 and s[left - 1] not in counter:
                answer += left
                
        
        return answer
```
