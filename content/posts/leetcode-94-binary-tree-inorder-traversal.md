---
title: "LeetCode 94 Binary Tree Inorder Traversal - Medium"
date: "2021-01-01"
excerpt: 94. Binary Tree Inorder Traversal
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 94
comments: true
---

### 94. Binary Tree Inorder Traversal — Medium

[Open on LeetCode](https://leetcode.com/problems/binary-tree-inorder-traversal/)

## Problem

94. Binary Tree Inorder Traversal

Given a binary tree, return the inorder traversal of its nodes' values.

Example:

Input: [1,null,2,3]
   1
    \
     2
    /
   3

Output: [1,3,2]
Follow up: Recursive solution is trivial, could you do it iteratively?

## Solution

```python
###: Morris :


# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def inorderTraversal(self, root):
        nums = []
        cur = None
    
        while root:
            if root.left:
                cur = root.left
                while cur.right and cur.right != root:
                    cur = cur.right
                
                if cur.right == root:
                    nums.append(root.val)
                    cur.right = None
                    root = root.right
                else:
                    cur.right = root
                    root = root.left
            else:
                nums.append(root.val)
                root = root.right
                
        return nums
```
