---
title: "LeetCode 102 Binary Tree Level Order Traversal - Medium"
date: "2021-01-01"
excerpt: 102. Binary Tree Level Order Traversal
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 102
comments: true
---

### 102. Binary Tree Level Order Traversal — Medium

[Open on LeetCode](https://leetcode.com/problems/binary-tree-level-order-traversal/)

## Problem

102. Binary Tree Level Order Traversal

Given a binary tree, return the level order traversal of its nodes' values. (ie, from left to right, level by level).

For example:
Given binary tree [3,9,20,null,null,15,7],
    3
   / \
  9  20
    /  \
   15   7
return its level order traversal as:
[
  [3],
  [9,20],
  [15,7]
]

## Solution

```python
### 1. 单队列的实现方式：

"""
Definition of TreeNode:
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left, self.right = None, None
"""

class Solution:
    """
    @param root: A Tree
    @return: Level order a list of lists of integer
    """
    def levelOrder(self, root):
        # write your code here
        if not root:
            return []
        # step 1. 把第一层的节点 防盗队列当中
        queue = collections.deque([root])
        res = []
        # step 2. while 队列非空
        while queue:
            level = []
            # step 3 把上一层的节点，拓展出下一层的节
            for i in range(len(queue)):
                ### pop the first in the queue in current level
                node = queue.popleft()
                ### update this node val in the level list
                level.append(node.val)
                ### find children in left and right, if any append to the tail of teh queue
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
                    
            res.append(level)
            
        return res

### 2. 双队列的实现方式：

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def levelOrder(self, root):
        ### two queue (two lists)
        if not root:
            return []
        ### use list for queue and next_queue
        queue = [root]
        res = []
        while queue:
            ### start a new next_queue
            next_queue = []
            res.append([node.val for node in queue])
            for node in queue:
                if node.left:
                    next_queue.append(node.left)
                if node.right:
                    next_queue.append(node.right)
            ### next_queue is now queue
            queue = next_queue

        return res

### 3. Dummy Node 的实现方式：

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def levelOrder(self, root):
        ### DummyNode
        ### use a Dummy Node in the queue to represent the end of the level:
        
        if not root:
            return []
        ### 这里要初始化的时候就带上末尾的dummy node
        queue = collections.deque([root, None])
        res, level = [],[]
        
        ### 使用dummy node只需要pop就好
        while queue:
            node = queue.popleft()
            ### 如果当前node是dummy node，说明这一层已经pop完
            if node is None:
                ### 更新level到res里
                res.append(level)
                ### reset level
                level = []
                ### 如果queue里还有node，说明还有下一层
                if queue:
                    ### 那么需要更新下一层的尾巴，加上dummy node
                    queue.append(None)
                ### 这里需要跳过，因为更新到了下一层了
                continue
            ### 如果当前node不是dummy node
            ### 更新 level
            level.append(node.val)
            ### 把当前node的children加进queue
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        
        return res
```
