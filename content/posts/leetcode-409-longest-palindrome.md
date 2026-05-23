---
title: "LeetCode 409 Longest Palindrome - Easy"
date: "2021-01-01"
excerpt: "Given a string which consists of lowercase or uppercase letters, find the length of the longest palindromes that can be built with those …"
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 409
comments: true
---

### 409. Longest Palindrome — Easy

[Open on LeetCode](https://leetcode.com/problems/longest-palindrome/)

## Problem

Given a string which consists of lowercase or uppercase letters, find the length of the longest palindromes that can be built with those letters.

This is case sensitive, for example "Aa" is not considered a palindrome here.

Note:
Assume the length of given string will not exceed 1,010.

Example:

Input:
"abccccdd"

Output:
7

Explanation:
One longest palindrome that can be built is "dccaccd", whose length is 7.

## Solution

```python
class Solution:
    def longestPalindrome(self, s: str) -> int:
        if not s:
            return 0
        
        count = {}
        
        for letter in s:
            if letter in count:
                count[letter] += 1
            else:
                count[letter] = 1
        isodd = 0
        res = 0
        for val in count.values():
            if val % 2 != 0:
                isodd = 1
            res += val - val % 2

                
        res = res+isodd
        
        return res
            

class Solution:
    # @param {string} s a string which consists of lowercase or uppercase letters
    # @return {int} the length of the longest palindromes that can be built
    
    # the answer is the count of characters that has even number of appereances.
    # for characters that has odd number of appereances,
    # their appereances minus 1 will make their apperances even.
    # And finally we can put an unused character in the middle of the palindrome
    def longestPalindrome(self, s):
        # Write your code here
        hash = {}

        for c in s:
            if c in hash:
                del hash[c]
            else:
                hash[c] = True

        remove = len(hash)
        if remove > 0:
            remove -= 1
    
        return len(s) - remove

class Solution:
    """
    @param s: a string which consists of lowercase or uppercase letters
    @return: the length of the longest palindromes that can be built
    """
    def longestPalindrome(self, s):
        #cnt统计字符串s中每种字母出现次数的计数数组
        #OddCount为是否有奇数次字符，1表示有，0表示无
        #ans为最终答案
        ans = 0
        cnt = collections.Counter(s)
        #每种字符可使用cnt/2*2次
        #如果遇到出现奇数次的字符并且中心位置空着，那么答案加1
        for i in cnt.values():
            ans += i // 2 * 2
            if ans % 2 == 0 and i % 2 == 1:
                ans += 1
        return ans
```
