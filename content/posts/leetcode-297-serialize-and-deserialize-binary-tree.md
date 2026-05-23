---
title: "LeetCode 297 Serialize And Deserialize Binary Tree - Hard"
date: "2021-01-01"
excerpt: 297. Serialize and Deserialize Binary Tree
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 297
comments: true
---

### 297. Serialize And Deserialize Binary Tree — Hard

[Open on LeetCode](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/)

## Problem

297. Serialize and Deserialize Binary Tree

Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.

Example: 

You may serialize the following tree:

    1
   / \
  2   3
     / \
    4   5

as "[1,2,3,null,null,4,5]"
Clarification: The above format is the same as how LeetCode serializes a binary tree. You do not necessarily need to follow this format, so please be creative and come up with different approaches yourself.

Note: Do not use class member/global/static variables to store states. Your serialize and deserialize algorithms should be stateless.

## Solution

```python
### 使用BFS方法实现序列化和反序列化的方式：


"""
Definition of TreeNode:
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left, self.right = None, None
"""


class Solution:
    """
    @param root: An object of TreeNode, denote the root of the binary tree.
    This method will be invoked first, you should design your own algorithm 
    to serialize a binary tree which denote by a root node to a string which
    can be easily deserialized by your own "deserialize" method later.
    """
    def serialize(self, root):
        # write your code here
        if root is None:
            return ""
        
        queue = collections.deque([root])
        bfs_order = []
        while queue:
            node = queue.popleft()
            bfs_order.append(str(node.val) if node else "#")
            if node:
                queue.append(node.left)
                queue.append(node.right)
        return ','.join(bfs_order)
        

    """
    @param data: A string serialized by your serialize method.
    This method will be invoked second, the argument data is what exactly
    you serialized at method "serialize", that means the data is not given by
    system, it's given by your own serialize method. So the format of data is
    designed by yourself, and deserialize it here as you serialize it in 
    "serialize" method.
    """
    def deserialize(self, data):
        # write your code here
        if not data:
            return None
        
        vals = data.split(',')
        root = TreeNode(int(vals[0]))
        queue = [root]
        isLeftChild = True
        index = 0
        
        for val in vals[1:]:
            if val is not "#":
                node = TreeNode(int(val))
                if isLeftChild:
                    queue[index].left = node
                else:
                    queue[index].right = node
                queue.append(node)
            
            if not isLeftChild:
                index += 1
            isLeftChild = not isLeftChild
            
        return root
```
