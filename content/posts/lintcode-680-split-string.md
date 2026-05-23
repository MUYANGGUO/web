---
title: "LintCode 680 Split String - Medium"
date: "2021-01-01"
excerpt: 680. Split String
kind: leetcode
tags:
  - LintCode
  - Medium
  - Python
order: 680
comments: true
---

### 680. Split String — Medium

[Open on LintCode](https://www.lintcode.com/problem/680/)

## Problem

680. Split String

Give a string, you can choose to split the string after one character or two adjacent characters, and make the string to be composed of only one character or two characters. Output all possible results.

Example
Example1

Input: "123"
Output: [["1","2","3"],["12","3"],["1","23"]]
Example2

Input: "12345"
Output: [["1","23","45"],["12","3","45"],["12","34","5"],["1","2","3","45"],["1","2","34","5"],["1","23","4","5"],["12","3","4","5"],["1","2","3","4","5"]]

## Solution

```python
class Solution:
    
    """

    @param: : a string to be split

    @return: all possible split string array

    """

    def splitString(self, s):

        # write your code here

        result = []

        self.dfs(result, [], s)

        return result 

    

    def dfs(self, result, current, s):

        if s == "":

            result.append(current[:])

            return 

        #利用python字符串分片，可以用循环来完成两种切割方式

        for i in range(2):

            if i+1 <= len(s):

                current.append(s[:i+1])

                self.dfs(result, current, s[i+1:])

                current.pop()
```
