---
title: "LeetCode 203 Remove Linked List Elements - Easy"
date: "2021-01-01"
excerpt: 203. Remove Linked List Elements
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 203
comments: true
---

### 203. Remove Linked List Elements — Easy

[Open on LeetCode](https://leetcode.com/problems/remove-linked-list-elements/)

## Problem

203. Remove Linked List Elements

Remove all elements from a linked list of integers that have value val.

Example:

Input:  1->2->6->3->4->5->6, val = 6
Output: 1->2->3->4->5

## Solution

```python
### Linked List 版 快慢双指针

# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def removeElements(self, head: ListNode, val: int) -> ListNode:
        dummy = ListNode(0, head)
        prev, curr = dummy, head
        while curr:
            if curr.val == val: 
                #delete
                prev.next = curr.next
            else:
                prev = curr
            curr = curr.next
        return dummy.next
```
