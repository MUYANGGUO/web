---
layout: leetcode-page
title: "Leetcode 11 Container With Most Water - Medium"
date: 2021-01-01
order: 11
excerpt: ""
leetcode: true
tags: [Leetcode]
comments: true
---

<h2> 11. Container With Most Water - Medium  </h2>

[Go to Leetcode](https://leetcode.com/problems/container-with-most-water/)

Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of the line i is at (i, ai) and (i, 0). Find two lines, which, together with the x-axis forms a container, such that the container contains the most water.

* Notice that you may not slant the container.

<code>
Examples:
</code>

```
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
```

<code>
Solution 1:
</code>

<code>
Two Pointers, Space O(1), Time O(N)
</code>

```python
class Solution:
    def maxArea(self, nums: List[int]) -> int:
        if not nums:
            return 0
        left, right = 0, len(nums) - 1
        area = 0
        while left < right:
            if nums[left] <= nums[right]:
                curr_area = (right - left) * nums[left]
                left += 1
            else:
                curr_area = (right - left) * nums[right]
                right -= 1
            
            if curr_area >= area:
                area = curr_area
        return area
```