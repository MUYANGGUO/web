---
title: "LeetCode 1365 How Many Numbers Are Smaller Than The Current Number - Easy"
date: "2021-01-01"
excerpt: "1365. How Many Numbers Are Smaller Than the Current Number -- Easy"
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 1365
comments: true
---

### 1365. How Many Numbers Are Smaller Than The Current Number — Easy

[Open on LeetCode](https://leetcode.com/problems/how-many-numbers-are-smaller-than-the-current-number/)

## Problem

1365. How Many Numbers Are Smaller Than the Current Number -- Easy

Given the array nums, for each nums[i] find out how many numbers in the array are smaller than it. That is, for each nums[i] you have to count the number of valid j's such that j != i and nums[j] < nums[i].

Return the answer in an array.

Example 1:
Input: nums = [8,1,2,2,3]
Output: [4,0,1,1,3]
Explanation: 
For nums[0]=8 there exist four smaller numbers than it (1, 2, 2 and 3). 
For nums[1]=1 does not exist any smaller number than it.
For nums[2]=2 there exist one smaller number than it (1). 
For nums[3]=2 there exist one smaller number than it (1). 
For nums[4]=3 there exist three smaller numbers than it (1, 2 and 2).

Example 2:
Input: nums = [6,5,4,8]
Output: [2,1,0,3]

Example 3:
Input: nums = [7,7,7,7]
Output: [0,0,0,0]
 

Constraints:
2 <= nums.length <= 500
0 <= nums[i] <= 100

## Solution

```python
### HashMap, O(NlogN):
class Solution:
    def smallerNumbersThanCurrent(self, nums: List[int]) -> List[int]:
        map = dict()
        for i, num in enumerate(sorted(nums)):
            if num not in map:
                map[num] = i
        
        return [map[num] for num in nums]

### Bucket Sort, O(N)
class Solution:
    def smallerNumbersThanCurrent(self, nums: List[int]) -> List[int]:
        buckets = [0] * 101
        
        for num in nums:
            buckets[num] += 1
            
        previous = 0    
        for i, bucket in enumerate(buckets):
            if bucket != 0:
                buckets[i] = previous 
                previous += bucket 
                
        return [buckets[num] for num in nums]
```
