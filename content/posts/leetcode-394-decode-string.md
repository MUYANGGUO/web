---
title: "LeetCode 394 Decode String - Medium"
date: "2021-01-01"
excerpt: "394. Decode String -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 394
comments: true
---

### 394. Decode String — Medium

[Open on LeetCode](https://leetcode.com/problems/decode-string/)

## Problem

394. Decode String -- Medium

Given an encoded string, return its decoded string.

The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times. Note that k is guaranteed to be a positive integer.

You may assume that the input string is always valid; No extra white spaces, square brackets are well-formed, etc.

Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, k. For example, there won't be input like 3a or 2[4].

Example 1:
Input: s = "3[a]2[bc]"
Output: "aaabcbc"

Example 2:
Input: s = "3[a2[c]]"
Output: "accaccacc"

Example 3:
Input: s = "2[abc]3[cd]ef"
Output: "abcabccdcdcdef"

Example 4:
Input: s = "abc3[cd]xyz"
Output: "abccdcdcdxyz"

## Solution

```python
### using stack:

class Solution:
    def decodeString(self, s: str) -> str:
        stack = []
        multiplier = 0
        res = ''
        for char in s:
            if char.isdigit():
                multiplier = multiplier*10 + int(char)
            elif char == '[':
                stack.append((multiplier, res))
                multiplier = 0
                res = ''
            elif char.isalpha():
                res += char
            elif char == ']':
                curMultiplier, prevString = stack.pop()
                res = prevString + curMultiplier * res
                
        return res

# using recursion:
class Solution:
    def decodeString(self, s: str) -> str:
	    if not s or len(s) == 0:
		    return s
	    result, position = self.dfs(0,s,0,'')
	    return result

    def dfs(self, position, s, prev_num, prev_str):
        while position < len(s):
            while s[position].isdigit():
                prev_num  = prev_num*10 + int(s[position])
                position += 1
            if s[position] == "[":
                #reset the prev_str
                returned_str, ending_pos = self.dfs(position+1, s, 0, "")
                #backtrack
                prev_str = prev_str + returned_str*prev_num
                position = ending_pos
                prev_num = 0
            #return the result
            elif s[position] == ']':
                return prev_str, position
            else:
                prev_str += s[position]
            position += 1
        return prev_str, position
```
