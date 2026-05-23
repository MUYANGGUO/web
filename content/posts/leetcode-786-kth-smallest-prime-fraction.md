---
title: "LeetCode 786 Kth Smallest Prime Fraction - Hard"
date: "2021-01-01"
excerpt: "786. K-th Smallest Prime Fraction -- Hard"
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 786
comments: true
---

### 786. Kth Smallest Prime Fraction — Hard

[Open on LeetCode](https://leetcode.com/problems/kth-smallest-prime-fraction/)

## Problem

786. K-th Smallest Prime Fraction -- Hard

A sorted list A contains 1, plus some number of primes.  Then, for every p < q in the list, we consider the fraction p/q.

What is the K-th smallest fraction considered?  Return your answer as an array of ints, where answer[0] = p and answer[1] = q.

Examples:
Input: A = [1, 2, 3, 5], K = 3
Output: [2, 5]
Explanation:
The fractions to be considered in sorted order are:
1/5, 1/3, 2/5, 1/2, 3/5, 2/3.
The third fraction is 2/5.
Input: A = [1, 7], K = 1
Output: [1, 7]

Note:
A will have length between 2 and 2000.
Each A[i] will be between 1 and 30000.
K will be between 1 and A.length * (A.length - 1) / 2.

## Solution

```python
# Heap Queue:
class Solution:
    def kthSmallestPrimeFraction(self, A: List[int], K: int) -> List[int]:
        pq = [(A[0] / float(A[i]), 0, i) for i in range(len(A) - 1, 0, -1)]
        for _ in range(K-1):
            frac, i, j = heapq.heappop(pq)
            i += 1
            if i < j:
                heapq.heappush(pq, (A[i] / float(A[j]), i, j))
        return A[pq[0][1]], A[pq[0][2]]

# Binary Search:
class Solution:
    def kthSmallestPrimeFraction(self, A: List[int], K: int) -> List[int]:
        l, r, N = 0, 1, len(A)
        while True:
            m = (l + r) / 2
            border = [bisect.bisect(A, A[i] / m) for i in range(N)]
            cur = sum(N - i for i in border)
            if cur > K:
                r = m
            elif cur < K:
                l = m
            else:
                return max([(A[i], A[j]) for i, j in enumerate(border) if j < N], key=lambda x: x[0] / x[1])
```
