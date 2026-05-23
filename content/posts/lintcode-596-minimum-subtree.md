---
title: "LintCode 596 Minimum Subtree - Easy"
date: "2021-01-01"
excerpt: 596. Minimum Subtree
kind: leetcode
tags:
  - LintCode
  - Easy
  - Python
order: 596
comments: true
---

### 596. Minimum Subtree — Easy

[Open on LintCode](https://www.lintcode.com/problem/596/)

## Problem

596. Minimum Subtree

Given a binary tree, find the subtree with minimum sum. Return the root of the subtree.

Example
Example 1:

Input:
{1,-5,2,1,2,-4,-5}
Output:1
Explanation:
The tree is look like this:
     1
   /   \
 -5     2
 / \   /  \
1   2 -4  -5 
The sum of whole tree is minimum, so return the root.
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
It's guaranteed that there is only one subtree with minimum sum and the given binary tree is not an empty tree.

## Solution

```python
### 第一种做法：
### 这里用了类变量（相当于类的全局变量,并不好），最好通过返回多个值来避免使用全局变量。

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
    @return: the root of the minimum subtree
    """
    def findSubtree(self, root):
        # write your code here
        self.minimum_weight = float('inf')
        
        self.minimum_subtree_root = None
        
        self.getTreeSum(root)
        
        return self.minimum_subtree_root
        
    def getTreeSum(self, root):
        if root is None:
            return 0
        
        left_weight = self.getTreeSum(root.left)
        right_weight = self.getTreeSum(root.right)
        
        root_weight = left_weight + right_weight + root.val
        if root_weight < self.minimum_weight:
            self.minimum_weight = root_weight
            self.minimum_subtree_root = root
        
        return root_weight



### 第二种解法：
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
    @return: the root of the minimum subtree
    """
    def findSubtree(self, root):
        # write your code here
        minimum, subtree, sum = self.helper(root)
        
        return subtree
        
    def helper(self, root):
        if root is None:
            return sys.maxsize, None, 0
        
        left_minimum, left_subtree, left_sum = self.helper(root.left)
        right_minimum, right_subtree, right_sum = self.helper(root.right)
        
        sum = left_sum + right_sum + root.val
        
        if left_minimum == min(left_minimum, right_minimum, sum):
            return left_minimum, left_subtree, sum
        if right_minimum == min(left_minimum, right_minimum, sum):
            return right_minimum, right_subtree, sum
        
        return sum, root, sum
```
