---
title: "LeetCode 142 Linked List Cycle II - Medium"
date: "2021-01-01"
excerpt: 142. Linked List Cycle II
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 142
comments: true
---

### 142. Linked List Cycle II — Medium

[Open on LeetCode](https://leetcode.com/problems/linked-list-cycle-ii/)

## Problem

142. Linked List Cycle II

Given a linked list, return the node where the cycle begins. If there is no cycle, return null.

To represent a cycle in the given linked list, we use an integer pos which represents the position (0-indexed) in the linked list where tail connects to. If pos is -1, then there is no cycle in the linked list.

Note: Do not modify the linked list.


Example 1:

Input: head = [3,2,0,-4], pos = 1
Output: tail connects to node index 1
Explanation: There is a cycle in the linked list, where tail connects to the second node.


Example 2:

Input: head = [1,2], pos = 0
Output: tail connects to node index 0
Explanation: There is a cycle in the linked list, where tail connects to the first node.


Example 3:

Input: head = [1], pos = -1
Output: no cycle
Explanation: There is no cycle in the linked list.


 

Follow-up:
Can you solve it without using extra space?

## Solution

```python
### 找环的入口，是linked list cycle的经典引申题目。


# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def detectCycle(self, head):
        # write your code here
        if head == None or head.next == None:
            return None
        
        slow, fast = head, head.next ### 初始化快慢指针
        
        while fast != slow: ### 直到两指针相遇
            if fast is None or fast.next is None:
                return None
            fast = fast.next.next
            slow = slow.next
        
        while head != slow.next: ### 快慢相遇后，看head 和 slow.next的相遇，并各自速度为1步更新，直到相遇时的head就是入口。
            head = head.next
            slow = slow.next
            
        return head
```
