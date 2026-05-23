---
title: "LeetCode 141 Linked List Cycle - Easy"
date: "2021-01-01"
excerpt: 141. Linked List Cycle
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 141
comments: true
---

### 141. Linked List Cycle — Easy

[Open on LeetCode](https://leetcode.com/problems/linked-list-cycle/)

## Problem

141. Linked List Cycle

Given a linked list, determine if it has a cycle in it.

To represent a cycle in the given linked list, we use an integer pos which represents the position (0-indexed) in the linked list where tail connects to. If pos is -1, then there is no cycle in the linked list.

 

Example 1:

Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, where tail connects to the second node.


Example 2:

Input: head = [1,2], pos = 0
Output: true
Explanation: There is a cycle in the linked list, where tail connects to the first node.


Example 3:

Input: head = [1], pos = -1
Output: false
Explanation: There is no cycle in the linked list.


 

Follow up:

Can you solve it using O(1) (i.e. constant) memory?

## Solution

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def hasCycle(self, head):
     
        # write your code here
        slow = head
        if slow is None:
            return False
        fast = head.next
        if fast is None:
            return False
        
        while fast is not None and fast.next is not None:
            slow = slow.next
            fast = fast.next.next
            if slow == fast:
                return True
        
        return False
```
