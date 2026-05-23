---
title: "LeetCode 239 Sliding Window Maximum - Hard"
date: "2021-01-01"
excerpt: 239. Sliding Window Maximum
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 239
comments: true
---

### 239. Sliding Window Maximum — Hard

[Open on LeetCode](https://leetcode.com/problems/sliding-window-maximum/)

## Problem

239. Sliding Window Maximum

Given an array nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position. Return the max sliding window.

Follow up:
Could you solve it in linear time?

Example:

Input: nums = [1,3,-1,-3,5,3,6,7], and k = 3
Output: [3,3,5,5,6,7] 
Explanation: 

Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7

## Solution

```python
class Solution:
    def maxSlidingWindow(self, nums, k):
        ### 这道题目用到了doubly linked list的单调栈方法，也就是deque（）的数据结构
        if not nums or not k:
            return []
        
        dq = collections.deque([])
        
        for i in range(k - 1):
            self.push(dq, nums, i)

        result = []
        
        for i in range(k - 1, len(nums)):
            self.push(dq, nums, i)
            result.append(nums[dq[0]])
            if dq[0] == i - k + 1:
                dq.popleft()
        
        return result
    
    def push(self, dq, nums, i):
        while dq and nums[dq[-1]] < nums[i]:
            dq.pop()
        dq.append(i)
```
