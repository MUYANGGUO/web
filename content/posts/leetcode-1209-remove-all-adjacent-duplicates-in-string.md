---
title: "LeetCode 1209 Remove All Adjacent Duplicates In String - Medium"
date: "2021-01-01"
excerpt: "1209. Remove All Adjacent Duplicates in String II -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 1209
comments: true
---

### 1209. Remove All Adjacent Duplicates In String — Medium

[Open on LeetCode](https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/)

## Problem

1209. Remove All Adjacent Duplicates in String II -- Medium

Given a string s, a k duplicate removal consists of choosing k adjacent and equal letters from s and removing them causing the left and the right side of the deleted substring to concatenate together.

We repeatedly make k duplicate removals on s until we no longer can.

Return the final string after all such duplicate removals have been made.

It is guaranteed that the answer is unique.

 
Example 1:
Input: s = "abcd", k = 2
Output: "abcd"
Explanation: There's nothing to delete.

Example 2:
Input: s = "deeedbbcccbdaa", k = 3
Output: "aa"
Explanation: 
First delete "eee" and "ccc", get "ddbbbdaa"
Then delete "bbb", get "dddaa"
Finally delete "ddd", get "aa"

Example 3:
Input: s = "pbbcggttciiippooaais", k = 2
Output: "ps"

Constraints:
1 <= s.length <= 10^5
2 <= k <= 10^4
s only contains lower case English letters.

## Solution

```python
class Solution:
    def removeDuplicates(self, s: str, k: int) -> str:
        stack = []
        for letter in s:
            if stack and stack[-1][0] == letter:
                if stack[-1][1] == k - 1:
                    stack.pop()
                else:
                    stack[-1][1] += 1
            else:
                stack.append([letter, 1])   
        res = []
        for elem in stack:
            res.append(elem[0] * elem[1])
        return ''.join(res)
```
