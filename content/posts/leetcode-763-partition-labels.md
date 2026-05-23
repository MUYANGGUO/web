---
title: "LeetCode 763 Partition Labels - Medium"
date: "2021-01-01"
excerpt: 763. Partition Labels
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 763
comments: true
---

### 763. Partition Labels — Medium

[Open on LeetCode](https://leetcode.com/problems/partition-labels/)

## Problem

763. Partition Labels

A string S of lowercase English letters is given. We want to partition this string into as many parts as possible so that each letter appears in at most one part, and return a list of integers representing the size of these parts.

Example 1:

Input: S = "ababcbacadefegdehijhklij"
Output: [9,7,8]
Explanation:
The partition is "ababcbaca", "defegde", "hijhklij".
This is a partition so that each letter appears in at most one part.
A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits S into less parts.

Note:

S will have length in range [1, 500].
S will consist of lowercase English letters ('a' to 'z') only.

## Solution

```python
# 哈希 + 双指针 + Greedy:

class Solution:
    def partitionLabels(self, S: str) -> List[int]:
        # 统计每个char的最后一次出现的位置
        lastAt = dict()
        for i, char in enumerate(S):
            lastAt[char] = i
        res = []
        # 双指针
        partitionStart, partitionEnd = 0, 0
        for i, char in enumerate(S):
            # 不断刷新partionEnd的位置
            partitionEnd = max(partitionEnd, lastAt[char])
            # 直到当前位置就是最远的partionEnd
            if partitionEnd == i:
                # 更新答案
                res.append(partitionEnd - partitionStart + 1)
                # 让新的partition开始在下一个char
                partitionStart = i + 1
        return res
```
