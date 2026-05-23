---
title: "LeetCode 222 Count Complete Tree Nodes - Medium"
date: "2021-01-01"
excerpt: "222. Count Complete Tree Nodes -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 222
comments: true
---

### 222. Count Complete Tree Nodes — Medium

[Open on LeetCode](https://leetcode.com/problems/count-complete-tree-nodes/)

## Problem

222. Count Complete Tree Nodes -- Medium

Given a complete binary tree, count the number of nodes.

Note:

Definition of a complete binary tree from Wikipedia:
In a complete binary tree every level, except possibly the last, is completely filled, and all nodes in the last level are as far left as possible. It can have between 1 and 2h nodes inclusive at the last level h.

Example:

Input: 
    1
   / \
  2   3
 / \  /
4  5 6

Output: 6

## Solution

```python
# 普通解：
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def countNodes(self, root: TreeNode) -> int:
        res = 0
        if not root:
            return 0
        res += self.countNodes(root.left)
        res += self.countNodes(root.right)
        return 1 + res


# 最优解 两次二分法：
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def countNodes(self, root: TreeNode) -> int:
        if not root:
            return 0
        depth = self.countDepth(root)
        left, right = 1, 2**depth - 1
        while left <= right:
            pivot = left + (right - left) // 2
            if self.exists(pivot, depth, root):
                left = pivot + 1
            else:
                right = pivot - 1
        # The tree contains 2**d - 1 nodes on the first (d - 1) levels + left on last
        return (2**depth - 1) + left
    
    def countDepth(self, root):
        res = 0
        while root.left:
            root = root.left
            res += 1
        return res

    def exists(self, idx: int, d: int, node: TreeNode) -> bool:
        left, right = 0, 2**d - 1
        # search thru level
        for _ in range(d):
            pivot = left + (right - left) // 2
            if idx <= pivot:
                node = node.left
                right = pivot
            else:
                node = node.right
                left = pivot + 1
        return node is not None
```
