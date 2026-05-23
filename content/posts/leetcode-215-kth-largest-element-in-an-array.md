---
title: "LeetCode 215 Kth Largest Element In An Array - Medium"
date: "2021-01-01"
excerpt: "Find the kth largest element in an unsorted array. Note that it is the kth largest element in the sorted order, not the kth distinct elem…"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 215
comments: true
---

### 215. Kth Largest Element In An Array — Medium

[Open on LeetCode](https://leetcode.com/problems/kth-largest-element-in-an-array/)

## Problem

Find the kth largest element in an unsorted array. Note that it is the kth largest element in the sorted order, not the kth distinct element.

Example 1:

Input: [3,2,1,5,6,4] and k = 2
Output: 5
Example 2:

Input: [3,2,3,1,2,4,5,5,6] and k = 4
Output: 4

## Solution

```python
### QuickSelect Method

class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        
        if not nums:
            return -1
        
        ### Change this kth large to kth small, so it is easy to index, as the sorting order is ascending. 
        n = len(nums)
        k = n - k
        
        ### Start the recursion "quickselect"
        ### Based on the quicksort method
        return self.quickselect(nums, 0, len(nums) - 1, k)
        
    
    def quickselect(self, nums, start, end, k):
        
        ### if start =  end, then it is kth smallest we are looking for, 
        ### as K is always within the [start, end] range
        if start == end:
            return nums[k]
        
        ### deploy quicksort methodology
        left, right = start, end
        middle = int((left + right) / 2)
        pivot = nums[middle]
        
        while left <= right:
            while left <= right and nums[left] < pivot:
                left += 1
            while left <= right and nums[right] > pivot:
                right -= 1
            ### swap and narrow down
            if left <= right:
                temp = nums[left]
                nums[left] = nums[right]
                nums[right] = temp
                left += 1
                right -= 1
            
        ### after swapping, we should have the following:
        ### [start ... right (...) left ... end]
        ###         ^          ^         ^
        ### There are only three locations where k can be
        ### And if k is within right , left, k is found, as per the logic, 
        ### left and right swapped when they are equal, and left += 1, right -= 1, when there is one element inside. 
        ### or left larger than right, and between left and right, there is no element. 
        if k <= right:
            return self.quickselect(nums, start, right, k)
        if k >= left:
            return self.quickselect(nums, left, end, k)
        
        return nums[k]
```
