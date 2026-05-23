---
title: "LeetCode 449 Serialize And Deserialize BST - Medium"
date: "2021-01-01"
excerpt: 449. Serialize and Deserialize BST
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 449
comments: true
---

### 449. Serialize And Deserialize BST — Medium

[Open on LeetCode](https://leetcode.com/problems/serialize-and-deserialize-bst/)

## Problem

449. Serialize and Deserialize BST

Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

Design an algorithm to serialize and deserialize a binary search tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary search tree can be serialized to a string and this string can be deserialized to the original tree structure.

The encoded string should be as compact as possible.

Note: Do not use class member/global/static variables to store states. Your serialize and deserialize algorithms should be stateless.

## Solution

```python
### 此题和对二叉树序列化反序列化的解法可以相同：



# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Codec:

    def serialize(self, root):
        """Encodes a tree to a single string.
        """
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
        

    def deserialize(self, data):
        """Decodes your encoded data to tree.
        """
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

# Your Codec object will be instantiated and called as such:
# codec = Codec()
# codec.deserialize(codec.serialize(root))
```
