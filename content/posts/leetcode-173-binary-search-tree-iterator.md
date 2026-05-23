---
title: "LeetCode 173 Binary Search Tree Iterator - Medium"
date: "2021-01-01"
excerpt: 173. Binary Search Tree Iterator
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 173
comments: true
---

### 173. Binary Search Tree Iterator — Medium

[Open on LeetCode](https://leetcode.com/problems/binary-search-tree-iterator/)

## Problem

173. Binary Search Tree Iterator

Implement an iterator over a binary search tree (BST). Your iterator will be initialized with the root node of a BST.

Calling next() will return the next smallest number in the BST.



Example:



BSTIterator iterator = new BSTIterator(root);
iterator.next();    // return 3
iterator.next();    // return 7
iterator.hasNext(); // return true
iterator.next();    // return 9
iterator.hasNext(); // return true
iterator.next();    // return 15
iterator.hasNext(); // return true
iterator.next();    // return 20
iterator.hasNext(); // return false
 

Note:

next() and hasNext() should run in average O(1) time and uses O(h) memory, where h is the height of the tree.
You may assume that next() call will always be valid, that is, there will be at least a next smallest number in the BST when next() is called.
Implement an iterator over a binary search tree (BST). Your iterator will be initialized with the root node of a BST.

Calling next() will return the next smallest number in the BST.

 

Example:



BSTIterator iterator = new BSTIterator(root);
iterator.next();    // return 3
iterator.next();    // return 7
iterator.hasNext(); // return true
iterator.next();    // return 9
iterator.hasNext(); // return true
iterator.next();    // return 15
iterator.hasNext(); // return true
iterator.next();    // return 20
iterator.hasNext(); // return false
 

Note:

next() and hasNext() should run in average O(1) time and uses O(h) memory, where h is the height of the tree.
You may assume that next() call will always be valid, that is, there will be at least a next smallest number in the BST when next() is called.

## Solution

```python
### 通用版：

"""
Definition of TreeNode:
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left, self.right = None, None

Example of iterate a tree:
iterator = BSTIterator(root)
while iterator.hasNext():
    node = iterator.next()
    do something for node 
"""


class BSTIterator:
    """
    @param: root: The root of binary tree.
    """
    def __init__(self, root):
        self.stack = []
        while root != None:
            self.stack.append(root)
            root = root.left

    """
    @return: True if there has next node, or false
    """
    def hasNext(self):
        return len(self.stack) > 0

    """
    @return: return next node
    """
    def next(self):
        node = self.stack[-1]
        ### 如果右边有，那么把右边子树的最左放进stac
        if node.right is not None:
            n = node.right
            while n != None:
                self.stack.append(n)
                n = n.left
        ### 如果没有右枝，那么找最靠近的左parent
        else:
            n = self.stack.pop()
            while self.stack and self.stack[-1].right == n:
                n = self.stack.pop()
        
        return node



### 简单版：

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class BSTIterator:

    def __init__(self, root):
        self.stack = []
        self.find_most_left(root)
    
    def find_most_left(self, node):
        while node:
            self.stack.append(node)
            node = node.left        

    def next(self):
        """
        @return the next smallest number
        """
        node = self.stack.pop()
        if node.right:
            self.find_most_left(node.right)
        return node.val
        #or return node (depends on question)
        

    def hasNext(self):
        """
        @return whether we have a next smallest number
        """
        return bool(self.stack)
```
