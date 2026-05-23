---
title: "LeetCode 561 Array Partition I - Easy"
date: "2021-01-01"
excerpt: "Given an array of 2n integers, your task is to group these integers into n pairs of integer, say (a1, b1), (a2, b2), ..., (an, bn) which …"
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 561
comments: true
---

### 561. Array Partition I — Easy

[Open on LeetCode](https://leetcode.com/problems/array-partition-i/)

## Problem

Given an array of 2n integers, your task is to group these integers into n pairs of integer, say (a1, b1), (a2, b2), ..., (an, bn) which makes sum of min(ai, bi) for all i from 1 to n as large as possible.

Example 1:
Input: [1,4,3,2]

Output: 4
Explanation: n is 2, and the maximum sum of pairs is 4 = min(1, 2) + min(3, 4).
Note:
n is a positive integer, which is in the range of [1, 10000].
All the integers in the array will be in the range of [-10000, 10000].

## Solution

```python
### greedy:class Solution:
class Solution:
    def arrayPairSum(self, nums: List[int]) -> int:
        nums.sort()
        res = 0
        for i in range(len(nums) - 1):
            if i % 2 == 0:
                res += nums[i]
        return res

### make sure each pair's difference is minimum. That is each number in the pair must be close to each other. 
### So sort first, then the pair is formed in the order.

### Hashmap based solution:

### https://leetcode.com/problems/array-partition-i/discuss/102201/Python-solution-with-detailed-explanation

### https://leetcode.com/problems/array-partition-i/solution/

'''
We use the same idea to pair adjacent elements, but instead use a counting sort approach.
Range of numbers is -10k to 10k. This means 20001 elements.
Build the frequency map for the input.
Now iterate this map. When frequency is even, the contribution is the implied number times freq//2. When odd, it is (implied number) times (freq//2 + 1).
Implied number: (idx-10000)
The time and space complexity is order K where K is the range of the numbers.

'''

class Solution(object):
    def arrayPairSum(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        arr= [0]*20001
        for x in nums:
            arr[x+10000] += 1
        
        res, adjust = 0, False
        for idx, freq in enumerate(arr):
            if freq:
                freq = freq - 1 if adjust else freq
                if freq&1:
                    res += ((freq // 2) + 1)*(idx - 10000)
                    adjust = True
                else:
                    res += ((freq // 2))*(idx - 10000)
                    adjust = False
        return res
```
