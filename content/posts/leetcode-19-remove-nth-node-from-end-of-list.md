---
title: "LeetCode 19 Remove Nth Node From End Of List - Medium"
date: "2021-01-01"
excerpt: 19. Remove Nth Node From End of List
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 19
comments: true
---

### 19. Remove Nth Node From End Of List — Medium

[Open on LeetCode](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)

## Problem

19. Remove Nth Node From End of List

Given a linked list, remove the n-th node from the end of list and return its head.

Example:

Given linked list: 1->2->3->4->5, and n = 2.

After removing the second node from the end, the linked list becomes 1->2->3->5.
Note:

Given n will always be valid.

Follow up:

Could you do this in one pass?

## Solution

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def removeNthFromEnd(self, head: ListNode, n: int) -> ListNode:
        dummy = ListNode(None, head)
        slow, fast = dummy, dummy
        distance = 0
        while fast and distance < n + 1:
            fast = fast.next
            distance += 1
        while fast:
            fast = fast.next
            slow = slow.next
        slow.next = slow.next.next
        return dummy.next
```
