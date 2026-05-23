---
title: "LintCode 437 Copy Books - Medium"
date: "2021-01-01"
excerpt: "给定 n 本书, 第 i 本书的页数为 pages[i]. 现在有 k 个人来复印这些书籍, 而每个人只能复印编号连续的一段的书, 比如一个人可以复印 pages[0], pages[1], pages[2], 但是不可以只复印 pages[0], pages[2], pa…"
kind: leetcode
tags:
  - LintCode
  - Medium
  - Python
order: 437
comments: true
---

### 437. Copy Books — Medium

[Open on LintCode](https://www.lintcode.com/problem/437/)

## Problem

给定 n 本书, 第 i 本书的页数为 pages[i]. 现在有 k 个人来复印这些书籍, 而每个人只能复印编号连续的一段的书, 比如一个人可以复印 pages[0], pages[1], pages[2], 但是不可以只复印 pages[0], pages[2], pages[3] 而不复印 pages[1].

所有人复印的速度是一样的, 复印一页需要花费一分钟, 并且所有人同时开始复印. 怎样分配这 k 个人的任务, 使得这 n 本书能够被尽快复印完?

返回完成复印任务最少需要的分钟数.

Given n books and the i-th book has pages[i] pages. There are k persons to copy these books.

These books list in a row and each person can claim a continous range of books. For example, one copier can copy the books from i-th to j-th continously, but he can not copy the 1st book, 2nd book and 4th book (without 3rd book).

They start copying books at the same time and they all cost 1 minute to copy 1 page of a book. What's the best strategy to assign books so that the slowest copier can finish at earliest time?

Return the shortest time that the slowest copier spends.

## Solution

```python
### 以下为可通过的解法: Binary Search, DP

class Solution:
    """
    @param pages: an array of integers
    @param k: An integer
    @return: an integer
    """
    def copyBooks(self, pages, k):
        n = len(pages)
        if n == 0:
            return 0
        l = max(pages)
        r = sum(pages)
        while l < r:
            mid = (l + r) // 2
            if self.ok(pages, k, mid):
                r = mid
            else:
                l = mid + 1 
        return l

    def ok(self, pages, k, tm):
        num = 1
        pageSum = 0
        for i in pages:
            if pageSum + i <= tm:
                pageSum += i 
            else:
                num += 1  
                pageSum = i
        return num <= k

# DP
class Solution:
    """
    @param pages: an array of integers
    @param k: An integer
    @return: an integer
    """

    def copyBooks(self, pages, k):
        n = len(pages)
        if k > n:
            k = n

        if n == 0:
            return 0

        sum = [0] * n
        sum[0] = pages[0]
        for i in range(1, n):
            sum[i] = sum[i - 1] + pages[i]

        f = [[0] * k for _ in range(n)]

        for i in range(n):
            f[i][0] = sum[i]

        for j in range(1, k):
            p = 0
            f[0][j] = pages[0]
            for i in range(1, j):
                f[i][j] = max(f[i - 1][j], pages[i])

            for i in range(j, n):
                while (p < i and f[p][j - 1] < sum[i] - sum[p]):
                    p += 1
                f[i][j] = max(f[p][j - 1], sum[i] - sum[p])
                if p > 0:
                    p -= 1
                f[i][j] = min(f[i][j], max(f[p][j - 1], sum[i] - sum[p]))
        return f[n-1][k-1]


### My DP solution: Time limit Exceeded

class Solution:
    """
    @param pages: an array of integers
    @param k: An integer
    @return: an integer
    """
    def copyBooks(self, pages, k):
        # write your code here
        # 划分型动态规划
        
        # 有点类似greedy的思路
        
        # 需要找到一种分段方式， 分成不超过k段，考虑到可能有人没有workload，使得所有段的数字之和，的最大值， 最小。
        
        
        # last person (Kth person) on pages[j], pages[j+1] ... pages[n - 1] , j = 0, 1, 2,...,i - 1, i is from {n}
        # K-1 previous persons distributed on pages[0]...pages[j - 1]
        
        n = len(pages)
        if not pages or n == 0 or k == 0:
            return 0
        
        ### 考虑 k> n
        
        if k > n:
            k = n

        
        MAX = float('Inf')
        f = [[MAX] * (n + 1) for _ in range(k + 1)]
        f[0][0] = 0
        for i in range(1, k + 1):
            f[i][0] = 0

            
        for t in range(1, k + 1):
            for i in range(1, n + 1):
                temp = 0
                for j in range(i, -1, -1):
                    # temp  = A[j] + ... + A[i - 1 ]
                    if f[t - 1][j] != MAX:
                        f[t][i] = min(f[t][i], max(f[t - 1][j], temp))
                    # update temp
                    if j > 0:
                        temp += pages[j - 1]
                    
                    # 此处剪枝
                    if f[t][i] < temp:
                        break
        return f[k][n]
```
