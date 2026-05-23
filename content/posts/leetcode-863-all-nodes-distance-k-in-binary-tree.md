---
title: "LeetCode 863 All Nodes Distance K In Binary Tree - Medium"
date: "2021-01-01"
excerpt: "863. All Nodes Distance K in Binary Tree -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 863
comments: true
---

### 863. All Nodes Distance K In Binary Tree — Medium

[Open on LeetCode](https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/)

## Problem

863. All Nodes Distance K in Binary Tree -- Medium

We are given a binary tree (with root node root), a target node, and an integer value K.

Return a list of the values of all nodes that have a distance K from the target node.  The answer can be returned in any order.


Example 1:

Input: root = [3,5,1,6,2,0,8,null,null,7,4], target = 5, K = 2

Output: [7,4,1]

Explanation: 
The nodes that are a distance 2 from the target node (with value 5)
have values 7, 4, and 1.



Note that the inputs "root" and "target" are actually TreeNodes.
The descriptions of the inputs above are just serializations of these objects.
 

Note:

The given tree is non-empty.
Each node in the tree has unique values 0 <= node.val <= 500.
The target node is a node in the tree.
0 <= K <= 1000.

## Solution

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None
class Solution:
    def distanceK(self, root: TreeNode, target: TreeNode, K: int) -> List[int]:
        # dfs遍历做parents graph
        if root is None:
            return []
        parents = {}
        queue = deque([target])
        visited = {target}
        distance = 0
        self.build_parents(root, parents)
        #bfs
        while queue and distance < K:
            # 分层遍历
            for _ in range(len(queue)):
                node = queue.popleft()
                # Find adjacent
                if node.left and node.left not in visited:
                    queue.append(node.left)
                    visited.add(node.left)
                if node.right and node.right not in visited:
                    queue.append(node.right)
                    visited.add(node.right)
                if node in parents and parents[node] not in visited:
                    queue.append(parents[node])
                    visited.add(parents[node])
            distance += 1
        return [node.val for node in queue]
    def build_parents(self, root, parents):
        if root is None:
            return None
        if root.left:
            parents[root.left] = root
            self.build_parents(root.left, parents)
        if root.right:
            parents[root.right] = root
            self.build_parents(root.right, parents)
```
