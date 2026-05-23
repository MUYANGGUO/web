---
title: "LeetCode 589 N-ary Tree Preorder Traversal - Easy"
date: "2021-01-01"
excerpt: "589. N-ary Tree Preorder Traversal -- Easy"
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 589
comments: true
---

### 589. N-ary Tree Preorder Traversal — Easy

[Open on LeetCode](https://leetcode.com/problems/n-ary-tree-preorder-traversal/)

## Problem

589. N-ary Tree Preorder Traversal -- Easy

Given an n-ary tree, return the preorder traversal of its nodes' values.

Nary-Tree input serialization is represented in their level order traversal, each group of children is separated by the null value (See examples).

Follow up:

Recursive solution is trivial, could you do it iteratively?


Example 1:

Input: root = [1,null,3,2,4,null,5,6]
Output: [1,3,5,6,2,4]

Example 2:

Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
Output: [1,2,3,6,7,11,14,4,8,12,5,9,13,10]


Constraints:

The height of the n-ary tree is less than or equal to 1000
The total number of nodes is between [0, 10^4]

## Solution

```python
# Recursive:
"""
# Definition for a Node.
class Node:
    def __init__(self, val=None, children=None):
        self.val = val
        self.children = children
"""

class Solution:
    def preorder(self, root: 'Node') -> List[int]:
        self.res = []
        self.preorder_traverse(root)
        return self.res
    def preorder_traverse(self, root):
        if root:
            self.res.append(root.val)
            for child in root.children:
                self.preorder_traverse(child)


# Iterative: 注意stack加入时注意反序加入，这样pop出来的时最后加入的。
"""
# Definition for a Node.
class Node:
    def __init__(self, val=None, children=None):
        self.val = val
        self.children = children
"""

class Solution:
    def preorder(self, root: 'Node') -> List[int]:
        if root is None:
            return []
        stack, output = [root, ], []            
        while stack:
            root = stack.pop()
            output.append(root.val)
            stack.extend(root.children[::-1])
            # reverse 因为我们用的是stack，pop出的是后加入的
        return output
```
