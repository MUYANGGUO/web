---
title: "LeetCode 390 Elimination Game - Medium"
date: "2021-01-01"
excerpt: "390. Elimination Game -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 390
comments: true
---

### 390. Elimination Game — Medium

[Open on LeetCode](https://leetcode.com/problems/elimination-game/)

## Problem

390. Elimination Game -- Medium

There is a list of sorted integers from 1 to n. Starting from left to right, remove the first number and every other number afterward until you reach the end of the list.

Repeat the previous step again, but this time from right to left, remove the right most number and every other number from the remaining numbers.

We keep repeating the steps again, alternating left to right and right to left, until a single number remains.

Find the last number that remains starting with a list of length n.

Example:

Input:
n = 9,
1 2 3 4 5 6 7 8 9
2 4 6 8
2 6
6

Output:
6

## Solution

```python
class Solution:
    def lastRemaining(self, n: int) -> int:
        def helper(n, isLeft):
            if(n==1): return 1
            if(isLeft):
                return 2*helper(n//2, 0)
    # if started from left side the odd elements will be removed, the only remaining ones will the the even i.e.
    #       [1 2 3 4 5 6 7 8 9]==   [2 4 6 8]==     2*[1 2 3 4]
            elif(n%2==1):
                return 2*helper(n//2, 1)
    # same as left side the odd elements will be removed
            else:
                return 2*helper(n//2, 1) - 1
    # even elements will be removed and the only left ones will be [1 2 3 4 5 6 ]== [1 3 5]== 2*[1 2 3] - 1
            
        return helper(n, 1)
```
