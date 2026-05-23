---
title: "LeetCode 24 Swap Nodes In Pairs - Medium"
date: "2021-01-01"
excerpt: 24. Swap Nodes in Pairss
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 24
comments: true
---

### 24. Swap Nodes In Pairs — Medium

[Open on LeetCode](https://leetcode.com/problems/swap-nodes-in-pairs/)

## Problem

24. Swap Nodes in Pairss

Given a linked list, swap every two adjacent nodes and return its head.

You may not modify the values in the list's nodes, only nodes itself may be changed.

 

Example:

Given 1->2->3->4, you should return the list as 2->1->4->3.

## Solution

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def swapPairs(self, head: ListNode) -> ListNode:
        dummy = ListNode(None, head)
        prev = dummy
        while head and head.next:
            first = head
            second = head.next
            
            #swap
            prev.next = second
            first.next = second.next
            second.next = first
            
            prev = first
            head = first.next
        
        return dummy.next
```
