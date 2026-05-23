---
title: "LeetCode 1202 Smallest String With Swaps - Medium"
date: "2021-01-01"
excerpt: "1202. Smallest String With Swaps -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 1202
comments: true
---

### 1202. Smallest String With Swaps — Medium

[Open on LeetCode](https://leetcode.com/problems/smallest-string-with-swaps/)

## Problem

1202. Smallest String With Swaps -- Medium

You are given a string s, and an array of pairs of indices in the string pairs where pairs[i] = [a, b] indicates 2 indices(0-indexed) of the string.

You can swap the characters at any pair of indices in the given pairs any number of times.

Return the lexicographically smallest string that s can be changed to after using the swaps.

 

Example 1:

Input: s = "dcab", pairs = [[0,3],[1,2]]
Output: "bacd"
Explaination: 
Swap s[0] and s[3], s = "bcad"
Swap s[1] and s[2], s = "bacd"
Example 2:

Input: s = "dcab", pairs = [[0,3],[1,2],[0,2]]
Output: "abcd"
Explaination: 
Swap s[0] and s[3], s = "bcad"
Swap s[0] and s[2], s = "acbd"
Swap s[1] and s[2], s = "abcd"
Example 3:

Input: s = "cba", pairs = [[0,1],[1,2]]
Output: "abc"
Explaination: 
Swap s[0] and s[1], s = "bca"
Swap s[1] and s[2], s = "bac"
Swap s[0] and s[1], s = "abc"
 

Constraints:

1 <= s.length <= 10^5
0 <= pairs.length <= 10^5
0 <= pairs[i][0], pairs[i][1] < s.length
s only contains lower case English letters.

## Solution

```python
class UnionFind:
    def __init__(self, n):
        self.parents = [i for i in range(n)]
        self.rank = [1] * n
    def find(self, x):
        if x != self.parents[x]:
            self.parents[x] = self.find(self.parents[x])
        return self.parents[x]
    
    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py:
            return
        if self.rank[px] > self.rank[py]:
            self.parents[py] = px
            self.rank[px] += self.rank[py]
        elif self.rank[px] < self.rank[py]:
            self.parents[px] = py
            self.rank[py] += self.rank[px]
        else:
            self.parents[px] = py
            self.rank[py] += self.rank[px]
        return 

class Solution:
    def smallestStringWithSwaps(self, s: str, pairs: List[List[int]]) -> str:
        n = len(s)
        UF = UnionFind(n)
        map = defaultdict(list)
        res = []
        for x, y in pairs:
            UF.union(x, y)
        for i in range(len(s)): 
            map[UF.find(i)].append(s[i])
        for comp_id in map.keys(): 
            map[comp_id].sort(reverse=True)
        for i in range(len(s)): 
            res.append(map[UF.find(i)].pop())
        return ''.join(res)
# UnionFind complexity to build the graph is V+E
# O(VlogV) O(V)
```
