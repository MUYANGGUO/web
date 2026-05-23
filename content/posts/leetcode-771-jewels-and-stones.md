---
title: "LeetCode 771 Jewels And Stones - Easy"
date: "2021-01-01"
excerpt: "You're given strings J representing the types of stones that are jewels, and S representing the stones you have.  Each character in S is …"
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 771
comments: true
---

### 771. Jewels And Stones — Easy

[Open on LeetCode](https://leetcode.com/problems/jewels-and-stones/)

## Problem

You're given strings J representing the types of stones that are jewels, and S representing the stones you have.  Each character in S is a type of stone you have.  You want to know how many of the stones you have are also jewels.

The letters in J are guaranteed distinct, and all characters in J and S are letters. Letters are case sensitive, so "a" is considered a different type of stone from "A".

Example 1:

Input: J = "aA", S = "aAAbbbb"
Output: 3
Example 2:

Input: J = "z", S = "ZZ"
Output: 0
Note:

S and J will consist of letters and have length at most 50.
The characters in J are distinct.

## Solution

```python
### Hash set O(n + m):
class Solution:
    def numJewelsInStones(self, J: str, S: str) -> int:
        ### set 和 dict 相比， set 储存key就可以。 dict 需要 key 和 value 的 pair。
        ### 所以这道题用set 比较合适 。
        container = set(J)
        for i in J:
            if i not in container:
                container[i] = 0
        count = 0
        for i in S:
            if i in container:
                count += 1
                
        return count
        
### Brute force:
class Solution:
    def numJewelsInStones(self, J: str, S: str) -> int:
        return sum(s in J for s in S)
```
