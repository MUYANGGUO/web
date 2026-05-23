---
title: "LeetCode 1481 Least Number Of Unique Integers After K Removals - Medium"
date: "2021-01-01"
excerpt: "1481. Least Number of Unique Integers after K Removals -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 1481
comments: true
---

### 1481. Least Number Of Unique Integers After K Removals — Medium

[Open on LeetCode](https://leetcode.com/problems/least-number-of-unique-integers-after-k-removals/)

## Problem

1481. Least Number of Unique Integers after K Removals -- Medium

Given an array of integers arr and an integer k. Find the least number of unique integers after removing exactly k elements.


Example 1:
Input: arr = [5,5,4], k = 1
Output: 1
Explanation: Remove the single 4, only 5 is left.
Example 2:
Input: arr = [4,3,1,1,3,3,2], k = 3
Output: 2
Explanation: Remove 4, 2 and either one of the two 1s or three 3s. 1 and 3 will be left.
 

Constraints:

1 <= arr.length <= 10^5
1 <= arr[i] <= 10^9
0 <= k <= arr.length

## Solution

```python
# Greedy:
class Solution:
    def findLeastNumOfUniqueInts(self, arr: List[int], k: int) -> int:
        c = Counter(arr)
        s = sorted(arr,key = lambda x:(c[x],x))
        return len(set(s[k:]))
```
