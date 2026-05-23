---
title: "LintCode 578 Lowest Common Ancestor III - Medium"
date: "2021-01-01"
excerpt: 578. Lowest Common Ancestor III
kind: leetcode
tags:
  - LintCode
  - Medium
  - Python
order: 578
comments: true
---

### 578. Lowest Common Ancestor III — Medium

[Open on LintCode](https://www.lintcode.com/problem/578/)

## Problem

578. Lowest Common Ancestor III

Given the root and two nodes in a Binary Tree. Find the lowest common ancestor(LCA) of the two nodes.
The lowest common ancestor is the node with largest depth which is the ancestor of both nodes.
Return null if LCA does not exist.

Example
Example1

Input: 
{4, 3, 7, #, #, 5, 6}
3 5
5 6
6 7 
5 8
Output: 
4
7
7
null
Explanation:
  4
 / \
3   7
   / \
  5   6

LCA(3, 5) = 4
LCA(5, 6) = 7
LCA(6, 7) = 7
LCA(5, 8) = null

Example2

Input:
{1}
1 1
Output: 
1
Explanation:
The tree is just a node, whose value is 1.
Notice
node A or node B may not exist in tree.
Each node has a different value

## Solution

```python
### LCA 的引申题目！利用flag来做的递归分治法DFS：

"""
Definition of TreeNode:
class TreeNode:
    def __init__(self, val):
        this.val = val
        this.left, this.right = None, None
"""


class Solution:
    """
    @param: root: The root of the binary tree.
    @param: A: A TreeNode
    @param: B: A TreeNode
    @return: Return the LCA of the two nodes.
    """
    def lowestCommonAncestor3(self, root, A, B):
        # write your code here
        ### 判断A B 是否全部在树上
        
        ### 我们需要两个flag， a， b
        
        a, b , LCA = self.helper(root, A, B)
        
        if a and b:
            return LCA
        else:
            return None
            
    def helper(self, root, A, B):
        if root is None:
            return False, False, None
        
        left_a, left_b, left_node = self.helper(root.left, A, B)
        right_a, right_b, right_node = self.helper(root.right, A, B)
        
        ### 这里是判断flag 包括了所有情况
        a = left_a or right_a or root == A
        b = left_b or right_b or root == B
        
        if root == A or root == B:
            return a, b, root
        
        if left_node is not None and right_node is not None:
            return a, b, root
        if left_node is not None:
            return a, b, left_node
        if right_node is not None:
            return a, b, right_node
        
        return a, b, None
```
