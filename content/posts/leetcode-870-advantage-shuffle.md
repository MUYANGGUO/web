---
title: "LeetCode 870 Advantage Shuffle - Medium"
date: "2021-01-01"
excerpt: "870. Advantage Shuffle -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 870
comments: true
---

### 870. Advantage Shuffle — Medium

[Open on LeetCode](https://leetcode.com/problems/advantage-shuffle/)

## Problem

870. Advantage Shuffle -- Medium

Given two arrays A and B of equal size, the advantage of A with respect to B is the number of indices i for which A[i] > B[i].

Return any permutation of A that maximizes its advantage with respect to B.


Example 1:
Input: A = [2,7,11,15], B = [1,10,4,11]
Output: [2,11,7,15]

Example 2:
Input: A = [12,24,8,32], B = [13,25,32,11]
Output: [24,32,8,12]
 

Note:

1 <= A.length = B.length <= 10000
0 <= A[i] <= 10^9
0 <= B[i] <= 10^9

## Solution

```python
### map + sort, 田忌赛马，注意duplicate的handle，需要modify list。
class Solution:
    def advantageCount(self, A: List[int], B: List[int]) -> List[int]:
        # 田忌赛马
        A = sorted(A)
        select = collections.defaultdict(list)

        for b in sorted(B, reverse = True):
            if b < A[-1]: 
                select[b].append(A.pop())
        res = []
        for b in B:
            if select[b]:
                # handle duplicates
                selected = select[b]
                res.append(selected.pop())
                select[b] = selected
            else:
                res.append(A.pop())
        return res

# 简单版写法：
class Solution:
    def advantageCount(self, A: List[int], B: List[int]) -> List[int]:
        # 田忌赛马
        A = sorted(A)
        select = collections.defaultdict(list)

        for b in sorted(B, reverse = True):
            if b < A[-1]: 
                select[b].append(A.pop())

                
        return [(select[b] or A).pop() for b in B]
```
