---
title: "LintCode 1870 Number Of Substrings With All Zeroes - Medium"
date: "2021-01-01"
excerpt: 1870. number of substrings with all zeroes
kind: leetcode
tags:
  - LintCode
  - Medium
  - Python
order: 1870
comments: true
---

### 1870. Number Of Substrings With All Zeroes — Medium

[Open on LintCode](https://www.lintcode.com/problem/1870/)

## Problem

1870. number of substrings with all zeroes

Given a string str containing only0 or 1, please return the number of substrings that are consist of 0 .

Example
Example 1:

Input:"00010011"
Output:9
Explanation:
There are 5 substrings of "0",
There are 3 substrings of "00",
There is 1 substring of "000".
So return 9
Example 2:

Input:"010010"
Output:5
Notice
1<=|str|<=30000

## Solution

```python
class Solution:
    """
    @param str: the string
    @return: the number of substrings 
    """
    def stringCount(self, str):
        # Write your code here.
        
        if not str:
            return 0
        
        ### 这道题利用同向双指针
        ### i 为 0000 的首
        ### j 为 00001 的 1 的位置，即全零子串的结尾的下一位非0的位置
        
        ### 每次对i iterate 以后，找到结束的j，那么计数器加上 j - 1
        ### 这样就能出这段全零子串的组合数。
        ### 比如：
        ### 1 0 0 0 1 2 
        ### i j
        ###   i j
        ###   i   j
        ###   i     j
        ###   res += j - i = 4 - 1 = 3
        ###     i j
        ###     i   j
        ###   res += j - i = 3 + 4 - 2 = 3 + 2 = 5
        ###       i j
        ###   res += j - i = 5 + 4 - 3 = 5 + 1 = 6
        ###         i j
        ###           i j (out of bound, end)

        n = len(str)
        res = 0
        j = 1
        for i in range(n):
            if str[i] != '0':
                continue
            j = max(j, i + 1)
            while j < n and str[j] == '0':
                j += 1
            
            res += j - i
        
        return res
```
