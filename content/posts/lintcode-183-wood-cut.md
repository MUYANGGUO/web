---
title: "LintCode 183 Wood Cut - Hard"
date: "2021-01-01"
excerpt: 183. Wood Cut
kind: leetcode
tags:
  - LintCode
  - Hard
  - Python
order: 183
comments: true
---

### 183. Wood Cut — Hard

[Open on LintCode](https://www.lintcode.com/problem/183/)

## Problem

183. Wood Cut

Description

Given n pieces of wood with length L[i] (integer array). Cut them into small pieces to guarantee you could have equal or more than k pieces with the same length. What is the longest length you can get from the n pieces of wood? Given L & k, return the maximum length of the small pieces.

You couldn't cut wood into float length.

If you couldn't get >= k pieces, return 0.

Have you met this question in a real interview?  
Example
Example 1

Input:
L = [232, 124, 456]
k = 7
Output: 114
Explanation: We can cut it into 7 pieces if any piece is 114cm long, however we can't cut it into 7 pieces if any piece is 115cm long.
Example 2

Input:
L = [1, 2, 3]
k = 7
Output: 0
Explanation: It is obvious we can't make it.
Challenge
O(n log Len), where Len is the longest length of the wood.

## Solution

```python
### Binary Search: 

class Solution:
    """
    @param L: Given n pieces of wood with length L[i]
    @param k: An integer
    @return: The maximum length of the small pieces
    """
    def woodCut(self, L, k):
        # write your code here
        if not L:
            return 0
            
        max_len = int(sum(L) / k)
        min_len = int(min(L) / k)
        start, end = min_len, max_len
        
        if end <= 1:
            return end

        while start + 1 < end:
            mid = int((start + end) / 2)
            # 长度为mid时能够切出的段数如果大于等于k
            # 把mid作为起点开始新的搜索
            if self.count_k(mid, L) >= k:
                start = mid 
            else:
                end = mid - 1

        if self.count_k(end, L) >= k:
            return end
        if self.count_k(start, L) >= k:
            return start

        return 0
        
    def count_k(self, mid, L):
        k_size = 0
        for l in L:
            k_size += l // mid
        return k_size
```
