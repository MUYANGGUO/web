---
title: "LeetCode 220 Contains Duplicate III - Medium"
date: "2021-01-01"
excerpt: "220. Contains Duplicate III -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 220
comments: true
---

### 220. Contains Duplicate III — Medium

[Open on LeetCode](https://leetcode.com/problems/contains-duplicate-iii/)

## Problem

220. Contains Duplicate III -- Medium

Given an array of integers, find out whether there are two distinct indices i and j in the array such that the absolute difference between nums[i] and nums[j] is at most t and the absolute difference between i and j is at most k.

Example 1:
Input: nums = [1,2,3,1], k = 3, t = 0
Output: true

Example 2:
Input: nums = [1,0,1,1], k = 1, t = 2
Output: true

Example 3:
Input: nums = [1,5,9,1,5,9], k = 2, t = 3
Output: false
 

Constraints:

0 <= nums.length <= 2 * 104
-231 <= nums[i] <= 231 - 1
0 <= k <= 104
0 <= t <= 231 - 1

## Solution

```python
### 利用balanced binary search tree的数据结构配合sliding window，时间复杂O(NlogK), 空间复杂度O(K):
from sortedcontainers import SortedList
#SortedList is the treeset (BST) implementation in python
class Solution:
    def containsNearbyAlmostDuplicate(self, nums: List[int], k: int, t: int) -> bool:
        SList = SortedList()
        for i in range(len(nums)):
            if i > k: SList.remove(nums[i-k-1])   
            pos1 = SortedList.bisect_left(SList, nums[i] - t)
            pos2 = SortedList.bisect_right(SList, nums[i] + t)
            if pos1 != pos2 and pos1 != len(SList): return True
            SList.add(nums[i])
        return False

# BucketSort 配合Sliding Window，O(N)时间复杂度，O(K)空间复杂度:
class Solution:
    def containsNearbyAlmostDuplicate(self, nums: List[int], k: int, t: int) -> bool:
        if t == 0 and len(set(nums)) == len(nums):
            return False
        size = len(nums)
        bucket = {}
        width = t + 1
        for idx, number in enumerate(nums):
            bucket_idx = number // width
            if bucket_idx in bucket:
                # two numbers in the same bucket, gap must be smaller than width
                return True
            elif bucket_idx + 1 in bucket and abs(number - bucket[bucket_idx + 1]) < width:
                # two number in two consecutive buckets, and gap is smaller than width
                return True
            elif bucket_idx - 1 in bucket and abs(number - bucket[bucket_idx - 1]) < width:
                # two number in two consecutive buckets, and gap is smaller than width
                return True
            # put current number into corresponding bucket
            bucket[bucket_idx] = number
            if idx >= k:
                # delete old number whose index distance larger than k
                del bucket[ nums[idx-k] //width ]
        return False
```
