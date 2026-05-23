---
title: "LintCode 960 First Unique Number In Data Stream II - Medium"
date: "2021-01-01"
excerpt: 960. First Unique Number in Data Stream II
kind: leetcode
tags:
  - LintCode
  - Medium
  - Python
order: 960
comments: true
---

### 960. First Unique Number In Data Stream II — Medium

[Open on LintCode](https://www.lintcode.com/problem/960/)

## Problem

960. First Unique Number in Data Stream II

We need to implement a data structure named DataStream. There are two methods required to be implemented:

void add(number) // add a new number
int firstUnique() // return first unique number
Example
Example 1:

Input:
add(1)
add(2)
firstUnique()
add(1)
firstUnique()
Output:
[1,2]
Example 2:

Input:
add(1)
add(2)
add(3)
add(4)
add(5)
firstUnique()
add(1)
firstUnique()
add(2)
firstUnique()
add(3)
firstUnique()
add(4)
firstUnique()
add(5)
add(6)
firstUnique()
Output:
[1,2,3,4,5,6]

## Solution

```python
class DataStream:

    def __init__(self):
        self.dummy = ListNode(0)
        self.tail = self.dummy
        self.num_to_prev = {}
        self.duplicates = set()
          
    """
    @param num: next number in stream
    @return: nothing
    """
    def add(self, num):
        if num in self.duplicates:
            return
        
        if num not in self.num_to_prev:
            self.push_back(num)            
            return
        
        # find duplicate, remove it from hash & linked list
        self.duplicates.add(num)
        self.remove(num)
    
    def remove(self, num):
        prev = self.num_to_prev.get(num)
        del self.num_to_prev[num]
        prev.next = prev.next.next
        if prev.next:
            self.num_to_prev[prev.next.val] = prev
        else:
            # if we removed the tail node, prev will be the new tail
            self.tail = prev

    def push_back(self, num):
        # new num add to the tail
        self.tail.next = ListNode(num)
        self.num_to_prev[num] = self.tail
        self.tail = self.tail.next

    """
    @return: the first unique number in stream
    """
    def firstUnique(self):
        if not self.dummy.next:
            return None
        return self.dummy.next.val
```
