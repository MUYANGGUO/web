---
title: "LeetCode 1054 Distant Barcodes - Medium"
date: "2021-01-01"
excerpt: "1054. Distant Barcodes -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 1054
comments: true
---

### 1054. Distant Barcodes — Medium

[Open on LeetCode](https://leetcode.com/problems/distant-barcodes/)

## Problem

1054. Distant Barcodes -- Medium

In a warehouse, there is a row of barcodes, where the i-th barcode is barcodes[i].

Rearrange the barcodes so that no two adjacent barcodes are equal.  You may return any answer, and it is guaranteed an answer exists.


Example 1:
Input: [1,1,1,2,2,2]
Output: [2,1,2,1,2,1]

Example 2:
Input: [1,1,1,1,2,2,3,3]
Output: [1,3,1,3,2,1,2,1]
 

Note:
1 <= barcodes.length <= 10000
1 <= barcodes[i] <= 10000

## Solution

```python
class Solution:
    def rearrangeBarcodes(self, barcodes: List[int]) -> List[int]:
        c = collections.Counter(barcodes)
        heap=[]
        for cha,time in c.items():
            heapq.heappush(heap,(-time,cha))  
        res=[]
        while heap:
            n=len(heap)
            if n>=2:
                t1,c1=heapq.heappop(heap)
                res.append(c1)
                t2,c2=heapq.heappop(heap)
                res.append(c2)
                if t1+1<0:
                    heapq.heappush(heap,(t1+1,c1))
                if t2+1<0:
                    heapq.heappush(heap,(t2+1,c2))
            else:
                t,c=heapq.heappop(heap)
                res.append(c)
        return res
```
