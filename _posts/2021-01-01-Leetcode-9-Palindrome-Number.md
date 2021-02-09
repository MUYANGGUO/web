---
layout: leetcode-page
title: "Leetcode 9 Palindrome Number - Easy"
date: 2021-01-01
order: 9
excerpt: ""
leetcode: true
tags: [Leetcode]
comments: true
---

<h2> 9. Palindrome Number - Easy  </h2>

[Go to Leetcode](https://leetcode.com/problems/palindrome-number/)

Given an integer x, return true if x is palindrome integer.

An integer is a palindrome when it reads the same backward as forward. For example, 121 is palindrome while 123 is not.

<code>
Examples:
</code>

```
Input: x = 121
Output: true

Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.

Input: x = 10
Output: false
Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
```

<code>
Solution :
</code>

<code>
Math, Space O(1), Time O(n), n is the number of digits in x.
</code>

``` python
class Solution:
    def isPalindrome(self, x: int) -> bool:
        if x < 0:
            return False
        origin = x
        reverse = 0
        while x != 0:
            mod = x % 10
            x = x // 10
            reverse = reverse * 10 + mod
        if origin == reverse:
            return True  
```
