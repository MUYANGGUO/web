---
title: "LeetCode 111 Minimum Depth Of Binary Tree - Easy"
date: "2021-01-01"
excerpt: "111. Minimum Depth of Binary Tree -- Easy"
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 111
comments: true
---

### 111. Minimum Depth Of Binary Tree — Easy

[Open on LeetCode](https://leetcode.com/problems/minimum-depth-of-binary-tree/)

## Problem

111. Minimum Depth of Binary Tree -- Easy

Given a binary tree, find its minimum depth.

The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.

Note: A leaf is a node with no children.


Example 1:
Input: root = [3,9,20,null,null,15,7]
Output: 2

Example 2:
Input: root = [2,null,3,null,4,null,5,null,6]
Output: 5
 

Constraints:

The number of nodes in the tree is in the range [0, 105].
-1000 <= Node.val <= 1000

## Solution

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
from collections import deque
class Solution:
    def minDepth(self, root):
        """
        :type root: TreeNode
        :rtype: int
        """
        if not root:
            return 0
        else:
            node_deque = deque([(1, root),])
        
        while node_deque:
            depth, root = node_deque.popleft()
            if not root.left and not root.right:
                return depth
            children = [root.left, root.right]
            for c in children:
                if c:
                    node_deque.append((depth + 1, c))
```
