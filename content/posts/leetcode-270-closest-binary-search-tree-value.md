---
title: "LeetCode 270 Closest Binary Search Tree Value - Easy"
date: "2021-01-01"
excerpt: 270. Closest Binary Search Tree Value
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 270
comments: true
---

### 270. Closest Binary Search Tree Value — Easy

[Open on LeetCode](https://leetcode.com/problems/closest-binary-search-tree-value/)

## Problem

270. Closest Binary Search Tree Value

Given a non-empty binary search tree and a target value, find the value in the BST that is closest to the target.

Note:

Given target value is a floating point.
You are guaranteed to have only one unique value in the BST that is closest to the target.
Example:

Input: root = [4,2,5,1,3], target = 3.714286

    4
   / \
  2   5
 / \
1   3

Output: 4

## Solution

```python
### 经典模板题： 

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def closestValue(self, root, target):
        if not root:
            return None
        
        lower = self.getLow(root, target)
        upper = self.getHigh(root, target)
        if lower is None:
            return upper.val
        if upper is None:
            return lower.val
            
        if target - lower.val < upper.val - target:
            return lower.val
        return upper.val
        
    
    def getLow(self, node, target):
        if not node:
            return None
        ### 如果target 比现在的node还小，就继续往左边找
        if target < node.val:
            return self.getLow(node.left, target)
        ### 当target >= node.val的时候，开始往右边找
        lower = self.getLow(node.right, target)
        ### 如果没有右边，那么lower应该被return成None，那么最小的就是当前的node，如果要是有右边，就继续进去找
        return node if lower is None else lower 
    
    def getHigh(self, node, target):
        if not node:
            return None
        if target >= node.val:
            return self.getHigh(node.right, target)
        higher = self.getHigh(node.left, target)
        return node if higher is None else higher
```
