---
title: "LeetCode 767 Reorganize String - Medium"
date: "2021-01-01"
excerpt: "767. Reorganize String -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 767
comments: true
---

### 767. Reorganize String — Medium

[Open on LeetCode](https://leetcode.com/problems/reorganize-string/)

## Problem

767. Reorganize String -- Medium

Given a string S, check if the letters can be rearranged so that two characters that are adjacent to each other are not the same.

If possible, output any possible result.  If not possible, return the empty string.

Example 1:
Input: S = "aab"
Output: "aba"

Example 2:
Input: S = "aaab"
Output: ""
Note:

S will consist of lowercase letters and have length in range [1, 500].

## Solution

```python
class Solution:
    def reorganizeString(self, S: str) -> str:
        res = []
        map = dict()
        for char in S:
            map[char] = map.get(char, 0) + 1
            if map[char] > ((len(S) + 1)/2):
                return ''
        heap = []
        for char, freq in map.items():
            heapq.heappush(heap, (-freq, char))
        while len(heap) >= 2:
            lead_freq, lead_char = heapq.heappop(heap)
            follow_freq, follow_char = heapq.heappop(heap)
            res.append(lead_char)
            res.append(follow_char)
            lead_freq += 1
            follow_freq += 1
            if lead_freq < 0:
                heapq.heappush(heap, (lead_freq, lead_char))
            if follow_freq < 0:
                heapq.heappush(heap, (follow_freq, follow_char))
        return ''.join(res) + (heap[0][1] if heap else '')
```
