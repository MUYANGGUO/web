---
title: "LeetCode 316 Remove Duplicate Letters - Medium"
date: "2021-01-01"
excerpt: "316. Remove Duplicate Letters -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 316
comments: true
---

### 316. Remove Duplicate Letters — Medium

[Open on LeetCode](https://leetcode.com/problems/remove-duplicate-letters/)

## Problem

316. Remove Duplicate Letters -- Medium

Given a string s, remove duplicate letters so that every letter appears once and only once. You must make sure your result is the smallest in lexicographical order among all possible results.

Note: This question is the same as 1081: https://leetcode.com/problems/smallest-subsequence-of-distinct-characters/

Example 1:

Input: s = "bcabc"
Output: "abc"
Example 2:

Input: s = "cbacdcbc"
Output: "acdb"
 

Constraints:

1 <= s.length <= 104
s consists of lowercase English letters.

## Solution

```python
class Solution:
    def removeDuplicateLetters(self, s: str) -> str:
        counter = collections.Counter(s)
        visited = {}
        for k in counter.keys():
            visited[k] = False
        stack = []
        for c in s:
            counter[c] -= 1
            if visited[c]:
                continue
            # 类似单调栈
            while stack and stack[-1] > c and counter[stack[-1]] > 0:
                visited[stack[-1]] = False
                stack.pop()
            stack.append(c)
            visited[c] = True
        return ''.join(stack)
```
