---
title: "LintCode 254 Drop Eggs - Easy"
date: "2021-01-01"
excerpt: 254. Drop Eggs
kind: leetcode
tags:
  - LintCode
  - Easy
  - Python
order: 254
comments: true
---

### 254. Drop Eggs — Easy

[Open on LintCode](https://www.lintcode.com/problem/254/)

## Problem

254. Drop Eggs

There is a building of n floors. If an egg drops from the k th floor or above, it will break. If it's dropped from any floor below, it will not break.

You're given two eggs, Find k while minimize the number of drops for the worst case. Return the number of drops in the worst case.

Example
Example 1:

Input: 100
Output: 14
Example 2:

Input: 10
Output: 4
Clarification
For n = 10, a naive way to find k is drop egg from 1st floor, 2nd floor ... kth floor. But in this worst case (k = 10), you have to drop 10 times.

Notice that you have two eggs, so you can drop at 4th, 7th & 9th floor, in the worst case (for example, k = 9) you have to drop 4 times.

## Solution

```python
# 假设第一次从x层开始扔，那么若鸡蛋碎了，需要从1到x - 1逐层尝试,那么共需尝试x次; 若第一次鸡蛋未碎，第二次尝试从y层开始，碎在y层，那么需要从x + 1到y - 1逐层尝试，共需尝试 （y - x + 1）次，那么当x = y - x + 1时（也即y = x + x - 1）,能够使得扔鸡蛋次数最小，以此类推，第一次从x层开始，那么若未碎第二次应当从x + x - 1层开始，第三次应当从x + x - 1 + x - 2层开始......

# 那么x的取值应当满足（1 + 2 + ... + x）>= n 即 x * (x + 1) / 2 >= n 的最小值即为答案值。


class Solution:
    """
    @param n: An integer
    @return: An integer
    """
    def dropEggs(self, n):
        # write your code here
        import math
        x = int(math.sqrt(n * 2))
        while x * (x + 1) / 2 < n:
            x += 1
        return x
```
