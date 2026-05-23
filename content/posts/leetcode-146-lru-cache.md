---
title: "LeetCode 146 LRU Cache - Medium"
date: "2021-01-01"
excerpt: 146. LRU Cache
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 146
comments: true
---

### 146. LRU Cache — Medium

[Open on LeetCode](https://leetcode.com/problems/lru-cache/)

## Problem

146. LRU Cache

Design and implement a data structure for Least Recently Used (LRU) cache. It should support the following operations: get and put.

get(key) - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.
put(key, value) - Set or insert the value if the key is not already present. When the cache reached its capacity, it should invalidate the least recently used item before inserting a new item.

The cache is initialized with a positive capacity.

Follow up:
Could you do both operations in O(1) time complexity?

Example:

LRUCache cache = new LRUCache( 2 /* capacity */ );

cache.put(1, 1);
cache.put(2, 2);
cache.get(1);       // returns 1
cache.put(3, 3);    // evicts key 2
cache.get(2);       // returns -1 (not found)
cache.put(4, 4);    // evicts key 1
cache.get(1);       // returns -1 (not found)
cache.get(3);       // returns 3
cache.get(4);       // returns 4

## Solution

```python
### Linked List + HashMap:

class LinkedNode:
    
    def __init__(self, key = None, value = None, next = None):
        self.key = key
        self.value = value
        self.next = next
        


class LRUCache:

    def __init__(self, capacity: int):
        self.key_to_prev = {}
        
        self.dummy = LinkedNode()
        self.tail = self.dummy
        self.capacity = capacity
        
    def push_back(self, node):
        self.key_to_prev[node.key] = self.tail
        self.tail.next = node
        self.tail = node
    
    def pop_front(self):
        
        head = self.dummy.next
        del self.key_to_prev[head.key]
        self.dummy.next = head.next
        self.key_to_prev[head.next.key] = self.dummy
        
    def kick(self, prev):
        node = prev.next
        if node == self.tail:
            return
        
        prev.next = node.next
        self.key_to_prev[node.next.key] = prev
        node.next = None
        
        self.push_back(node)
        

    def get(self, key: int) -> int:
        if key not in self.key_to_prev:
            return -1
        
        prev = self.key_to_prev[key]
        current = prev.next
        self.kick(prev)
        return current.value
    
        
        

    def put(self, key: int, value: int) -> None:
        if key in self.key_to_prev:
            self.kick(self.key_to_prev[key])
            self.key_to_prev[key].next.value = value
            return 
        
        self.push_back(LinkedNode(key, value))
        if len(self.key_to_prev)>self.capacity:
            self.pop_front()


# Your LRUCache object will be instantiated and called as such:
# obj = LRUCache(capacity)
# param_1 = obj.get(key)
# obj.put(key,value)


### 简单版：
class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = collections.OrderedDict()
    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        val = self.cache[key]
        del self.cache[key]
        self.cache[key] = val
        return val
    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.get(key)
            self.cache[key] = value
            return
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last = False)
```
