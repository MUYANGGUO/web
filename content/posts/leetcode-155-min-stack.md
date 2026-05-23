---
title: "LeetCode 155 Min Stack - Easy"
date: "2021-01-01"
excerpt: 155. Min Stack
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 155
comments: true
---

### 155. Min Stack — Easy

[Open on LeetCode](https://leetcode.com/problems/min-stack/)

## Problem

155. Min Stack

Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

push(x) -- Push element x onto stack.
pop() -- Removes the element on top of the stack.
top() -- Get the top element.
getMin() -- Retrieve the minimum element in the stack.
 

Example 1:

Input
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]

Output
[null,null,null,null,-3,null,0,-2]

Explanation
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // return -3
minStack.pop();
minStack.top();    // return 0
minStack.getMin(); // return -2

## Solution

```python
### 双Stack构造MinStack(非常巧妙的技巧):


class MinStack:
    
    def __init__(self):
        """
        initialize your data structure here.
        """
        self.stack = []
        self.min_stack = []

    def push(self, x):
        self.stack.append(x)
        if not self.min_stack or self.min_stack[-1] >= x:
            self.min_stack.append(x)

    def pop(self):
        number = self.stack.pop()
        if number == self.min_stack[-1]:
            self.min_stack.pop()
        return number
        

    def top(self):
        return self.stack[-1]

    def getMin(self):
        return self.min_stack[-1]
    

# Your MinStack object will be instantiated and called as such:
# obj = MinStack()
# obj.push(x)
# obj.pop()
# param_3 = obj.top()
# param_4 = obj.getMin()
```
