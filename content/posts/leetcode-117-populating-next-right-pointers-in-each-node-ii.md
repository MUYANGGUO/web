---
title: "LeetCode 117 Populating Next Right Pointers In Each Node II - Medium"
date: "2021-01-01"
excerpt: "117. Populating Next Right Pointers in Each Node II -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 117
comments: true
---

### 117. Populating Next Right Pointers In Each Node II — Medium

[Open on LeetCode](https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/)

## Problem

117. Populating Next Right Pointers in Each Node II -- Medium

Given a binary tree
struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL.
Initially, all next pointers are set to NULL.


Follow up:
You may only use constant extra space.
Recursive approach is fine, you may assume implicit stack space does not count as extra space for this problem.


Example 1:
Input: root = [1,2,3,4,5,null,7]
Output: [1,#,2,3,#,4,5,7,#]
Explanation: Given the above binary tree (Figure A), your function should populate each next pointer to point to its next right node, just like in Figure B. The serialized output is in level order as connected by the next pointers, with '#' signifying the end of each level.

Constraints:
The number of nodes in the given tree is less than 6000.
-100 <= node.val <= 100

## Solution

```python
### BFS: O(N), O(N)
# Definition for a Node.
class Node:
    def __init__(self, val: int = 0, left: 'Node' = None, right: 'Node' = None, next: 'Node' = None):
        self.val = val
        self.left = left
        self.right = right
        self.next = next

class Solution:
    def connect(self, root: 'Node') -> 'Node':
        if not root:
            return root
        # Initialize a queue data structure which contains
        # just the root of the tree
        Q = collections.deque([root])
        # Outer while loop which iterates over 
        # each level
        while Q:
            # Note the size of the queue
            size = len(Q)
            # Iterate over all the nodes on the current level
            for i in range(size):
                # Pop a node from the front of the queue
                node = Q.popleft()
                # This check is important. We don't want to
                # establish any wrong connections. The queue will
                # contain nodes from 2 levels at most at any
                # point in time. This check ensures we only 
                # don't establish next pointers beyond the end
                # of a level
                if i < size - 1:
                    node.next = Q[0]
                # Add the children, if any, to the back of
                # the queue
                if node.left:
                    Q.append(node.left)
                if node.right:
                    Q.append(node.right)
        # Since the tree has now been modified, return the root node
        return root

### O(N), O(1), 直接利用next指针来相当于level的queue，前提是用上一层的信息，修改下一层。

# Definition for a Node.
class Node:
    def __init__(self, val: int = 0, left: 'Node' = None, right: 'Node' = None, next: 'Node' = None):
        self.val = val
        self.left = left
        self.right = right
        self.next = next
class Solution:
    def processChild(self, childNode, prev, leftmost):
        if childNode:
            # If the "prev" pointer is alread set i.e. if we
            # already found atleast one node on the next level,
            # setup its next pointer
            if prev:
                prev.next = childNode
            else:    
                # Else it means this child node is the first node
                # we have encountered on the next level, so, we
                # set the leftmost pointer
                leftmost = childNode
            prev = childNode 
        return prev, leftmost
    
    def connect(self, root: 'Node') -> 'Node':
        
        if not root:
            return root
        # The root node is the only node on the first level
        # and hence its the leftmost node for that level
        leftmost = root
        # We have no idea about the structure of the tree,
        # so, we keep going until we do find the last level.
        # The nodes on the last level won't have any children
        while leftmost:
            # "prev" tracks the latest node on the "next" level
            # while "curr" tracks the latest node on the current
            # level.
            prev, curr = None, leftmost
            # We reset this so that we can re-assign it to the leftmost
            # node of the next level. Also, if there isn't one, this
            # would help break us out of the outermost loop.
            leftmost = None
            # Iterate on the nodes in the current level using
            # the next pointers already established.
            while curr:
                # Process both the children and update the prev
                # and leftmost pointers as necessary.
                prev, leftmost = self.processChild(curr.left, prev, leftmost)
                prev, leftmost = self.processChild(curr.right, prev, leftmost)
                # Move onto the next node.
                curr = curr.next
        return root
```
