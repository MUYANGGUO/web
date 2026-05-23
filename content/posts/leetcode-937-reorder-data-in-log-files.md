---
title: "LeetCode 937 Reorder Data In Log Files - Easy"
date: "2021-01-01"
excerpt: 937. Reorder Data in Log Files
kind: leetcode
tags:
  - LeetCode
  - Easy
  - Python
order: 937
comments: true
---

### 937. Reorder Data In Log Files — Easy

[Open on LeetCode](https://leetcode.com/problems/reorder-data-in-log-files/)

## Problem

937. Reorder Data in Log Files

You have an array of logs.  Each log is a space delimited string of words.

For each log, the first word in each log is an alphanumeric identifier.  Then, either:

Each word after the identifier will consist only of lowercase letters, or;
Each word after the identifier will consist only of digits.
We will call these two varieties of logs letter-logs and digit-logs.  It is guaranteed that each log has at least one word after its identifier.

Reorder the logs so that all of the letter-logs come before any digit-log.  The letter-logs are ordered lexicographically ignoring identifier, with the identifier used in case of ties.  The digit-logs should be put in their original order.

Return the final order of the logs.

 

Example 1:

Input: logs = ["dig1 8 1 5 1","let1 art can","dig2 3 6","let2 own kit dig","let3 art zero"]
Output: ["let1 art can","let3 art zero","let2 own kit dig","dig1 8 1 5 1","dig2 3 6"]
 

Constraints:

0 <= logs.length <= 100
3 <= logs[i].length <= 100
logs[i] is guaranteed to have an identifier, and a word after the identifier.

## Solution

```python
# 利用lambda方程配合tuple来进行custom sort：
class Solution:
    def reorderLogFiles(self, logs: List[str]) -> List[str]:
        lets = []
        digs = []
        for log in logs:
            if log.split()[1].isdigit():
                digs.append(log)
            else:
                lets.append(log)
        # 用lambda方程来些custom sort，
        # 通过创建(rest，identifier) 这样的tuple来custom比较。
        lets = sorted(lets, key=lambda x:(x[x.find(" "):], x[:x.find(" ")]))
        return lets + digs
```
