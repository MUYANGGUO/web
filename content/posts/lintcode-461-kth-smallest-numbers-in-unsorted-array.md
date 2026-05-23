---
title: "LintCode 461 Kth Smallest Numbers In Unsorted Array - Medium"
date: "2021-01-01"
excerpt: Find the kth smallest number in an unsorted integer array.
kind: leetcode
tags:
  - LintCode
  - Medium
  - Python
order: 461
comments: true
---

### 461. Kth Smallest Numbers In Unsorted Array — Medium

[Open on LintCode](https://www.lintcode.com/problem/461/)

## Problem

Find the kth smallest number in an unsorted integer array.

Have you met this question in a real interview?  
Example
Example 1:

Input: [3, 4, 1, 2, 5], k = 3
Output: 3
Example 2:

Input: [1, 1, 1], k = 2
Output: 1
Challenge
An O(nlogn) algorithm is acceptable, if you can do it in O(n), that would be great.

## Solution

```python
# O(nlogn) --> sort
# O(n) --> quickselect based on quicksort

class Solution:
    """
    @param k: An integer
    @param nums: An integer array
    @return: kth smallest element
    """
    def kthSmallest(self, k, nums):
        # write your code here
        if not nums:
            return -1

        ### Start the recursion "quickselect"
        ### Based on the quicksort method
        
        ### rank to position
        k = k - 1
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
