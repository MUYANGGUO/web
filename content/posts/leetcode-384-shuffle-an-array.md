---
title: "LeetCode 384 Shuffle An Array - Medium"
date: "2021-01-01"
excerpt: "384. Shuffle an Array -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 384
comments: true
---

### 384. Shuffle An Array — Medium

[Open on LeetCode](https://leetcode.com/problems/shuffle-an-array/)

## Problem

384. Shuffle an Array -- Medium

Shuffle a set of numbers without duplicates.

Example:
// Init an array with set 1, 2, and 3.
int[] nums = {1,2,3};
Solution solution = new Solution(nums);

// Shuffle the array [1,2,3] and return its result. Any permutation of [1,2,3] must equally likely to be returned.
solution.shuffle();

// Resets the array back to its original configuration [1,2,3].
solution.reset();

// Returns the random shuffling of array [1,2,3].
solution.shuffle();

## Solution

```python
class Solution:
    def __init__(self, nums):
        self.array = nums

    def reset(self):

        return self.array

    def shuffle(self):
        # must make a new copy first!!! because this will generate a new array without modifying the original
        res = self.array[:]
        for i in range(len(self.array)):
            swap_idx = random.randrange(i, len(self.array))
            res[i], res[swap_idx] = res[swap_idx], res[i]
        return res
```
