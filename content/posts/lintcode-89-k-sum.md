---
title: "LintCode 89 K Sum - Hard"
date: "2021-01-01"
excerpt: 89. k Sum
kind: leetcode
tags:
  - LintCode
  - Hard
  - Python
order: 89
comments: true
---

### 89. K Sum — Hard

[Open on LintCode](https://www.lintcode.com/problem/89/)

## Problem

89. k Sum
中文English
Given n distinct positive integers, integer k (k <= n) and a number target.

Find k numbers where sum is target. Calculate how many solutions there are?

样例
Example 1

Input:
List = [1,2,3,4]
k = 2
target = 5
Output: 2
Explanation: 1 + 4 = 2 + 3 = 5
Example 2

Input:
List = [1,2,3,4,5]
k = 3
target = 6
Output: 1
Explanation: There is only one method. 1 + 2 + 3 = 6

## Solution

```python
### 本质是背包问题


### 考虑最后一步：
### 最后一个数是A[n - 1] 
### 1. 不选：
###     需要在前 n - 1 个数中选 k 个数，使得他们的和是target
### 2. 选：
###     需要在前 n - 1 个数中选 k - 1 个数， 使得他们的和是 target - A[n - 1]

### 综上前面两种可能性的 方法数 之和。

class Solution:
    """
    @param A: An integer array
    @param k: A positive integer (k <= length(A))
    @param target: An integer
    @return: An integer
    """
    def kSum(self, A, K, target):
        # write your code here
        # Kanpsack Problem:
        n = len(A)
        
        f = [[[0] * (target + 1) for _ in range(K + 1)] for _ in range(n + 1)]
        
        f[0][0][0] = 1
        
        for i in range(1, n + 1):
            for k in range(K + 1):
                for s in range(target + 1):
                    f[i][k][s] = f[i - 1][k][s] ### not choosing A[i - 1]
                    
                    if k > 0 and s >= A[i - 1]:
                        ### choosing A[i - 1]
                        f[i][k][s] += f[i - 1][k - 1][s - A[i - 1]]
                        
        return f[n][k][target]

### 滚动数组优化：

class Solution:
    """
    @param A: An integer array
    @param k: A positive integer (k <= length(A))
    @param target: An integer
    @return: An integer
    """
    def kSum(self, A, K, target):
        # write your code here
        # Kanpsack Problem:
        n = len(A)
        
        f = [[[0] * (target + 1) for _ in range(K + 1)] for _ in range(2)]
        
        f[0][0][0] = 1
        old, now = 0 , 0
        for i in range(1, n + 1):
            old = now
            now = 1 - now
            for k in range(K + 1):
                for s in range(target + 1):
                    f[now][k][s] = f[old][k][s] ### not choosing A[i - 1]
                    
                    if k > 0 and s >= A[i - 1]:
                        ### choosing A[i - 1]
                        f[now][k][s] += f[old][k - 1][s - A[i - 1]]

        return f[now][k][target]
```
