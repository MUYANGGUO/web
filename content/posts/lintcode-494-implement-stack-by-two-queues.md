---
title: "LintCode 494 Implement Stack By Two Queues - Easy"
date: "2021-01-01"
excerpt: 494. Implement Stack by Two Queues
kind: leetcode
tags:
  - LintCode
  - Easy
  - Python
order: 494
comments: true
---

### 494. Implement Stack By Two Queues — Easy

[Open on LintCode](https://www.lintcode.com/problem/494/)

## Problem

494. Implement Stack by Two Queues

Implement a stack by two queues. The queue is first in first out (FIFO). That means you can not directly pop the last element in a queue.

Example
Example 1:

Input:
push(1)
pop()
push(2)
isEmpty() // return false
top() // return 2
pop()
isEmpty() // return true
Example 2:

Input:
isEmpty()

## Solution

```python
class Stack:
    
    def __init__(self):
        """
        Initialize your data structure here.
        """
        self.queue_normal = collections.deque()
        self.queue_reverse = collections.deque()

    def push(self, x):
        """
        Push element x onto stack.
        """
        self.queue_normal.append(x)        

    def pop(self):
        """
        Removes the element on top of the stack and returns that element.
        """
        # 如果queue_normal为空，代表栈顶在queue_reverse，交换
        if not self.queue_normal:
            self.queue_normal, self.queue_reverse = self.queue_reverse, self.queue_normal
        # 将queue_normal前n-1个放入queue_reverse，弹出最后的元素
        while len(self.queue_normal) > 1:
            self.queue_reverse.append(self.queue_normal.popleft())
        return self.queue_normal.popleft()
        

    def top(self):
        """
        Get the top element.
        """
        # 如果queue_normal为空，代表栈顶在queue_reverse，交换
        if not self.queue_normal:
            self.queue_normal, self.queue_reverse = self.queue_reverse, self.queue_normal
        # 将queue1前n-1个放入queue2，获得最后的元素
        while len(self.queue_normal) > 1:
            self.queue_reverse.append(self.queue_normal.popleft())
        return self.queue_normal[0]
        

    def isEmpty(self):
        """
        Returns whether the stack is empty.
        """
        return not self.queue_normal and not self.queue_reverse

# Your MyStack object will be instantiated and called as such:
# obj = MyStack()
# obj.push(x)
# param_2 = obj.pop()
# param_3 = obj.top()
# param_4 = obj.empty()
```
