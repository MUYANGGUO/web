---
title: "LeetCode 128 Longest Consecutive Sequence - Hard"
date: "2021-01-01"
excerpt: "128. Longest Consecutive Sequence -- Hard"
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 128
comments: true
---

### 128. Longest Consecutive Sequence — Hard

[Open on LeetCode](https://leetcode.com/problems/longest-consecutive-sequence/)

## Problem

128. Longest Consecutive Sequence -- Hard

Given an unsorted array of integers, find the length of the longest consecutive elements sequence.

Your algorithm should run in O(n) complexity.

Example:
Input: [100, 4, 200, 1, 3, 2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.

## Solution

```python
### O(N) solution with Hashmap:
class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        map = set(nums)
        longest = 0
        for num in nums:
            # find the start (here restrict the inner while loop time complexitiy)
            if num - 1 not in map:
                count = 1
                while num + 1 in map:
                    count += 1
                    num = num + 1
                longest = max(longest, count)    
        return longest

# O(NlogN) with Sort:
class Solution:
    def longestConsecutive(self, nums):
        if not nums:
            return 0

        nums.sort()

        longest_streak = 1
        current_streak = 1

        for i in range(1, len(nums)):
            if nums[i] != nums[i-1]:
                if nums[i] == nums[i-1]+1:
                    current_streak += 1
                else:
                    longest_streak = max(longest_streak, current_streak)
                    current_streak = 1

        return max(longest_streak, current_streak)
```
