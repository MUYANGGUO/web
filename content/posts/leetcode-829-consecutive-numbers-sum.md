---
title: "LeetCode 829 Consecutive Numbers Sum - Hard"
date: "2021-01-01"
excerpt: "829. Consecutive Numbers Sum -- Hard"
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 829
comments: true
---

### 829. Consecutive Numbers Sum — Hard

[Open on LeetCode](https://leetcode.com/problems/consecutive-numbers-sum/)

## Problem

829. Consecutive Numbers Sum -- Hard

Given a positive integer N, how many ways can we write it as a sum of consecutive positive integers?

Example 1:

Input: 5
Output: 2
Explanation: 5 = 5 = 2 + 3
Example 2:

Input: 9
Output: 3
Explanation: 9 = 9 = 4 + 5 = 2 + 3 + 4
Example 3:

Input: 15
Output: 4
Explanation: 15 = 15 = 8 + 7 = 4 + 5 + 6 = 1 + 2 + 3 + 4 + 5
Note: 1 <= N <= 10 ^ 9.

## Solution

```python
# Math 1:
class Solution:
    def consecutiveNumbersSum(self, N: int) -> int:
        count = 0
        # x > 0 --> N/k - (k + 1)/2 > 0
        upper_limit = ceil((2 * N + 0.25)**0.5 - 0.5) + 1
        for k in range(1, upper_limit):
            # x should be integer
            if (N - k * (k + 1) // 2) % k == 0:
                count += 1
        return count
        
# Math 2:
class Solution:
    def consecutiveNumbersSum(self, N: int) -> int:
        count = 0
        upper_limit = ceil((2 * N + 0.25)**0.5 - 0.5) + 1
        for k in range(1, upper_limit):
            N -= k
            if N % k == 0:
                count += 1
        return count
```
