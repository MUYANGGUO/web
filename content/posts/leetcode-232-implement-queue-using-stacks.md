---
title: "LeetCode 232 Implement Queue Using Stacks - Easy"
date: "2021-01-01"
excerpt: 232. Implement Queue using Stacks
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 232
comments: true
---

### 232. Implement Queue Using Stacks — Easy

[Open on LeetCode](https://leetcode.com/problems/implement-queue-using-stacks/)

## Problem

232. Implement Queue using Stacks

Implement the following operations of a queue using stacks.

push(x) -- Push element x to the back of queue.
pop() -- Removes the element from in front of queue.
peek() -- Get the front element.
empty() -- Return whether the queue is empty.
Example:

MyQueue queue = new MyQueue();

queue.push(1);
queue.push(2);  
queue.peek();  // returns 1
queue.pop();   // returns 1
queue.empty(); // returns false
Notes:

You must use only standard operations of a stack -- which means only push to top, peek/pop from top, size, and is empty operations are valid.
Depending on your language, stack may not be supported natively. You may simulate a stack by using a list or deque (double-ended queue), as long as you use only standard operations of a stack.
You may assume that all operations are valid (for example, no pop or peek operations will be called on an empty queue).

## Solution

```python
class MyQueue:
    
    def __init__(self):
        """
        Initialize your data structure here.
        """
        self.stack_normal = []
        self.stack_reverse = []
        

    def push(self, x):
        """
        Push element x to the back of queue.
        """
        self.stack_normal.append(x)
        

    def pop(self):
        """
        Removes the element from in front of queue and returns that element.
        """
        ### here we need to pop 栈底 而不是顶， 因为在模仿queue
        ### 把normal顺序的 stack_normal 把每个元素从栈顶pop依次压入 stack_reverse, 这样就颠倒了栈的顺序，pop stack_reverse 就是栈底。
        if not self.stack_reverse:
            self.move()
        return self.stack_reverse.pop()
            
    def move(self): ### 自己加的
        while self.stack_normal:
            self.stack_reverse.append(self.stack_normal.pop())
        

    def peek(self):
        """
        Get the front element.
        """
        if not self.stack_reverse:
            return self.stack_normal[0]
        return self.stack_reverse[-1]
        

    def empty(self):
        """
        Returns whether the queue is empty.
        """
        if self.stack_normal or self.stack_reverse:
            return False
        return True


# Your MyQueue object will be instantiated and called as such:
# obj = MyQueue()
# obj.push(x)
# param_2 = obj.pop()
# param_3 = obj.peek()
# param_4 = obj.empty()
```
