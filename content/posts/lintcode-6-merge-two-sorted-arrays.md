---
title: "LintCode 6 Merge Two Sorted Arrays - Easy"
date: "2021-01-01"
excerpt: 6. 合并排序数组 II
kind: leetcode
tags:
  - LintCode
  - Easy
  - Python
order: 6
comments: true
---

### 6. Merge Two Sorted Arrays — Easy

[Open on LintCode](https://www.lintcode.com/problem/6/)

## Problem

6. 合并排序数组 II

合并两个有序升序的整数数组A和B变成一个新的数组。新数组也要有序。

Example
样例 1:

输入: A=[1], B=[1]
输出:[1,1]	
样例解释: 返回合并后的数组。
样例 2:

输入: A=[1,2,3,4], B=[2,4,5,6]
输出: [1,2,2,3,4,4,5,6]	
样例解释: 返回合并后的数组。
Challenge
你能否优化你的算法，如果其中一个数组很大而另一个数组很小？

## Solution

```python
### Two Pointers:


class Solution:
    """
    @param A: sorted integer array A
    @param B: sorted integer array B
    @return: A new sorted integer array
    """
    def mergeSortedArray(self, A, B):
        # write your code here
        
        ### from merge sorted array leetcode expansion:
        ptr1 = 0
        ptr2 = 0
        temp = []
        
        while ptr1 <= len(A) - 1 and ptr2 <= len(B) - 1:
            
            if A[ptr1] <= B[ptr2]:
                temp.append(A[ptr1])
                ptr1 += 1
            else:
                temp.append(B[ptr2])
                ptr2 += 1
            
        if ptr1 <= len(A) - 1:
            temp += A[ptr1:]
        elif ptr2 <= len(B) - 1:
            temp += B[ptr2:]

        return temp

### https://www.jiuzhang.com/solution/merge-two-sorted-arrays/
```
