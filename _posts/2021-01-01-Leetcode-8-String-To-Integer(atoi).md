---
layout: leetcode-page
title: "Leetcode 8 String to Integer (atoi) - Medium"
date: 2021-01-01
order: 8
excerpt: ""
leetcode: true
tags: [Leetcode]
comments: true
---

<h2> 8. String to Integer (atoi) - Medium  </h2>

[Go to Leetcode](https://leetcode.com/problems/string-to-integer-atoi/)

Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer (similar to C/C++'s atoi function).

The algorithm for myAtoi(string s) is as follows:

1. Read in and ignore any leading whitespace.
   
2. Check if the next character (if not already at the end of the string) is '-' or '+'.
   
3. Read this character in if it is either. This determines if the final result is negative or positive respectively. Assume the result is positive if neither is present.
Read in next the characters until the next non-digit charcter or the end of the input is reached. The rest of the string is ignored.

4. Convert these digits into an integer (i.e. "123" -> 123, "0032" -> 32). If no digits were read, then the integer is 0. Change the sign as necessary (from step 2).
   
5. If the integer is out of the 32-bit signed integer range [-2^31, 2^31 - 1], then clamp the integer so that it remains in the range. Specifically, integers less than -2^31 should be clamped to -2^31, and integers greater than 2^31 - 1 should be clamped to 2^31 - 1.
   
6. Return the integer as the final result.

<code>
Examples:
</code>

```
Input: s = "42"
Output: 42
Explanation: The underlined characters are what is read in, the caret is the current reader position.
Step 1: "42" (no characters read because there is no leading whitespace)
         ^
Step 2: "42" (no characters read because there is neither a '-' nor '+')
         ^
Step 3: "42" ("42" is read in)
           ^
The parsed integer is 42.
Since 42 is in the range [-231, 231 - 1], the final result is 42.

Input: s = "   -42"
Output: -42

Input: s = "4193 with words"
Output: 4193

Input: s = "words and 987"
Output: 0

```

<code>
Solution :
</code>

<code>
Math, Simulation, Space O(1), Time O(N).
</code>

``` python
class Solution:
    def myAtoi(self, s: str) -> int:
        # ignore leading and tailing whitespace
        s = s.strip()
        if s == "":
            return 0
        
        MIN, MAX = -(1 << 31) , (1 << 31) - 1
        n = len(s)
        sign = 1
        res = 0
        for i in range(n):
            if i == 0 and s[i] in {"+", "-"}:
                sign = -1 if s[i] == "-" else 1
                continue
            if s[i].isdigit():
                res = res * 10 + int(s[i])
                # prunning check
                if res > MAX or res < MIN:
                    break
            else:
                break
    
        res *= sign
        if res >= MAX:
            return MAX
        if res < MIN :
            return MIN
        return res
                
```

> Comments: Strictly followed the algorithm given, step by step constructing the final results, be careful with the intermediate result, check if the intermediate results falls within the boundary. 