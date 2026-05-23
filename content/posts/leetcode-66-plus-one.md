---
title: "LeetCode 66 Plus One - Easy"
date: "2021-01-01"
excerpt: 66. Plus One
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 66
comments: true
---

### 66. Plus One — Easy

[Open on LeetCode](https://leetcode.com/problems/plus-one/)

## Problem

66. Plus One
Easy

1809

2655

Add to List

Share
Given a non-empty array of digits representing a non-negative integer, increment one to the integer.

The digits are stored such that the most significant digit is at the head of the list, and each element in the array contains a single digit.

You may assume the integer does not contain any leading zero, except the number 0 itself.

Example 1:
Input: digits = [1,2,3]
Output: [1,2,4]
Explanation: The array represents the integer 123.

Example 2:
Input: digits = [4,3,2,1]
Output: [4,3,2,2]
Explanation: The array represents the integer 4321.

Example 3:
Input: digits = [0]
Output: [1]
 

Constraints:

1 <= digits.length <= 100
0 <= digits[i] <= 9

## Solution

```python
class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:
        for idx in range(len(digits) - 1, -1, -1):
            if digits[idx] == 9:
                digits[idx] = 0
            else:
                digits[idx] += 1
                return digits
        return [1] + digits
```
