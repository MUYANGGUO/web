---
title: "LeetCode 680 Valid Palindrome II - Easy"
date: "2021-01-01"
excerpt: "Given a non-empty string s, you may delete at most one character. Judge whether you can make it a palindrome."
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 680
comments: true
---

### 680. Valid Palindrome II — Easy

[Open on LeetCode](https://leetcode.com/problems/valid-palindrome-ii/)

## Problem

Given a non-empty string s, you may delete at most one character. Judge whether you can make it a palindrome.

Example 1:
Input: "aba"
Output: True
Example 2:
Input: "abca"
Output: True
Explanation: You could delete the character 'c'.
Note:
The string will only contain lowercase characters a-z. The maximum length of the string is 50000.

## Solution

```python
### 双指针的做法，这道题的思想是贪心法，就是找到不一样的以后接着再往下找，只要下面再有一次不一样，那么就不行。

class Solution:
    def validPalindrome(self, s):
        if not s:
            return False
        
        ### 先找到不一样的left和right在哪
        left, right = self.find_ptrs(s, 0, len(s) - 1)
       
        ### 如果筛出来的left和right相等，证明不存在不相等的字符，所以直接return True
        if left == right:
            return True
        else:
            ### 如果找到了不相等的字符的位置，分清况讨论，这里用一个子函数封装了一下：
            return self.isPalindrome(s, left + 1, right) or self.isPalindrome(s, left, right - 1)
        
    ### 此处注意这两个子函数设计的时候， 要避免代码重复，所以需要机智的利用返回指针和判断指针位置的方法。
    ### 不要写成使用两次双指针代码相同，但却不把逻辑封装。
    def find_ptrs(self, s, left, right):
        while left < right :
            if s[left] != s[right]:
                return left, right     
            left += 1
            right -= 1
        return left, right
    
    def isPalindrome(self, s, left, right):
        res_left, res_right = self.find_ptrs(s, left, right)
        return res_left >= res_right
```
