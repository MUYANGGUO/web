---
title: "LeetCode 166 Fraction To Recurring Decimal - Medium"
date: "2021-01-01"
excerpt: "166. Fraction to Recurring Decimal -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 166
comments: true
---

### 166. Fraction To Recurring Decimal — Medium

[Open on LeetCode](https://leetcode.com/problems/fraction-to-recurring-decimal/)

## Problem

166. Fraction to Recurring Decimal -- Medium

Given two integers representing the numerator and denominator of a fraction, return the fraction in string format.

If the fractional part is repeating, enclose the repeating part in parentheses.

If multiple answers are possible, return any of them.

It is guaranteed that the length of the answer string is less than 104 for all the given inputs.


Example 1:

Input: numerator = 1, denominator = 2
Output: "0.5"
Example 2:

Input: numerator = 2, denominator = 1
Output: "2"
Example 3:

Input: numerator = 2, denominator = 3
Output: "0.(6)"
Example 4:

Input: numerator = 4, denominator = 333
Output: "0.(012)"
Example 5:

Input: numerator = 1, denominator = 5
Output: "0.2"
 

Constraints:

-231 <= numerator, denominator <= 231 - 1
denominator != 0

## Solution

```python
# Simulation:
class Solution:
    def fractionToDecimal(self, numerator: int, denominator: int) -> str:
        if numerator % denominator == 0:
            return str(numerator // denominator)
        sign = "-" if numerator * denominator < 0 else ""
        num, den = abs(numerator), abs(denominator)
        n, rem = divmod(num, den)
        res = sign + str(n) + "."
        #纪录 rem 对应的位置
        num_to_pos = {}
        while rem and rem not in num_to_pos:
            num_to_pos[rem] = len(res)
            # 模拟每一步
            n, rem = divmod(10 * rem, den)
            res += str(n)
        # 出现循环小数
        if rem in num_to_pos:
            #如果rem重复，在对应的位置 插入 "("
            index = num_to_pos[rem]
            res = res[:index] + "(" + res[index:] + ")"
        return res
```
