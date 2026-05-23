---
title: "LeetCode 198 House Robber - Easy"
date: "2021-01-01"
excerpt: "198. House Robber -- Easy"
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 198
comments: true
---

### 198. House Robber — Easy

[Open on LeetCode](https://leetcode.com/problems/house-robber/)

## Problem

198. House Robber -- Easy

You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security system connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight without alerting the police.

 
Example 1:
Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
             Total amount you can rob = 1 + 3 = 4.

Example 2:
Input: nums = [2,7,9,3,1]
Output: 12
Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
             Total amount you can rob = 2 + 9 + 1 = 12.
 

Constraints:

0 <= nums.length <= 100
0 <= nums[i] <= 400

## Solution

```python
# DP:
class Solution:
    def rob(self, nums: List[int]) -> int:
        #可以设dp(i, 0)为如果不抢第i个房屋，前i个房屋的最优方案为多少；
        #设dp(i, 1)为如果抢第i个房屋，前i个房屋的最优方案为多少。
        #可以得出以下的状态转移方程式：
        if nums == []:
            return 0
        n = len(nums)
        dp = [[0] * 2 for _ in range(n)]
        dp[0][0], dp[0][1] = 0, nums[0]
        for i in range(1, n):
            # 如果不抢第 i 个，取前 i - 1 个位置 dp 较大值
            dp[i][0] = max(dp[i - 1][0], dp[i - 1][1])
            # 如果抢第 i 个，前一个不抢，考虑从前 i - 2 个位置的dp值转移
            dp[i][1] = nums[i] + dp[i - 1][0]

        return max(dp[n - 1][0], dp[n - 1][1])

# DP: 
class Solution:
    def rob(self, nums: List[int]) -> int:
        if not nums:
            return 0
        if len(nums) <= 2:
            return max(nums)
            
        f = [0] * len(nums)
        f[0], f[1] = nums[0], max(nums[0], nums[1])
        
        for i in range(2, len(nums)):
            f[i] = max(f[i - 1], f[i - 2] + nums[i])
            
        return f[len(nums) - 1]
```
