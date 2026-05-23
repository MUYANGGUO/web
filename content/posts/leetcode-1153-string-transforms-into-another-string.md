---
title: "LeetCode 1153 String Transforms Into Another String - Hard"
date: "2021-01-01"
excerpt: "1153. String Transforms Into Another String -- Hard"
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 1153
comments: true
---

### 1153. String Transforms Into Another String — Hard

[Open on LeetCode](https://leetcode.com/problems/string-transforms-into-another-string/)

## Problem

1153. String Transforms Into Another String -- Hard

Given two strings str1 and str2 of the same length, determine whether you can transform str1 into str2 by doing zero or more conversions.

In one conversion you can convert all occurrences of one character in str1 to any other lowercase English character.

Return true if and only if you can transform str1 into str2.


Example 1:

Input: str1 = "aabcc", str2 = "ccdee"
Output: true
Explanation: Convert 'c' to 'e' then 'b' to 'd' then 'a' to 'c'. Note that the order of conversions matter.

Example 2:

Input: str1 = "leetcode", str2 = "codeleet"
Output: false
Explanation: There is no way to transform str1 to str2.
 

Constraints:

1 <= str1.length == str2.length <= 104
str1 and str2 contain only lowercase English letters.

## Solution

```python
class Solution:
    def canConvert(self, str1: str, str2: str) -> bool:
        # 1. 一对一，每一个char互相对应转换即可 a->b
        # 2. link， aabcc,ccdee, a->c - c->e，其实只要有未在target string出现过的char，那么就可以拿来
        # 作为temp char桥梁，比如 a->g->c这样转换就不会同时影响c->e的转换
        # 3. circle, a-c-e-a, 需要一个temp来break
        # 以上三种情况 都是一一对应，即key只有一个val，才能转换
        # 3. 一对多，a->f, a->g 这样是绝对不可能的，因为char会被同时影响
        if str1 == str2: return True
        graph = {}
        for i, j in zip(str1, str2):
            if i not in graph:
                graph[i] = j
            elif graph[i] != j:
                return False
        return len(set(str2)) < 26
```
