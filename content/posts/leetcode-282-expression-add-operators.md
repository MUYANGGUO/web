---
title: "LeetCode 282 Expression Add Operators - Hard"
date: "2021-01-01"
excerpt: "282. Expression Add Operators -- Hard"
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 282
comments: true
---

### 282. Expression Add Operators — Hard

[Open on LeetCode](https://leetcode.com/problems/expression-add-operators/)

## Problem

282. Expression Add Operators -- Hard

Given a string that contains only digits 0-9 and a target value, return all possibilities to add binary operators (not unary) +, -, or * between the digits so they evaluate to the target value.

Example 1:

Input: num = "123", target = 6
Output: ["1+2+3", "1*2*3"] 

Example 2:

Input: num = "232", target = 8
Output: ["2*3+2", "2+3*2"]

Example 3:

Input: num = "105", target = 5
Output: ["1*0+5","10-5"]

Example 4:

Input: num = "00", target = 0
Output: ["0+0", "0-0", "0*0"]

Example 5:

Input: num = "3456237490", target = 9191
Output: []
 

Constraints:

0 <= num.length <= 10
num only contain digits.

## Solution

```python
class Solution:
    def addOperators(self, num: str, target: int) -> List[str]:
        #dfs 每一层递归都进行加减乘除的尝试，回溯
        def dfs(idx, tmp, tot, last, res):
            if idx == len(num):
                if tot == target:
                    res.append(tmp)
                return
            for i in range(idx, len(num)):
                x = int(num[idx: i + 1])
                if idx == 0:
                    dfs(i + 1, str(x), x, x, res)
                else:
                    dfs(i + 1, tmp + "+" + str(x), tot + x, x, res)
                    dfs(i + 1, tmp + "-" + str(x), tot - x, -x, res)
                    dfs(i + 1, tmp + "*" + str(x), tot - last + last * x, last * x, res)
                if x == 0:
                    break
        res = []
        dfs(0, "", 0, 0, res)
        return res
```
