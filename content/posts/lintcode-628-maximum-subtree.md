---
title: "LintCode 628 Maximum Subtree - Easy"
date: "2021-01-01"
excerpt: 628. Maximum Subtree
kind: leetcode
tags:
  - LintCode
  - Easy
  - Python
order: 628
comments: true
---

### 628. Maximum Subtree — Easy

[Open on LintCode](https://www.lintcode.com/problem/628/)

## Problem

628. Maximum Subtree

Given a binary tree, find the subtree with maximum sum. Return the root of the subtree.

Example
Example 1:

Input:
{1,-5,2,0,3,-4,-5}
Output:3
Explanation:
The tree is look like this:
     1
   /   \
 -5     2
 / \   /  \
0   3 -4  -5
The sum of subtree 3 (only one node) is the maximum. So we return 3.
Example 2:

Input:
{1}
Output:1
Explanation:
The tree is look like this:
   1
There is one and only one subtree in the tree. So we return 1.
Notice
LintCode will print the subtree which root is your return node.
It's guaranteed that there is only one subtree with maximum sum and the given binary tree is not an empty tree.

## Solution

```python
### DFS + 分治法：


"""
Definition of TreeNode:
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left, self.right = None, None
"""

class Solution:
    """
    @param root: the root of binary tree
    @return: the maximum weight node
    """
    maximum_weight = 0
    result = None
    def findSubtree(self, root):
        # write your code here
        self.helper(root)

        return self.result

    def helper(self, root):
        if root is None:
            return 0

        left_weight = self.helper(root.left)
        right_weight = self.helper(root.right)
        
        if left_weight + right_weight + root.val >= self.maximum_weight or self.result is None:
            self.maximum_weight = left_weight + right_weight + root.val
            self.result = root

        return left_weight + right_weight + root.val
```
