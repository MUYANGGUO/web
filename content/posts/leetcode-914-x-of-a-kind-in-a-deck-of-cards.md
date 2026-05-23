---
title: "LeetCode 914 X Of A Kind In A Deck Of Cards - Easy"
date: "2021-01-01"
excerpt: "914. X of a Kind in a Deck of Cards -- Easy"
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 914
comments: true
---

### 914. X Of A Kind In A Deck Of Cards — Easy

[Open on LeetCode](https://leetcode.com/problems/x-of-a-kind-in-a-deck-of-cards/)

## Problem

914. X of a Kind in a Deck of Cards -- Easy

In a deck of cards, each card has an integer written on it.

Return true if and only if you can choose X >= 2 such that it is possible to split the entire deck into 1 or more groups of cards, where:

Each group has exactly X cards.
All the cards in each group have the same integer.
 

Example 1:
Input: deck = [1,2,3,4,4,3,2,1]
Output: true
Explanation: Possible partition [1,1],[2,2],[3,3],[4,4].

Example 2:
Input: deck = [1,1,1,2,2,2,3,3]
Output: false´
Explanation: No possible partition.

Example 3:
Input: deck = [1]
Output: false
Explanation: No possible partition.

Example 4:
Input: deck = [1,1]
Output: true
Explanation: Possible partition [1,1].

Example 5:
Input: deck = [1,1,2,2,2,2]
Output: true
Explanation: Possible partition [1,1],[2,2],[2,2].
 

Constraints:

1 <= deck.length <= 10^4
0 <= deck[i] < 10^4

## Solution

```python
class Solution:
    def hasGroupsSizeX(self, deck):
        counter = collections.Counter(deck)
        # apply reduce:
        return reduce(self.gcd, counter.values()) >= 2
    # greatest common divisor: 
    def gcd(self, a, b):
        while b > 0:
            a, b = b, a % b
        return a
```
