---
title: "LeetCode 338 Counting Bits - Medium"
date: "2021-01-01"
excerpt: "Given a non negative integer number num. For every numbers i in the range 0 ≤ i ≤ num calculate the number of 1's in their binary represe…"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 338
comments: true
---

### 338. Counting Bits — Medium

[Open on LeetCode](https://leetcode.com/problems/counting-bits/)

## Problem

Given a non negative integer number num. For every numbers i in the range 0 ≤ i ≤ num calculate the number of 1's in their binary representation and return them as an array.

Example 1:

Input: 2
Output: [0,1,1]
Example 2:

Input: 5
Output: [0,1,1,2,1,2]
Follow up:

It is very easy to come up with a solution with run time O(n*sizeof(integer)). But can you do it in linear time O(n) /possibly in a single pass?
Space complexity should be O(n).
Can you do it like a boss? Do it without using any builtin function like __builtin_popcount in c++ or in any other language.

## Solution

```python
class Solution:
    def countBits(self, num: int) -> List[int]:
        ### DP 优化 O(n) Solution:
        ### 设 f[i] 表示 i 的二进制里有多少个 1
        ### 知识点， 二进制右移一位 即 mod 2 取整。
        
        ### transfer function: f[i] = f[i>>2] + (i mod 2)
        f = [0 for _ in range(num+1)]
        
        for i in range(1, num+1):
            f[i] = f[int(i / 2)] + (i % 2)
        
        return f
```
