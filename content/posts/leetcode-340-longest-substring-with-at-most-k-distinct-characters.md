---
title: "LeetCode 340 Longest Substring With At Most K Distinct Characters - Hard"
date: "2021-01-01"
excerpt: 340. Longest Substring with At Most K Distinct Characters
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 340
comments: true
---

### 340. Longest Substring With At Most K Distinct Characters — Hard

[Open on LeetCode](https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/)

## Problem

340. Longest Substring with At Most K Distinct Characters

Given a string, find the length of the longest substring T that contains at most k distinct characters.

Example 1:

Input: s = "eceba", k = 2
Output: 3
Explanation: T is "ece" which its length is 3.
Example 2:

Input: s = "aa", k = 1
Output: 2
Explanation: T is "aa" which its length is 2.

## Solution

```python
class Solution:
    def lengthOfLongestSubstringKDistinct(self, s, k):
        if not s:
            return 0
            
        counter = {}
        left = 0
        longest = 0
        
        for right in range(len(s)):
            counter[s[right]] = counter.get(s[right], 0) + 1
            while left <= right and len(counter) > k:
                counter[s[left]] -= 1
                if counter[s[left]] == 0:
                    del counter[s[left]]
                left += 1
            
            longest = max(longest, right - left + 1)
        return longest
```
