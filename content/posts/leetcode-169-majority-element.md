---
title: "LeetCode 169 Majority Element - Easy"
date: "2021-01-01"
excerpt: 169. Majority Element
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 169
comments: true
---

### 169. Majority Element — Easy

[Open on LeetCode](https://leetcode.com/problems/majority-element/)

## Problem

169. Majority Element

Given an array of size n, find the majority element. The majority element is the element that appears more than ⌊ n/2 ⌋ times.

You may assume that the array is non-empty and the majority element always exist in the array.

Example 1:

Input: [3,2,3]
Output: 3
Example 2:

Input: [2,2,1,1,1,2,2]
Output: 2

## Solution

```python
### HashMap:

class Solution:
    def majorityElement(self, nums):
        counter = {}
        for num in nums:
            counter[num] = counter.get(num, 0) + 1
            if counter[num] >= len(nums) / 2:
                return num
        return None

### Best Solution, Boyer-Moore Voting Algorithm:
class Solution:
    def majorityElement(self, nums):
        count = 0
        condidate = None
        for num in nums:
            if count == 0:
                candidate = num
            if num == candidate:
                count += 1
            else:
                count -= 1
        return candidate
    
    ### Example:
    ###    [ 1, 2, 3, 2, 1, 1 ]
    #count   0
    #        1 , candidate (1)
    #           0, candidate (2)
    #              0 candidate (3)
    #                 0 candidate (2)
    #                    0 candidate (1)
    #                       1 candidate(1)
```
