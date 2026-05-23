---
title: "LeetCode 226 Invert Binary Tree - Easy"
date: "2021-01-01"
excerpt: ""
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 226
comments: true
---

### 226. Invert Binary Tree — Easy

[Open on LeetCode](https://leetcode.com/problems/invert-binary-tree/)

## Solution

```python
### Recursive:

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def invertTree(self, root):
        if root is None:
            return None
        root.left, root.right = self.invertTree(root.right), self.invertTree(root.left)
        return root


### Iterative BFS:

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def invertTree(self, root):
        queue = collections.deque([(root)])
        while queue:
            node = queue.popleft()
            if node:
                node.left, node.right = node.right, node.left
                queue.append(node.left)
                queue.append(node.right)
        return root


### Iterative DFS:

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def invertTree(self, root: TreeNode):
        stack = [root]
        while stack:
            node = stack.pop()
            if node:
                ### exchange node.left, node.right
                node.left, node.right = node.right, node.left
                stack.append(node.left)
                stack.append(node.right)
        return root
```
