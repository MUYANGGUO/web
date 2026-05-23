---
title: "LeetCode 125 Valid Palindrome - Easy"
date: "2021-01-01"
excerpt: "Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases."
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 125
comments: true
---

### 125. Valid Palindrome — Easy

[Open on LeetCode](https://leetcode.com/problems/valid-palindrome/)

## Problem

Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.

Note: For the purpose of this problem, we define empty string as valid palindrome.

Example 1:

Input: "A man, a plan, a canal: Panama"
Output: true
Example 2:

Input: "race a car"
Output: false

## Solution

```python
### 此题需要掌握的是 string lower(), isdigit(), isalpha(), ord(), isalnum() 等用法。
### 以及 reverse string reverse_s = s[::-1] 的判断方式，或者是利用指针来判断。

class Solution:
    def isPalindrome(self, s: str) -> bool:
        
        if not s:
            return True
        s = s.lower()
    
        temp = ''
        for char in s :
            # if ord(char) >= ord('a') and ord(char) <= ord('z') or char.isdigit():
            #     temp += char
            if char.isalnum():
                temp += char


        # start = 0
        # end = len(temp) - 1
        # while start <= end:
        #     if temp[start] != temp[end]:
        #         return False
        #     start += 1
        #     end -= 1
        # return True

        return temp == temp[::-1]
            
class Solution:
    # @param {string} s A string
    # @return {boolean} Whether the string is a valid palindrome
    def isPalindrome(self, s):
        start, end = 0, len(s) - 1
        while start < end:
            while start < end and not s[start].isalpha() and not s[start].isdigit():
                start += 1
            while start < end and not s[end].isalpha() and not s[end].isdigit():
                end -= 1
            if start < end and s[start].lower() != s[end].lower():
                return False
            start += 1
            end -= 1
        return True

class Solution:
    def isPalindrome(self, s: str) -> bool:
        left, right  = 0, len(s) - 1
        while left < right:
            
            ### 分别从左往右先找出去掉标点等是字母或数字的字符，更新left和right的指针。
            while left < right and not self.isValid(s[left]):
                left += 1
            while left < right and not self.isValid(s[right]):
                right -= 1
                
            ### 判断现在left和right是否满足palindrome的边界
            ### 此处注意细节，要再判断以下更新后的left和right是否越界！
            if left < right and s[left].lower() != s[right].lower():
                return False
            
            left += 1
            right -= 1
        
        return True
        
    def isValid(self, char):
        return char.isdigit() or char.isalpha()
```
