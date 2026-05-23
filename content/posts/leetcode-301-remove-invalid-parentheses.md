---
title: "LeetCode 301 Remove Invalid Parentheses - Hard"
date: "2021-01-01"
excerpt: "301. Remove Invalid Parentheses -- Hard"
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 301
comments: true
---

### 301. Remove Invalid Parentheses — Hard

[Open on LeetCode](https://leetcode.com/problems/remove-invalid-parentheses/)

## Problem

301. Remove Invalid Parentheses -- Hard

Remove the minimum number of invalid parentheses in order to make the input string valid. Return all possible results.

Note: The input string may contain letters other than the parentheses ( and ).

Example 1:
Input: "()())()"
Output: ["()()()", "(())()"]

Example 2:
Input: "(a)())()"
Output: ["(a)()()", "(a())()"]

Example 3:
Input: ")("
Output: [""]

## Solution

```python
### DFS:
class Solution:
    def removeInvalidParentheses(self, s: str) -> List[str]:
        res = []
        # 先找出需要删除的数量
        left, right = self.countLeftRight(s)
        self.dfs(s, left, right, 0, res)
        return res
        
        
    def countLeftRight(self, s):
        left, right = 0, 0
        for char in s:
            if char == '(':
                left += 1
                continue
            if char == ')':
                if left > 0:
                    left -= 1
                else:
                    right += 1
        return left, right
    
    def isvalid(self, s):
        left, right = self.countLeftRight(s)
        return left==0 and right==0
    
    def dfs(self, s, left, right, start, res):
        if left==0 and right==0:
            if self.isvalid(s):
                res.append(s)
            return
        
        for i in range(start, len(s)):
            ### ((( 这种情况 删除任意一个都是一样的，所以跳到删除最新的就可以了
            if i > start and s[i] == s[i-1]:
                continue
            # delete index， i
            if s[i] == '(':
                self.dfs(s[:i]+s[i+1:], left-1, right, i, res)
            if s[i] == ')':
                self.dfs(s[:i]+s[i+1:], left, right-1, i, res)

# BFS:
from collections import deque
class Solution:
    def removeInvalidParentheses(self, s):
        res = []
        if len(s) == 0:
            res.append("")
            return res
        queue = deque([])
        visited = set()
        queue.append(s)
        visited.add(s)
        flag = False
        # bfs
        while queue:
            curStr = queue.popleft()
            # 若curStr有效，则找到答案
            if self.check(curStr):
                res.append(curStr)
                flag = True
            #不需要去找更短的串
            if flag:
                continue
            # 对于无效的字符串，依次删除一个字符压入队列
            for i in range(len(curStr)):
                if curStr[i] != '(' and curStr[i] != ')':
                    continue
                newStr = curStr[:i] + curStr[i + 1:]
                # 如果这个字符串未被check过，则压入队列
                if newStr not in visited:
                    visited.add(newStr)
                    queue.append(newStr)
        return res
    
    def check(self,str):
        if len(str) == 0:
            return True
        # 记录count对
        count = 0
        for i in range(0,len(str)):
            if str[i] == '(':
                count += 1
            if str[i] == ')':
                count -= 1
            if count < 0:
                return False
        if count == 0:
            return True
        return False
```
