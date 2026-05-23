---
title: "LintCode 502 Mini Cassandra - Medium"
date: "2021-01-01"
excerpt: 502. Mini Cassandra
kind: leetcode
tags:
  - LintCode
  - Medium
  - Python
order: 502
comments: true
---

### 502. Mini Cassandra — Medium

[Open on LintCode](https://www.lintcode.com/problem/502/)

## Problem

502. Mini Cassandra

Cassandra is a NoSQL database (a.k.a key-value storage). One individual data entry in cassandra constructed by 3 parts:

row_key. (a.k.a hash_key, partition key or sharding_key.)
column_key.
value
row_key is used to hash and can not support range query. Let's simplify this to a string.
column_key is sorted and support range query. Let's simplify this to integer.
value is a string. You can serialize any data into a string and store it in value.

Implement the following methods:

insert(row_key, column_key, value)
query(row_key, column_start, column_end) return a list of entries
Example
Example 1:

Input:
  insert("google", 1, "haha")
  query("google", 0, 1)
Output: [(1, "haha")]
Example 2:

Input:
  insert("google", 1, "haha")
  insert("lintcode", 1, "Good")
  insert("google", 2, "hehe")
  query("google", 0, 1)
  query("google", 0, 2)
  query("go", 0, 1)
  query("lintcode", 0, 10)
Output:
  [(1, "haha")]
  [(1, "haha"),(2, "hehe")]
  []
  [(1, "Good")]

## Solution

```python
"""
Definition of Column:
class Column:
    def __init__(self, key, value):
        self.key = key
        self.value = value
"""


class MiniCassandra:
    
    def __init__(self):
        # do intialization if necessary
        self.database = {}
    """
    @param: row_key: a string
    @param: column_key: An integer
    @param: value: a string
    @return: nothing
    """
    def insert(self, row_key, column_key, value):
        # write your code here
        if row_key not in self.database:
            self.database[row_key] = {}
        self.database[row_key][column_key] = value
        return

    """
    @param: row_key: a string
    @param: column_start: An integer
    @param: column_end: An integer
    @return: a list of Columns
    """
    def query(self, row_key, column_start, column_end):
        # write your code here
        if row_key not in self.database:
            return []
        res = []
        for i in range(column_start, column_end + 1):
            if i in self.database[row_key]:
                res.append(Column(i,self.database[row_key][i]))
     
        return res
```
