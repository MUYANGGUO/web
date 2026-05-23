---
title: "LeetCode 170 Two Sum III-Data Structure Design - Easy"
date: "2021-01-01"
excerpt: "170. Two Sum III - Data structure design"
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 170
comments: true
---

### 170. Two Sum III-Data Structure Design — Easy

[Open on LeetCode](https://leetcode.com/problems/two-sum-iii-data-structure-design/)

## Problem

170. Two Sum III - Data structure design

Design and implement a TwoSum class. It should support the following operations: add and find.

add - Add the number to an internal data structure.
find - Find if there exists any pair of numbers which sum is equal to the value.

Example 1:

add(1); add(3); add(5);
find(4) -> true
find(7) -> false
Example 2:

add(3); add(1); add(2);
find(3) -> true
find(6) -> false

## Solution

```python
class TwoSum:
    
    def __init__(self):
        """
        Initialize your data structure here.
        """
        self.nums = []
        

    def add(self, number):
        """
        Add the number to an internal data structure..
        """
        self.nums.append(number)

    def find(self, value):
        """
        Find if there exists any pair of numbers which sum is equal to the value.
        """
        n = len(self.nums)
        if n == 0:
            return False
        
        self.nums.sort()
        
        start, end = 0, n - 1
        while start < end:
            if self.nums[start] + self.nums[end] > value:
                end -= 1
            elif self.nums[start] + self.nums[end] == value:
                return True
            else:
                start += 1
        
        return False

# Your TwoSum object will be instantiated and called as such:
# obj = TwoSum()
# obj.add(number)


class TwoSum(object):
    
    def __init__(self):
        # initialize your data structure here
        self.count = {}
        

    # Add the number to an internal data structure.
    # @param number {int}
    # @return nothing
    def add(self, number):
        # Write your code here
        if number in self.count:
            self.count[number] += 1
        else:
            self.count[number] = 1

        

    # Find if there exists any pair of numbers which sum is equal to the value.
    # @param value {int}
    # @return true if can be found or false
    def find(self, value):
        # Write your code here
        for num in self.count:
            if value - num in self.count and \
                (value - num != num or self.count[num] > 1):
                return True
        return False
```
