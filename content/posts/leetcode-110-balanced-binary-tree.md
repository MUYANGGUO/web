---
title: "LeetCode 110 Balanced Binary Tree - Easy"
date: "2021-01-01"
excerpt: 110. Balanced Binary Tree
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 110
comments: true
---

### 110. Balanced Binary Tree — Easy

[Open on LeetCode](https://leetcode.com/problems/balanced-binary-tree/)

## Problem

110. Balanced Binary Tree

Given a binary tree, determine if it is height-balanced.

For this problem, a height-balanced binary tree is defined as:

a binary tree in which the left and right subtrees of every node differ in height by no more than 1.

 

Example 1:

Given the following tree [3,9,20,null,null,15,7]:

    3
   / \
  9  20
    /  \
   15   7
Return true.

Example 2:

Given the following tree [1,2,2,3,3,null,null,4,4]:

       1
      / \
     2   2
    / \
   3   3
  / \
 4   4
Return false.

## Solution

```python
### 分治法 + DFS + 递归的 经典题： 

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isBalanced(self, root: TreeNode) -> bool:
        is_balanced, _ = self.dfs(root)
        return is_balanced
    
    def dfs(self, root):
        if not root:
            return True, 0
        is_left_balanced, left_height = self.dfs(root.left)
        is_right_balanced, right_height = self.dfs(root.right)
        root_height = max(left_height, right_height) + 1
        
        if not is_left_balanced or not is_right_balanced:
            return False, root_height
        if abs(left_height - right_height) > 1:
            return False, root_height
        return True, root_height
```
