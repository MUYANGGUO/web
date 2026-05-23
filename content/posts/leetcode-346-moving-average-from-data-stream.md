---
title: "LeetCode 346 Moving Average From Data Stream - Easy"
date: "2021-01-01"
excerpt: 346. Moving Average from Data Stream
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 346
comments: true
---

### 346. Moving Average From Data Stream — Easy

[Open on LeetCode](https://leetcode.com/problems/moving-average-from-data-stream/)

## Problem

346. Moving Average from Data Stream

Given a stream of integers and a window size, calculate the moving average of all integers in the sliding window.

Example:

MovingAverage m = new MovingAverage(3);
m.next(1) = 1
m.next(10) = (1 + 10) / 2
m.next(3) = (1 + 10 + 3) / 3
m.next(5) = (10 + 3 + 5) / 3

## Solution

```python
### queue :

class MovingAverage:
    
    def __init__(self, size):
        """
        Initialize your data structure here.
        """
        self.sum = 0
        self.max_size = size
        self.queue = collections.deque()
        

    def next(self, val):
        self.sum += val
        self.queue.append(val)
        
        if len(self.queue) > self.max_size:
            self.sum = self.sum - self.queue.popleft()
        
        return self.sum / len(self.queue)

# Your MovingAverage object will be instantiated and called as such:
# obj = MovingAverage(size)
# param_1 = obj.next(val)
```
