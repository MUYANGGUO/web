---
title: "LeetCode 302 Smallest Rectangle Enclosing Black Pixels - Hard"
date: "2021-01-01"
excerpt: 302. Smallest Rectangle Enclosing Black Pixels
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 302
comments: true
---

### 302. Smallest Rectangle Enclosing Black Pixels — Hard

[Open on LeetCode](https://leetcode.com/problems/smallest-rectangle-enclosing-black-pixels/)

## Problem

302. Smallest Rectangle Enclosing Black Pixels

An image is represented by a binary matrix with 0 as a white pixel and 1 as a black pixel. The black pixels are connected, i.e., there is only one black region. Pixels are connected horizontally and vertically. Given the location (x, y) of one of the black pixels, return the area of the smallest (axis-aligned) rectangle that encloses all black pixels.

Example:

Input:
[
  "0010",
  "0110",
  "0100"
]
and x = 0, y = 2

Output: 6

## Solution

```python
### Binary Search 的解法：

class Solution:
    def minArea(self, image, x, y):
        if not image or not image[0]:
            return 0
        
        n, m = len(image), len(image[0])
        left = self.find_first(image, 0, y, self.check_column)
        right = self.find_last(image,y, m - 1, self.check_column)
        up = self.find_first(image, 0, x, self.check_row)
        down = self.find_last(image, x, n - 1, self.check_row)
        
        return (right - left + 1) * (down - up + 1)
        
    ### 通过四个二分完成
    ### https://leetcode.com/problems/smallest-rectangle-enclosing-black-pixels/solution/
    
    def find_first(self, image, start, end, check_func):
        while start + 1 < end:
            mid = int((start + end) / 2)
            if check_func(image, mid):
                end = mid
            else:
                start = mid
        if check_func(image, start):
            return start
        return end

    def find_last(self, image, start, end, check_func):
        while start + 1 < end:
            mid = int((start + end) / 2)
            if check_func(image, mid):
                start = mid
            else:
                end = mid
        if check_func(image, end):
            return end
        return start

    def check_column(self, image, col):
        for i in range(len(image)):
            if image[i][col] == '1':
                return True
        return False

    def check_row(self, image, row):
        for j in range(len(image[0])):
            if image[row][j] == '1':
                return True
        return False
```
