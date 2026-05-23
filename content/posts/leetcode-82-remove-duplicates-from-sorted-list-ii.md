---
title: "LeetCode 82 Remove Duplicates From Sorted List II - Medium"
date: "2021-01-01"
excerpt: 82. Remove Duplicates from Sorted List II
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 82
comments: true
---

### 82. Remove Duplicates From Sorted List II — Medium

[Open on LeetCode](https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/)

## Problem

82. Remove Duplicates from Sorted List II

Given a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list.

Return the linked list sorted as well.

Example 1:

Input: 1->2->3->3->4->4->5
Output: 1->2->5
Example 2:

Input: 1->1->1->2->3
Output: 2->3

## Solution

```python
### 三指针的Linked List版本，利用dummy node 的帮助构造，prev， curr，next三种指针：

# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution(object):
    def deleteDuplicates(self, head):
        """
        :type head: ListNode
        :rtype: ListNode
        """
        dummy = ListNode(None, head)
        prev = dummy
        curr = head
        if head is None or head.next is None:
            return dummy.next
        next = head.next
        # prev , curr , next
        while next:
            if curr.val == next.val:
                # remember to check edge, ensure next.next exist
                while next and curr.val == next.val:
                    next = next.next
                prev.next = next
                curr = prev
                next = curr.next
            
            else:
                prev = prev.next
                
            # check edge, ensure curr.next,and next.next exist
            if prev.next:
                curr = curr.next
                next = next.next
        return dummy.next
```
