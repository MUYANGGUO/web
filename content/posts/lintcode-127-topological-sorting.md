---
title: "LintCode 127 Topological Sorting - Medium"
date: "2021-01-01"
excerpt: 127. Topological Sorting
kind: leetcode
tags:
  - LintCode
  - Medium
  - Python
order: 127
comments: true
---

### 127. Topological Sorting — Medium

[Open on LintCode](https://www.lintcode.com/problem/127/)

## Problem

127. Topological Sorting

Given an directed graph, a topological order of the graph nodes is defined as follow:

For each directed edge A -> B in graph, A must before B in the order list.
The first node in the order can be any node in the graph with no nodes direct to it.
Find any topological order for the given graph.

Example
For graph as follow:

图片

The topological order can be:

[0, 1, 2, 3, 4, 5]
[0, 2, 3, 1, 5, 4]
...
Challenge
Can you do it in both BFS and DFS?

Clarification
Learn more about representation of graphs

Notice
You can assume that there is at least one topological order in the graph.

## Solution

```python
"""
Definition for a Directed graph node
class DirectedGraphNode:
    def __init__(self, x):
        self.label = x
        self.neighbors = []
"""

### 找入度为0的node，放进queue里，遍历到以后，对当前的node的入度减去1.如果入度为0，再放入queue中，直到queue为空，所有的邻居都放进了order里。

class Solution:
    """
    @param: graph: A list of Directed graph node
    @return: Any topological order for the given graph.
    """
    def topSort(self, graph):
        # write your code here
        ### 利用hash统计in-degree of nodes
        
        inDegree = {}
        
        for node in graph:
            inDegree[node] = 0
            
        for node in graph:
            for neighbor in node.neighbors:
                inDegree[neighbor] += 1
        # bfs
        order = []
        start_nodes = [n for n in graph if inDegree[n] == 0]
        queue = collections.deque(start_nodes)
        while queue:
            node = queue.popleft()
            order.append(node)
            for neighbor in node.neighbors:
                inDegree[neighbor] -= 1
                if inDegree[neighbor] == 0:
                    queue.append(neighbor)

    
        return order
        
        
    def findHead(self, inDegree):
        for node, degree in inDegree.items():
            if degree == 0:
                return node
        return None
```
