---
title: "LeetCode 225 Implement Stack Using Queues - Easy"
date: "2021-01-01"
excerpt: 225. Implement Stack using Queues
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 225
comments: true
---

### 225. Implement Stack Using Queues — Easy

[Open on LeetCode](https://leetcode.com/problems/implement-stack-using-queues/)

## Problem

225. Implement Stack using Queues

Implement the following operations of a stack using queues.

push(x) -- Push element x onto stack.
pop() -- Removes the element on top of the stack.
top() -- Get the top element.
empty() -- Return whether the stack is empty.
Example:

MyStack stack = new MyStack();

stack.push(1);
stack.push(2);  
stack.top();   // returns 2
stack.pop();   // returns 2
stack.empty(); // returns false

## Solution

```python
class MyStack:
    
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
        

    def empty(self):
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
