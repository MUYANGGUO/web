---
title: "LeetCode 114 Flatten Binary Tree To Linked List - Medium"
date: "2021-01-01"
excerpt: 114. Flatten Binary Tree to Linked List
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 114
comments: true
---

### 114. Flatten Binary Tree To Linked List — Medium

[Open on LeetCode](https://leetcode.com/problems/flatten-binary-tree-to-linked-list/)

## Problem

114. Flatten Binary Tree to Linked List

Given a binary tree, flatten it to a linked list in-place.

For example, given the following tree:

    1
   / \
  2   5
 / \   \
3   4   6
The flattened tree should look like:

1
 \
  2
   \
    3
     \
      4
       \
        5
         \
          6

## Solution

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def flatten(self, root):
        """
        Do not return anything, modify root in-place instead.
        """
        if root is None:
            return None
        ### 分治法的思想，先把左子树变成linkedlist再把右子树变成linkedlist，最后合起来
        left = self.flatten(root.left)
        right = self.flatten(root.right)
        
        ### 如果左边不是空，那么通过以root为head依次链接左，右边。
        if left is not None:
            left.right = root.right
            root.right = root.left
            root.left = None
            
        return right or left or root
```
