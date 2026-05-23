---
title: "LeetCode 86 Partition List - Medium"
date: "2021-01-01"
excerpt: 86. Partition List
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 86
comments: true
---

### 86. Partition List — Medium

[Open on LeetCode](https://leetcode.com/problems/partition-list/)

## Problem

86. Partition List

Given a linked list and a value x, partition it such that all nodes less than x come before nodes greater than or equal to x.

You should preserve the original relative order of the nodes in each of the two partitions.

Example:

Input: head = 1->4->3->2->5->2, x = 3
Output: 1->2->2->4->3->5

## Solution

```python
# Solution 分开构造再组合：

# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def partition(self, head: ListNode, x: int) -> ListNode:
        # 分成两个linkedlist分别存储小于x，和大于等于x的node
        before = ListNode(None, None)
        after = ListNode(None, None)
        before_dummy = before
        after_dummy = after
        while head:
            if head.val < x:
                # assign小的到before
                before.next = head
                before = before.next
            else:
                # assign大或等于的到after
                after.next = head
                after = after.next
            head = head.next
        # 最后利用之前存下的dummy node把before 和 after这两条LinkedList连起来
        after.next = None
        before.next = after_dummy.next
        return before_dummy.next
```
