---
title: "LeetCode 1052 Grumpy Bookstore Owner - Medium"
date: "2021-01-01"
excerpt: 1052. Grumpy Bookstore Owner
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 1052
comments: true
---

### 1052. Grumpy Bookstore Owner — Medium

[Open on LeetCode](https://leetcode.com/problems/grumpy-bookstore-owner/)

## Problem

1052. Grumpy Bookstore Owner

Today, the bookstore owner has a store open for customers.length minutes.  Every minute, some number of customers (customers[i]) enter the store, and all those customers leave after the end of that minute.

On some minutes, the bookstore owner is grumpy.  If the bookstore owner is grumpy on the i-th minute, grumpy[i] = 1, otherwise grumpy[i] = 0.  When the bookstore owner is grumpy, the customers of that minute are not satisfied, otherwise they are satisfied.

The bookstore owner knows a secret technique to keep themselves not grumpy for X minutes straight, but can only use it once.

Return the maximum number of customers that can be satisfied throughout the day.

 

Example 1:

Input: customers = [1,0,1,2,1,1,7,5], grumpy = [0,1,0,1,0,1,0,1], X = 3
Output: 16
Explanation: The bookstore owner keeps themselves not grumpy for the last 3 minutes. 
The maximum number of customers that can be satisfied = 1 + 1 + 1 + 1 + 7 + 5 = 16.
 

Note:

1 <= X <= customers.length == grumpy.length <= 20000
0 <= customers[i] <= 1000
0 <= grumpy[i] <= 1

## Solution

```python
### Sliding Window:
class Solution:
    def maxSatisfied(self, customers: List[int], grumpy: List[int], X: int) -> int:
        originalSatisfied = 0
        n = len(customers)
        for i in range(n):
            if grumpy[i] == 0:
                originalSatisfied += customers[i]
        
        # sliding window
        becomeSatisfied = 0
        becomeMAX = 0
        start = 0
        for end in range(n):
            if grumpy[end] == 1:
                becomeSatisfied += customers[end]
            if end - start + 1 > X:
                if grumpy[start] == 1:
                    becomeSatisfied -= customers[start]
                start += 1
                # sliding move 1 from left
            
            becomeMAX = max(becomeSatisfied, becomeMAX)
        
        return becomeMAX + originalSatisfied
```
