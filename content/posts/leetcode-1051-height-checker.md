---
title: "LeetCode 1051 Height Checker - Easy"
date: "2021-01-01"
excerpt: "1051. Height Checker -- Easy"
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 1051
comments: true
---

### 1051. Height Checker — Easy

[Open on LeetCode](https://leetcode.com/problems/height-checker/)

## Problem

1051. Height Checker -- Easy

Students are asked to stand in non-decreasing order of heights for an annual photo.

Return the minimum number of students that must move in order for all students to be standing in non-decreasing order of height.

Notice that when a group of students is selected they can reorder in any possible way between themselves and the non selected students remain on their seats.

 

Example 1:

Input: heights = [1,1,4,2,1,3]
Output: 3
Explanation: 
Current array : [1,1,4,2,1,3]
Target array  : [1,1,1,2,3,4]
On index 2 (0-based) we have 4 vs 1 so we have to move this student.
On index 4 (0-based) we have 1 vs 3 so we have to move this student.
On index 5 (0-based) we have 3 vs 4 so we have to move this student.
Example 2:

Input: heights = [5,1,2,3,4]
Output: 5
Example 3:

Input: heights = [1,2,3,4,5]
Output: 0
 

Constraints:

1 <= heights.length <= 100
1 <= heights[i] <= 100

## Solution

```python
# counting sort:
class Solution:
    def heightChecker(self, heights: List[int]) -> int:
        max_val = max(heights)
        
        # Create frequency table
        freq = [0] * (max_val + 1)
        for num in heights: freq[num] += 1
        for num in range(1, len(freq)): freq[num] += freq[num-1]

        # Create places table
        places = [0] * len(heights)
        for num in heights:
            places[freq[num]-1] = num
            freq[num] -= 1

        return sum([a!=b for a, b in zip(heights, places)])
```
