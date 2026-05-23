---
title: "LeetCode 363 Max Sum Of Rectangle No Larger Than K - Hard"
date: "2021-01-01"
excerpt: "363. Max Sum of Rectangle No Larger Than K -- Hard"
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 363
comments: true
---

### 363. Max Sum Of Rectangle No Larger Than K — Hard

[Open on LeetCode](https://leetcode.com/problems/max-sum-of-rectangle-no-larger-than-k/)

## Problem

363. Max Sum of Rectangle No Larger Than K -- Hard

Given a non-empty 2D matrix matrix and an integer k, find the max sum of a rectangle in the matrix such that its sum is no larger than k.

Example:

Input: matrix = [[1,0,1],[0,-2,3]], k = 2
Output: 2 
Explanation: Because the sum of rectangle [[0, 1], [-2, 3]] is 2,
             and 2 is the max number no larger than k (k = 2).
Note:

The rectangle inside the matrix must have an area > 0.
What if the number of rows is much larger than the number of columns?

## Solution

```python
class Solution:
    def maxSumSubmatrix(self, matrix: List[List[int]], k: int) -> int:
        # Write your code here
        #前缀和
        #利用大的矩形区域和小的矩形区域作差得到部分矩形区域内的元素和即可，前缀和存入set中，然后查找即可。
        row , col = len(matrix) , len(matrix[0]) 
        ret = float('-inf')
        for i in range(col) :#每次以i为起点
            Sum = [0 for i in range(row)]
            for j in range(i, col) :	#j控制当前区域的尾部
                for r in range(row) :		#r代表每行
                    Sum[r] += matrix[r][j]	#统计i列至j列中每行的元素和
                curSum , curMax = 0 , float('-inf')
                sumSet = []
                sumSet.append(0)
                for r in range(row) :
                    curSum += Sum[r] #curSum保存当前i列至j列中前r行的元素和
                    it = bisect.bisect_left(sumSet, curSum - k)	
                    #找到第一个大于等于curSum-k的值，那么curSum减去之前小矩形内元素和可以得到小矩形区域，
                    #且其元素和不超过k
                    if it != len(sumSet) :
                        curMax = max(curMax, curSum - sumSet[it])
                    bisect.insort_left(sumSet, curSum)
                ret = max(ret, curMax)
        return ret
```
