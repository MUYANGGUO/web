---
title: "LeetCode 134 Gas Station - Medium"
date: "2021-01-01"
excerpt: ""
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 134
comments: true
---

### 134. Gas Station — Medium

[Open on LeetCode](https://leetcode.com/problems/gas-station/)

## Solution

```python
class Solution:
    def canCompleteCircuit(self, gas: List[int], cost: List[int]) -> int:
        
        # Brute Force
        # Check all station as the starting station
        
#         n = len(gas)
        
#         cur_tank = 0
        
#         for i in range(n):
#             for j in range(n):
#                 cur_tank += gas[(i+j) % n] - cost[(i+j) % n]
#                 if cur_tank >= 0:
#                     temp = 1
#                 else:
#                     temp = -1
#                     break
            
#             if temp > 0:
#                 return i
#             else:
#                 cur_tank = 0
            
#         return -1
        
    
        # O(N)
        d = []
        n = len(gas)
        for i in range(n):
            d.append(gas[i] - cost[i])
        

        net_loss = 0
        tank = 0
        start = 0
        for i, path_loss in enumerate(d):
            tank += path_loss
            if tank < 0:
                net_loss += tank
                start = (i+1) % n
                tank = 0
        
                
        if tank + net_loss >= 0:
            return start
        else:
            return -1
            

### A good explanation can be found at https://www.youtube.com/watch?v=nTKdYm_5-ZY&list=PLupD_xFct8mETlGFlLVrwbLwcxczbgWRM&index=8&t=0s
```
