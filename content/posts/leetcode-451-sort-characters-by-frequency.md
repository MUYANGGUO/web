---
title: "LeetCode 451 Sort Characters By Frequency - Medium"
date: "2021-01-01"
excerpt: "451. Sort Characters By Frequency -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 451
comments: true
---

### 451. Sort Characters By Frequency — Medium

[Open on LeetCode](https://leetcode.com/problems/sort-characters-by-frequency/)

## Problem

451. Sort Characters By Frequency -- Medium

Given a string, sort it in decreasing order based on the frequency of characters. 

Example 1:

Input:
"tree"
Output:
"eert"

Explanation:
'e' appears twice while 'r' and 't' both appear once.
So 'e' must appear before both 'r' and 't'. Therefore "eetr" is also a valid answer.

Example 2:

Input:
"cccaaa"
Output:
"cccaaa"

Explanation:
Both 'c' and 'a' appear three times, so "aaaccc" is also a valid answer.
Note that "cacaca" is incorrect, as the same characters must be together.

Example 3:

Input:
"Aabb"
Output:
"bbAa"

Explanation:
"bbaA" is also a valid answer, but "Aabb" is incorrect.
Note that 'A' and 'a' are treated as two different characters.

## Solution

```python
### Solution 1: Hashmap + Sort + Trasverse, when trasversing, 
### just add map[char] * char to the res
###  O(NlogN), O(N)
class Solution:
    def frequencySort(self, s: str) -> str:
        map = dict()
        for char in s:
            map[char] = map.get(char, 0) + 1
        container = []
        for char, freq in map.items():
            container.append((freq, char))
        container.sort(key = lambda x: (-x[0], char))
        res = []
        for _, char in container:
            res.append(map[char] * char)
        return ''.join(res)

### Solution 2: Hashmap + BucketSort
### O(N), O(N)
class Solution:
    def frequencySort(self, s: str) -> str:
        if not s:
            return []
        map = dict()
        for char in s:
            map[char] = map.get(char, 0) + 1
        # create buckets
        buckets = [[] for _ in range(max(map.values()))]
        for char in map.keys():
            buckets [map[char] - 1].append(char * map[char])
        res = []
        # decreasing order, so from the end to start to combine the buckets
        for i in range(len(buckets) - 1 , -1, -1):
            res += buckets[i]
        return ''.join(res)
```
