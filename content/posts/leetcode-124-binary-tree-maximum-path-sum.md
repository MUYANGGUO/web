---
title: "LeetCode 124 Binary Tree Maximum Path Sum - Hard"
date: "2021-01-01"
excerpt: "124. Binary Tree Maximum Path Sum -- Hard"
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 124
comments: true
---

### 124. Binary Tree Maximum Path Sum — Hard

[Open on LeetCode](https://leetcode.com/problems/binary-tree-maximum-path-sum/)

## Problem

124. Binary Tree Maximum Path Sum -- Hard

Given a non-empty binary tree, find the maximum path sum.

For this problem, a path is defined as any node sequence from some starting node to any node in the tree along the parent-child connections. The path must contain at least one node and does not need to go through the root.
 
Example 1:

Input: root = [1,2,3]
Output: 6

Example 2:

Input: root = [-10,9,20,null,null,15,7]
Output: 42
 

Constraints:

The number of nodes in the tree is in the range [0, 3 * 104].
-1000 <= Node.val <= 1000

## Solution

```python
#分治法：
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def maxPathSum(self, root: TreeNode) -> int:
        maxSum, _ = self.maxPathHelper(root)
        return maxSum
        
    def maxPathHelper(self, root):
        if root is None:
            return float('-inf'), 0
        left = self.maxPathHelper(root.left)
        right = self.maxPathHelper(root.right)
        maxpath = max(left[0], right[0], root.val + left[1] + right[1])
        single = max(left[1] + root.val, right[1] + root.val, 0)
        return maxpath, single
```
