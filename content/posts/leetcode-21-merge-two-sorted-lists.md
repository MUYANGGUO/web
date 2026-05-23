---
title: "LeetCode 21 Merge Two Sorted Lists - Easy"
date: "2021-01-01"
excerpt: 21. Merge Two Sorted Lists
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 21
comments: true
---

### 21. Merge Two Sorted Lists — Easy

[Open on LeetCode](https://leetcode.com/problems/merge-two-sorted-lists/)

## Problem

21. Merge Two Sorted Lists

Merge two sorted linked lists and return it as a new sorted list. The new list should be made by splicing together the nodes of the first two lists.

Example:

Input: 1->2->4, 1->3->4
Output: 1->1->2->3->4->4

## Solution

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def mergeTwoLists(self, l1, l2):
        dummy = ListNode(0)
        temp = dummy
        
        while l1 != None and l2 != None:
            if l1.val < l2.val:
                temp.next = l1
                l1 = l1.next
            else:
                temp.next = l2
                l2 = l2.next
            temp = temp.next
        
        if l1 != None:
            temp.next = l1
        else:
            temp.next = l2
        
        return dummy.next
```
