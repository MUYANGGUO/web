---
title: "LeetCode 273 Integer To Egnlish Words - Hard"
date: "2021-01-01"
excerpt: "273. Integer to English Words -- Hard"
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 273
comments: true
---

### 273. Integer To Egnlish Words — Hard

[Open on LeetCode](https://leetcode.com/problems/integer-to-egnlish-words/)

## Problem

273. Integer to English Words -- Hard

Convert a non-negative integer num to its English words representation.

Example 1:
Input: num = 123
Output: "One Hundred Twenty Three"

Example 2:
Input: num = 12345
Output: "Twelve Thousand Three Hundred Forty Five"

Example 3:
Input: num = 1234567
Output: "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"

Example 4:
Input: num = 1234567891
Output: "One Billion Two Hundred Thirty Four Million Five Hundred Sixty Seven Thousand Eight Hundred Ninety One"
 
Constraints:
0 <= num <= 231 - 1

## Solution

```python
lessThan20 = ["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"]
tens = ["","Ten","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"]
thousands = ["","Thousand","Million","Billion"]

class Solution:
    def numberToWords(self, num):
        if num == 0:
            return "Zero"
        res = ""
        for i in range(len(thousands)):
            if num % 1000 != 0:
                res = self.helper(num%1000) + thousands[i] + " " + res
            num //= 1000
        return res.strip()

    def helper(self, num):
        if num == 0:
            return ""
        elif num < 20:
            return lessThan20[num] + " "
        elif num < 100:
            return tens[num//10] + " " + self.helper(num%10)
        else:
            return lessThan20[num//100] + " Hundred " + self.helper(num%100)
```
