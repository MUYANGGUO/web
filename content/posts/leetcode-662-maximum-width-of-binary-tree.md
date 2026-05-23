---
title: "LeetCode 662 Maximum Width Of Binary Tree - Medium"
date: "2021-01-01"
excerpt: "662. Maximum Width of Binary Tree -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 662
comments: true
---

### 662. Maximum Width Of Binary Tree — Medium

[Open on LeetCode](https://leetcode.com/problems/maximum-width-of-binary-tree/)

## Problem

662. Maximum Width of Binary Tree -- Medium

Given a binary tree, write a function to get the maximum width of the given tree. The maximum width of a tree is the maximum width among all levels.

The width of one level is defined as the length between the end-nodes (the leftmost and right most non-null nodes in the level, where the null nodes between the end-nodes are also counted into the length calculation.

It is guaranteed that the answer will in the range of 32-bit signed integer.

Example 1:
Input: 

           1
         /   \
        3     2
       / \     \  
      5   3     9 

Output: 4
Explanation: The maximum width existing in the third level with the length 4 (5,3,null,9).

Example 2:
Input: 

          1
         /  
        3    
       / \       
      5   3     

Output: 2
Explanation: The maximum width existing in the third level with the length 2 (5,3).

Example 3:
Input: 

          1
         / \
        3   2 
       /        
      5      

Output: 2
Explanation: The maximum width existing in the second level with the length 2 (3,2).

Example 4:
Input: 

          1
         / \
        3   2
       /     \  
      5       9 
     /         \
    6           7
Output: 8
Explanation:The maximum width existing in the fourth level with the length 8 (6,null,null,null,null,null,null,7).
 

Constraints:
The given binary tree will have between 1 and 3000 nodes.

## Solution

```python
### BFS with coords:

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def widthOfBinaryTree(self, root: TreeNode) -> int:
        queue = collections.deque([(root, 0)])
        maxLevel = float('-inf')
        while queue:
            _, head_index = queue[0]
            for _ in range(len(queue)):
                node, col_index = queue.popleft()
                if node.left:
                    queue.append([node.left, col_index * 2])
                if node.right:
                    queue.append([node.right, col_index * 2 + 1])
            maxLevel = max(maxLevel, col_index - head_index + 1)
        return maxLevel

### DFS with Hashmap store the first encountered depth col, preorder, because left is first:
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def widthOfBinaryTree(self, root: TreeNode) -> int:

        # table contains the first col_index for each level
        first_col_index_table = {}
        max_width = 0

        def DFS(node, depth, col_index):
            nonlocal max_width
            if node is None:
                return
            # if the entry is empty, set the value
            if depth not in first_col_index_table:
                first_col_index_table[depth] = col_index

            max_width = max(max_width, col_index - first_col_index_table[depth] + 1)

            # Preorder DFS, with the priority on the left child
            DFS(node.left, depth+1, 2*col_index)
            DFS(node.right, depth+1, 2*col_index + 1)

        DFS(root, 0, 0)

        return max_width
```
