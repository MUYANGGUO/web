---
title: "LeetCode 1081 Smallest Subsequence Of Distinct Characters - Medium"
date: "2021-01-01"
excerpt: "1081. Smallest Subsequence of Distinct Characters -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 1081
comments: true
---

### 1081. Smallest Subsequence Of Distinct Characters — Medium

[Open on LeetCode](https://leetcode.com/problems/smallest-subsequence-of-distinct-characters/)

## Problem

1081. Smallest Subsequence of Distinct Characters -- Medium

Return the lexicographically smallest subsequence of s that contains all the distinct characters of s exactly once.

Note: This question is the same as 316: https://leetcode.com/problems/remove-duplicate-letters/

Example 1:

Input: s = "bcabc"
Output: "abc"
Example 2:

Input: s = "cbacdcbc"
Output: "acdb"
 

Constraints:

1 <= s.length <= 1000
s consists of lowercase English letters.

## Solution

```python
class Solution:
    def getSum(self, x, nums):
        return sum([ceil(n / x) for n in nums])
    def smallestDivisor(self, nums: List[int], threshold: int) -> int:
        # binary search
        left, right = 1, nums[-1]
        while left <= right:
            pivot = (right + left) >> 1
            num = self.getSum(pivot, nums)
            if num > threshold:
                left = pivot + 1
            else:
                right = pivot - 1
        # at the end of loop, left > right,
        # compute_sum(right) > threshold
        # compute_sum(left) <= threshold
        # --> return left
        return left
```
