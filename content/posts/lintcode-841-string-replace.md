---
title: "LintCode 841 String Replace - Hard"
date: "2021-01-01"
excerpt: 841. String Replace
kind: leetcode
tags:
  - LintCode
  - Hard
  - Python
order: 841
comments: true
---

### 841. String Replace — Hard

[Open on LintCode](https://www.lintcode.com/problem/841/)

## Problem

841. String Replace

Given two identical-sized string array A, B and a string S. All substrings A appearing in S are replaced by B.(Notice: From left to right, it must be replaced if it can be replaced. If there are multiple alternatives, replace longer priorities. After the replacement of the characters can't be replaced again.)

Example
Example 1

Input:
A = ["ab","aba"]
B = ["cc","ccc"]
S = "ababa"

Output: "cccba"
Explanation: In accordance with the rules, the substring that can be replaced is "ab" or "aba". Since "aba" is longer, we replace "aba" with "ccc". 
Example 2

Input:
A = ["ab","aba"]
B = ["cc","ccc"]
S = "aaaaa"

Output: "aaaaa"
Explanation: S does not contain strings in A, so no replacement is done.
Example 3

Input:
A = ["cd","dab","ab"]
B = ["cc","aaa","dd"]
S = "cdab"

Output: "ccdd"
Explanation: From left to right, you can find the "cd" can be replaced at first, so after the replacement becomes "ccab", then you can find "ab" can be replaced, so the string after the replacement is "ccdd".
Notice
The size of each string array does not exceed 100, the total string length does not exceed 50000.
The lengths of A [i] and B [i] are equal.
The length of S does not exceed 50000.
All characters are lowercase letters.
We guarantee that the A array does not have the same string

## Solution

```python
### Rolling Hash:

class Solution:
    """
    @param a: The A array
    @param b: The B array
    @param s: The S string
    @return: The answer
    """
    def stringReplace(self, a, b, s):
        # Write your code here
        
        ### rolling hash:
        BASE = 31
        MOD = 100000007
        POWER = 1
        A_hash = []
        for a_string in a:
            a_hash = 0
            for char in a_string:
                a_hash = (a_hash * BASE + ord(char)) % MOD
            A_hash.append(a_hash)
        
        POWER_list = [1]
        S_hash = [0]
        s_hash = 0
        for i in s:
            s_hash = (s_hash * BASE + ord(i)) % MOD
            S_hash.append(s_hash)
            POWER = (POWER * BASE) % MOD
            POWER_list.append(POWER)
            
        res = ''
        i = 0
        while i < len(s):
            max_length = 0
            found = -1
            for ind, A in enumerate(a):
                if len(A) + i > len(s):
                    continue
                S_sub = (S_hash[i + len(A)] - POWER_list[len(A)] * S_hash[i]) % MOD
                A_sub = A_hash[ind]
                A_sub = A_sub % MOD
                S_sub = (S_sub + MOD) % MOD
                if A_sub == S_sub and max_length < len(A):
                    max_length = len(A)
                    found = ind
            if found == -1:
                res += s[i]
                i += 1
            else:
                res += b[found]
                i += max_length
        return res
```
