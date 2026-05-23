---
title: "LeetCode 1458 Max Dot Product Of Two Subsequences - Hard"
date: "2021-01-01"
excerpt: 1458. Max Dot Product of Two Subsequences
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 1458
comments: true
---

### 1458. Max Dot Product Of Two Subsequences — Hard

[Open on LeetCode](https://leetcode.com/problems/max-dot-product-of-two-subsequences/)

## Problem

1458. Max Dot Product of Two Subsequences

Given two arrays nums1 and nums2.

Return the maximum dot product between non-empty subsequences of nums1 and nums2 with the same length.

A subsequence of a array is a new array which is formed from the original array by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (ie, [2,3,5] is a subsequence of [1,2,3,4,5] while [1,5,3] is not).

 

Example 1:

Input: nums1 = [2,1,-2,5], nums2 = [3,0,-6]
Output: 18
Explanation: Take subsequence [2,-2] from nums1 and subsequence [3,-6] from nums2.
Their dot product is (2*3 + (-2)*(-6)) = 18.
Example 2:

Input: nums1 = [3,-2], nums2 = [2,-6,7]
Output: 21
Explanation: Take subsequence [3] from nums1 and subsequence [7] from nums2.
Their dot product is (3*7) = 21.
Example 3:

Input: nums1 = [-1,-1], nums2 = [1,1]
Output: -1
Explanation: Take subsequence [-1] from nums1 and subsequence [1] from nums2.
Their dot product is -1.

## Solution

```python
### DP :

class Solution:
    def maxDotProduct(self, nums1: List[int], nums2: List[int]) -> int:
        m = len(nums1)
        n = len(nums2)
        f = [[-float('inf')] * (m) for _ in range(n)]
        for i in range(n):
            for j in range(m):
                f[i][j] = nums2[i]*nums1[j]
                if i == 0 and j >= 1:
                    f[0][j] = max(f[0][j - 1], f[i][j])                
                if j == 0 and i >= 1:
                    f[i][0] = max(f[i - 1][0], f[i][j])
                if i >= 1 and j >= 1: 
                    f[i][j] = max(f[i - 1][j], f[i][j - 1], f[i - 1][j - 1] + nums2[i]*nums1[j], f[i][j])
        
        return f[n - 1][m - 1]
```
