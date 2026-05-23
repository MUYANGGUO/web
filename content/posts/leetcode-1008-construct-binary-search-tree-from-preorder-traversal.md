---
title: "LeetCode 1008 Construct Binary Search Tree From Preorder Traversal - Medium"
date: "2021-01-01"
excerpt: "1008. Construct Binary Search Tree from Preorder Traversal -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 1008
comments: true
---

### 1008. Construct Binary Search Tree From Preorder Traversal — Medium

[Open on LeetCode](https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/)

## Problem

1008. Construct Binary Search Tree from Preorder Traversal -- Medium

Return the root node of a binary search tree that matches the given preorder traversal.

(Recall that a binary search tree is a binary tree where for every node, any descendant of node.left has a value < node.val, and any descendant of node.right has a value > node.val.  Also recall that a preorder traversal displays the value of the node first, then traverses node.left, then traverses node.right.)

It's guaranteed that for the given test cases there is always possible to find a binary search tree with the given requirements.

Example 1:

Input: [8,5,1,7,10,12]
Output: [8,5,10,1,7,null,12]


Constraints:

1 <= preorder.length <= 100
1 <= preorder[i] <= 10^8
The values of preorder are distinct.

## Solution

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def bstFromPreorder(self, preorder: List[int]) -> TreeNode:
        def helper(lower = float('-inf'), upper = float('inf')):
            nonlocal idx
            # if all elements from preorder are used
            if idx == n:
                return None
            val = preorder[idx]
            # if the current element not meet BST requirements
            if val < lower or val > upper:
                return None
            # place the current element
            idx += 1
            root = TreeNode(val)
            root.left = helper(lower, val)
            root.right = helper(val, upper)
            return root
        idx = 0
        n = len(preorder)
        return helper()
```
