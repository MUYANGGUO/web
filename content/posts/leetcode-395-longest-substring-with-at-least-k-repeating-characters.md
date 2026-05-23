---
title: "LeetCode 395 Longest Substring With At Least K Repeating Characters - Medium"
date: "2021-01-01"
excerpt: "395. Longest Substring with At Least K Repeating Characters -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 395
comments: true
---

### 395. Longest Substring With At Least K Repeating Characters — Medium

[Open on LeetCode](https://leetcode.com/problems/longest-substring-with-at-least-k-repeating-characters/)

## Problem

395. Longest Substring with At Least K Repeating Characters -- Medium

Given a string s and an integer k, return the length of the longest substring of s such that the frequency of each character in this substring is greater than or equal to k.

Example 1:

Input: s = "aaabb", k = 3
Output: 3
Explanation: The longest substring is "aaa", as 'a' is repeated 3 times.
Example 2:

Input: s = "ababbc", k = 2
Output: 5
Explanation: The longest substring is "ababb", as 'a' is repeated 2 times and 'b' is repeated 3 times.
 

Constraints:

1 <= s.length <= 104
s consists of only lowercase English letters.
1 <= k <= 105

## Solution

```python
class Solution:
    def longestSubstring(self, s: str, k: int) -> int:
        #对于一个字符串，若其中某一个字符的数量小于k，
        #则最终的答案中一定不会包含这个字符，因此答案只有可能在这个字符的左右两侧的字符串。 
        #之后对于左右两边的串递归处理即可.
        counter = collections.Counter(s)
        for c in set(s):
            if counter[c] < k:
                return max(self.longestSubstring(t, k) for t in s.split(c))
        return len(s)
    
# Sliding Window:
#A substring is valid if each character has at least k frequency.
#The main idea is to find all the valid substrings with a different number of unique characters 
#and track the maximum length. Let's look at the algorithm in detail.
class Solution:
    def longestSubstring(self, s: str, k: int) -> int:
        count = 0
        unique = set(s)
        for i in range(1, len(unique) + 1):
            count = max(count, self.helper(s, k, i))
        return count
    def helper(self, s, k, numUniqueTarget):
        start = end = numUnique = numNoLessThanK = count = 0
        counter = dict()
        while end < len(s):
            if s[end] not in counter:
                numUnique += 1
            counter[s[end]] = counter.get(s[end], 0) + 1
            if counter[s[end]] == k: 
                numNoLessThanK += 1
            end += 1
            while numUnique > numUniqueTarget:
                if counter[s[start]] == k: numNoLessThanK -= 1
                counter[s[start]] -= 1
                if counter[s[start]] == 0: 
                    numUnique -= 1
                    del counter[s[start]]
                start += 1
            if numUnique == numNoLessThanK: count = max(count, end-start)
        return count
```
