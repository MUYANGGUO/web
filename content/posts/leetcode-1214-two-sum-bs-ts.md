---
title: "LeetCode 1214 Two Sum BS Ts - Medium"
date: "2021-01-01"
excerpt: "1214. Two Sum BSTs -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 1214
comments: true
---

### 1214. Two Sum BS Ts — Medium

[Open on LeetCode](https://leetcode.com/problems/two-sum-bs-ts/)

## Problem

1214. Two Sum BSTs -- Medium

Given two binary search trees, return True if and only if there is a node in the first tree and a node in the second tree whose values sum up to a given integer target.

Example 1:

Input: root1 = [2,1,4], root2 = [1,0,3], target = 5
Output: true
Explanation: 2 and 3 sum up to 5.

Example 2:

Input: root1 = [0,-10,10], root2 = [5,1,7,0,2], target = 18
Output: false
 

Constraints:

Each tree has at most 5000 nodes.
-10^9 <= target, node.val <= 10^9

## Solution

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def twoSumBSTs(self, root1: TreeNode, root2: TreeNode, target: int) -> bool:
        self.map = set()
        self.res = False
        self.inOrder_Hash(root1, target)
        self.check(root2)
        return self.res
    def inOrder_Hash(self, root, target):
        if root:
            self.inOrder_Hash(root.left, target)
            self.map.add(target - root.val)
            self.inOrder_Hash(root.right, target)
    def check(self, root):
        if root:
            self.check(root.left)
            if root.val in self.map:
                self.res = True
                return
            self.check(root.right)

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def twoSumBSTs(self, root1: TreeNode, root2: TreeNode, target: int) -> bool:
        stack, s = [], set()
        # traverse the first tree 
        # and store node complements (target - val) in hashset
        while stack or root1:
            while root1:
                stack.append(root1)
                root1 = root1.left
            root1 = stack.pop()
            s.add(target - root1.val)
            root1 = root1.right
        
        # traverse the second tree 
        # and check if one of the values exists in hashset
        while stack or root2:
            while root2:
                stack.append(root2)
                root2 = root2.left
            root2 = stack.pop()
            if root2.val in s:
                return True
            root2 = root2.right

        return False
```
