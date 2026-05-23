---
title: "LeetCode 410 Split Array Largest Sum - Hard"
date: "2021-01-01"
excerpt: "410. Split Array Largest Sum -- Hard"
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 410
comments: true
---

### 410. Split Array Largest Sum — Hard

[Open on LeetCode](https://leetcode.com/problems/split-array-largest-sum/)

## Problem

410. Split Array Largest Sum -- Hard

Given an array nums which consists of non-negative integers and an integer m, you can split the array into m non-empty continuous subarrays.

Write an algorithm to minimize the largest sum among these m subarrays.

 
Example 1:

Input: nums = [7,2,5,10,8], m = 2
Output: 18
Explanation:
There are four ways to split nums into two subarrays.
The best way is to split it into [7,2,5] and [10,8],
where the largest sum among the two subarrays is only 18.

Example 2:

Input: nums = [1,2,3,4,5], m = 2
Output: 9

Example 3:

Input: nums = [1,4,4], m = 3
Output: 4
 

Constraints:

1 <= nums.length <= 1000
0 <= nums[i] <= 106
1 <= m <= min(50, nums.length)

## Solution

```python
# 二分法：
class Solution:
    def splitArray(self, nums: List[int], m: int) -> int:
        def valid(mid):
            cnt = 0
            current = 0
            for n in nums:
                current += n
                if current > mid:	#如果当前连续和大于mid
                    cnt += 1		#计数+1
                    if cnt >= m:
                        return False
                    current = n		#current更新为num
            return True
        l = max(nums)	#确定二分查找的左右端点
        h = sum(nums)
        while l < h:
            mid = l + (h - l) / 2
            if valid(mid):	#二分check
                h = mid
            else:
                l = mid + 1
        return int(l)
```
