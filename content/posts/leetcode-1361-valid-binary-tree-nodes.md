---
title: "LeetCode 1361 Valid Binary Tree Nodes - Medium"
date: "2021-01-01"
excerpt: 1361. Validate Binary Tree Nodes (Pony.ai CHINA VO)
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 1361
comments: true
---

### 1361. Valid Binary Tree Nodes — Medium

[Open on LeetCode](https://leetcode.com/problems/valid-binary-tree-nodes/)

## Problem

1361. Validate Binary Tree Nodes (Pony.ai CHINA VO)
Medium

You have n binary tree nodes numbered from 0 to n - 1 where node i has two children leftChild[i] and rightChild[i], return true if and only if all the given nodes form exactly one valid binary tree.

If node i has no left child then leftChild[i] will equal -1, similarly for the right child.

Note that the nodes have no values and that we only use the node numbers in this problem.

 

Example 1:



Input: n = 4, leftChild = [1,-1,3,-1], rightChild = [2,-1,-1,-1]
Output: true
Example 2:



Input: n = 4, leftChild = [1,-1,3,-1], rightChild = [2,3,-1,-1]
Output: false
Example 3:



Input: n = 2, leftChild = [1,0], rightChild = [-1,-1]
Output: false
Example 4:



Input: n = 6, leftChild = [1,-1,-1,4,-1,-1], rightChild = [2,-1,-1,5,-1,-1]
Output: false
 

Constraints:

1 <= n <= 10^4
leftChild.length == rightChild.length == n
-1 <= leftChild[i], rightChild[i] <= n - 1

## Solution

```python
from collections import deque
class Solution:
    def validateBinaryTreeNodes(self, n: int, leftChild: List[int], rightChild: List[int]) -> bool:
        # check if have more than one parent
        map = dict()
        for u, v in zip(leftChild, rightChild):
            if u != -1:
                map[u] = map.get(u, 0) + 1
                if map[u] > 1:
                    return False
            if v != -1:
                map[v] = map.get(v, 0) + 1
                if map[v] > 1:
                    return False
        # find the root, and check if have more than 2 branches
        inDegrees = [0] * n
        for u, v in zip(leftChild, rightChild):
            if u != -1:
                inDegrees[u] += 1
            if v != -1:
                inDegrees[v] += 1
            if inDegrees[u] > 2 or inDegrees[v] > 2:
                return Fasle
        # topological check for cycles
        queue = deque([])
        for node in range(n):
            if inDegrees[node] == 0:
                queue.append(node)
        
        if len(queue) > 1:
            return False
        visited = 0
        while queue:
            root = queue.popleft()
            visited += 1
            left, right = leftChild[root], rightChild[root]
            if left != -1:
                inDegrees[left] -= 1
                if inDegrees[left] == 0:
                    queue.append(left)
            if right != -1:
                inDegrees[right] -= 1
                if inDegrees[right] == 0:
                    queue.append(right)

        return visited == n
```
