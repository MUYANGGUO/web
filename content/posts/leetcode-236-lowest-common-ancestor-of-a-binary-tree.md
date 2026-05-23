---
title: "LeetCode 236 Lowest Common Ancestor Of A Binary Tree - Medium"
date: "2021-01-01"
excerpt: 236. Lowest Common Ancestor of a Binary Tree
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 236
comments: true
---

### 236. Lowest Common Ancestor Of A Binary Tree — Medium

[Open on LeetCode](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)

## Problem

236. Lowest Common Ancestor of a Binary Tree

Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”

Given the following binary tree:  root = [3,5,1,6,2,0,8,null,null,7,4]


 

Example 1:

Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
Output: 3
Explanation: The LCA of nodes 5 and 1 is 3.
Example 2:

Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
Output: 5
Explanation: The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself according to the LCA definition.
 

Note:

All of the nodes' values will be unique.
p and q are different and both values will exist in the binary tree.

## Solution

```python
### LCA系列 经典题目！！！分治法：


# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def lowestCommonAncestor(self, root, p, q):
        # 如果 A 和 B 都在，return  LCA
        # 如果只有 A 在，return A
        # 如果只有 B 在，return B
        # 如果 A, B 都不在，return None
        ### 分治法,非常经典，需要理解
        
        ### recursion ends 的条件：要么没有p,q, 要么找到了pq
        if root is None:
            return None
        
        if root == p or root == q:        ### 这里比的是内存
            return root
        
        left_LCA = self.lowestCommonAncestor(root.left, p, q)
        right_LCA = self.lowestCommonAncestor(root.right, p, q)
        
        # A 和 B 一边一个
        if left_LCA and right_LCA:
            return root
        # 只有左边有A，B
        if left_LCA:
            return left_LCA
        # 只有右边有A，B
        if right_LCA:
            return right_LCA
        # 两边都没有A，B
        return None
```
