---
title: "LeetCode 1290 Convert Binary Number In A Linked List To Integer - Easy"
date: "2021-01-01"
excerpt: "Binary to Decimal from Linked List:"
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 1290
comments: true
---

### 1290. Convert Binary Number In A Linked List To Integer — Easy

[Open on LeetCode](https://leetcode.com/problems/convert-binary-number-in-a-linked-list-to-integer/)

## Problem

Binary to Decimal from Linked List:
LeetCode 1290
A binary number is represented as a series of 0s and 1s.

In this challenge: the series will be in the form of a singly-linked list.
Each node instance, a LinkedListNode has a value, val and a pointer to the next node.

Given a reference to the head of a singly-linked list, convert the binary number represented to a decimal number, for 
example.

0->1->0->0->1->1->1->null

linkedlist corresponding to the binary number (010011)bin or (19)10

Function Description:
Complete the function getNumber in the editor below. The function must return a 
(long integer)10 representation of the binary number. 

getNumber has the following parameters:
binary: reference to the head of a singly-linked list of binary digits:

Constraints:
1<= n <= 64
All linkedListNode.val belongs to {0, 1}
The decribed (integer)2 < 2^64

Example:
0011010 -> (0011010)bin = (26)10

## Solution

```python
### using bitwise operators:

# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def getDecimalValue(self, head: ListNode) -> int:
        num = head.val
        while head.next:
            num = (num << 1) | head.next.val
            head = head.next
        return num
```
