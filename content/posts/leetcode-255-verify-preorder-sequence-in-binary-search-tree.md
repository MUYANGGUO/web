---
title: "LeetCode 255 Verify Preorder Sequence In Binary Search Tree - Medium"
date: "2021-01-01"
excerpt: "255. Verify Preorder Sequence in Binary Search Tree -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 255
comments: true
---

### 255. Verify Preorder Sequence In Binary Search Tree — Medium

[Open on LeetCode](https://leetcode.com/problems/verify-preorder-sequence-in-binary-search-tree/)

## Problem

255. Verify Preorder Sequence in Binary Search Tree -- Medium

Given an array of numbers, verify whether it is the correct preorder traversal sequence of a binary search tree.

You may assume each number in the sequence is unique.

Consider the following binary search tree: 

     5
    / \
   2   6
  / \
 1   3
Example 1:

Input: [5,2,6,1,3]
Output: false
Example 2:

Input: [5,2,1,3,6]
Output: true
Follow up:
Could you do it using only constant space complexity?

## Solution

```python
# stack:
class Solution:
    def verifyPreorder(self, preorder: List[int]) -> bool:
        low = float("-inf")
        path = []
        for p in preorder:
            if p < low:
                return False
            while path and p > path[-1]:
                low = path[-1]
                path.pop()
            path.append(p)
        return True

# constant space:
class Solution:
    def verifyPreorder(self, preorder: List[int]) -> bool:
        low, i = float("-inf"), -1
        for p in preorder:
            if p < low:
                return False
            while i >= 0 and p > preorder[i]:
                low = preorder[i]
                i -= 1
            i += 1
            preorder[i] = p
        return True
```
