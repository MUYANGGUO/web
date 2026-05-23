---
title: "LeetCode 96 Unique Binary Search Trees - Medium"
date: "2021-01-01"
excerpt: "96. Unique Binary Search Trees -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 96
comments: true
---

### 96. Unique Binary Search Trees — Medium

[Open on LeetCode](https://leetcode.com/problems/unique-binary-search-trees/)

## Problem

96. Unique Binary Search Trees -- Medium

Given n, how many structurally unique BST's (binary search trees) that store values 1 ... n?

Example:
Input: 3
Output: 5
Explanation:
Given n = 3, there are a total of 5 unique BST's:

   1         3     3      2      1
    \       /     /      / \      \
     3     2     1      1   3      2
    /     /       \                 \
   2     1         2                 3
 

Constraints:
1 <= n <= 19

## Solution

```python
### DP:
class Solution:
    def numTrees(self, n: int) -> int:
        # previously selected till reach n
        dp = [0] * (n + 1)
        dp[0] = 1
        dp[1] = 1
        # dp[i], i is the ending
        for i in range(2, n + 1):
            # j represents the root selected between 1 to i (ending)
            for j in range(1, i + 1):
                # dp[i] = each root selected, prev root substree number * after root subtree number
                dp[i] += dp[j - 1] * dp[i - j]
        return dp[n]
```
