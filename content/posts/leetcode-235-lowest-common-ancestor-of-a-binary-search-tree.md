---
title: "LeetCode 235 Lowest Common Ancestor Of A Binary Search Tree - Easy"
date: "2021-01-01"
excerpt: "235. Lowest Common Ancestor of a Binary Search Tree -- Easy"
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 235
comments: true
---

### 235. Lowest Common Ancestor Of A Binary Search Tree — Easy

[Open on LeetCode](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)

## Problem

235. Lowest Common Ancestor of a Binary Search Tree -- Easy

Given a binary search tree (BST), find the lowest common ancestor (LCA) of two given nodes in the BST.

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”

 
Example 1:

Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
Output: 6
Explanation: The LCA of nodes 2 and 8 is 6.
Example 2:

Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
Output: 2
Explanation: The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself according to the LCA definition.

Example 3:

Input: root = [2,1], p = 2, q = 1
Output: 2
 

Constraints:
The number of nodes in the tree is in the range [2, 105].
-109 <= Node.val <= 109
All Node.val are unique.
p != q
p and q will exist in the BST.

## Solution

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        if not root:
            return None
        if root == p or root == q:
            return root
        # p, q 都在左子树
        if p.val < root.val and q.val < root.val:
            return self.lowestCommonAncestor(root.left, p, q)
        # p, q 都在右子树
        if p.val > root.val and q.val > root.val:
            return self.lowestCommonAncestor(root.right, p, q)
        # p, q 分别在左右子树，那么root即为结果
        return root
```
