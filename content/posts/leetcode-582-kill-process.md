---
title: "LeetCode 582 Kill Process - Medium"
date: "2021-01-01"
excerpt: "582. Kill Process -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 582
comments: true
---

### 582. Kill Process — Medium

[Open on LeetCode](https://leetcode.com/problems/kill-process/)

## Problem

582. Kill Process -- Medium

Given n processes, each process has a unique PID (process id) and its PPID (parent process id).

Each process only has one parent process, but may have one or more children processes. This is just like a tree structure. Only one process has PPID that is 0, which means this process has no parent process. All the PIDs will be distinct positive integers.

We use two list of integers to represent a list of processes, where the first list contains PID for each process and the second list contains the corresponding PPID.

Now given the two lists, and a PID representing a process you want to kill, return a list of PIDs of processes that will be killed in the end. You should assume that when a process is killed, all its children processes will be killed. No order is required for the final answer.

Example 1:
Input: 
pid =  [1, 3, 10, 5]
ppid = [3, 0, 5, 3]
kill = 5
Output: [5,10]
Explanation: 
           3
         /   \
        1     5
             /
            10
Kill 5 will also kill 10.
Note:
The given kill id is guaranteed to be one of the given PIDs.
n >= 1.

## Solution

```python
### BFS with Hashmap, queue:
from collections import deque
class Solution:
    def killProcess(self, pid: List[int], ppid: List[int], kill: int) -> List[int]:
        map = {i : [] for i in ppid}
        for i in range(len(ppid)):
            map[ppid[i]].append(pid[i])
        res = []
        queue = deque([kill])
        while queue:
            curProcess = queue.popleft()
            res.append(curProcess)
            if curProcess in map:
                for child in map[curProcess]:
                    queue.append(child)
        return res
        
### DFS:
from collections import deque
class Solution:
    def killProcess(self, pid: List[int], ppid: List[int], kill: int) -> List[int]:
        map = {i : [] for i in ppid}
        for i in range(len(ppid)):
            map[ppid[i]].append(pid[i])
        self.res = []
        self.dfs(kill, map)
        return self.res
    def dfs(self, node, map):
        self.res.append(node)
        if node not in map:
            return
        for child in map[node]:
            self.dfs(child, map)
        return 

### Stack:
from collections import deque
class Solution:
    def killProcess(self, pid: List[int], ppid: List[int], kill: int) -> List[int]:
        map = {i : [] for i in ppid}
        for i in range(len(ppid)):
            map[ppid[i]].append(pid[i])
        res = []
        stack = [kill]
        while stack:
            cur = stack.pop()
            res.append(cur)
            if cur not in map:
                continue
            for child in map[cur]:
                stack.append(child)
        return res
```
