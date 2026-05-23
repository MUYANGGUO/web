---
title: "LeetCode 101 Symmetric Tree - Easy"
date: "2021-01-01"
excerpt: "101. Symmetric Tree -- Easy"
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 101
comments: true
---

### 101. Symmetric Tree — Easy

[Open on LeetCode](https://leetcode.com/problems/symmetric-tree/)

## Problem

101. Symmetric Tree -- Easy

Given a binary tree, check whether it is a mirror of itself (ie, symmetric around its center).

For example, this binary tree [1,2,2,3,4,4,3] is symmetric:

    1
   / \
  2   2
 / \ / \
3  4 4  3
 

But the following [1,2,2,null,3,null,3] is not:

    1
   / \
  2   2
   \   \
   3    3
 

Follow up: Solve it both recursively and iteratively.

## Solution

```python
### recursively

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isSymmetric(self, root: TreeNode) -> bool:
        if not root:
            return True
        return self.dfs(root.left, root.right)
    
    def dfs(self, nodeleft, noderight):
        if not nodeleft and not noderight:
            return True
        if not nodeleft or not noderight:
            return False
        return nodeleft.val == noderight.val and self.dfs(nodeleft.left, noderight.right) and self.dfs(nodeleft.right, noderight.left)


### Iteratively:    
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isSymmetric(self, root: TreeNode) -> bool:
        if not root:
            return True
        stack = [(root.left, root.right)]
        while stack:
            l, r = stack.pop()
            if not l and not r:
                continue
            if not l or not r or (l.val != r.val):
                return False
            stack.append((l.left, r.right))
            stack.append((l.right, r.left))
        return True
```
