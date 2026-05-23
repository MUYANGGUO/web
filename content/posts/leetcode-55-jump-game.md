---
title: "LeetCode 55 Jump Game - Medium"
date: "2021-01-01"
excerpt: "Given an array of non-negative integers, you are initially positioned at the first index of the array."
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 55
comments: true
---

### 55. Jump Game — Medium

[Open on LeetCode](https://leetcode.com/problems/jump-game/)

## Problem

Given an array of non-negative integers, you are initially positioned at the first index of the array.

Each element in the array represents your maximum jump length at that position.

Determine if you are able to reach the last index.

 

Example 1:

Input: nums = [2,3,1,1,4]
Output: true
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
Example 2:

Input: nums = [3,2,1,0,4]
Output: false
Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.
 

Constraints:

1 <= nums.length <= 3 * 10^4
0 <= nums[i][j] <= 10^5

给出一个非负整数数组，你最初定位在数组的第一个位置。　　　

数组中的每个元素代表你在那个位置可以跳跃的最大长度。　　　　

判断你是否能到达数组的最后一个位置。

数组A的长度不超过5000，每个元素的大小不超过5000

Have you met this question in a real interview?  
Example
样例 1

输入 : [2,3,1,1,4]
输出 : true
样例 2

输入 : [3,2,1,0,4]
输出 : false
Challenge
这个问题有两个方法，一个是贪心和 动态规划。

贪心方法时间复杂度为O（N）。

动态规划方法的时间复杂度为为O（n^2）。

我们手动设置小型数据集，使大家可以通过测试的两种方式。这仅仅是为了让大家学会如何使用动态规划的方式解决此问题。如果您用动态规划的方式完成它，你可以尝试贪心法，以使其再次通过一次。

## Solution

```python
class Solution:
    def canJump(self, nums):
        
        
        ### DP solution
        ### consider last step jumped to n-1
        ### consider the step before last at i, i could be many, but i + nums[i] >= n-1 (condition 1)
        ### and i must be able to jumped to (condition 2)

        ### status: status at f[i] should be true or false, representing if the ith position can be jumped to or not.
        
        ### transfer function:
        ### f[i] = f[j] (j = 0,1,2....n < i), where f[j] must be true, and j + nums[j] >= i
        
        ### initialize a 1 D vector
        ### f[0] initial condition should be true
#         n = len(nums)
#         f = [False] * n
#         f[0] = True
        
#         for i in range(n):
#             for j in range(i):
#                 if f[j] and j + nums[j] >= i:
#                     f[i] = f[j] or f[i]
                    
#         return f[n-1]
        
        ### DP optimization
#         n = len(nums)
#         f = [False] * n
#         f[0] = True
        
#         for i in range(n):
#             for j in range(i):
#                 if f[j] and j + nums[j] >= i:
#                     f[i] = True
#                     break
                    
#         return f[n-1]

        ### Solution 3: Fast!
        max_reach, n = 0, len(nums)
        for i, x in enumerate(nums):
            if max_reach < i: return False
            if max_reach >= n - 1: return True
            max_reach = max(max_reach, i + x)
```
