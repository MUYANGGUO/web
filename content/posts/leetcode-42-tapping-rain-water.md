---
title: "LeetCode 42 Tapping Rain Water - Hard"
date: "2021-01-01"
excerpt: 42. Trapping Rain Water
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 42
comments: true
---

### 42. Tapping Rain Water — Hard

[Open on LeetCode](https://leetcode.com/problems/tapping-rain-water/)

## Problem

42. Trapping Rain Water

Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it is able to trap after raining.

The above elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped. Thanks Marcos for contributing this image!

Example:

Input: [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6

## Solution

```python
# Solution 1 One-Pass:

class Solution:
    def trap(self, height: List[int]):
        if not height:
            return 0
        # two pointers
        left, right = 0, len(height) - 1
        left_max, right_max = height[left], height[right]
        sum = 0 
        while left < right:
            # 注意这里要进行一个“趋势”的方向性判断：
            if height[left] <= height[right]:
                if height[left] <= left_max:
                    sum += (left_max - height[left])
                else:
                    left_max = height[left]
                left += 1
            else:
                if height[right] <= right_max:
                    sum += (right_max - height[right])
                else:
                    right_max = height[right]
                right -= 1  
        return sum
        
# Solution 2 Two-Pass:          

class Solution:
    """
    @param heights: a list of integers
    @return: a integer
    """
    def trapRainWater(self, heights):
        if not heights:
            return 0
            
        left_max = []
        curt_max = -sys.maxsize
        for height in heights:
            curt_max = max(curt_max, height)
            left_max.append(curt_max)
            
        right_max = []
        curt_max = -sys.maxsize
        for height in reversed(heights):
            curt_max = max(curt_max, height)
            right_max.append(curt_max)
            
        right_max = right_max[::-1]
            
        water = 0
        n = len(heights)
        for i in range(n):
            water += (min(left_max[i], right_max[i]) - heights[i])
        return water
```
