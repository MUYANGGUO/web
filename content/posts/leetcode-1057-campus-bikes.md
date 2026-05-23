---
title: "LeetCode 1057 Campus Bikes - Medium"
date: "2021-01-01"
excerpt: "1057. Campus Bikes -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 1057
comments: true
---

### 1057. Campus Bikes — Medium

[Open on LeetCode](https://leetcode.com/problems/campus-bikes/)

## Problem

1057. Campus Bikes -- Medium

On a campus represented as a 2D grid, there are N workers and M bikes, with N <= M. Each worker and bike is a 2D coordinate on this grid.

Our goal is to assign a bike to each worker. Among the available bikes and workers, we choose the (worker, bike) pair with the shortest Manhattan distance between each other, and assign the bike to that worker. (If there are multiple (worker, bike) pairs with the same shortest Manhattan distance, we choose the pair with the smallest worker index; if there are multiple ways to do that, we choose the pair with the smallest bike index). We repeat this process until there are no available workers.

The Manhattan distance between two points p1 and p2 is Manhattan(p1, p2) = |p1.x - p2.x| + |p1.y - p2.y|.

Return a vector ans of length N, where ans[i] is the index (0-indexed) of the bike that the i-th worker is assigned to.


Example 1:

Input: workers = [[0,0],[2,1]], bikes = [[1,2],[3,3]]
Output: [1,0]
Explanation: 
Worker 1 grabs Bike 0 as they are closest (without ties), and Worker 0 is assigned Bike 1. So the output is [1, 0].

Example 2:

Input: workers = [[0,0],[1,1],[2,0]], bikes = [[1,0],[2,2],[2,1]]
Output: [0,2,1]
Explanation: 
Worker 0 grabs Bike 0 at first. Worker 1 and Worker 2 share the same distance to Bike 2, thus Worker 1 is assigned to Bike 2, and Worker 2 will take Bike 1. So the output is [0,2,1].
 

Note:

0 <= workers[i][j], bikes[i][j] < 1000
All worker and bike locations are distinct.
1 <= workers.length <= bikes.length <= 1000

## Solution

```python
# Bucket Sort:
class Solution:
    def assignBikes(self, workers: List[List[int]], bikes: List[List[int]]) -> List[int]:
        # 工人和车子数量
        n = len(workers)
        m = len(bikes)
        alls = []
        vistw = [False] * n
        vistb = [False] * m
        mapp = [[] for i in range(2000)]
        ans = [0] * n
        for i in range(n):
            for j in range(m):
                alls.append((abs(workers[i][0]-bikes[j][0])+abs(workers[i][1]-bikes[j][1]), i, j))
        for i in range(n * m):
            x, y, z = alls[i]
            mapp[x].append(i)
        for i in range(2000):
            for j in range(len(mapp[i])):
                curpos = mapp[i][j]
                curtime, curworker, curbike = alls[curpos]
                if not vistw[curworker] and not vistb[curbike]:
                    ans[curworker] = curbike
                    vistw[curworker] = True
                    vistb[curbike] = True
        return ans


class Solution_bucket_sort:
    
    def assignBikes(self, workers, bikes):
        m, n = len(workers), len(bikes) 
        
        def manhattan(a, b):
            (x1, y1), (x2, y2) = a, b
            return abs(x1-x2) + abs(y1-y2)
            
        buckets = [[] for _ in range(2001)]
        for i, worker in enumerate(workers):
            for j, bike in enumerate(bikes):
                buckets[manhattan(worker, bike)] += (i, j),
        
        bikes, taken = [n] * m, set()
        for bucket in buckets:
            if len(taken) == m:
                break
            for i, j in bucket:
                if bikes[i] == n and j not in taken:
                    bikes[i] = j 
                    taken.add(j)
        return bikes
            
class Solution_pure_sort:
    
    def assignBikes(self, workers, bikes):
        m, n = len(workers), len(bikes) 
        
        def manhattan(a, b):
            (x1, y1), (x2, y2) = a, b
            return abs(x1-x2) + abs(y1-y2)
        
        def sort_key(pair):
            i, j = pair
            return (manhattan(workers[i], bikes[j]), i, j)
            
        output, taken = [n] * m, set()
        for i, j in sorted(((i, j) for i in range(m) for j in range(n)), key = sort_key):
            if len(taken) == m:
                break
            if output[i] == n and j not in taken:
                output[i] = j
                taken.add(j)
        return output

from heapq import heapify, heappop
class Solution_heap
    
    def assignBikes(self, workers, bikes):
        m, n = len(workers), len(bikes) 
        
        def manhattan(a, b):
            (x1, y1), (x2, y2) = a, b
            return abs(x1-x2) + abs(y1-y2)
            
        h = [(manhattan(worker, bike), i, j)
                for i, worker in enumerate(workers)
                for j, bike in enumerate(bikes)]
        heapify(h)
        
        output, taken = [n] * m, set()
        while len(taken) != m:
            _, i, j = heappop(h)
            if output[i] == n and j not in taken:
                output[i] = j
                taken.add(j)
        return output

class Solution:
    """
    @param workers: workers' location
    @param bikes: bikes' location
    @return: assign bikes
    """

    def assignBikes(self, workers, bikes):
        # write your code here

        # 工人和车子数量
        n = len(workers)
        m = len(bikes)
        # 排序数组，存放距离 工人编号 车子编号
        sol = [0 for i in range(n * m)]
        for i in range(n):
            for j in range(m):
                # 计算距离
                cost = abs(workers[i][0] - bikes[j][0]) + abs(workers[i][1] - bikes[j][1])
                # 压入sol
                sol[i * m + j] = [cost, i, j]

        # 对按照距离 工人编号 车子编号 三关键字排序
        sol.sort()

        # 标记工人有没有分配车子
        visisted_worker = [False]*n
        # 标记车子有没有被分配
        visisted_bike = [False]*m

        # 答案数组
        ans = [0 for i in range(n)]
        for i in range(len(sol)):
            # 人和车的编号
            cost,workersIdx,bikeIdx = sol[i]
            # 车和人都还没有分配
            if visisted_worker[workersIdx] == False and visisted_bike[bikeIdx] == False:
                visisted_worker[workersIdx] = visisted_bike[bikeIdx] = True
                ans[workersIdx] = bikeIdx
        return ans
```
