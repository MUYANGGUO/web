---
title: "Practice Notes 9 — System & Data Structure"
date: "2021-01-01"
excerpt: ""
kind: post
tags:
  - Algorithm Notes
  - Study Notes
comments: true
---

### Chpater 9 System, Data Structure

1. [LeetCode 24 Swap Nodes in Pairs](https://leetcode.com/problems/swap-nodes-in-pairs/)

    **Problem:**

    Given a linked list, swap every two adjacent nodes and return its head.

    You may not modify the values in the list's nodes, only nodes itself may be changed.

    **Example:**

    ```
    Given 1->2->3->4, you should return the list as 2->1->4->3.
    ```

    **Solution: 解决这类问题一定要把链表的连接顺序画出来，同时注意边界条件！**

    ```python
    # Definition for singly-linked list.
    # class ListNode:
    #     def __init__(self, val=0, next=None):
    #         self.val = val
    #         self.next = next
    class Solution:
        def swapPairs(self, head: ListNode) -> ListNode:
            dummy = ListNode(None, head)
            prev = dummy
            while head and head.next:
                # first and second
                first = head
                second = head.next
                # Swap
                # prev 接second
                # first 接second 下面一个
                # second 接 first
                # 完成
                prev.next = second
                first.next = second.next
                second.next = first
                # 更新prev， prev指向swap后的first
                # head变成swap后的first的下一个
                prev = first
                head =first.next
                
            return dummy.next
    ```

    ---
