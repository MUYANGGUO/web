---
title: "LeetCode 958 Check Completeness Of A Binary Tree - Medium"
date: "2021-01-01"
excerpt: "958. Check Completeness of a Binary Tree -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 958
comments: true
---

### 958. Check Completeness Of A Binary Tree — Medium

[Open on LeetCode](https://leetcode.com/problems/check-completeness-of-a-binary-tree/)

## Problem

958. Check Completeness of a Binary Tree -- Medium

Given the root of a binary tree, determine if it is a complete binary tree.

In a complete binary tree, every level, except possibly the last, is completely filled, and all nodes in the last level are as far left as possible. It can have between 1 and 2h nodes inclusive at the last level h.


Example 1:

Input: root = [1,2,3,4,5,6]
Output: true
Explanation: Every level before the last is full (ie. levels with node-values {1} and {2, 3}), and all nodes in the last level ({4, 5, 6}) are as far left as possible.
Example 2:


Input: root = [1,2,3,4,5,null,7]
Output: false
Explanation: The node with value 7 isn't as far left as possible.

## Solution

```python
# BFS:

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isCompleteTree(self, root: TreeNode) -> bool:
        if not root:
            return True
        queue = deque([root])
        is_miss = False
        while queue:
            node = queue.popleft()
            if not node:
                is_miss = True
            else:
                if is_miss:
                    return False
                queue.append(node.left)
                queue.append(node.right)
        return True

# DFS 1:
class Solution(object):
    node_count = 0
    max_position = 0

    def isCompleteTree(self, root):
        self.isCompleteTreeHelper(root, 1)
        return self.max_position == self.node_count

    def isCompleteTreeHelper(self, root, position):
        if root is None:
            return
        self.node_count += 1
        self.max_position = max(self.max_position, position)
        self.isCompleteTreeHelper(root.left, 2 * position)
        self.isCompleteTreeHelper(root.right, 2 * position + 1)

# DFS 2:
def isCompleteTree(self, root):
    def dfs(root):
        if not root: return 0
        l, r = dfs(root.left), dfs(root.right)
        if l & (l + 1) == 0 and l / 2 <= r <= l:
            return l + r + 1
        if r & (r + 1) == 0 and r <= l <= r * 2 + 1:
            return l + r + 1
        return -1
    return dfs(root) > 0
```
