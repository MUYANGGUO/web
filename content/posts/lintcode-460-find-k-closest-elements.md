---
title: "LintCode 460 Find K Closest Elements - Medium"
date: "2021-01-01"
excerpt: 460. Find K Closest Elements
kind: leetcode
tags:
  - LintCode
  - Medium
  - Python
order: 460
comments: true
---

### 460. Find K Closest Elements — Medium

[Open on LintCode](https://www.lintcode.com/problem/460/)

## Problem

460. Find K Closest Elements

Given target, a non-negative integer k and an integer array A sorted in ascending order, find the k closest numbers to target in A, sorted in ascending order by the difference between the number and target. Otherwise, sorted in ascending order by number if the difference is same.

Example

Example 1:
Input: A = [1, 2, 3], target = 2, k = 3
Output: [2, 1, 3]

Example 2:
Input: A = [1, 4, 6, 8], target = 3, k = 3
Output: [4, 1, 6]

Challenge
O(logn + k) time

Notice
The value k is a non-negative integer and will always be smaller than the length of the sorted array.
Length of the given array is positive and will not exceed 10^4
Absolute value of elements in the array will not exceed 10^4

## Solution

```python
class Solution:
    """
    @param A: an integer array
    @param target: An integer
    @param k: An integer
    @return: an integer array
    """
    def kClosestNumbers(self, A, target, k):
        # write your code here
        if not A:
            return 
        
        results = []
        ### cut 代表>= target 的第一个
        ### 那么按照中心线枚举 cut就是中心线的右边      
        ### left就是cut - 1
        cut = self.findCut(A, target)   
        left, right = cut - 1, cut
        
        # 两根指针从中间往两边扩展，依次找到最接近的 k 个数
        for _ in range(k):
            if self.isLeftCloser(A, target, left, right):
                results.append(A[left])
                left -= 1
            else:
                results.append(A[right])
                right += 1
        
        return results
    
    def findCut(self, A, target):
        left, right = 0, len(A) - 1
        while left + 1 < right:
            mid = int((left + right) / 2)
            if A[mid] >= target:
                right = mid
            else:
                left = mid + 1   

        if A[left] >= target:
            return left
            
        if A[right] >= target:
            return right
    
        ### 找不到的情况下：
        ### 因为我们上一步找的是大于等于的
        ### 如果left 和 right都没有满足大于等于的条件，说明他们都是小于的
        ### 那么此时最接近target应该是right，因为数组是升序排列
        return right

    ### 利用封装判断函数的小技巧，配合for循环，把筛选的逻辑变简单，非常值得学习的技巧。 
    def isLeftCloser(self, A, target, left, right):
        if left < 0:
            return False
        if right >= len(A):
            return True
        return target - A[left] <= A[right] - target
```
