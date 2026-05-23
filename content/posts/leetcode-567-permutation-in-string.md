---
title: "LeetCode 567 Permutation In String - Medium"
date: "2021-01-01"
excerpt: "567. Permutation in String -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 567
comments: true
---

### 567. Permutation In String — Medium

[Open on LeetCode](https://leetcode.com/problems/permutation-in-string/)

## Problem

567. Permutation in String -- Medium

Given two strings s1 and s2, write a function to return true if s2 contains the permutation of s1. In other words, one of the first string's permutations is the substring of the second string.


Example 1:

Input: s1 = "ab" s2 = "eidbaooo"
Output: True
Explanation: s2 contains one permutation of s1 ("ba").

Example 2:

Input:s1= "ab" s2 = "eidboaoo"
Output: False
 

Constraints:

The input strings only contain lower case letters.
The length of both given strings is in range [1, 10,000].

## Solution

```python
class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        #先扫一遍字符串s1，统计各个字母的个数，
        #取s2前s1长度个字符，匹配个数是否相符，
        #若不相符，去除最前面的字符，加入后一个字符，
        #重新比对，直至个数匹配，或扫描完s2。
        l1 = len(s1)
        need = collections.Counter(s1)
        missing = l1
        for i,c in enumerate(s2):
            if c in need: 
                if need[c] > 0: missing -= 1    
                need[c] -= 1                    
            if i>=l1 and s2[i-l1] in need:      
                need[s2[i-l1]] += 1            
                if need[s2[i-l1]]>0: missing += 1  
            if missing == 0:
                return True
        return False
```
