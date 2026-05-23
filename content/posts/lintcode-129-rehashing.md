---
title: "LintCode 129 Rehashing - Medium"
date: "2021-01-01"
excerpt: 129. Rehashing
kind: leetcode
tags:
  - LintCode
  - Medium
  - Python
order: 129
comments: true
---

### 129. Rehashing — Medium

[Open on LintCode](https://www.lintcode.com/problem/129/)

## Problem

129. Rehashing

The size of the hash table is not determinate at the very beginning. If the total size of keys is too large (e.g. size >= capacity / 10), we should double the size of the hash table and rehash every keys. Say you have a hash table looks like below:

size=3, capacity=4

[null, 21, 14, null]
       ↓    ↓
       9   null
       ↓
      null
The hash function is:

int hashcode(int key, int capacity) {
    return key % capacity;
}
here we have three numbers, 9, 14 and 21, where 21 and 9 share the same position as they all have the same hashcode 1 (21 % 4 = 9 % 4 = 1). We store them in the hash table by linked list.

rehashing this hash table, double the capacity, you will get:

size=3, capacity=8

index:   0    1    2    3     4    5    6   7
hash : [null, 9, null, null, null, 21, 14, null]
Given the original hash table, return the new hash table after rehashing .

Example
Example 1

Input : [null, 21->9->null, 14->null, null]
Output : [null, 9->null, null, null, null, 21->null, 14->null, null]
Notice
For negative integer in hash table, the position can be calculated as follow:

## Solution

```python
### 重哈希，哈希 + 链表 + 哈希的括容。 

"""
Definition of ListNode
class ListNode(object):

    def __init__(self, val, next=None):
        self.val = val
        self.next = next
"""
class Solution:
    """
    @param hashTable: A list of The first node of linked list
    @return: A list of The first node of linked list which have twice size
    """
    def addlistnode(self, node, number):
        ### 如果当前的node还不是tail
        if node.next != None:
            ### 继续往下走 
            self.addlistnode(node.next, number)
        else:
            ### 直到是none的时候，node.next = 新node 添加进
            node.next = ListNode(number)

    def addnode(self, anshashTable, number):
        p = number % len(anshashTable)
        ### 新的hash表里的位
        if anshashTable[p] == None:
            ### 如果此位置是空，直接添
            anshashTable[p] = ListNode(number)
        else:
            ### 如果不空，说明被占了，那么需要添加到这个linklist的ta 
            self.addlistnode(anshashTable[p], number)

    def rehashing(self,hashTable):
        HASH_SIZE = 2 * len(hashTable)
        anshashTable = [None for i in range(HASH_SIZE)]
        for item in hashTable:
            p = item
            ### 如果不是空
            while p != None:
                ### 往新的hashtable里添加这个p
                self.addnode(anshashTable,p.val)
                ### update p 知道 p为空 到了linklist的尽头
                p = p.next
        return anshashTable
```
