---
title: "LintCode 843 Digits Flip - Medium"
date: "2021-01-01"
excerpt: ""
kind: leetcode
tags:
  - LintCode
  - Medium
  - Python
order: 843
comments: true
---

### 843. Digits Flip — Medium

[Open on LintCode](https://www.lintcode.com/problem/843/)

## Solution

```python
class Solution:
    """
    @param nums: the array
    @return: the minimum times to flip digit
    """
    def flipDigit(self, nums):
        # Write your code here
        
        ### DP problem 
        ### last number at index i, determined by number at i and the previous number at i-1
        ### status matrix should record the previous two type of flipped status
        ### transfer function:
        ### f[i][0], f[i][1] here 0, 1 refers to the last digit flipped to be either 1 or 0.
        
        ### f[i][0] = f[i-1][0] + 1, if cur num = 1, else just f[i-1][0]
        ### f[i][1] = f[i-1][1]
        
        ### finally compare both and get the minimum at f[n]
        
        ### initialization
        n = len(nums)
        MAX = float('Inf')
        f = [[MAX] * (2) for _ in range(n + 1)]
        
        f[0][0] = f[0][1] = 0
        for i in range(1, n + 1):
            for j in range(2):
                
                if nums[i - 1] != j:
                    addon = 1
                else:
                    addon = 0
                    
                for k in range(2):
                    if k == 0 and j == 1:
                        continue
                    
                    f[i][j] = min(f[i][j], f[i-1][k] + addon)
                    
                    

        return min(f[n][1], f[n][0])
```
