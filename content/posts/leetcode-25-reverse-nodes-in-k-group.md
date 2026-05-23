---
title: "LeetCode 25 Reverse Nodes In K-Group - Hard"
date: "2021-01-01"
excerpt: "25. Reverse Nodes in k-Group -- Hard"
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 25
comments: true
---

### 25. Reverse Nodes In K-Group — Hard

[Open on LeetCode](https://leetcode.com/problems/reverse-nodes-in-k-group/)

## Problem

25. Reverse Nodes in k-Group -- Hard

Given a linked list, reverse the nodes of a linked list k at a time and return its modified list.

k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is.

Follow up:

Could you solve the problem in O(1) extra memory space?
You may not alter the values in the list's nodes, only nodes itself may be changed.
 

Example 1:
Input: head = [1,2,3,4,5], k = 2
Output: [2,1,4,3,5]

Example 2:
Input: head = [1,2,3,4,5], k = 3
Output: [3,2,1,4,5]

Example 3:
Input: head = [1,2,3,4,5], k = 1
Output: [1,2,3,4,5]

Example 4:
Input: head = [1], k = 1
Output: [1]
 
Constraints:
The number of nodes in the list is in the range sz.
1 <= sz <= 5000
0 <= Node.val <= 1000
1 <= k <= sz

## Solution

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reverseLinkedList(self, head, k):
        pre = None
        while k:
            next_node = head.next
            head.next = pre
            pre = head
            head = next_node
            k -= 1
        return pre
    def reverseKGroup(self, head: ListNode, k: int) -> ListNode:
        ptr = head
        ktail = None
        # Head of the final, moified linked list
        new_head = None
        # Keep going until there are nodes in the list
        while ptr:
            count = 0
            # Start counting nodes from the head
            ptr = head
            # Find the head of the next k nodes
            while count < k and ptr:
                ptr = ptr.next
                count += 1
            # If we counted k nodes, reverse them        
            if count == k:
                # Reverse k nodes and get the new head
                revHead = self.reverseLinkedList(head, k)
                # new_head is the head of the final linked list
                if not new_head:
                    new_head = revHead
                # ktail is the tail of the previous block of 
                # reversed k nodes
                if ktail:
                    ktail.next = revHead
                ktail = head 
                head = ptr
        # attach the final, possibly un-reversed portion
        if ktail:
            ktail.next = head
        return new_head if new_head else head
```
