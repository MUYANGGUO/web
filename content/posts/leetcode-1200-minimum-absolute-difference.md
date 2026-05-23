---
title: "LeetCode 1200 Minimum Absolute Difference - Easy"
date: "2021-01-01"
excerpt: "1200. Minimum Absolute Difference -- Easy"
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 1200
comments: true
---

### 1200. Minimum Absolute Difference — Easy

[Open on LeetCode](https://leetcode.com/problems/minimum-absolute-difference/)

## Problem

1200. Minimum Absolute Difference -- Easy

Given an array of distinct integers arr, find all pairs of elements with the minimum absolute difference of any two elements. 

Return a list of pairs in ascending order(with respect to pairs), each pair [a, b] follows

a, b are from arr
a < b
b - a equals to the minimum absolute difference of any two elements in arr
 
Example 1:
Input: arr = [4,2,1,3]
Output: [[1,2],[2,3],[3,4]]
Explanation: The minimum absolute difference is 1. List all pairs with difference equal to 1 in ascending order.

Example 2:
Input: arr = [1,3,6,10,15]
Output: [[1,3]]

Example 3:
Input: arr = [3,8,-10,23,19,-4,-14,27]
Output: [[-14,-10],[19,23],[23,27]]
 
Constraints:
2 <= arr.length <= 10^5
-10^6 <= arr[i] <= 10^6

## Solution

```python
### With Sorting:
class Solution:
    def minimumAbsDifference(self, arr: List[int]) -> List[List[int]]:
        arr.sort()
        minimum = float('inf')
        out = []
        for i in range(1, len(arr)):
            prev = arr[i - 1]
            curr = abs(prev - arr[i])
            if curr < minimum:
                out = [[prev, arr[i]]]
                minimum = curr
            elif curr == minimum: 
                out.append([prev, arr[i]])
        return out
```
