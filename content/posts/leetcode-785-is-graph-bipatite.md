---
title: "LeetCode 785 Is Graph Bipatite - Medium"
date: "2021-01-01"
excerpt: "785. Is Graph Bipartite? -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 785
comments: true
---

### 785. Is Graph Bipatite — Medium

[Open on LeetCode](https://leetcode.com/problems/is-graph-bipatite/)

## Problem

785. Is Graph Bipartite? -- Medium

Given an undirected graph, return true if and only if it is bipartite.

Recall that a graph is bipartite if we can split its set of nodes into two independent subsets A and B, such that every edge in the graph has one node in A and another node in B.

The graph is given in the following form: graph[i] is a list of indexes j for which the edge between nodes i and j exists.  Each node is an integer between 0 and graph.length - 1.  There are no self edges or parallel edges: graph[i] does not contain i, and it doesn't contain any element twice.


Example 1:

Input: graph = [[1,3],[0,2],[1,3],[0,2]]
Output: true
Explanation: We can divide the vertices into two groups: {0, 2} and {1, 3}.

Example 2:

Input: graph = [[1,2,3],[0,2],[0,1,3],[0,2]]
Output: false
Explanation: We cannot find a way to divide the set of nodes into two independent subsets.

 

Constraints:

1 <= graph.length <= 100
0 <= graph[i].length < 100
0 <= graph[i][j] <= graph.length - 1
graph[i][j] != i
All the values of graph[i] are unique.
The graph is guaranteed to be undirected.

## Solution

```python
# BFS:
class Solution:
    def isBipartite(self, graph: List[List[int]]) -> bool:
        UNSEEN = 0
        RED = 1
        BLUE = -1
        # Write your code here
        q = deque([])
        coloring = [0]*len(graph)
        for i in range(len(graph)):
            if coloring[i] != UNSEEN:
                continue
            q.append(i)
            coloring[i] = RED
            while q:
                curNode = q.popleft()
                for neighbor in graph[curNode]:
                    if coloring[neighbor] == UNSEEN:
                        coloring[neighbor] = -coloring[curNode]
                        q.append(neighbor)
                    elif coloring[neighbor] != -coloring[curNode]:
                        return False
        return True

# DFS:
class Solution:
    def isBipartite(self, graph: List[List[int]]) -> bool:
        n = len(graph)
        colors = [0] * n 
        # 0 -> unvisited, 1 -> group1, -1 -> group2
        for i in range(n):
            if colors[i] == 0 and not self.dfs(graph, i, colors, 1): 
                # the starting color can be either 0 or 1
                return False
        return True
    
    def dfs(self, graph, index, colors, color): 
        # The current node we're visiting
        if colors[index]:
            return colors[index] == color; 
        # the current node's color is the same as the current color used for coloring
        colors[index] = color;
        for next in graph[index]:
            if not self.dfs(graph, next, colors, -color):
                return False
        return True
```
