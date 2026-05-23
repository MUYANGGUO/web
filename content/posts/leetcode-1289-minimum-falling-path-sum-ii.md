---
title: "LeetCode 1289 Minimum Falling Path Sum II - Hard"
date: "2021-01-01"
excerpt: "1289. Minimum Falling Path Sum II -- Hard"
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 1289
comments: true
---

### 1289. Minimum Falling Path Sum II — Hard

[Open on LeetCode](https://leetcode.com/problems/minimum-falling-path-sum-ii/)

## Problem

1289. Minimum Falling Path Sum II -- Hard

Given a square grid of integers arr, a falling path with non-zero shifts is a choice of exactly one element from each row of arr, such that no two elements chosen in adjacent rows are in the same column.

Return the minimum sum of a falling path with non-zero shifts.

 
Example 1:

Input: arr = [[1,2,3],[4,5,6],[7,8,9]]
Output: 13
Explanation: 
The possible falling paths are:
[1,5,9], [1,5,7], [1,6,7], [1,6,8],
[2,4,8], [2,4,9], [2,6,7], [2,6,8],
[3,4,8], [3,4,9], [3,5,7], [3,5,9]
The falling path with the smallest sum is [1,5,7], so the answer is 13.
 

Constraints:

1 <= arr.length == arr[i].length <= 200
-99 <= arr[i][j] <= 99

## Solution

```python
class Solution:
    def minFallingPathSum(self, arr: List[List[int]]) -> int:
        for i in range(1, len(arr)): 
            #find 1st & 2nd mininum
            m1 = m2 = float("inf")
            for x in arr[i-1]: 
                if x < m1: m1, m2 = x, m1
                elif x < m2: m2 = x
                    
            #update min falling path sum as of row i 
            for j in range(len(arr[0])): 
                arr[i][j] += (m1 if arr[i-1][j] != m1 else m2)
                    
        return min(arr[-1])
```
