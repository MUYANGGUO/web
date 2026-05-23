---
title: "LeetCode 474 Onesand Zeroes - Medium"
date: "2021-01-01"
excerpt: "Given an array, strs, with strings consisting of only 0s and 1s. Also two integers m and n."
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 474
comments: true
---

### 474. Onesand Zeroes — Medium

[Open on LeetCode](https://leetcode.com/problems/onesand-zeroes/)

## Problem

Given an array, strs, with strings consisting of only 0s and 1s. Also two integers m and n.

Now your task is to find the maximum number of strings that you can form with given m 0s and n 1s. Each 0 and 1 can be used at most once.

 

Example 1:

Input: strs = ["10","0001","111001","1","0"], m = 5, n = 3
Output: 4
Explanation: This are totally 4 strings can be formed by the using of 5 0s and 3 1s, which are "10","0001","1","0".
Example 2:

Input: strs = ["10","0","1"], m = 1, n = 1
Output: 2
Explanation: You could form "10", but then you'd have nothing left. Better form "0" and "1".
 

Constraints:

1 <= strs.length <= 600
1 <= strs[i].length <= 100
strs[i] consists only of digits '0' and '1'.
1 <= m, n <= 100

## Solution

```python
### 背包问题，可以想成是双背包。
### DP solution 
class Solution:
    def findMaxForm(self, strs: List[str], m: int, n: int) -> int:
        # write your code here
        s = len(strs)
        if not s:
            return 0
        
        ### double backpack DP problem
        
        ### count the 1 and 0 in each word first
        count = {}
        for i in range(s):
            num = strs[i]
            one = 0
            zero = 0
            for j in range(len(num)):
                if num[j] == '0':
                    zero += 1
                else:
                    one += 1
            count[i] = (zero, one)
    
        ### f[s][n][m] : [number of str][number of zeros][number of ones]
        f = [[[0] * (n + 1) for _ in range(m + 1)] for _ in range(s + 1)]
        
        for i in range(1, s + 1):
            for j in range(m + 1):
                for k in range(n + 1):
                    ### does not have the current str:
                    f[i][j][k] = f[i - 1][j][k]
                    ### have the current str:
                    if j - count[i - 1][0] >= 0 and k-count[i - 1][1] >= 0:
                        f[i][j][k] =max(f[i][j][k], f[i - 1][j - count[i - 1][0]][k-count[i - 1][1]] + 1)
    
        res = 0
        for i in range(m + 1):
            for j in range(n + 1):
                res = max(res, f[s][i][j])

        return res


### If use the DP approach above, LeetCode will TLE.

### Optimized version, put the dp inside the loop:

class Solution:
    def findMaxForm(self, strs: List[str], m: int, n: int) -> int:
        # write your code here
        dp = [[0] * (m + 1) for _ in range(n + 1)]
        for s in strs:
            zero = 0
            one = 0
            for ch in s:
                if ch == "1":
                    one += 1
                else:
                    zero += 1
            for i in range(n,one - 1,-1):
                for j in range(m,zero - 1,-1):
                    if dp[i - one][j - zero] + 1 > dp[i][j]:
                        dp[i][j] = dp[i - one][j - zero] + 1
        return dp[-1][-1]

### 需要牢记这个技巧！！！ 太实用了！！！
```
