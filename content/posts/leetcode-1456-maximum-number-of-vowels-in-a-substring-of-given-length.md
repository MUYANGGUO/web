---
title: "LeetCode 1456 Maximum Number Of Vowels In A Substring Of Given Length - Medium"
date: "2021-01-01"
excerpt: 1456. Maximum Number of Vowels in a Substring of Given Length
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 1456
comments: true
---

### 1456. Maximum Number Of Vowels In A Substring Of Given Length — Medium

[Open on LeetCode](https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/)

## Problem

1456. Maximum Number of Vowels in a Substring of Given Length

Given a string s and an integer k.

Return the maximum number of vowel letters in any substring of s with length k.

Vowel letters in English are (a, e, i, o, u).

 

Example 1:

Input: s = "abciiidef", k = 3
Output: 3
Explanation: The substring "iii" contains 3 vowel letters.
Example 2:

Input: s = "aeiou", k = 2
Output: 2
Explanation: Any substring of length 2 contains 2 vowels.
Example 3:

Input: s = "leetcode", k = 3
Output: 2
Explanation: "lee", "eet" and "ode" contain 2 vowels.
Example 4:

Input: s = "rhythms", k = 4
Output: 0
Explanation: We can see that s doesn't have any vowel letters.
Example 5:

Input: s = "tryhard", k = 4
Output: 1

## Solution

```python
### Sliding Window : 

class Solution:
    def maxVowels(self, s, k):
        ## init
        # Maximum vowels i.e. ans
        ans: int = 0
            
        # Vowels in current window
        currCount: int = 0
            
        # String of vowels
        vowels: str = "aeiou"
            
        # Using sliding window technique to 
        # calculate number of vowels in each window and 
        # update the count
        for i, v in enumerate(s):
            if i >= k:
                if s[i-k] in vowels:
                    currCount -= 1
            if s[i] in vowels:
                currCount += 1
            ans = max(currCount, ans)
        return ans
            

class Solution:
    def maxVowels(self, s, k):
        res = j = vowels = 0
        for i, c in enumerate(s):
            vowels += c in 'aeiou' 
            if i - j + 1 > k:
                vowels -= s[j] in 'aeiou'
                j += 1    
            if i - j + 1 == k:    
                res = max(res, vowels)
        return res
```
