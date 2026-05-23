---
title: "LeetCode 83 Remove Duplicates From Sorted List - Easy"
date: "2021-01-01"
excerpt: 83. Remove Duplicates from Sorted List
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 83
comments: true
---

### 83. Remove Duplicates From Sorted List — Easy

[Open on LeetCode](https://leetcode.com/problems/remove-duplicates-from-sorted-list/)

## Problem

83. Remove Duplicates from Sorted List

Given a sorted linked list, delete all duplicates such that each element appear only once.

Example 1:

Input: 1->1->2
Output: 1->2
Example 2:

Input: 1->1->2->3->3
Output: 1->2->3

## Solution

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def deleteDuplicates(self, head: ListNode) -> ListNode:
        dummy = ListNode(None, head)
        prev, curr = dummy, head
        while curr:
            if curr.val == prev.val:
                prev.next = curr.next
            else:
                prev = curr
            curr = curr.next
        return dummy.next
```
