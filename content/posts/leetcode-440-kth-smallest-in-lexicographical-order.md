---
title: "LeetCode 440 Kth Smallest In Lexicographical Order - Hard"
date: "2021-01-01"
excerpt: "440. K-th Smallest in Lexicographical Order -- Hard"
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 440
comments: true
---

### 440. Kth Smallest In Lexicographical Order — Hard

[Open on LeetCode](https://leetcode.com/problems/kth-smallest-in-lexicographical-order/)

## Problem

440. K-th Smallest in Lexicographical Order -- Hard

Given integers n and k, find the lexicographically k-th smallest integer in the range from 1 to n.

Note: 1 ≤ k ≤ n ≤ 109.

Example:

Input:
n: 13   k: 2

Output:
10

Explanation:
The lexicographical order is [1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9], so the second smallest number is 10.

## Solution

```python
class Solution:
    def findKthNumber(self, n: int, k: int) -> int:
        result = 1
        k = k - 1
        while k > 0:
            count = 0
            interval = [result, result + 1]	#计算result开头至result+1开头间的字符串数量
            while interval[0] <= n:
                count += (min(n+1, interval[1]) - interval[0])	#每次加上当前的字符串数量
                interval = [10*interval[0], 10*interval[1]]	#每次均扩大10倍
            
            if k >= count:	#如果不在当前层，减去count
                result += 1
                k -= count
            else:			
                result *= 10	#说明在当前层,result*10缩小搜索范围继续查找
                k -= 1
        return result
```
