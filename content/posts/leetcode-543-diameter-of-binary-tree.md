---
title: "LeetCode 543 Diameter Of Binary Tree - Easy"
date: "2021-01-01"
excerpt: "543. Diameter of Binary Tree -- Easy"
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 543
comments: true
---

### 543. Diameter Of Binary Tree — Easy

[Open on LeetCode](https://leetcode.com/problems/diameter-of-binary-tree/)

## Problem

543. Diameter of Binary Tree -- Easy

Given a binary tree, you need to compute the length of the diameter of the tree. The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.

Example:
Given a binary tree
          1
         / \
        2   3
       / \     
      4   5    
Return 3, which is the length of the path [4,2,1,3] or [5,2,1,3].

Note: The length of path between two nodes is represented by the number of edges between them.

## Solution

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def diameterOfBinaryTree(self, root: TreeNode) -> int:
        self.res = 0
        self.dfs(root)
        return self.res
    def dfs(self, node):
        if not node:
            return 0
        left = self.dfs(node.left)
        right = self.dfs(node.right)
        self.res = max(self.res, left + right)
        return max(left, right) + 1
```
