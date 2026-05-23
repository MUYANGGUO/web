---
title: "LeetCode 230 Kth Smallest Element Ina BST - Medium"
date: "2021-01-01"
excerpt: 230. Kth Smallest Element in a BST
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 230
comments: true
---

### 230. Kth Smallest Element Ina BST — Medium

[Open on LeetCode](https://leetcode.com/problems/kth-smallest-element-ina-bst/)

## Problem

230. Kth Smallest Element in a BST

Given a binary search tree, write a function kthSmallest to find the kth smallest element in it.

 

Example 1:

Input: root = [3,1,4,null,2], k = 1
   3
  / \
 1   4
  \
   2
Output: 1
Example 2:

Input: root = [5,3,6,2,4,null,null,1], k = 3
       5
      / \
     3   6
    / \
   2   4
  /
 1
Output: 3
Follow up:
What if the BST is modified (insert/delete operations) often and you need to find the kth smallest frequently? How would you optimize the kthSmallest routine?

## Solution

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def kthSmallest(self, root, k):
        dummy = TreeNode(0)
        dummy.right = root
        stack = [dummy]
            
        for i in range(k):
            node = stack.pop()
            if node.right:
                node = node.right
                while node:
                    stack.append(node)
                    node = node.left
            if not stack:
                return None
                
        return stack[-1].val
```
