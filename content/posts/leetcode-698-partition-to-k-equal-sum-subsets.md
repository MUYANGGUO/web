---
title: "LeetCode 698 Partition To K Equal Sum Subsets - Medium"
date: "2021-01-01"
excerpt: "698. Partition to K Equal Sum Subsets -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 698
comments: true
---

### 698. Partition To K Equal Sum Subsets — Medium

[Open on LeetCode](https://leetcode.com/problems/partition-to-k-equal-sum-subsets/)

## Problem

698. Partition to K Equal Sum Subsets -- Medium

Given an array of integers nums and a positive integer k, find whether it's possible to divide this array into k non-empty subsets whose sums are all equal.

Example 1:

Input: nums = [4, 3, 2, 3, 5, 2, 1], k = 4
Output: True
Explanation: It's possible to divide it into 4 subsets (5), (1, 4), (2,3), (2,3) with equal sums.
 

Note:

1 <= k <= len(nums) <= 16.
0 < nums[i] < 10000.

## Solution

```python
class Solution:
    def canPartitionKSubsets(self, nums: List[int], k: int) -> bool:
        target, rem = divmod(sum(nums), k)
        if rem: return False
        def dfs(groups):
            if not nums: return True
            v = nums.pop()
            for i, group in enumerate(groups):
                if group + v <= target:
                    groups[i] += v
                    if dfs(groups): return True
                    groups[i] -= v
                if not group: break 
                # if cur num cant be put in this bucket, meaning, 
                # this number is can not be put in to any afterwards
            nums.append(v)
            return False
        nums.sort()
        return dfs([0] * k)
```
