---
title: "LeetCode 1295 Find Numbers With Even Number Of Digits - Easy"
date: "2021-01-01"
excerpt: "Given an array nums of integers, return how many of them contain an even number of digits."
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 1295
comments: true
---

### 1295. Find Numbers With Even Number Of Digits — Easy

[Open on LeetCode](https://leetcode.com/problems/find-numbers-with-even-number-of-digits/)

## Problem

Given an array nums of integers, return how many of them contain an even number of digits.
 

Example 1:

Input: nums = [12,345,2,6,7896]
Output: 2
Explanation: 
12 contains 2 digits (even number of digits). 
345 contains 3 digits (odd number of digits). 
2 contains 1 digit (odd number of digits). 
6 contains 1 digit (odd number of digits). 
7896 contains 4 digits (even number of digits). 
Therefore only 12 and 7896 contain an even number of digits.
Example 2:

Input: nums = [555,901,482,1771]
Output: 1 
Explanation: 
Only 1771 contains an even number of digits.

## Solution

```python
### Array Problem:

### Solution 1:
class Solution:
    def findNumbers(self, nums: List[int]) -> int:
        count = 0
        for num in nums:
            digit_count = 0
            while num > 0:
                num = num // 10
                digit_count += 1
            if digit_count % 2 == 0:
                count += 1
        return count

### Solution 2:

class Solution:
    def findNumbers(self, nums: List[int]) -> int:
        return len([x for x in nums if len(str(x)) % 2 == 0])       

### Solution 3:

class Solution:
    def findNumbers(self, nums: List[int]) -> int:
        return sum(int(math.log10(n)) % 2 for n in nums) # log10(n) + 1 is the # of digits.
```
