---
title: "LeetCode 969 Pancake Sorting - Medium"
date: "2021-01-01"
excerpt: 969. Pancake Sorting
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 969
comments: true
---

### 969. Pancake Sorting — Medium

[Open on LeetCode](https://leetcode.com/problems/pancake-sorting/)

## Problem

969. Pancake Sorting

Given an array of integers A, We need to sort the array performing a series of pancake flips.

In one pancake flip we do the following steps:

Choose an integer k where 0 <= k < A.length.
Reverse the sub-array A[0...k].
For example, if A = [3,2,1,4] and we performed a pancake flip choosing k = 2, we reverse the sub-array [3,2,1], so A = [1,2,3,4] after the pancake flip at k = 2.

Return an array of the k-values of the pancake flips that should be performed in order to sort A. Any valid answer that sorts the array within 10 * A.length flips will be judged as correct.

Example 1:

Input: A = [3,2,4,1]
Output: [4,2,4,3]
Explanation: 
We perform 4 pancake flips, with k values 4, 2, 4, and 3.
Starting state: A = [3, 2, 4, 1]
After 1st flip (k = 4): A = [1, 4, 2, 3]
After 2nd flip (k = 2): A = [4, 1, 2, 3]
After 3rd flip (k = 4): A = [3, 2, 1, 4]
After 4th flip (k = 3): A = [1, 2, 3, 4], which is sorted.
Notice that we return an array of the chosen k values of the pancake flips.
Example 2:

Input: A = [1,2,3]
Output: []
Explanation: The input is already sorted, so there is no need to flip anything.
Note that other answers, such as [3, 3], would also be accepted.

## Solution

```python
class Solution:
    def pancakeSort(self, A: List[int]) -> List[int]:
        if not A:
            return 0
        n = len(A)
        res = []
        ### 从后往前
        for max_pos in range(n - 1, -1, -1):
            # 要被flip的end
            end = max_pos
            # 找最大值在哪
            for i in range(max_pos, -1, -1):
                if A[i] > A[end]:
                # 最大值的位置就是要被flip的位置
                    end = i
            # 如果最大值刚好就是当前位置，不需要操作，直接continue
            if end == max_pos:
                continue
            # 如果不是当前位置，那么进行两次flip操作
            # 第一次flip 操作，
            # 先将最大值从他在的地方翻转放到头部位置
            self.flip(A, 0, end)
            # 第二次操作，将最大值翻转到应该在的max_pos位置
            self.flip(A, 0, max_pos)
            res.append(end + 1)
            res.append(max_pos + 1)
        return res
    
    ### Flip function
    def flip(self, A, start, end):
        while start < end:
            A[start], A[end] = A[end],  A[start]
            start += 1
            end -= 1
        return
```
