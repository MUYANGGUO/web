---
title: "LintCode 197 Permutation Index - Medium"
date: "2021-01-01"
excerpt: 197. Permutation Index
kind: leetcode
tags:
  - LintCode
  - Medium
  - Python
order: 197
comments: true
---

### 197. Permutation Index — Medium

[Open on LintCode](https://www.lintcode.com/problem/197/)

## Problem

197. Permutation Index


Given a permutation which contains no repeated number, find its index in all the permutations of these numbers, which are ordered in lexicographical order. The index begins at 1.

Example
Example 1:

Input:[1,2,4]
Output:1
Example 2:

Input:[3,2,1]
Output:6

## Solution

```python
class Solution:
    """
    @param A: An array of integers
    @return: A long integer
    """
    def permutationIndex(self, A):
        permutation = 1
        result = 0
        for i in range(len(A) - 2, -1, -1):
            ### 找到右侧比i位置小的数字有多少个
            smaller = 0
            ### 从 i + 1 开始到结尾 右侧。
            for j in range(i + 1, len(A)):
                if A[j] < A[i]:
                    smaller += 1
            result += smaller * permutation
            permutation *= len(A) - i
        return result + 1
```
