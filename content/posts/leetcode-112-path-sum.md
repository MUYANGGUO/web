---
title: "LeetCode 112 Path Sum - Easy"
date: "2021-01-01"
excerpt: "112. Path Sum -- Easy"
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 112
comments: true
---

### 112. Path Sum — Easy

[Open on LeetCode](https://leetcode.com/problems/path-sum/)

## Problem

112. Path Sum -- Easy

Given a binary tree and a sum, determine if the tree has a root-to-leaf path such that adding up all the values along the path equals the given sum.

Note: A leaf is a node with no children.

Example:

Given the below binary tree and sum = 22,

      5
     / \
    4   8
   /   / \
  11  13  4
 /  \      \
7    2      1
return true, as there exist a root-to-leaf path 5->4->11->2 which sum is 22.

## Solution

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def hasPathSum(self, root: TreeNode, sum: int) -> bool:
        if not root:
            return False
        res = 0
        return self.dfs(root, res, sum)
        
    def dfs(self, root, res, sum):
        res += root.val
        # before going to the ending condition, there should be a check to return True
        if not root.left and not root.right:
            if res == sum:
                return True
            else:
                return False
       
        flag1 = self.dfs(root.left, res, sum)  if root.left else False
            
        flag2 = self.dfs(root.right, res, sum)  if root.right else False
        
        return flag1 or flag2


# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def hasPathSum(self, root: TreeNode, sum: int) -> bool:
        if not root:
            return False
        res = 0
        return self.dfs(root, res, sum)
        
    def dfs(self, root, res, sum):
        if not root:
            return False
        
        res += root.val
        # before going to the ending condition, there should be a check to return True
        if not root.left and not root.right:
            if res == sum:
                return True


        return self.dfs(root.left, res, sum) or self.dfs(root.right, res, sum)


# Iteratively, using stack:

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def hasPathSum(self, root: TreeNode, sum: int) -> bool:
        if not root:
            return False

        de = [(root, sum - root.val), ]
        while de:
            node, curr_sum = de.pop()
            if not node.left and not node.right and curr_sum == 0:  
                return True
            if node.right:
                de.append((node.right, curr_sum - node.right.val))
            if node.left:
                de.append((node.left, curr_sum - node.left.val))
        return False
```
