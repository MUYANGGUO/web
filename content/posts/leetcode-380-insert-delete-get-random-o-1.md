---
title: "LeetCode 380 Insert Delete Get Random O(1) - Medium"
date: "2021-01-01"
excerpt: 380. Insert Delete GetRandom O(1)
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 380
comments: true
---

### 380. Insert Delete Get Random O(1) — Medium

[Open on LeetCode](https://leetcode.com/problems/insert-delete-get-random-o-1/)

## Problem

380. Insert Delete GetRandom O(1)

Design a data structure that supports all following operations in average O(1) time.

insert(val): Inserts an item val to the set if not already present.
remove(val): Removes an item val from the set if present.
getRandom: Returns a random element from current set of elements (it's guaranteed that at least one element exists when this method is called). Each element must have the same probability of being returned.
 

Example:

// Init an empty set.
RandomizedSet randomSet = new RandomizedSet();

// Inserts 1 to the set. Returns true as 1 was inserted successfully.
randomSet.insert(1);

// Returns false as 2 does not exist in the set.
randomSet.remove(2);

// Inserts 2 to the set, returns true. Set now contains [1,2].
randomSet.insert(2);

// getRandom should return either 1 or 2 randomly.
randomSet.getRandom();

// Removes 1 from the set, returns true. Set now contains [2].
randomSet.remove(1);

// 2 was already in the set, so return false.
randomSet.insert(2);

// Since 2 is the only number in the set, getRandom always return 2.
randomSet.getRandom();

## Solution

```python
class RandomizedSet:
    
    def __init__(self):
        """
        Initialize your data structure here.
        """
        self.nums = []
        self.val2index = {}
        

    def insert(self, val):
        """
        Inserts a value to the set. Returns true if the set did not already contain the specified element.
        """
        if val in self.val2index:
            return False
        
        self.nums.append(val)
        self.val2index[val] = len(self.nums) - 1
        return True
        

    def remove(self, val):
        """
        Removes a value from the set. Returns true if the set contained the specified element.
        """
        if val not in self.val2index:
            return False
        
        index = self.val2index[val]
        last_num = self.nums[-1]
        self.val2index[last_num] = index
        self.nums[index] = last_num
        
        self.nums.pop()
        del self.val2index[val]
        
        return True
        
        

    def getRandom(self):
        """
        Get a random element from the set.
        """
        return self.nums[random.randint(0, len(self.nums) - 1)]


# Your RandomizedSet object will be instantiated and called as such:
# obj = RandomizedSet()
# param_1 = obj.insert(val)
# param_2 = obj.remove(val)
# param_3 = obj.getRandom()
```
