---
title: "LeetCode 1262 Greatest Sum Divisible By Three - Medium"
date: "2021-01-01"
excerpt: "1262. Greatest Sum Divisible by Three -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 1262
comments: true
---

### 1262. Greatest Sum Divisible By Three — Medium

[Open on LeetCode](https://leetcode.com/problems/greatest-sum-divisible-by-three/)

## Problem

1262. Greatest Sum Divisible by Three -- Medium

Given an array nums of integers, we need to find the maximum possible sum of elements of the array such that it is divisible by three.


Example 1:

Input: nums = [3,6,5,1,8]
Output: 18
Explanation: Pick numbers 3, 6, 1 and 8 their sum is 18 (maximum sum divisible by 3).

Example 2:

Input: nums = [4]
Output: 0
Explanation: Since 4 is not divisible by 3, do not pick any number.

Example 3:

Input: nums = [1,2,3,4,4]
Output: 12
Explanation: Pick numbers 1, 3, 4 and 4 their sum is 12 (maximum sum divisible by 3).
 

Constraints:

1 <= nums.length <= 4 * 10^4
1 <= nums[i] <= 10^4

## Solution

```python
# DP:
class Solution:
    def maxSumDivThree(self, nums: List[int]) -> int:
        dp = [0, 0, 0]
        for a in nums:
            for i in dp[:]:
                dp[(i + a) % 3] = max(dp[(i + a) % 3], i + a)
        return dp[0]
```
