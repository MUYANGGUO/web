---
title: "LeetCode 103 Binary Tree Zigzag Level Order Traversal - Medium"
date: "2021-01-01"
excerpt: 103. Binary Tree Zigzag Level Order Traversal
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 103
comments: true
---

### 103. Binary Tree Zigzag Level Order Traversal — Medium

[Open on LeetCode](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/)

## Problem

103. Binary Tree Zigzag Level Order Traversal

Given a binary tree, return the zigzag level order traversal of its nodes' values. (ie, from left to right, then right to left for the next level and alternate between).

For example:
Given binary tree [3,9,20,null,null,15,7],
    3
   / \
  9  20
    /  \
   15   7
return its zigzag level order traversal as:
[
  [3],
  [20,9],
  [15,7]
]

## Solution

```python
# 先顺序放，按level最后翻转比较方便。

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def zigzagLevelOrder(self, root: TreeNode) -> List[List[int]]:
        if not root:
            return []
        from collections import deque
        stack = deque()
        stack.append(root)
        count = 0
        res = []
        while stack:
            temp = []
            l = len(stack)
            for _ in range(l):
                node = stack.popleft()
                temp.append(node.val)
                if node.right:
                    stack.append(node.right)
                if node.left:
                    stack.append(node.left)
            if count % 2 == 0:
                temp = temp[::-1]
            count += 1
            res.append(temp)
        
        return res
```
