---
title: "LeetCode 679 24 Game - Hard"
date: "2021-01-01"
excerpt: "679. 24 Game -- Hard"
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 679
comments: true
---

### 679. 24 Game — Hard

[Open on LeetCode](https://leetcode.com/problems/24-game/)

## Problem

679. 24 Game -- Hard

You have 4 cards each containing a number from 1 to 9. You need to judge whether they could operated through *, /, +, -, (, ) to get the value of 24.

Example 1:
Input: [4, 1, 8, 7]
Output: True
Explanation: (8-4) * (7-1) = 24
Example 2:
Input: [1, 2, 1, 2]
Output: False
Note:
The division operator / represents real division, not integer division. For example, 4 / (1 - 2/3) = 12.
Every operation done is between two numbers. In particular, we cannot use - as a unary operator. For example, with [1, 1, 1, 1] as input, the expression -1 - 1 - 1 - 1 is not allowed.
You cannot concatenate numbers together. For example, if the input is [1, 2, 1, 2], we cannot write this as 12 + 12.

## Solution

```python
class Solution:
    def judgePoint24(self, nums: List[int]) -> bool:
        return self.compute(nums, 4)
    def compute(self, nums, n) :
        if n == 1 :  
            if abs(nums[0] - 24) <= 1E-6 : 
                # due to '/' it might has float
                return True
        for i in range(0, n) :
            for j in range(i + 1, n) :
                a = nums[i]  
                b = nums[j]
                nums[j] = nums[n - 1]  
                nums[i] = a + b
                if self.compute(nums, n - 1) : 
                	return True
                nums[i] = a - b
                if self.compute(nums, n - 1) :
                	return True
                nums[i] = b - a  
                if self.compute(nums, n - 1) :
                	return True
                nums[i] = a * b 
                if self.compute(nums, n - 1) :
                	return True
                if b != 0 :
                    nums[i] = a / b  
                    if self.compute(nums, n - 1) :
                        return True
                if  a != 0  :
                    nums[i] = b / a  
                    if self.compute(nums, n - 1) :
                            return True
                # backtracking
                nums[i] = a  
                nums[j] = b
        return False
```
