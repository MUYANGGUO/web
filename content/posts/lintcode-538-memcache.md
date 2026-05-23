---
title: "LintCode 538 Memcache - Medium"
date: "2021-01-01"
excerpt: 538. Memcache
kind: leetcode
tags:
  - LintCode
  - Medium
  - Python
order: 538
comments: true
---

### 538. Memcache — Medium

[Open on LintCode](https://www.lintcode.com/problem/538/)

## Problem

538. Memcache

Implement a memcache which support the following features:

get(curtTime, key). Get the key's value, return 2147483647 if key does not exist.
set(curtTime, key, value, ttl). Set the key-value pair in memcache with a time to live (ttl). The key will be valid from curtTime to curtTime + ttl - 1 and it will be expired after ttl seconds. if ttl is 0, the key lives forever until out of memory.
delete(curtTime, key). Delete the key.
incr(curtTime, key, delta). Increase the key's value by delta return the new value. Return 2147483647 if key does not exist.
decr(curtTime, key, delta). Decrease the key's value by delta return the new value. Return 2147483647 if key does not exist.
It's guaranteed that the input is given with increasingcurtTime.

Example
Example1

get(1, 0)
>> 2147483647
set(2, 1, 1, 2)
get(3, 1)
>> 1
get(4, 1)
>> 2147483647
incr(5, 1, 1)
>> 2147483647
set(6, 1, 3, 0)
incr(7, 1, 1)
>> 4
decr(8, 1, 1)
>> 3
get(9, 1)
>> 3
delete(10, 1)
get(11, 1)
>> 2147483647
incr(12, 1, 1)
>> 2147483647
Clarification
Actually, a real memcache server will evict keys if memory is not sufficient, and it also supports variety of value types like string and integer. In our case, let's make it simple, we can assume that we have enough memory and all of the values are integers.

Search "LRU" & "LFU" on google to get more information about how memcache evict data.

Try the following problem to learn LRU cache:
http://www.lintcode.com/problem/lru-cache

## Solution

```python
class Memcache:
    def __init__(self):
        # do intialization if necessary
        self.cache = {}

    def isExpired(self, curtTime, key):
        expire = self.cache[key][1] +self.cache[key][2] - 1
        if expire < curtTime and self.cache[key][2] != 0:
            return True
        return False

    """
    @param: curtTime: An integer
    @param: key: An integer
    @return: An integer
    """
    def get(self, curtTime, key):
        # write your code here
        if key not in self.cache:
            return 2147483647
        else:
            if self.isExpired(curtTime, key):
                return 2147483647
            else:
                return self.cache[key][0]
            

    """
    @param: curtTime: An integer
    @param: key: An integer
    @param: value: An integer
    @param: ttl: An integer
    @return: nothing
    """
    def set(self, curtTime, key, value, ttl):
        # write your code here
        self.cache[key] = [value, curtTime, ttl]

        
        

    """
    @param: curtTime: An integer
    @param: key: An integer
    @return: nothing
    """
    def delete(self, curtTime, key):
        # write your code here
        if key in self.cache:
            del self.cache[key]
        return
    """
    @param: curtTime: An integer
    @param: key: An integer
    @param: delta: An integer
    @return: An integer
    """
    def incr(self, curtTime, key, delta):
        # write your code here
        if key not in self.cache:
            return 2147483647
        else:
            if self.isExpired(curtTime, key):
                return 2147483647
            else:
                self.cache[key][0] += delta
                return self.cache[key][0]
        
    """
    @param: curtTime: An integer
    @param: key: An integer
    @param: delta: An integer
    @return: An integer
    """
    def decr(self, curtTime, key, delta):
        # write your code here
        if key not in self.cache:
            return 2147483647
        else:
            if self.isExpired(curtTime, key):
                return 2147483647
            else:
                self.cache[key][0] -= delta
                return self.cache[key][0]
```
