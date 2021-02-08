---
layout: leetcode-page
title: "Leetcode 7 Reverse Integer - Easy"
date: 2021-01-01
order: 7
excerpt: ""
leetcode: true
tags: [Leetcode]
comments: true
---

<h2> 7. Reverse Integer - Easy  </h2>

[Go to Leetcode](https://leetcode.com/problems/reverse-integer/)

Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [- 2^31, 2^31 - 1], then return 0.

**Assume the environment does not allow you to store 64-bit integers (signed or unsigned).**

<code>
Examples:
</code>

```
Input: x = 123
Output: 321

Input: x = -123
Output: -321

Input: x = 120
Output: 21

Input: x = 0
Output: 0

```

<code>
Solution :
</code>

<code>
Math, Float, Int Boundary check. Space O(1), Time O(n), n is number of digits in x.
</code>

``` python
class Solution:
    def reverse(self, x: int) -> int:
        
        MIN, MAX = -(1 << 31), 1 << 31
        if x < MIN or x > MAX:
            return 0
        
        if x >= 0:
            sign = 1
        else:
            sign = -1
            x = abs(x)
        
        res = 0
        while int(x) != 0 :
            mod = x % 10
            x /= 10
            # mod can be float, need to convert to int
            res = res * 10 + int(mod)
            # pruning check res within range
            if res < MIN or res > MAX:
                return 0
        return sign * res    
```

