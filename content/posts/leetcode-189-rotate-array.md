---
title: "LeetCode 189 Rotate Array - Medium"
date: "2021-01-01"
excerpt: "189. Rotate Array -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 189
comments: true
---

### 189. Rotate Array — Medium

[Open on LeetCode](https://leetcode.com/problems/rotate-array/)

## Problem

189. Rotate Array -- Medium

Given an array, rotate the array to the right by k steps, where k is non-negative.

Follow up:

Try to come up as many solutions as you can, there are at least 3 different ways to solve this problem.
Could you do it in-place with O(1) extra space?
 

Example 1:
Input: nums = [1,2,3,4,5,6,7], k = 3
Output: [5,6,7,1,2,3,4]
Explanation:
rotate 1 steps to the right: [7,1,2,3,4,5,6]
rotate 2 steps to the right: [6,7,1,2,3,4,5]
rotate 3 steps to the right: [5,6,7,1,2,3,4]

Example 2:
Input: nums = [-1,-100,3,99], k = 2
Output: [3,99,-1,-100]
Explanation: 
rotate 1 steps to the right: [99,-1,-100,3]
rotate 2 steps to the right: [3,99,-1,-100]
 

Constraints:
1 <= nums.length <= 2 * 104
-231 <= nums[i] <= 231 - 1
0 <= k <= 105

## Solution

```python
class Solution:
    def reverse(self, nums: list, start: int, end: int) -> None:
        while start < end:
            nums[start], nums[end] = nums[end], nums[start]
            start, end = start + 1, end - 1
                
    def rotate(self, nums: List[int], k: int) -> None:
        n = len(nums)
        k %= n #because k might be quite large, so mod with n to get equivalent steps
        self.reverse(nums, 0, n - 1)
        self.reverse(nums, 0, k - 1)
        self.reverse(nums, k, n - 1)
```
