---
title: "LeetCode 703 Kth Largest Element In A Stream - Easy"
date: "2021-01-01"
excerpt: 703. Kth Largest Element in a Stream
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 703
comments: true
---

### 703. Kth Largest Element In A Stream — Easy

[Open on LeetCode](https://leetcode.com/problems/kth-largest-element-in-a-stream/)

## Problem

703. Kth Largest Element in a Stream

Design a class to find the kth largest element in a stream. Note that it is the kth largest element in the sorted order, not the kth distinct element.

Your KthLargest class will have a constructor which accepts an integer k and an integer array nums, which contains initial elements from the stream. For each call to the method KthLargest.add, return the element representing the kth largest element in the stream.

Example:

int k = 3;
int[] arr = [4,5,8,2];
KthLargest kthLargest = new KthLargest(3, arr);
kthLargest.add(3);   // returns 4
kthLargest.add(5);   // returns 5
kthLargest.add(10);  // returns 5
kthLargest.add(9);   // returns 8
kthLargest.add(4);   // returns 8
Note:
You may assume that nums' length ≥ k-1 and k ≥ 1.

## Solution

```python
### 利用maintain最小堆长度限制的方法，求最大的kth数：


class KthLargest:
    
    def __init__(self, k, nums):
        self.minheap = nums
        heapq.heapify(self.minheap)
        self.k = k
        while len(self.minheap) > self.k:
            heapq.heappop(self.minheap)
        
        
        
    def add(self, val):
        heapq.heappush(self.minheap, val)
        if len(self.minheap) > self.k:
            heapq.heappop(self.minheap)

        return self.minheap[0]

# Your KthLargest object will be instantiated and called as such:
# obj = KthLargest(k, nums)
# param_1 = obj.add(val)
```
