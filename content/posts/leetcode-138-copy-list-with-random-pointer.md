---
title: "LeetCode 138 Copy List With Random Pointer - Medium"
date: "2021-01-01"
excerpt: "138. Copy List with Random Pointer -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 138
comments: true
---

### 138. Copy List With Random Pointer — Medium

[Open on LeetCode](https://leetcode.com/problems/copy-list-with-random-pointer/)

## Problem

138. Copy List with Random Pointer -- Medium

A linked list is given such that each node contains an additional random pointer which could point to any node in the list or null.

Return a deep copy of the list.

The Linked List is represented in the input/output as a list of n nodes. Each node is represented as a pair of [val, random_index] where:

val: an integer representing Node.val
random_index: the index of the node (range from 0 to n-1) where random pointer points to, or null if it does not point to any node.
 

Example 1:
Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]

Example 2:
Input: head = [[1,1],[2,1]]
Output: [[1,1],[2,1]]

Example 3:
Input: head = [[3,null],[3,0],[3,null]]
Output: [[3,null],[3,0],[3,null]]

Example 4:
Input: head = []
Output: []
Explanation: Given linked list is empty (null pointer), so return null.


Constraints:
-10000 <= Node.val <= 10000
Node.random is null or pointing to a node in the linked list.
Number of Nodes will not exceed 1000.

## Solution

```python
"""
# Definition for a Node.
class Node:
    def __init__(self, x: int, next: 'Node' = None, random: 'Node' = None):
        self.val = int(x)
        self.next = next
        self.random = random
"""

class Solution:
    def copyRandomList(self, head: 'Node') -> 'Node':
        if head is None: return None
        mapping = {}
        cur = head
        while cur:
            mapping[cur] = Node(cur.val,None,None)
            cur = cur.next
        ref = head
        while ref:
            if ref.next:
                mapping[ref].next = mapping[ref.next]
            if ref.random:
                mapping[ref].random = mapping[ref.random]
            ref = ref.next
        return mapping[head]
```
