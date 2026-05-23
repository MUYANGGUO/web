---
title: "LeetCode 92 Reverse Linked List II - Medium"
date: "2021-01-01"
excerpt: 92. Reverse Linked List II
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 92
comments: true
---

### 92. Reverse Linked List II — Medium

[Open on LeetCode](https://leetcode.com/problems/reverse-linked-list-ii/)

## Problem

92. Reverse Linked List II

Reverse a linked list from position m to n. Do it in one-pass.

Note: 1 ≤ m ≤ n ≤ length of list.

Example:

Input: 1->2->3->4->5->NULL, m = 2, n = 4
Output: 1->4->3->2->5->NULL

## Solution

```python
### Two Pass Solution:

# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reverseBetween(self, head: ListNode, m: int, n: int) -> ListNode:
        
        # method: find mth, nth, and mth_prev, nth_next, cut & saw method
        # cut into 
        # dummy ->...-> mth_prev
        # mth_prev -> ... -> nth [Where reverse will happen]
        # nth_next -> ... -> None
        # perform reverse,
        # then saw together
        
        dummy = ListNode(-1, head)
        # starting from dummy to avoid only 1 node list
        mth_prev, mth, nth, nth_next = self.find_key_nodes(dummy, m + 1, n + 1)
        # cut
        mth_prev.next = None
        nth.next = None
        # reverse between
        self.reverse(mth)
        # saw together
        mth_prev.next = nth
        mth.next = nth_next
        return dummy.next
    
    def find_key_nodes(self, head, m, n):
        count = 0
        while head is not None:
            count += 1
            if count == m - 1:
                mthPrev = head
            if count == n:
                nth = head
                # bacause m <= n: so here we could return
                return mthPrev, mthPrev.next, nth, nth.next
            head = head.next
        return None
    
    def reverse(self, head):
        prev = None
        while head is not None:
            nextNode = head.next
            head.next = prev
            prev = head
            head = nextNode
        return prev




### One Pass Solution:

# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reverseBetween(self, head: ListNode, m: int, n: int) -> ListNode:
        if m == n:
            return head

        dummy = ListNode(0, head)
        pre = dummy

        for i in range(m - 1):
            pre = pre.next
        
        # reverse the [m, n] nodes
        reverse = None
        cur = pre.next # starts from mth
        for i in range(n - m + 1):
            nextNode = cur.next
            cur.next = reverse
            reverse = cur
            cur = nextNode

        # connect back
        pre.next.next = cur
        pre.next = reverse

        return dummy.next
```
