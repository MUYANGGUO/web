---
title: "LintCode 474 Lowest Common Ancestor II - Easy"
date: "2021-01-01"
excerpt: 474. Lowest Common Ancestor II
kind: leetcode
tags:
  - LintCode
  - Easy
  - Python
order: 474
comments: true
---

### 474. Lowest Common Ancestor II — Easy

[Open on LintCode](https://www.lintcode.com/problem/474/)

## Problem

474. Lowest Common Ancestor II

Given the root and two nodes in a Binary Tree. Find the lowest common ancestor(LCA) of the two nodes.

The lowest common ancestor is the node with largest depth which is the ancestor of both nodes.

The node has an extra attribute parent which point to the father of itself. The root's parent is null.

Example
Example 1:

Input：{4,3,7,#,#,5,6},3,5
Output：4
Explanation：
     4
     / \
    3   7
       / \
      5   6
LCA(3, 5) = 4
Example 2:

Input：{4,3,7,#,#,5,6},5,6
Output：7
Explanation：
      4
     / \
    3   7
       / \
      5   6
LCA(5, 6) = 7

## Solution

```python
### LCA 系列题目：

"""
Definition of ParentTreeNode:
class ParentTreeNode:
    def __init__(self, val):
        self.val = val
        self.parent, self.left, self.right = None, None, None
"""


class Solution:
    """
    @param: root: The root of the tree
    @param: A: node in the tree
    @param: B: node in the tree
    @return: The lowest common ancestor of A and B
    """
    def lowestCommonAncestorII(self, root, A, B):
        # write your code here
        # 注意这里A，B 也都是Node，所以直接node.parent回去就可以了
        if root is None:
            return None
        if root == A or root == B:
            return root
        A_path = set()
        while A is not root:
            A_path.add(A)
            A = A.parent

        while B is not root:
            if B in A_path:
                return B
            B = B.parent

        return root
```
