---
title: "LeetCode 257 B Inary Tree Paths - Easy"
date: "2021-01-01"
excerpt: 257. Binary Tree Paths
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 257
comments: true
---

### 257. B Inary Tree Paths — Easy

[Open on LeetCode](https://leetcode.com/problems/b-inary-tree-paths/)

## Problem

257. Binary Tree Paths

Given a binary tree, return all root-to-leaf paths.

Note: A leaf is a node with no children.

Example:

Input:

   1
 /   \
2     3
 \
  5

Output: ["1->2->5", "1->3"]

Explanation: All root-to-leaf paths are: 1->2->5, 1->3

## Solution

```python
### DFS + Recursion + Stack:
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def binaryTreePaths(self, root):
        ### start the stack with the root as head
        stack = [root]
        ### contianer
        paths = []
        ### construct the paths output
        self.updatePaths(root, stack, paths)
        return paths
    
    def updatePaths(self,node, stack, paths):
        ### until the node is empty, return
        if not node:
            return
        ### unless left children and right children are all null, meaning reached to the deepest node
        if not node.left and not node.right:
            ### append the stack to the paths
            paths.append('->'.join([str(n.val) for n in stack]))
            return
        
        ### append, update, backtracking(pop out the added one and retrieve the earlier state)
        stack.append(node.left)
        self.updatePaths(node.left, stack, paths)
        ### backtracking, remove the added node (when update Paths reached to end, stack needs to be reset)
        stack.pop()
        
        stack.append(node.right)
        self.updatePaths(node.right, stack, paths)
        stack.pop()
```
