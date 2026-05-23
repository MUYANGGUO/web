---
title: "LintCode 724 Minimum Partition - Medium"
date: "2021-01-01"
excerpt: 724. Minimum Partition
kind: leetcode
tags:
  - LintCode
  - Medium
  - Python
order: 724
comments: true
---

### 724. Minimum Partition — Medium

[Open on LintCode](https://www.lintcode.com/problem/724/)

## Problem

724. Minimum Partition

Description

Given a set of positive integers, write a function to divide it into two sets S1 and S2 such that the absolute difference between their sums is minimum.

If there is a set S with n elements, then if we assume Subset1 has m elements, Subset2 must have n-m elements and the value of abs(sum(Subset1) – sum(Subset2)) should be minimum.

Have you met this question in a real interview?  
Example
Example1

Input: nums = [1, 6, 11, 5]
Output: 1
Explanation: 
Subset1 = [1, 5, 6], sum of Subset1 = 12 
Subset2 = [11], sum of Subset2 = 11   
abs(11 - 12) = 1     
Example2

Input: nums = [1, 2, 3, 4]
Output: 0
Explanation: 
Subset1 = [1, 4], sum of Subset1 = 5
Subset2 = [2, 3], sum of Subset2 = 5   
abs(5 - 5) = 0

## Solution

```python
### DP 转换成背包问题了:



class Solution:
    """
    @param nums: the given array
    @return: the minimum difference between their sums 
    """
    def findMin(self, nums):
        # write your code here
        n = len(nums)
        total_sum = sum(nums)
        m = total_sum // 2
        
        dp = [[False] * (m + 1) for _ in range(2)]
        
        dp[0][0] = True
        
        for i in range(1, n + 1):
            dp[i % 2][0] = True
            for j in range(1, m + 1):
                if nums[i - 1] > j:
                    dp[i % 2][j] = dp[(i - 1) % 2][j]
                else:
                    dp[i % 2][j] = dp[(i - 1) % 2][j] or dp[(i - 1) % 2][j - nums[i - 1]]
        
        for i in range(m, -1, -1):
            if dp[n % 2][i]:
                return total_sum - 2 * i
        
        return total_sum
```
