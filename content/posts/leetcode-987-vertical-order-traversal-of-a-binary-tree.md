---
title: "LeetCode 987 Vertical Order Traversal Of A Binary Tree - Medium"
date: "2021-01-01"
excerpt: "987. Vertical Order Traversal of a Binary Tree -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 987
comments: true
---

### 987. Vertical Order Traversal Of A Binary Tree — Medium

[Open on LeetCode](https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/)

## Problem

987. Vertical Order Traversal of a Binary Tree -- Medium

Given a binary tree, return the vertical order traversal of its nodes values.

For each node at position (X, Y), its left and right children respectively will be at positions (X-1, Y-1) and (X+1, Y-1).

Running a vertical line from X = -infinity to X = +infinity, whenever the vertical line touches some nodes, we report the values of the nodes in order from top to bottom (decreasing Y coordinates).

If two nodes have the same position, then the value of the node that is reported first is the value that is smaller.

Return an list of non-empty reports in order of X coordinate.  Every report will have a list of values of nodes.

 

Example 1:
Input: [3,9,20,null,null,15,7]
Output: [[9],[3,15],[20],[7]]
Explanation: 
Without loss of generality, we can assume the root node is at position (0, 0):
Then, the node with value 9 occurs at position (-1, -1);
The nodes with values 3 and 15 occur at positions (0, 0) and (0, -2);
The node with value 20 occurs at position (1, -1);
The node with value 7 occurs at position (2, -2).

Example 2:
Input: [1,2,3,4,5,6,7]
Output: [[4],[2],[1,5,6],[3],[7]]
Explanation: 
The node with value 5 and the node with value 6 have the same position according to the given scheme.
However, in the report "[1,5,6]", the node value of 5 comes first since 5 is smaller than 6.
 

Note:
The tree will have between 1 and 1000 nodes.
Each node's value will be between 0 and 1000.

## Solution

```python
### BFS solution:
import collections
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def verticalTraversal(self, root: TreeNode) -> List[List[int]]:
        map = self.bfs(root)
        res = []
        for key in sorted(map.keys()):
            res.append( [x[1] for x in sorted(map[key])])
        return res
        
    def bfs(self, root):
        queue = collections.deque([(root, 0, 0)])
        map = collections.defaultdict(list)
        while queue:
            node, x, y = queue.popleft()
            map[x].append((-y, node.val))
            if node.left:
                queue.append((node.left, x - 1, y - 1))
            if node.right:
                queue.append((node.right, x + 1, y - 1))
        return map

### DFS solution:
import collections
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def verticalTraversal(self, root: TreeNode) -> List[List[int]]:
        self.map = collections.defaultdict(list)
        self.dfs(root, 0, 0)
        res = []
        for key in sorted(self.map.keys()):
            res.append([x[1] for x in sorted(self.map[key])])
        return res
        
    def dfs(self, root, x, y):
        if not root:
            return
        self.map[x].append((-y, root.val))
        self.dfs(root.left, x - 1, y - 1)
        self.dfs(root.right, x + 1, y - 1)
```
