---
title: "LeetCode 344 Reverse String - Easy"
date: "2021-01-01"
excerpt: "Write a function that reverses a string. The input string is given as an array of characters char[]."
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 344
comments: true
---

### 344. Reverse String — Easy

[Open on LeetCode](https://leetcode.com/problems/reverse-string/)

## Problem

Write a function that reverses a string. The input string is given as an array of characters char[].

Do not allocate extra space for another array, you must do this by modifying the input array in-place with O(1) extra memory.

You may assume all the characters consist of printable ascii characters.

 

Example 1:

Input: ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]
Example 2:

Input: ["H","a","n","n","a","h"]
Output: ["h","a","n","n","a","H"]

## Solution

```python
### 最好的解法： Two Pointers O(1) space, in-place Solution:

class Solution:
    def reverseString(self, s: List[str]) -> None:
        """
        Do not return anything, modify s in-place instead.
        """
        left, right = 0, len(s) - 1
        while left < right:
            s[left], s[right] = s[right], s[left]
            left, right = left + 1, right - 1


### 此题必须掌握这个小技巧。

### Recursion, In-Place, \mathcal{O}(N)O(N) Space ：
class Solution:
    def reverseString(self, s):
        def helper(left, right):
            if left < right:
                s[left], s[right] = s[right], s[left]
                helper(left + 1, right - 1)

        helper(0, len(s) - 1)
```
