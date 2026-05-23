---
title: "LeetCode 144 Binary Tree Preorder Traversal - Medium"
date: "2021-01-01"
excerpt: 144. Binary Tree Preorder Traversal
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 144
comments: true
---

### 144. Binary Tree Preorder Traversal — Medium

[Open on LeetCode](https://leetcode.com/problems/binary-tree-preorder-traversal/)

## Problem

144. Binary Tree Preorder Traversal

Given a binary tree, return the preorder traversal of its nodes' values.

Example:

Input: [1,null,2,3]
   1
    \
     2
    /
   3

Output: [1,2,3]
Follow up: Recursive solution is trivial, could you do it iteratively?

## Solution

```python
### Morris:




# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def preorderTraversal(self, root):
        nums = []
        cur = None
        
        while root:
            if root.left:
                cur = root.left
                while cur.right and cur.right != root:
                    cur = cur.right
                if cur.right == root:
                    cur.right = None
                    root = root.right
                else:
                    nums.append(root.val)
                    cur.right = root
                    root = root.left
            else:
                nums.append(root.val)
                root = root.right
                
        return nums
```
