---
title: "LeetCode 1049 Last Stone Weight II - Medium"
date: "2021-01-01"
excerpt: "1049. Last Stone Weight II -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 1049
comments: true
---

### 1049. Last Stone Weight II — Medium

[Open on LeetCode](https://leetcode.com/problems/last-stone-weight-ii/)

## Problem

1049. Last Stone Weight II -- Medium

We have a collection of rocks, each rock has a positive integer weight.

Each turn, we choose any two rocks and smash them together.  Suppose the stones have weights x and y with x <= y.  The result of this smash is:

If x == y, both stones are totally destroyed;
If x != y, the stone of weight x is totally destroyed, and the stone of weight y has new weight y-x.
At the end, there is at most 1 stone left.  Return the smallest possible weight of this stone (the weight is 0 if there are no stones left.)

Example 1:

Input: [2,7,4,1,8,1]
Output: 1
Explanation: 
We can combine 2 and 4 to get 2 so the array converts to [2,7,1,8,1] then,
we can combine 7 and 8 to get 1 so the array converts to [2,1,1,1] then,
we can combine 2 and 1 to get 1 so the array converts to [1,1,1] then,
we can combine 1 and 1 to get 0 so the array converts to [1] then that's the optimal value.
 

Note:

1 <= stones.length <= 30
1 <= stones[i] <= 100

## Solution

```python
# 转换成0-1 Knapsack:
class Solution:
    def lastStoneWeightII(self, stones: List[int]) -> int:
        total = sum(stones)
        Max_weight = int(total/2)
        current = (Max_weight+1)*[0]
        for v in stones:
            for w in range(Max_weight, -1, -1):
                if w-v>=0:
                    current[w] = max(v + current[w-v], current[w])
        return total-2*current[-1]
```
