---
title: "LeetCode 23 Merge K Sorted Lists - Hard"
date: "2021-01-01"
excerpt: 23. Merge k Sorted Lists
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 23
comments: true
---

### 23. Merge K Sorted Lists — Hard

[Open on LeetCode](https://leetcode.com/problems/merge-k-sorted-lists/)

## Problem

23. Merge k Sorted Lists

Merge k sorted linked lists and return it as one sorted list. Analyze and describe its complexity.

Example:

Input:
[
  1->4->5,
  1->3->4,
  2->6
]
Output: 1->1->2->3->4->4->5->6

## Solution

```python
### 解法 1：

# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

### overwrite the comparator function first, so that we could directly put ListNode into a heapq
import heapq
ListNode.__lt__ = lambda x, y: (x.val < y.val)
class Solution:
    def mergeKLists(self, lists):
        if not lists:
            return None
        
        dummy = ListNode(None)
        tail = dummy
        heap = []
        for head in lists:
            if head:
                heapq.heappush(heap, head)
        
        while heap:
            head = heapq.heappop(heap)
            tail.next = head
            tail = head
            if head.next:
                heapq.heappush(heap, head.next)
        
        return dummy.next
    
### 解法 2：

# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def mergeKLists(self, lists):
        ### 自顶部向下走：

        if not lists:
            return None
        
        return self.merge_range_lists(lists, 0, len(lists) -1)
    
    def merge_range_lists(self, lists, start, end):
        
        if start == end:
            return lists[start]
        
        mid = (start + end) // 2
        
        left = self.merge_range_lists(lists, start, mid)
        right = self.merge_range_lists(lists, mid + 1, end)
        return self.merge_two_lists(left, right)
    
    def merge_two_lists(self, head1, head2):
        tail = dummy = ListNode(None)
        while head1 and head2:
            if head1.val < head2.val:
                tail.next = head1
                head1 = head1.next
            else:
                tail.next = head2
                head2 = head2.next
            tail = tail.next
            
        if head1:
            tail.next = head1
        if head2:
            tail.next = head2

        return dummy.next


### 解法3：
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def mergeKLists(self, lists):
        if not lists:
            return None
        
        while len(lists) > 1:
            next_lists = []
            for i in range(0, len(lists), 2):
                if i + 1 < len(lists):
                    new_list = self.merge_two_lists(lists[i], lists[i + 1])
                else:
                    new_list = lists[i]
                
                next_lists.append(new_list)
                
            lists = next_lists
            
        return lists[0]
    
    def merge_two_lists(self, head1, head2):
        tail = dummy = ListNode(None)
        while head1 and head2:
            if head1.val < head2.val:
                tail.next = head1
                head1 = head1.next
            else:
                tail.next = head2
                head2 = head2.next
            tail = tail.next
        
        if head1:
            tail.next = head1
        if head2:  
            tail.next = head2
        
        return dummy.next
```
