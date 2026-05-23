---
title: "LeetCode 386 Lexicographical Numbers - Medium"
date: "2021-01-01"
excerpt: "386. Lexicographical Numbers -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 386
comments: true
---

### 386. Lexicographical Numbers — Medium

[Open on LeetCode](https://leetcode.com/problems/lexicographical-numbers/)

## Problem

386. Lexicographical Numbers -- Medium

Given an integer n, return 1 - n in lexicographical order.

For example, given 13, return: [1,10,11,12,13,2,3,4,5,6,7,8,9].

Please optimize your algorithm to use less time and space. The input size may be as large as 5,000,000.

## Solution

```python
# 按字典序从上一个数求下一个数字，依依放入：
class Solution:
    def lexicalOrder(self, n: int) -> List[int]:
        curr, res = 1, []
        for i in range(1, n + 1):
            res.append(curr)
            if curr * 10 <= n:
                curr *= 10
            elif curr % 10 != 9 and curr + 1 <= n:
                curr += 1
            else:
                while (curr // 10) % 10 == 9:
                    curr = curr // 10
                curr = curr // 10 + 1
        return res
```
