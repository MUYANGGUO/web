---
title: "LeetCode 974 Subarray Sums Divisible By K - Medium"
date: "2021-01-01"
excerpt: "974. Subarray Sums Divisible by K -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 974
comments: true
---

### 974. Subarray Sums Divisible By K — Medium

[Open on LeetCode](https://leetcode.com/problems/subarray-sums-divisible-by-k/)

## Problem

974. Subarray Sums Divisible by K -- Medium

Given an array A of integers, return the number of (contiguous, non-empty) subarrays that have a sum divisible by K.


Example 1:

Input: A = [4,5,0,-2,-3,1], K = 5
Output: 7
Explanation: There are 7 subarrays with a sum divisible by K = 5:
[4, 5, 0, -2, -3, 1], [5], [5, 0], [5, 0, -2, -3], [0], [0, -2, -3], [-2, -3]
 

Note:

1 <= A.length <= 30000
-10000 <= A[i] <= 10000
2 <= K <= 10000

## Solution

```python
# 找规律优化：
class Solution:
    def subarraysDivByK(self, A: List[int], K: int) -> int:
        # Running Sum[i]%K == Running Sum[j]%k 
        # that means we have sum(i,j) which is divisible by K.
        # S_i = x + k (a)
        # S_j = x + k (b)
        # S_j - S_i = K(b - a) thus, proved
        count = {0:1} # for zero we need to initialize it first
        res = 0
        prefix_sum = 0
        for a in A:
            prefix_sum += a
            remainder = prefix_sum % K
            if remainder in count:
                res += count[remainder]
                count[remainder] += 1
            else:
                count[remainder] = count.get(remainder, 0) + 1
        return res

# Alternative          
def subarraysDivByK(self, A, K):
    res = 0
    prefix = 0
    count = [1] + [0] * K
    for a in A:
        prefix = (prefix + a) % K
        res += count[prefix]
        count[prefix] += 1
    return res
```
