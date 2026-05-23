---
title: "LeetCode 670 Maximum Swap - Medium"
date: "2021-01-01"
excerpt: "670. Maximum Swap -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 670
comments: true
---

### 670. Maximum Swap — Medium

[Open on LeetCode](https://leetcode.com/problems/maximum-swap/)

## Problem

670. Maximum Swap -- Medium

Given a non-negative integer, you could swap two digits at most once to get the maximum valued number. Return the maximum valued number you could get.

Example 1:
Input: 2736
Output: 7236
Explanation: Swap the number 2 and the number 7.

Example 2:
Input: 9973
Output: 9973
Explanation: No swap.

Note:
The given number is in the range [0, 108]

## Solution

```python
# Greedy:
class Solution:
    def maximumSwap(self, num: int) -> int:
        num_lst = [int(d) for d in str(num)]
        last = {x: i for i, x in enumerate(num_lst)}
        #last = {2: 0, 7: 1, 3: 2, 6: 3}
        for i, d in enumerate(num_lst):
            # greedy
            for n in range(9, d, -1): #从9开始往2loop，在last里找。
                if last.get(n, -1) > i:	
                    # 9和8不在last里，loop到7的时候，index 1 > current index 0
                    num_lst[i], num_lst[last[n]] = num_lst[last[n]], num_lst[i]	
                    # 交换2和7
                    return int("".join(map(str, num_lst)))	
                # 把数字array重新转换为结果数并且return
        return num# 如果数字已经最大那么直接return
```
