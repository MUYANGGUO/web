---
title: "LeetCode 674 Longest Continuous Increasing Subsequence - Easy"
date: "2021-01-01"
excerpt: "Given an unsorted array of integers, find the length of longest continuous increasing subsequence (subarray)."
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 674
comments: true
---

### 674. Longest Continuous Increasing Subsequence — Easy

[Open on LeetCode](https://leetcode.com/problems/longest-continuous-increasing-subsequence/)

## Problem

Given an unsorted array of integers, find the length of longest continuous increasing subsequence (subarray).

Example 1:
Input: [1,3,5,4,7]
Output: 3
Explanation: The longest continuous increasing subsequence is [1,3,5], its length is 3. 
Even though [1,3,5,7] is also an increasing subsequence, it's not a continuous one where 5 and 7 are separated by 4. 
Example 2:
Input: [2,2,2,2,2]
Output: 1
Explanation: The longest continuous increasing subsequence is [2], its length is 1.

## Solution

```python
class Solution:
    def findLengthOfLCIS(self, nums: List[int]) -> int:
      ### DP problem
        
    ### let us define f[i][0], f[i][1] as the all the numbers before i index's largest sequence number. 0 represnet descending order, 1 represent increasing order
        ### f[i][0] = f[i-1][0] + 1 if A[i] < A[i-1] else f[i][0] = 0
        ### similarly for f[i][1] = f[i-1][1] + 1 if A[i] > A[i-1] else f[i][1] = 0
        
        ### construct f:
        n = len(nums)
        if not nums or n == 0:
            return 0
       
        f =  [1 for i in range(len(nums))]

        for i in range(1, len(nums)):
            if nums[i] > nums[i-1]:
                f[i] = f[i-1] + 1
 
        return max(f)


### Another version of this problem, consider decreasing as well.

'''
描述
中文
English
给定一个整数数组（下标从 0 到 n-1， n 表示整个数组的规模），请找出该数组中的最长上升连续子序列。（最长上升连续子序列可以定义为从右到左或从左到右的序列。）

您在真实的面试中是否遇到过这个题？  
样例
样例 1：

输入：[5, 4, 2, 1, 3]
输出：4
解释：
给定 [5, 4, 2, 1, 3]，其最长上升连续子序列（LICS）为 [5, 4, 2, 1]，返回 4。
样例 2：

输入：[5, 1, 2, 3, 4]
输出：4
解释：
给定 [5, 1, 2, 3, 4]，其最长上升连续子序列（LICS）为 [1, 2, 3, 4]，返回 4。
挑战
使用 O(n) 时间和 O(1) 额外空间来解决

'''


class Solution:
    """
    @param A: An array of Integer
    @return: an integer
    """
    def longestIncreasingContinuousSubsequence(self, A):
        # write your code her
        ### DP problem
        ### let us define f[i][0], f[i][1] as the all the numbers before i index's largest sequence number. 0 represnet descending order, 1 represent increasing order
        ### f[i][0] = f[i-1][0] + 1 if A[i] < A[i-1] else f[i][0] = 0
        ### similarly for f[i][1] = f[i-1][1] + 1 if A[i] > A[i-1] else f[i][1] = 0
        
        ### construct f:
        n = len(A)
        if not A or n == 0:
            return 0
            
        f = [[1] * 2 for _ in range((len(A)))]
        temp = 1
        temp2 = 1
        for i in range(1, len(A)):
        
            if A[i] <= A[i-1]:
                temp += 1
                f[i][0] = max(f[i-1][0], temp)
                
            else:
                f[i][0] = f[i-1][0]
                temp = 1
            if A[i] > A[i-1]:
                temp2 += 1
                f[i][1] = max(f[i-1][1] , temp2)
            else:
                f[i][1] = f[i-1][1]
                temp2 = 1
            print(temp, temp2)
        return max(f[n-1][0], f[n-1][1])


### 优化解 1

class Solution:
    """
    @param A: An array of Integer
    @return: an integer
    """
    def longestIncreasingContinuousSubsequence(self, A):
        if not A:
            return 0
        longest, incr, desc = 1, 1, 1
        for i in range(1, len(A)):
            if A[i] > A[i - 1]:
                incr += 1
                desc = 1
            elif A[i] < A[i - 1]:
                incr = 1
                desc += 1
            else:
                incr = 1
                desc = 1
            longest = max(longest, max(incr, desc))
            
        return longest

### 优化解 2

class Solution:
    """
    @param A: An array of Integer
    @return: an integer
    """
    def longestIncreasingContinuousSubsequence(self, A):
        # write your code here
        size = len(A)
        if size < 1:
            return 0 
            
        if size < 2:
            return 1 
            
        dp1, dp2 = 1, 1 
        glomax = 0 
        
        for i in range(1, size):
            dp1 = dp1 + 1 if A[i] > A[i - 1] else 1 
            dp2 = dp2 + 1 if A[i] < A[i - 1] else 1 
            glomax = max(glomax, max(dp1, dp2))
            
        return glomax
```
