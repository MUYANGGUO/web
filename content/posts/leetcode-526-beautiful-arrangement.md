---
title: "LeetCode 526 Beautiful Arrangement - Medium"
date: "2021-01-01"
excerpt: 526. Beautiful Arrangement
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 526
comments: true
---

### 526. Beautiful Arrangement — Medium

[Open on LeetCode](https://leetcode.com/problems/beautiful-arrangement/)

## Problem

526. Beautiful Arrangement
Suppose you have N integers from 1 to N. We define a beautiful arrangement as an array that is constructed by these N numbers successfully if one of the following is true for the ith position (1 <= i <= N) in this array:

The number at the ith position is divisible by i.
i is divisible by the number at the ith position.
 

Now given N, how many beautiful arrangements can you construct?

Example 1:

Input: 2
Output: 2
Explanation: 

The first beautiful arrangement is [1, 2]:

Number at the 1st position (i=1) is 1, and 1 is divisible by i (i=1).

Number at the 2nd position (i=2) is 2, and 2 is divisible by i (i=2).

The second beautiful arrangement is [2, 1]:

Number at the 1st position (i=1) is 2, and 2 is divisible by i (i=1).

Number at the 2nd position (i=2) is 1, and i (i=2) is divisible by 1.
 

Note:

N is a positive integer and will not exceed 15.

## Solution

```python
### DFS:

class Solution:
    
    def countArrangement(self, N: int) -> int:
        if not N:
            return 0
        self.res = 0
        visited = [False for _ in range(N)]
        sequence = [i + 1 for i in range(N)]
        self.dfs(sequence, 1, visited, N)
        return self.res
    
    def dfs(self, sequence, index, visited, N):
        if index == N + 1:
            self.res += 1
            return 
        for num in sequence:
            if visited[num - 1] == True:
                continue
            if (num % index == 0) or (index % num == 0):
                visited[num - 1] = True
                self.dfs(sequence, index + 1, visited, N)
                visited[num - 1] = False
```
