---
title: "LeetCode 437 Path Sum III - Medium"
date: "2021-01-01"
excerpt: "437. Path Sum III -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 437
comments: true
---

### 437. Path Sum III — Medium

[Open on LeetCode](https://leetcode.com/problems/path-sum-iii/)

## Problem

437. Path Sum III -- Medium

You are given a binary tree in which each node contains an integer value.

Find the number of paths that sum to a given value.

The path does not need to start or end at the root or a leaf, but it must go downwards (traveling only from parent nodes to child nodes).

The tree has no more than 1,000 nodes and the values are in the range -1,000,000 to 1,000,000.

Example:

root = [10,5,-3,3,2,null,11,3,-2,null,1], sum = 8

      10
     /  \
    5   -3
   / \    \
  3   2   11
 / \   \
3  -2   1

Return 3. The paths that sum to 8 are:

1.  5 -> 3
2.  5 -> 2 -> 1
3. -3 -> 11

## Solution

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def pathSum(self, root: TreeNode, sum: int) -> int:
        if not root:
            return 0
        else:
            return self.dfs(root, sum, 0)+self.pathSum(root.left, sum)+self.pathSum(root.right, sum)
    def dfs(self, root, sum, tmp):
        if not root:
            return 0
        else:
            flag=0
            if sum == tmp + root.val:
                flag=1
            return flag+self.dfs(root.left, sum, tmp+root.val)+self.dfs(root.right, sum, tmp+root.val)
```
