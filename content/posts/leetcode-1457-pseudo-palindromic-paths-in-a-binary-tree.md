---
title: "LeetCode 1457 Pseudo-Palindromic Paths In A Binary Tree - Medium"
date: "2021-01-01"
excerpt: "1457. Pseudo-Palindromic Paths in a Binary Tree"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 1457
comments: true
---

### 1457. Pseudo-Palindromic Paths In A Binary Tree — Medium

[Open on LeetCode](https://leetcode.com/problems/pseudo-palindromic-paths-in-a-binary-tree/)

## Problem

1457. Pseudo-Palindromic Paths in a Binary Tree

Given a binary tree where node values are digits from 1 to 9. A path in the binary tree is said to be pseudo-palindromic if at least one permutation of the node values in the path is a palindrome.

Return the number of pseudo-palindromic paths going from the root node to leaf nodes.

 

Example 1:



Input: root = [2,3,1,3,1,null,1]
Output: 2 
Explanation: The figure above represents the given binary tree. There are three paths going from the root node to leaf nodes: the red path [2,3,3], the green path [2,1,1], and the path [2,3,1]. Among these paths only red path and green path are pseudo-palindromic paths since the red path [2,3,3] can be rearranged in [3,2,3] (palindrome) and the green path [2,1,1] can be rearranged in [1,2,1] (palindrome).
Example 2:



Input: root = [2,1,1,1,3,null,null,null,null,null,1]
Output: 1 
Explanation: The figure above represents the given binary tree. There are three paths going from the root node to leaf nodes: the green path [2,1,1], the path [2,1,3,1], and the path [2,1]. Among these paths only the green path is pseudo-palindromic since [2,1,1] can be rearranged in [1,2,1] (palindrome).
Example 3:

Input: root = [9]
Output: 1
 

Constraints:

The given binary tree will have between 1 and 10^5 nodes.
Node values are digits from 1 to 9.

## Solution

```python
### my DFS solution : 


# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    res = 0
    def pseudoPalindromicPaths (self, root):
        self.search(root , [])
        
        return self.res
    
    def search(self, root, path):
        ### exit
        if root.left == None and root.right == None:
            path.append(root.val)
            if self.check(path, {}):
                self.res += 1
            path.pop()
            return 
        path.append(root.val)
        if root.left:
            self.search(root.left, path)
        if root.right:
            self.search(root.right, path)
        path.pop()


    def check(self, path, counter):
        for num in path:
            counter[num] = counter.get(num, 0) + 1
        odd = 0
        for v in counter.values():
            if v % 2  == 0:
                continue
            
            odd += 1
        if odd <= 1:
            return True
        return False


### Other Solution : 

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def pseudoPalindromicPaths(self, root):
        return self.dfs(root)
    def dfs(self, root, count=0):
        if not root: return 0
        count ^= 1 << (root.val - 1)
        res = self.dfs(root.left, count) + self.dfs(root.right, count)
        if root.left == root.right:
            if count & (count - 1) == 0:
                res += 1
        return res
```
