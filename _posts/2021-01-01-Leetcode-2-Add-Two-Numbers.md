---
layout: leetcode-page
title: "Leetcode 2 Add Two Numbers - Medium"
date: 2021-01-01
order: 2
excerpt: ""
leetcode: true
tags: [Leetcode]
comments: true
---

<h2> 2. Add Two Numbers - Medium  </h2>
[Go to Leetcode](https://leetcode.com/problems/add-two-numbers/)

You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

<code>
Example:
</code>

```
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.
```
<pre>
inputs:
2 -> 4 -> 3
5 -> 6 -> 4
</pre>

<pre>
outputs:
7 -> 0 -> 8
</pre>

<code>
Method DummyNode + LinkedList Traversing, Space O(N), Time O(N)
</code>

``` python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:
        dummy = ListNode(0)
        ptr = dummy
        addOn = 0
        while l1 or l2:
            l1_val = (l1.val if l1 else 0)
            l2_val = (l2.val if l2 else 0)
            curSum = l1_val + l2_val + addOn
            if curSum >= 10:
                curSum = curSum - 10
                addOn = 1
            else:
                addOn = 0
            ptr.next = ListNode(curSum)
            ptr = ptr.next            
            l1 = (l1.next if l1 else None)
            l2 = (l2.next if l2 else None)
        if  (addOn > 0):
            ptr.next = ListNode(addOn)
        return dummy.next
```

