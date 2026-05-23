---
title: "LeetCode 716 Max Stack - Easy"
date: "2021-01-01"
excerpt: 716. Max Stack
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 716
comments: true
---

### 716. Max Stack — Easy

[Open on LeetCode](https://leetcode.com/problems/max-stack/)

## Problem

716. Max Stack

Design a max stack that supports push, pop, top, peekMax and popMax.

push(x) -- Push element x onto stack.
pop() -- Remove the element on top of the stack and return it.
top() -- Get the element on the top.
peekMax() -- Retrieve the maximum element in the stack.
popMax() -- Retrieve the maximum element in the stack, and remove it. If you find more than one maximum elements, only remove the top-most one.
Example 1:
MaxStack stack = new MaxStack();
stack.push(5); 
stack.push(1);
stack.push(5);
stack.top(); -> 5
stack.popMax(); -> 5
stack.top(); -> 1
stack.peekMax(); -> 5
stack.pop(); -> 1
stack.top(); -> 5

## Solution

```python
### 暴力popMax的解法：（利用buffer）


class MaxStack:
    
    def __init__(self):
        # do intialization if necessary
        self.stack = []
        self.max_stack = []

    """
    @param: number: An integer
    @return: nothing
    """
    def push(self, x):
        # write your code here
        self.stack.append(x)
        if not self.max_stack:
            self.max_stack.append(x)
        
        number = max(self.max_stack[-1], x)
        self.max_stack.append(number)

    """
    @return: An integer
    """
    def pop(self):
        # write your code here
        self.max_stack.pop()
        return self.stack.pop()

    """
    @return: An integer
    """
    def top(self):
        # write your code here
        return self.stack[-1]
    """
    @return: An integer
    """
    def peekMax(self):
        # write your code here
        return self.max_stack[-1]
    """
    @return: An integer
    """
    ### 这里记住要用我们之前写的类pop来操作，因为也会把max_stack里的相应的pop掉，不能只pop stack里，不管max_stac
    def popMax(self):
        # write your code here
        ### 暴力解法，使用buffer来pop，pushback找到max然后pop
        max_num = self.peekMax()
        buffer_stack = []
        ### 把max_num 到栈顶的数全pop出来放进buffer
        while self.top() != max_num:
            buffer_stack.append(self.pop())
        ### pop出Max
        self.pop()
        ### 再把之前放进buffer里的依次还原回去，这样只有max被pop了出
        while buffer_stack:
            restore_num = buffer_stack.pop()
            self.push(restore_num)
        
        return max_num


### 优化：heap + stack + hashset 进行soft delete处理。避免使用了buffer。
### 达到push O(logN) ,pop O(1), top O(1), popMax O(logN), peekMax O(logN) 的时间复杂度。

class MaxStack:
    
    def __init__(self):
        """
        initialize your data structure here.
        """
        self.heap = []
        self.stack = []
        self.popped_set = set()
        self.id = 0

    def push(self, x):
        ### 利用最大堆
        item = (-x, -self.id)
        self.stack.append(item)
        heapq.heappush(self.heap, item)
        self.id += 1
        
    ### 总的来说：这道题的思路是运用了soft delete的思路。
    ### heap和stack各自保存了一组元素，hashset标记哪些元素是被pop的，但实际上只有在进行取值操作的时候，标记的元素才会被删除。对应的pop，top会清理stack，而peekMax和popMax会清理heap。每一次操作将会标记哪些元素被移除。总的来说，heap负责最大值，stack负责栈顶元素，hash负责两类操作soft delete的标记功能。
    def _clear_popped_in_stack(self):
        while self.stack and self.stack[-1] in self.popped_set:
            self.popped_set.remove(self.stack[-1])
            self.stack.pop()
    
    def _clear_popped_in_heap(self):
        while self.heap and self.heap[0] in self.popped_set:
            self.popped_set.remove(self.heap[0])
            heapq.heappop(self.heap)
    
    
    def pop(self):
        self._clear_popped_in_stack()
        item = self.stack.pop()
        self.popped_set.add(item)
        return -item[0]
        

    def top(self):
        self._clear_popped_in_stack()
        item = self.stack[-1]
        return -item[0]

    def peekMax(self):
        self._clear_popped_in_heap()
        item = self.heap[0]
        return -item[0]

    def popMax(self):
        self._clear_popped_in_heap()
        item = heapq.heappop(self.heap)
        self.popped_set.add(item)
        return -item[0]


# Your MaxStack object will be instantiated and called as such:
# obj = MaxStack()
# obj.push(x)
# param_2 = obj.pop()
# param_3 = obj.top()
# param_4 = obj.peekMax()
# param_5 = obj.popMax()
```
