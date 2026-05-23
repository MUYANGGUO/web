---
title: "LeetCode 1156 Swap For Longest Repeated Character Substring - Medium"
date: "2021-01-01"
excerpt: "1156. Swap For Longest Repeated Character Substring -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 1156
comments: true
---

### 1156. Swap For Longest Repeated Character Substring — Medium

[Open on LeetCode](https://leetcode.com/problems/swap-for-longest-repeated-character-substring/)

## Problem

1156. Swap For Longest Repeated Character Substring -- Medium

Given a string text, we are allowed to swap two of the characters in the string. Find the length of the longest substring with repeated characters.

Example 1:

Input: text = "ababa"
Output: 3
Explanation: We can swap the first 'b' with the last 'a', or the last 'b' with the first 'a'. Then, the longest repeated character substring is "aaa", which its length is 3.

Example 2:

Input: text = "aaabaaa"
Output: 6
Explanation: Swap 'b' with the last 'a' (or the first 'a'), and we get longest repeated character substring "aaaaaa", which its length is 6.

Example 3:

Input: text = "aaabbaaa"
Output: 4

Example 4:

Input: text = "aaaaa"
Output: 5
Explanation: No need to swap, longest repeated character substring is "aaaaa", length is 5.

Example 5:

Input: text = "abcdef"
Output: 1
 

Constraints:

1 <= text.length <= 20000
text consist of lowercase English characters only.

## Solution

```python
# 利用group by 的思想：
class Solution:
    def maxRepOpt1(self, text: str) -> int:
        char_counter = collections.Counter(text)
        stack_count = []
        for char in text:
            if not stack_count:
                stack_count.append([char, 1])
                cur_max = 1
                cur_most_char = char
                continue
            if stack_count and stack_count[-1][0] != char:
                stack_count.append([char, 1])
            else:
                stack_count[-1][1] += 1
            if stack_count[-1][1] > cur_max:
                cur_max = stack_count[-1][1]
                cur_most_char = stack_count[-1][0]
        if cur_max < char_counter[cur_most_char]:
            cur_max += 1
        res = cur_max
        for i in range(1, len(stack_count) - 1):
            # if both sides have the same char and are separated by only 1 char
            if stack_count[i - 1][0] == stack_count[i + 1][0] and stack_count[i][1] == 1:
                candidate = stack_count[i - 1][1] + stack_count[i + 1][1]
                if candidate < char_counter[stack_count[i - 1][0]]:
                    candidate += 1
                res = max(res, candidate)
        return res

# Sliding Window, Two Pointers:
class Solution:
    def maxRepOpt1(self, text: str) -> int:
        counter = collections.Counter(text)
        n = len(text)
        i = 0
        start = i
        res = 1
        while i < n:
            if text[i] != text[start]:
                j = i + 1
                while j < n and text[j] == text[start]:
                    j += 1
                candidate = j - start - 1
                if candidate < counter[text[start]]:
                    candidate += 1
                res = max(res, candidate)
                # next slide window start here
                start = i
            i += 1
            
        # deal with last start window
        candidate = i - start
        if candidate < counter[text[start]]:
            candidate += 1
        return max(res, candidate)
```
