---
title: "LeetCode 179 Largest Number - Medium"
date: "2021-01-01"
excerpt: "179. Largest Number -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 179
comments: true
---

### 179. Largest Number — Medium

[Open on LeetCode](https://leetcode.com/problems/largest-number/)

## Problem

179. Largest Number -- Medium

Given a list of non-negative integers nums, arrange them such that they form the largest number.

Note: The result may be very large, so you need to return a string instead of an integer.

 

Example 1:

Input: nums = [10,2]
Output: "210"
Example 2:

Input: nums = [3,30,34,5,9]
Output: "9534330"
Example 3:

Input: nums = [1]
Output: "1"
Example 4:

Input: nums = [10]
Output: "10"
 

Constraints:

1 <= nums.length <= 100
0 <= nums[i] <= 109

## Solution

```python
class Solution:
    def compare(self, a, b):
        if a + b > b + a:
            return -1 
        return 1
    
    def largestNumber(self, nums):
        string = []
        # 把整型转换成字符串
        for i in nums:
            string.append(str(i))
        # 按最优策略排序
        string.sort(key = functools.cmp_to_key(self.compare))
        print(string)
        ans = ""
        for i in string:
            ans += i
        # 除去有多余前导0的情况
        if ans[0] == '0':
            return "0"
        return ans
```
