---
title: "LeetCode 145 Binary Tree Postorder Traversal - Hard"
date: "2021-01-01"
excerpt: 145. Binary Tree Postorder Traversal
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 145
comments: true
---

### 145. Binary Tree Postorder Traversal — Hard

[Open on LeetCode](https://leetcode.com/problems/binary-tree-postorder-traversal/)

## Problem

145. Binary Tree Postorder Traversal

Hard

Given a binary tree, return the postorder traversal of its nodes' values.

Example:

Input: [1,null,2,3]
   1
    \
     2
    /
   3

Output: [3,2,1]
Follow up: Recursive solution is trivial, could you do it iteratively?

## Solution

```python
### 二叉树的后序遍历（DFS）：


# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def postorderTraversal(self, root):
        result = []
        stack = []
        prev, curr = None, root
        if not root:
            return result
        stack.append(root)
        while len(stack) > 0:
            curr = stack[-1]
            if not prev or prev.left == curr or prev.right == curr: # traverse down the tree:
                if curr.left:
                    stack.append(curr.left)
                elif curr.right:
                    stack.append(curr.right)
            elif curr.left == prev: # traverse up the three from the left
                if curr.right:
                    stack.append(curr.right)
            else:
                result.append(curr.val)
                stack.pop()
            prev = curr
        
        return result
```
