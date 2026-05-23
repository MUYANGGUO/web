---
title: "LeetCode 104 Maximum Depth Of Binary Tree - Easy"
date: "2021-01-01"
excerpt: 104. Maximum Depth of Binary Tree
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 104
comments: true
---

### 104. Maximum Depth Of Binary Tree — Easy

[Open on LeetCode](https://leetcode.com/problems/maximum-depth-of-binary-tree/)

## Problem

104. Maximum Depth of Binary Tree

Given a binary tree, find its maximum depth.

The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

Note: A leaf is a node with no children.

Example:

Given binary tree [3,9,20,null,null,15,7],

    3
   / \
  9  20
    /  \
   15   7
return its depth = 3.

## Solution

```python
### 分治法 + DFS + Recursion：

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def maxDepth(self, root):
        max_depth = self.dfs(root)
        return max_depth
    
    def dfs(self, root):
        if not root:
            return 0
        
        left_depth = self.dfs(root.left)
        right_depth = self.dfs(root.right)
        height = max(left_depth, right_depth) + 1
        return height
```
