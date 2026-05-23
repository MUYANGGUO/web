---
title: "LeetCode 204 Count Primes - Easy"
date: "2021-01-01"
excerpt: "Count the number of prime numbers less than a non-negative number, n."
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 204
comments: true
---

### 204. Count Primes — Easy

[Open on LeetCode](https://leetcode.com/problems/count-primes/)

## Problem

Count the number of prime numbers less than a non-negative number, n.

Example:

Input: 10
Output: 4
Explanation: There are 4 prime numbers less than 10, they are 2, 3, 5, 7.

## Solution

```python
class Solution:
    def countPrimes(self, n: int) -> int:
        
        ###
        ### https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
            
        # less than 3 
        if n < 2:
            return 0
        # init a prime = 2 
        primes = [True] * n
        primes[0] = primes[1] = False
        
        # from 4, 6 ... n mark false
        # from small to large
        for i in range(2, int(n ** 0.5) + 1):
            if primes[i]:
                primes[i * i: n: i] = [False] * len(primes[i * i: n: i])
        return sum(primes)
```
