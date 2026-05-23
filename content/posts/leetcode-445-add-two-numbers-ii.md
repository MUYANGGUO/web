---
title: "LeetCode 445 Add Two Numbers II - Medium"
date: "2021-01-01"
excerpt: "445. Add Two Numbers II -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 445
comments: true
---

### 445. Add Two Numbers II — Medium

[Open on LeetCode](https://leetcode.com/problems/add-two-numbers-ii/)

## Problem

445. Add Two Numbers II -- Medium

You are given two non-empty linked lists representing two non-negative integers. The most significant digit comes first and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Follow up:
What if you cannot modify the input lists? In other words, reversing the lists is not allowed.

Example:
Input: (7 -> 2 -> 4 -> 3) + (5 -> 6 -> 4)
Output: 7 -> 8 -> 0 -> 7

## Solution

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:
        stack_l1 = []
        stack_l2 = []
        while l1:
            stack_l1.append(l1.val)
            l1 = l1.next
        while l2:
            stack_l2.append(l2.val)
            l2 = l2.next
        addOn = 0
        dummy = ListNode(0)
        res = dummy
        while stack_l1 or stack_l2 or addOn:
            if stack_l1:
                addOn += stack_l1.pop()
            if stack_l2:
                addOn += stack_l2.pop()
            if addOn >= 10:
                val = addOn - 10
                addOn = 1
            else:
                val = addOn
                addOn = 0
            
            dummy.next = ListNode(val)
            dummy = dummy.next
        
        return self.reverse(res.next)
    
    def reverse(self, head):
        pre = None
        while head:
            nextNode = head.next
            head.next = pre
            pre = head
            head = nextNode
        return pre

class Solution:
    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:
        s1, s2 = [], []
        while l1:
            s1.append(l1.val)
            l1 = l1.next
        
        while l2:
            s2.append(l2.val)
            l2 = l2.next
            
        carry = 0
        head = ListNode(0)
        while s1 or s2 or carry:
            if s1:
                carry += s1.pop()
            if s2:
                carry += s2.pop()
            carry, val = divmod(carry, 10)
            head.next, head.next.next = ListNode(val), head.next
        return head.next
```
