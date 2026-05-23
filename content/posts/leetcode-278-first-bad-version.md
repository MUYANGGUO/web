---
title: "LeetCode 278 First Bad Version - Easy"
date: "2021-01-01"
excerpt: 278. First Bad Version
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 278
comments: true
---

### 278. First Bad Version — Easy

[Open on LeetCode](https://leetcode.com/problems/first-bad-version/)

## Problem

278. First Bad Version

You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad.

Suppose you have n versions [1, 2, ..., n] and you want to find out the first bad one, which causes all the following ones to be bad.

You are given an API bool isBadVersion(version) which will return whether version is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.

Example:

Given n = 5, and version = 4 is the first bad version.

call isBadVersion(3) -> false
call isBadVersion(5) -> true
call isBadVersion(4) -> true

Then 4 is the first bad version.

## Solution

```python
class Solution:
    def firstBadVersion(self, n):
        """
        :type n: int
        :rtype: int
        """
        # write your code here
        start, end = 1, n
        while start + 1 < end:
            mid = int((start + end) / 2)
            if isBadVersion(mid):
                end = mid
            else:
                start = mid + 1
        if isBadVersion(start):
            return start
        return end
```
