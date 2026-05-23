---
title: "LeetCode 697 Degree Of An Array - Easy"
date: "2021-01-01"
excerpt: ""
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 697
comments: true
---

### 697. Degree Of An Array — Easy

[Open on LeetCode](https://leetcode.com/problems/degree-of-an-array/)

## Solution

```python
import collections
'''
697 Degree of an Array

Given a non-empty array of non-negative integers nums, the degree of this array is defined as the maximum frequency of any one of its elements.

Your task is to find the smallest possible length of a (contiguous) subarray of nums, that has the same degree as nums

'''

# Input: [1, 2, 2, 3, 1]
# Output: 2
# Explanation: 
# The input array has a degree of 2 because both elements 1 and 2 appear twice.
# Of the subarrays that have the same degree:
# [1, 2, 2, 3, 1], [1, 2, 2, 3], [2, 2, 3, 1], [1, 2, 2], [2, 2, 3], [2, 2]
# The shortest length is 2. So return 2.
# Example 2:
# Input: [1,2,2,3,1,4,2]
# Output: 6

# my first attempt, it is not efficient

class Solution:
    # def findShortestSubArray(self, nums: List[int]) -> int:
    def findShortestSubArray(self, nums):
        degree_counter = collections.Counter(nums)
        degree_list = degree_counter.most_common()
        max = degree_list[0][1]
        index = []
        if max == 1:
            return 1
        else: 
            for i in degree_list:
                if i[1] == max:
                    index_list = [v for v, x in enumerate(nums) if x == i[0]]
                    shortest_sub = index_list[-1] - index_list[0] + 1
                    index.append(shortest_sub)
            
        return min(index)

# my second attempt, using left and right
import collections
class Solution:
    def findShortestSubArray(self, nums: List[int]) -> int:
        left = {}
        right = {}

        length = len(nums)
        keys_count = collections.Counter(nums)
        keys_count_sorted= keys_count.most_common()
        degree = keys_count_sorted[0][1]
        if degree == 1:
            return 1
        else:
            max_keys = {}
            for v in keys_count_sorted:
                if v[1] == degree:
                   max_keys[v[0]] = '';


            for i, v in enumerate(nums):
                if v not in left and v in max_keys:
                    left[v] = i
            for i, v in enumerate(reversed(nums)):
                if v not in right and v in max_keys:
                    right[v] = length-i-1
                    #diff_temp = right[v] - left[v]+1
                    max_keys[v] = right[v] - left[v]+1

            return min(max_keys.values())

# my third attempt: using only start in one O(n) loop
import collections
class Solution:
    def findShortestSubArray(self, nums: List[int]) -> int:
        start = {}
        keys_count = collections.Counter(nums)
        keys_count_sorted= keys_count.most_common()
        degree = keys_count_sorted[0][1]
        if degree == 1:
            return 1
        else:
            max_keys = {}
            for v in keys_count_sorted:
                if v[1] == degree:
                   max_keys[v[0]] = '';


            for i, v in enumerate(nums):
                if v not in start and v in max_keys:
                    start[v] = i
                elif v in start and v in max_keys:
                    max_keys[v] = i - start[v]+1


            return min(max_keys.values())

# my solution without using collections 
class Solution:
    def findShortestSubArray(self, nums: List[int]) -> int:
        counter = {}
        start = {}
        diff = {}
        for i, v in enumerate(nums):
            if v not in counter:
                counter[v] = 1
                start[v] = i
            else:
                counter[v] +=1
                diff[v] = i - start[v]+1
        degree = max(counter.values())
        if degree ==1:
            return 1
        else:
            res = []
            for key, v in counter.items():
                if v == degree:
                    res.append(diff[key])
            return min(res)
                   
#leet code solution:
class Solution(object):
    def findShortestSubArray(self, nums):
        left, right, count = {}, {}, {}
        for i, x in enumerate(nums):
            if x not in left: left[x] = i
            right[x] = i
            count[x] = count.get(x, 0) + 1

        ans = len(nums)
        degree = max(count.values())
        for x in count:
            if count[x] == degree:
                ans = min(ans, right[x] - left[x] + 1)

        return ans
```
