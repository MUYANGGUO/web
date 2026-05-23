---
title: "LeetCode 49 Group Anagrams - Medium"
date: "2021-01-01"
excerpt: "Given an array of strings, group anagrams together."
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 49
comments: true
---

### 49. Group Anagrams — Medium

[Open on LeetCode](https://leetcode.com/problems/group-anagrams/)

## Problem

Given an array of strings, group anagrams together.

Example:

Input: ["eat", "tea", "tan", "ate", "nat", "bat"],
Output:
[
  ["ate","eat","tea"],
  ["nat","tan"],
  ["bat"]
]
Note:

All inputs will be in lowercase.
The order of your output does not matter.

## Solution

```python
class Solution:
    def groupAnagrams(self, strs):
        
    ### Solutioin 1
        ans = collections.defaultdict(list)
        for s in strs:
            ans[tuple(sorted(s))].append(s)
        return ans.values()
    
            
    ### Solution 2
#         ans = collections.defaultdict(list)
#         for s in strs:
#             count = [0] * 26
#             for c in s:
#                 count[ord(c) - ord('a')] += 1
#             ans[tuple(count)].append(s)
#         return ans.values()


### 此题的一大亮点是利用 tuple 当 hash 的 key， 或者是利用 ord 来组成对字母count的tuple 来当作 key。
```
