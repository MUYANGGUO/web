---
title: "LeetCode 889 Construct Binary Tree From Preorder And Postorder Traversal - Medium"
date: "2021-01-01"
excerpt: 889. Construct Binary Tree from Preorder and Postorder Traversal
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 889
comments: true
---

### 889. Construct Binary Tree From Preorder And Postorder Traversal — Medium

[Open on LeetCode](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal/)

## Problem

889. Construct Binary Tree from Preorder and Postorder Traversal

Return any binary tree that matches the given preorder and postorder traversals.

Values in the traversals pre and post are distinct positive integers.

Example 1:

Input: pre = [1,2,4,5,3,6,7], post = [4,5,2,6,7,3,1]
Output: [1,2,3,4,5,6,7]
 

Note:

1 <= pre.length == post.length <= 30
pre[] and post[] are both permutations of 1, 2, ..., pre.length.
It is guaranteed an answer exists. If there exists multiple answers, you can return any of them.

## Solution

```python
### 递归，因为不知道left， right的深度，所以需要pre和post两个来确定。这题用递归注意理解。同时需要牢记三种顺序都是什么。

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def constructFromPrePost(self, pre: List[int], post: List[int]) -> TreeNode:
        # Depth First Traversals:
        # (a) Inorder (Left, Root, Right)
        # (b) Preorder (Root, Left, Right)
        # (c) Postorder (Left, Right, Root)
        # pre = [1,2,4,5,3,6,7], post = [4,5,2,6,7,3,1]
        if not pre or not post:
            return None
        root = TreeNode(pre[0])
        if len(pre) == 1: return root
        # find where pre[1] is at in post: pre[1] is the start of left branch and the end of the post left branch
        ind = post.index(pre[1]) + 1
        
        root.left = self.constructFromPrePost(pre[1 : ind + 1], post[: ind])
        root.right = self.constructFromPrePost(pre[ind + 1:], post[ind : -1])
        return root
```
