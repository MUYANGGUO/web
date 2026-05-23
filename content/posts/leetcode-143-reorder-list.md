---
title: "LeetCode 143 Reorder List - Medium"
date: "2021-01-01"
excerpt: "143. Reorder List -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 143
comments: true
---

### 143. Reorder List — Medium

[Open on LeetCode](https://leetcode.com/problems/reorder-list/)

## Problem

143. Reorder List -- Medium

Given a singly linked list L: L0→L1→…→Ln-1→Ln,
reorder it to: L0→Ln→L1→Ln-1→L2→Ln-2→…

You may not modify the values in the list's nodes, only nodes itself may be changed.

Example 1:

Given 1->2->3->4, reorder it to 1->4->2->3.
Example 2:

Given 1->2->3->4->5, reorder it to 1->5->2->4->3.

## Solution

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reorderList(self, head: ListNode) -> None:
        # 先找到中点，然后把后半段倒过来，然后前后交替合并。
        if None == head or None == head.next:
            return head
        pfast = head
        pslow = head
        while pfast.next and pfast.next.next:
            pfast = pfast.next.next
            pslow = pslow.next
        pfast = pslow.next
        pslow.next = None
        
        pnext = pfast.next
        pfast.next = None
        while pnext: # reverse 后半段
            q = pnext.next
            pnext.next = pfast
            pfast = pnext
            pnext = q
        tail = head
        while pfast:# 和原head拼接
            pnext = pfast.next
            pfast.next = tail.next
            tail.next = pfast
            tail = tail.next.next
            pfast = pnext
        return head
```
