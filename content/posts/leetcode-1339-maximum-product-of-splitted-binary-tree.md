---
title: "LeetCode 1339 Maximum Product Of Splitted Binary Tree - Medium"
date: "2021-01-01"
excerpt: "1339. Maximum Product of Splitted Binary Tree -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 1339
comments: true
---

### 1339. Maximum Product Of Splitted Binary Tree — Medium

[Open on LeetCode](https://leetcode.com/problems/maximum-product-of-splitted-binary-tree/)

## Problem

1339. Maximum Product of Splitted Binary Tree -- Medium

Given a binary tree root. Split the binary tree into two subtrees by removing 1 edge such that the product of the sums of the subtrees are maximized.

Since the answer may be too large, return it modulo 10^9 + 7.


Example 1:

Input: root = [1,2,3,4,5,6]
Output: 110
Explanation: Remove the red edge and get 2 binary trees with sum 11 and 10. Their product is 110 (11*10)

Example 2:

Input: root = [1,null,2,3,4,null,null,5,6]
Output: 90
Explanation:  Remove the red edge and get 2 binary trees with sum 15 and 6.Their product is 90 (15*6)

Example 3:

Input: root = [2,3,9,10,7,8,6,5,4,11,1]
Output: 1025

Example 4:

Input: root = [1,1]
Output: 1
 

Constraints:

Each tree has at most 50000 nodes and at least 2 nodes.
Each node's value is between [1, 10000].

## Solution

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def maxProduct(self, root: TreeNode) -> int:
        all_sums = []
        def tree_sum(subroot):
            if subroot is None: return 0
            left_sum = tree_sum(subroot.left)
            right_sum = tree_sum(subroot.right)
            total_sum = left_sum + right_sum + subroot.val
            all_sums.append(total_sum)
            return total_sum
        total = tree_sum(root)
        best = 0
        for s in all_sums:
            best = max(best, s * (total - s))   
        return best % (10 ** 9 + 7)
    
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def maxProduct(self, root: TreeNode) -> int:
        def findTotalSum(root):
            if root is None: return 0
            left_sum = findTotalSum(root.left)
            right_sum = findTotalSum(root.right)
            return left_sum + right_sum + root.val
        def findMaxProduct(subroot, res, total):
            if subroot is None: 
                return 0
            left_sum = findMaxProduct(subroot.left, res, total)
            right_sum = findMaxProduct(subroot.right, res, total)
            subtotal_sum = left_sum + right_sum + subroot.val
            product = subtotal_sum * (total - subtotal_sum)
            self.res = max(self.res, product)
            return subtotal_sum
        
        self.res = 0
        totalSum = findTotalSum(root)
        findMaxProduct(root, self.res, totalSum)
        return self.res % (10 ** 9 + 7)
```
