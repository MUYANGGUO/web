---
title: "LeetCode 206 Reverse Linked List - Easy"
date: "2021-01-01"
excerpt: Reverse a singly linked list.
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 206
comments: true
---

### 206. Reverse Linked List — Easy

[Open on LeetCode](https://leetcode.com/problems/reverse-linked-list/)

## Problem

Reverse a singly linked list.

Example:

Input: 1->2->3->4->5->NULL
Output: 5->4->3->2->1->NULL
Follow up:

A linked list can be reversed either iteratively or recursively. Could you implement both?

## Solution

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reverseList(self, head: ListNode) -> ListNode:
### Solution 1 Iteratively
#         pre = None        
#         while head is not None:
#             nextNode = head.next
#             head.next = pre
#             pre = head
#             head = nextNode
#         return pre

### Solution 2 Recursively
        if head == None or head.next == None:
            return head
        rest = self.reverseList(head.next)
        head.next.next= head
        head.next = None
        return rest
```
