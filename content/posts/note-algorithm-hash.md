---
title: "Algorithm Notes: Hash"
date: "2021-01-01"
excerpt: ""
kind: post
tags:
  - Algorithm Notes
  - Study Notes
comments: true
---

## Hash

HashSet实现了Set接口，其内部不允许出现重复的值，如果我们将一个对象存入HashSet, 必须重写equals() 和 HashCode() 方法，这样才能确保集合中不存在同一个元素。 HashSet 的内部是无序的，因此不能index。

HashMap实现了Map接口，其内容是键值的映射（key- value), 不允许出现相同的key，在查询的时候会根据给出的key来查询对应的值。

对于hash表的增查操作的时间复杂度都是常数级别的。

例题：[128 Hash Function](https://www.lintcode.com/problem/hash-function/description)

Hash Function 应该返回固定且无规律（无规律是为了减少冲突）的整数。

一个小技巧：用数字33为底，将字符串看成是33进制的一个数。（apache库用的就是33）

```python

class Solution:
    """
    @param key: A string you should hash
    @param HASH_SIZE: An integer
    @return: An integer
    """
    def hashCode(self, key, HASH_SIZE):
        # write your code here

        ### 这里用了同余定理，边加边模。另外乘法模式不会超时，想象成33进制。如果用普通的加法会超时间。
        ans = 0
        for x in key:
            ans = (ans * 33 + ord(x)) % HASH_SIZE
        return ans

```

例题：[129 Rehashing](https://www.lintcode.com/problem/rehashing/description)

```python

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
