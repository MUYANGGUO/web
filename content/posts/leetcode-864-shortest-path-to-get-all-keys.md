---
title: "LeetCode 864 Shortest Path To Get All Keys - Hard"
date: "2021-01-01"
excerpt: "864. Shortest Path to Get All Keys -- Hard"
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 864
comments: true
---

### 864. Shortest Path To Get All Keys — Hard

[Open on LeetCode](https://leetcode.com/problems/shortest-path-to-get-all-keys/)

## Problem

864. Shortest Path to Get All Keys -- Hard

We are given a 2-dimensional grid. "." is an empty cell, "#" is a wall, "@" is the starting point, ("a", "b", ...) are keys, and ("A", "B", ...) are locks.

We start at the starting point, and one move consists of walking one space in one of the 4 cardinal directions.  We cannot walk outside the grid, or walk into a wall.  If we walk over a key, we pick it up.  We can't walk over a lock unless we have the corresponding key.

For some 1 <= K <= 6, there is exactly one lowercase and one uppercase letter of the first K letters of the English alphabet in the grid.  This means that there is exactly one key for each lock, and one lock for each key; and also that the letters used to represent the keys and locks were chosen in the same order as the English alphabet.

Return the lowest number of moves to acquire all keys.  If it's impossible, return -1.


Example 1:

Input: ["@.a.#","###.#","b.A.B"]
Output: 8

Example 2:

Input: ["@..aA","..B#.","....b"]
Output: 6
 

Note:
1 <= grid.length <= 30
1 <= grid[0].length <= 30
grid[i][j] contains only '.', '#', '@', 'a'-'f' and 'A'-'F'
The number of keys is in [1, 6].  Each key has a different letter and opens exactly one lock.

## Solution

```python
class Solution:
    def shortestPathAllKeys(self, grid: List[str]) -> int:
        n, m = len(grid), len(grid[0])
        numOfKeys = 0
        direc = [[0,1],[0,-1],[1,0],[-1,0]]
        moves = set()
        for i in range(n):
            for j in range(m):
                if grid[i][j] == '@':
                    starti = i
                    startj = j
                elif grid[i][j] in "abcdef":
                    numOfKeys += 1
        
        deque = collections.deque()
        deque.append([starti, startj, 0, ".@abcdef", 0])
        while deque:
            i, j, steps, keys, collectedKeys = deque.popleft()
            if grid[i][j] in "abcdef" and grid[i][j].upper() not in keys:
                keys += grid[i][j].upper()
                collectedKeys += 1
            if collectedKeys == numOfKeys:
                return steps
            for x, y in direc:
                ni = i+x
                nj = j+y
                if 0<=ni<n and 0<=nj<m and grid[ni][nj] in keys:
                    if (ni, nj, keys) not in moves:
                        moves.add((ni,nj,keys))
                        deque.append([ni, nj, steps + 1, keys, collectedKeys]
        return -1
```
