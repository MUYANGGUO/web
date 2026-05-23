---
title: "LeetCode 1130 Minimum Cost Tree From Leaf Values - Medium"
date: "2021-01-01"
excerpt: 1130. Minimum Cost Tree From Leaf Values
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 1130
comments: true
---

### 1130. Minimum Cost Tree From Leaf Values — Medium

[Open on LeetCode](https://leetcode.com/problems/minimum-cost-tree-from-leaf-values/)

## Problem

1130. Minimum Cost Tree From Leaf Values
Medium

Given an array arr of positive integers, consider all binary trees such that:

Each node has either 0 or 2 children;
The values of arr correspond to the values of each leaf in an in-order traversal of the tree.  (Recall that a node is a leaf if and only if it has 0 children.)
The value of each non-leaf node is equal to the product of the largest leaf value in its left and right subtree respectively.
Among all possible binary trees considered, return the smallest possible sum of the values of each non-leaf node.  It is guaranteed this sum fits into a 32-bit integer.
 
Example 1:

Input: arr = [6,2,4]
Output: 32
Explanation:
There are two possible trees.  The first has non-leaf node sum 36, and the second has non-leaf node sum 32.

    24            24
   /  \          /  \
  12   4        6    8
 /  \               / \
6    2             2   4
 

Constraints:

2 <= arr.length <= 40
1 <= arr[i] <= 15
It is guaranteed that the answer fits into a 32-bit signed integer (ie. it is less than 2^31).

## Solution

```python
class Solution:
    def mctFromLeafValues(self, arr: List[int]) -> int:
        n = len(arr)
        dp = [[0] * n for _ in range(n)]
        for i in range(0, n-1):
            dp[i][i+1]=arr[i]*arr[i+1]
        
        for length in range(2, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1
                temp = float('inf')
                for k in range(i, j):
                    temp = min(temp, dp[i][k] + dp[k + 1][j] + 
                               max(arr[i:k + 1]) * max(arr[k + 1 : j + 1]))
                dp[i][j] = temp
        return dp[0][n - 1]
```
