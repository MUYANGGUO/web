---
title: "LintCode 40 Implement Queue By Two Stacks - Medium"
date: "2021-01-01"
excerpt: 40. Implement Queue by Two Stacks
kind: leetcode
tags:
  - LintCode
  - Medium
  - Python
order: 40
comments: true
---

### 40. Implement Queue By Two Stacks — Medium

[Open on LintCode](https://www.lintcode.com/problem/40/)

## Problem

40. Implement Queue by Two Stacks

As the title described, you should only use two stacks to implement a queue's actions.

The queue should support push(element), pop() and top() where pop is pop the first(a.k.a front) element in the queue.

Both pop and top methods should return the value of first element.

Example
Example 1:

Input:
    push(1)
    pop()    
    push(2)
    push(3)
    top()    
    pop()     
Output:
    1
    2
    2
Example 2:

Input:
    push(1)
    push(2)
    push(2)
    push(3)
    push(4)
    push(5)
    push(6)
    push(7)
    push(1)
Output:
[]
Challenge
implement it by two stacks, do not use any other data structure and push, pop and top should be O(1) by AVERAGE.

Notice
Suppose the queue is not empty when the pop() function is called.

## Solution

```python
class MyQueue:
    
    def __init__(self):
        self.stack1 = []
        self.stack2 = []
    """
    @param: element: An integer
    @return: nothing
    """
    def push(self, element):
        self.stack1.append(element)
    """
    @return: An integer
    """
    def pop(self):
        if len(self.stack2) == 0:
            self.move()
        return self.stack2.pop()
    """
    @return: An integer
    """
    def top(self):
        if len(self.stack2) == 0:
            self.move()
        return self.stack2[-1]
    
    # 从1号栈转移到2号栈
    def move(self):
        while len(self.stack1) > 0:
            self.stack2.append(self.stack1.pop())
```
