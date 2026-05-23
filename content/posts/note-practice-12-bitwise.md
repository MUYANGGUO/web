---
title: "Practice Notes 12 — Bitwise"
date: "2021-01-01"
excerpt: ""
kind: post
tags:
  - Algorithm Notes
  - Study Notes
comments: true
---

### Chapter 12 Bitwise Operators：

1. [LeetCode 29 Divide Two Integers](https://leetcode.com/problems/divide-two-integers/)
   
    **Problem:**

    Given two integers dividend and divisor, divide two integers without using multiplication, division and mod operator.

    Return the quotient after dividing dividend by divisor.

    The integer division should truncate toward zero, which means losing its fractional part. For example, truncate(8.345) = 8 and truncate(-2.7335) = -2.


    **Notes:**

    Both dividend and divisor will be 32-bit signed integers.

    The divisor will never be 0.

    Assume we are dealing with an environment which could only store integers within the 32-bit signed integer range: [−231,  231 − 1]. For the purpose of this problem, assume that your function returns 231 − 1 when the division result overflows.

    **Example:**

    ```
    Input: dividend = 10, divisor = 3
    Output: 3
    Explanation: 10/3 = truncate(3.33333..) = 3.

    Input: dividend = 7, divisor = -3
    Output: -2
    Explanation: 7/-3 = truncate(-2.33333..) = -2.
    ```

    **Solution: 利用减法代替除法，用倍增法进行加速，利用bitwise operator来进行翻倍运算**

    ```python
    class Solution:
        def divide(self, dividend: int, divisor: int) -> int:
            is_negative = False
            if dividend > 0 and divisor < 0 or dividend < 0 and divisor > 0:
                is_negative = True
            # absolute value
            if dividend < 0:
                dividend = -dividend
            if divisor < 0:
                divisor = -divisor
            # 倍增法
            ans = 0
            while dividend >= divisor:
                temp = divisor
                cnt = 1
                while dividend >= temp:
                    dividend -= temp
                    ans += cnt
                    cnt <<= 1
                    temp <<= 1
            if is_negative:
                ans = -ans
            if ans >= 1 << 31:
                ans = (1 << 31) - 1
            return ans
    ```

    ---
