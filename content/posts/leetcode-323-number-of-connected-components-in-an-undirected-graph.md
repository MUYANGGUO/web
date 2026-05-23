---
title: "LeetCode 323 Number Of Connected Components In An Undirected Graph - Medium"
date: "2021-01-01"
excerpt: "323. Number of Connected Components in an Undirected Graph -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 323
comments: true
---

### 323. Number Of Connected Components In An Undirected Graph — Medium

[Open on LeetCode](https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/)

## Problem

323. Number of Connected Components in an Undirected Graph -- Medium

Given n nodes labeled from 0 to n - 1 and a list of undirected edges (each edge is a pair of nodes), write a function to find the number of connected components in an undirected graph.

Example 1:

Input: n = 5 and edges = [[0, 1], [1, 2], [3, 4]]

     0          3
     |          |
     1 --- 2    4 

Output: 2
Example 2:

Input: n = 5 and edges = [[0, 1], [1, 2], [2, 3], [3, 4]]

     0           4
     |           |
     1 --- 2 --- 3

Output:  1
Note:
You can assume that no duplicate edges will appear in edges. Since all edges are undirected, [0, 1] is the same as [1, 0] and thus will not appear together in edges.

## Solution

```python
class UnionFind:
    def __init__(self, n):
        self.parents = [i for i in range(n)]
        # this rank here represents the zie of the subtree
        self.rank = [1]*n

    def find(self, x):
        if x != self.parents[x]:
            # path compression, recursively
            self.parents[x] = self.find(self.parents[x])
        return self.parents[x]

    def union(self, x, y):
        # find root parents
        px, py = self.find(x), self.find(y)
        # already merged, do nothing, meaning redundant
        if px == py:
            return
        # need merge and assign parents, because the two nodes are connected, meaning their parents are connected
        if self.rank[px] > self.rank[py]:
            self.parents[py] = px
            self.rank[px] += self.rank[py] 
        elif self.rank[px] < self.rank[py]:
            self.parents[px] = py
            self.rank[py] += self.rank[px] 
        else:
            # 如果相等，加rank
            self.parents[px] = py
            self.rank[py] += self.rank[px]
        return

class Solution:
    def countComponents(self, n: int, edges: List[List[int]]) -> int:
        UF = UnionFind(n)
        for i, j in edges:
            UF.union(i, j)
        return len({UF.find(x) for x in UF.parents})
```
