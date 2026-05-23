---
title: "LeetCode 85 Maximal Rectangle - Hard"
date: "2021-01-01"
excerpt: "85. Maximal Rectangle -- Hard"
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 85
comments: true
---

### 85. Maximal Rectangle — Hard

[Open on LeetCode](https://leetcode.com/problems/maximal-rectangle/)

## Problem

85. Maximal Rectangle -- Hard

Given a rows x cols binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.


Example 1:
Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
Output: 6
Explanation: The maximal rectangle is shown in the above picture.

Example 2:
Input: matrix = []
Output: 0

Example 3:
Input: matrix = [["0"]]
Output: 0

Example 4:
Input: matrix = [["1"]]
Output: 1

Example 5:
Input: matrix = [["0","0"]]
Output: 0
 

Constraints:
rows == matrix.length
cols == matrix.length
0 <= row, cols <= 200
matrix[i][j] is '0' or '1'.

## Solution

```python
class Solution:
    def maximalRectangle(self, matrix: List[List[str]]) -> int:
        if(not matrix) : return 0
        for i in range(0, len(matrix)):
            for j in range(len(matrix[0])):
                if( matrix[i][j] == '1' ):
                    matrix[i][j] = int(matrix[i][j]) + int(matrix[i-1][j] if(i>0) else 0 )
                else:
                    matrix[i][j] = 0 
        def findLargestArea(heights):
            if(not heights): return 0
            heights.append(0)
            stack = [-1]
            ans = 0
            for i in range(len(heights)):
                while( heights[i] < heights[stack[-1]] ):
                    h = heights[stack.pop()]
                    w = i - stack[-1] - 1
                    ans = max( ans, h*w )
                stack.append(i)
            return ans
        maxArea = 0
        for row in matrix:
            maxArea = max(maxArea, findLargestArea(row) )
        return maxArea
```
