---
title: "LeetCode 658 Find K Closest Elements - Medium"
date: "2021-01-01"
excerpt: 658. Find K Closest Elements
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 658
comments: true
---

### 658. Find K Closest Elements — Medium

[Open on LeetCode](https://leetcode.com/problems/find-k-closest-elements/)

## Problem

658. Find K Closest Elements

Given a sorted array arr, two integers k and x, find the k closest elements to x in the array. The result should also be sorted in ascending order. If there is a tie, the smaller elements are always preferred.

Example 1:

Input: arr = [1,2,3,4,5], k = 4, x = 3
Output: [1,2,3,4]
Example 2:

Input: arr = [1,2,3,4,5], k = 4, x = -1
Output: [1,2,3,4]
 

Constraints:

1 <= k <= arr.length
1 <= arr.length <= 10^4
Absolute value of elements in the array and x will not exceed 104

## Solution

```python
class Solution:
    def findClosestElements(self, A, k, target):
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
        
        return sorted(results)

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
        
    def isLeftCloser(self, A, target, left, right):
        if left < 0:
            return False
        if right >= len(A):
            return True
        return target - A[left] <= A[right] - target
```
