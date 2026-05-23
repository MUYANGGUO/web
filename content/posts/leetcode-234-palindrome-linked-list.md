---
title: "LeetCode 234 Palindrome Linked List - Easy"
date: "2021-01-01"
excerpt: 234. Palindrome Linked List
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 234
comments: true
---

### 234. Palindrome Linked List — Easy

[Open on LeetCode](https://leetcode.com/problems/palindrome-linked-list/)

## Problem

234. Palindrome Linked List

Given a singly linked list, determine if it is a palindrome.

Example 1:

Input: 1->2
Output: false
Example 2:

Input: 1->2->2->1
Output: true

Follow up:
Could you do it in O(n) time and O(1) space?

## Solution

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def isPalindrome(self, head: ListNode) -> bool:
        if not head:
            return True
        middle = self.findMiddle(head)
        second_half_reversed = self.reverseList(middle.next)
        if self.checkPalindrome(head, second_half_reversed):
            return True
        return False
    
    def findMiddle(self, head):
        slow, fast = head, head
        while fast.next is not None and fast.next.next is not None:
            fast = fast.next.next
            slow = slow.next
        return slow
    
    def reverseList(self, head):
        prev = None
        while head is not None:
            nextNode = head.next
            head.next = prev
            prev = head
            head = nextNode
        return prev
    
    def checkPalindrome(self, head1, head2):
        while head1 is not None and head2 is not None:
            if head1.val == head2.val:
                head1 = head1.next
                head2 = head2.next
                continue
            return False
        return True
```
