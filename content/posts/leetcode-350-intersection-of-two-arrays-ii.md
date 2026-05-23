---
title: "LeetCode 350 Intersection Of Two Arrays II - Easy"
date: "2021-01-01"
excerpt: "350. Intersection of Two Arrays II -- Easy"
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 350
comments: true
---

### 350. Intersection Of Two Arrays II — Easy

[Open on LeetCode](https://leetcode.com/problems/intersection-of-two-arrays-ii/)

## Problem

350. Intersection of Two Arrays II -- Easy

Given two arrays, write a function to compute their intersection.

Example 1:
Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2,2]

Example 2:
Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [4,9]

Note:
Each element in the result should appear as many times as it shows in both arrays.
The result can be in any order.
Follow up:

What if the given array is already sorted? How would you optimize your algorithm?
What if nums1's size is small compared to nums2's size? Which algorithm is better?
What if elements of nums2 are stored on disk, and the memory is limited such that you cannot load all elements into the memory at once?

## Solution

```python
# Hashmap:
class Solution:
    def intersect(self, nums1: List[int], nums2: List[int]) -> List[int]:
        counts = {}
        res = []
        for num in nums1:
            counts[num] = counts.get(num, 0) + 1
        for num in nums2:
            if num in counts and counts[num] > 0:
                res.append(num)
                counts[num] -= 1
        return res

### three pointers in-place:
class Solution:
    def intersect(self, nums1: List[int], nums2: List[int]) -> List[int]:
        nums1.sort()
        nums2.sort()
        i, j = 0, 0
        k = 0
        while i < len(nums1) and j < len(nums2):
            if nums1[i] < nums2[j]:
                i += 1
            elif nums1[i] > nums2[j]:
                j += 1
            else:
                nums1[k] = nums1[i]
                i += 1
                j += 1
                k += 1
        
        return nums1[:k]

# What if the given array is already sorted? How would you optimize your algorithm?

# We can use either Approach 2 or Approach 3, dropping the sort of course. It will give us linear time and constant memory complexity.
# What if nums1's size is small compared to nums2's size? Which algorithm is better?

# Approach 1 is a good choice here as we use a hash map for the smaller array.
# What if elements of nums2 are stored on disk, and the memory is limited such that you cannot load all elements into the memory at once?

# If nums1 fits into the memory, we can use Approach 1 to collect counts for nums1 into a hash map. Then, we can sequentially load and process nums2.

# If neither of the arrays fit into the memory, we can apply some partial processing strategies:

# Split the numeric range into subranges that fits into the memory. Modify Approach 1 to collect counts only within a given subrange, and call the method multiple times (for each subrange).

# Use an external sort for both arrays. Modify Approach 2 to load and process arrays sequentially.
```
