---
title: "LeetCode 207 Course Schedule - Medium"
date: "2021-01-01"
excerpt: 207. Course Schedule
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 207
comments: true
---

### 207. Course Schedule — Medium

[Open on LeetCode](https://leetcode.com/problems/course-schedule/)

## Problem

207. Course Schedule

There are a total of numCourses courses you have to take, labeled from 0 to numCourses-1.

Some courses may have prerequisites, for example to take course 0 you have to first take course 1, which is expressed as a pair: [0,1]

Given the total number of courses and a list of prerequisite pairs, is it possible for you to finish all courses?

 

Example 1:

Input: numCourses = 2, prerequisites = [[1,0]]
Output: true

Explanation: There are a total of 2 courses to take. 
             To take course 1 you should have finished course 0. So it is possible.
Example 2:

Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false

Explanation: There are a total of 2 courses to take. 
             To take course 1 you should have finished course 0, and to take course 0 you should
             also have finished course 1. So it is impossible.
 

Constraints:

The input prerequisites is a graph represented by a list of edges, not adjacency matrices. Read more about how a graph is represented.
You may assume that there are no duplicate edges in the input prerequisites.
1 <= numCourses <= 10^5

## Solution

```python
### Topological Sorting:
class Solution:
    def canFinish(self, numCourses, prerequisites):
        
        ### 建立graph
        ### 邻居list（此处的邻居为prerequisites）
        edges = {i : [] for i in range(numCourses) } 
        ### 入度
        degrees = [0 for i in range(numCourses)]
        
        for i, j in prerequisites:
            edges[j].append(i)
            degrees[i] += 1
            
        queue, count = deque([]), 0
        
        ### 把所有入度为0的node放进queue
        for i in range(numCourses):
            if degrees[i] == 0:
                queue.append(i)

        while queue:
            node = queue.popleft()
            count += 1
            # 将每条邻边删去，如果入度降为 0，再加入队列
            for x in edges[node]:
                degrees[x] -= 1
                if degrees[x] == 0:
                    queue.append(x)

        return count == numCourses
```
