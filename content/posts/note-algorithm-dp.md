---
title: "Algorithm Notes: DP"
date: "2021-01-01"
excerpt: ""
kind: post
tags:
  - Algorithm Notes
  - Study Notes
comments: true
---

## Chapter 18 动态规划

### 18.1 从搜索到动态规划--记忆化搜索 Memoization Search

**例题 1 数字三角形** [LeetCode-120 Triangle](https://leetcode.com/problems/triangle/)

数字三角形 VS 二叉树

数字三角形 O(n^2) 个节点，二叉树 O(2^n) 个节点。




### 18.2 坐标型动态规划

例题 1. [LeetCode-63 Unique Paths II](https://leetcode.com/problems/unique-paths-ii/)

```python
class Solution:
    def uniquePathsWithObstacles(self, obstacleGrid):
        
        ### 坐标型的DP
        
        ### 首先判断， 在右下角，上一步只可能来自， (m-1,n-1-1) or (m-1-1, n-1)
        
        ### 那么 每个f[i][j] = f[i][j-1] + f[i-1][j]
        
        ### f[i][j] represents the total path to be here
        
        ### construct the matrix 
        
        m, n = len(obstacleGrid), len(obstacleGrid[0])
        
#         if m == 1 and n == 1:
#             if obstacleGrid[0][0] == 1:
#                 return 0
#             else:
#                 return 1
        
        if m <= 1 or n <= 1:
            for i in range(m):
                for j in range(n):
                    if obstacleGrid[i][j] == 1:
                        return 0

        
        f = [[1] * n for _ in range(m)]
        
        ### initial 条件
        
        ### 1. f[0][0] = 1
        ### 2. 第一行在出现block之前为1，之后都为0
        ### 3. 第一列在出现blcok之前为1，之后都为0
        ### 4. 出现block的地方为0
            
        for i in range(n):
            if obstacleGrid[0][i] == 1:
                for j in range(i,n):
                    f[0][j] = 0
                break
                
        for i in range(m):
            if obstacleGrid[i][0] == 1:
                for j in range(i,m):
                    f[j][0] = 0
                break
        
        for i in range(1,m):
            for j in range(1,n):            
                if obstacleGrid[i][j] == 1:
                    f[i][j] = 0
                else:
                ### now start the transfer function
                    f[i][j] = f[i][j-1] + f[i-1][j]

        
        return f[m-1][n-1]
```

例题 2. [630 Knight Shortest Path II](https://www.lintcode.com/problem/knight-shortest-path-ii/)

DP：

```python

DIRECTIONS = [
    (-1, -2),
    (1, -2),
    (-2, -1),
    (2, -1),
]


class Solution:
    # @param {boolean[][]} grid a chessboard included 0 and 1
    # @return {int} the shortest path
    def shortestPath2(self, grid):
        if not grid or not grid[0]:
            return -1
        
        n, m = len(grid), len(grid[0])
        
        # state: f[i][j] 代表从 0,0 跳到 i,j 的最少步数
        f = [[sys.maxsize for j in range(m)] for _ in range(n)]

        # initialize: f[0][0] 是起点
        f[0][0] = 0
        
        # function
        for j in range(m):
            for i in range(n):
                if grid[i][j]:
                    continue
                for delta_x, delta_y in DIRECTIONS:
                    x, y = i + delta_x, j + delta_y
                    if 0 <= x < n and 0 <= y < m:
                        f[i][j] = min(f[i][j], f[x][y] + 1)

        if f[n - 1][m - 1] == sys.maxsize:
            return -1

        return f[n - 1][m - 1]



```

滚动数组DP优化：

```python
DIRECTIONS = [
    (-1, -2),
    (1, -2),
    (-2, -1),
    (2, -1),
]

class Solution:
    """
    @param grid: a chessboard included 0 and 1
    @return: the shortest path
    """
    def shortestPath2(self, grid):
        # write your code here
        if not grid or not grid[0]:
            return -1
        
        n, m = len(grid), len(grid[0])
        
        # state: dp[i][j % 3] 代表从 0,0 跳到 i,j 的最少步数
        dp = [[float('inf')] * 3 for _ in range(n)]

        # initialize: 0,0 是起点
        dp[0][0] = 0
        
        # function
        for j in range(1, m):
            for i in range(n):
                dp[i][j % 3] = float('inf')
                if grid[i][j]:
                    continue
                for delta_x, delta_y in DIRECTIONS:
                    x, y = i + delta_x, j + delta_y
                    if 0 <= x < n and 0 <= y < m:
                        dp[i][j % 3] = min(dp[i][j % 3], dp[x][y % 3] + 1)

        # answer
        if dp[n - 1][(m - 1) % 3] == float('inf'):
            return -1
        return dp[n - 1][(m - 1) % 3]

```

例题 3. [LeetCode-55 Jump Game](https://leetcode.com/problems/jump-game/)

```python
class Solution:
    """
    @param A: A list of integers
    @return: A boolean
    """
    def canJump(self, A):
        if not A:
            return False

        n = len(A)
        # state: dp[i] 代表能否跳到坐标 i
        dp = [False] * n
        
        # initialization: 一开始站在0这个位置
        dp[0] = True
        
        # function
        for i in range(1, n):
            for j in range(i):
                # 高效的写法:
                if dp[j] and j + A[j] >= i:
                    dp[i] = True
                    break
                # 偷懒的写法
                # dp[i] = dp[i] or dp[j] and (j + A[j] >= i)
        
        # answer
        return dp[n - 1]
```


### 18.3 背包型动态规划

注意 背包型动态规划并不一定比搜索快 DFS combination来说 O(n * 2^n) 背包型态为O(n*m), m为sum，当m值很大的时候，动态规划可能会比搜索还要慢。

dp[i][j] 表示 前 i 个物品 里挑出若干物品组成和 为j 的大小是否可行。

例题 1. [92 Backpack](https://www.lintcode.com/problem/backpack/description)

```python
class Solution:
    """
    @param m: An integer m denotes the size of a backpack
    @param A: Given n items with size A[i]
    @return: The maximum size
    """
    def backPack(self, m, A):
        # write your code here
        # Backpack type DP:
        # for n items in A:
        # Lets consider the last step of DP:
        # if last item is not picked, then the previous n - 1 items should try to fill up the size m - A[n - 1]. 
        # if last item is picked, then the all n items should try to fill up the size m. 
        
        # The status:
        # f[i][w] previous i items can or can not have weight w, w = 0, 1 , 2...,m
        n = len(A)
        if n==0:
            return 0
            
        f = [[False] * (m + 1) for _ in range(n + 1)]
        
        f[0][0] = True

        
        for i in range(1, n + 1):
            for w in range(m + 1):
                # case 1: not pick last item
                f[i][w] = f[i - 1][w]
                # case 2: picked last item
                if w >= A[i - 1]:
                    f[i][w] = f[i][w] or f[i - 1][w - A[i - 1]]
        
        
        for i in range(m, -1, -1):
            if f[n][i]:
                return i
        
        return 0

```


例题 2. [724 Minimum Partition](https://www.lintcode.com/problem/minimum-partition/)

01背包问题的变种：dpi表示两个集合之差为i的构造方法是否存在，枚举数组中的每个数，依次迭代更新dp数组即可

即求使得X（较小的数组之和）尽可能接近SUM/2的最大值。

```python
class Solution:
    """
    @param nums: the given array
    @return: the minimum difference between their sums 
    """
    def findMin(self, nums):
        # write your code here
        SUM = sum(nums)
        m = len(nums)
        limit = int(SUM/2)
        f = [[0] * (limit + 1) for _ in range(2)]
        f[0][0] = 0

        for i in range(1, m + 1):
            for w in range(limit + 1):
                # case 1: not pick last item
                f[i % 2][w] = f[(i - 1) % 2][w]
                # case 2: picked last item
                if w >= nums[i - 1]:
                    f[i % 2][w] = max(f[i % 2][w] , f[(i - 1) % 2 ][w - nums[i - 1]] + nums[i - 1])
                if f[i % 2][w] >= limit:
                    return abs(SUM -2 * f[i % 2][w])
        
        return SUM -2 * f[m % 2][limit]
```
或者用逻辑运算符 稍微更快一些：

```python
class Solution:
    """
    @param nums: the given array
    @return: the minimum difference between their sums 
    """
    def findMin(self, nums):
        # write your code here
        n = len(nums)
        total_sum = sum(nums)
        m = total_sum // 2
        
        dp = [[False] * (m + 1) for _ in range(2)]
        
        dp[0][0] = True
        
        for i in range(1, n + 1):
            dp[i % 2][0] = True
            for j in range(1, m + 1):
                if nums[i - 1] > j:
                    dp[i % 2][j] = dp[(i - 1) % 2][j]
                else:
                    dp[i % 2][j] = dp[(i - 1) % 2][j] or dp[(i - 1) % 2][j - nums[i - 1]]
        
        for i in range(m, -1, -1):
            if dp[n % 2][i]:
                return total_sum - 2 * i
        
        return total_sum


```

例题 3.  [125 Backpack II](lintcode.com/problem/backpack-ii/description)

带价值的背包问题：

```python
class Solution:
    """
    @param m: An integer m denotes the size of a backpack
    @param A: Given n items with size A[i]
    @param V: Given n items with value V[i]
    @return: The maximum value
    """
    def backPackII(self, m, A, V):
        # write your code here
        n = len(A)
        if n == 0:
            return 0
        
        
        f = [[-1] * (m + 1) for _ in range(n + 1)]
        
        f[0][0] = 0
        
        for i in range(1, n + 1):
            for w in range(m + 1):
                # not picked the last item:
                f[i][w] = f[i - 1][w]
                
                # picked the last item:
                if w >= A[i - 1] and f[i - 1][w - A[i - 1]] != -1:
                    f[i][w] = max(f[i][w],f[i - 1][w - A[i - 1]] + V[i - 1])
                    
        res = 0
        for w in range(m + 1):
            if f[n][w] != -1:
                res = max(res, f[n][w])
                
        return res

```

例题 4. [440. Backpack III](https://www.lintcode.com/problem/backpack-iii/description)

多重背包问题 （可选同一个物品多次）： 有了count

```python
class Solution:
    """
    @param A: an integer array
    @param V: an integer array
    @param m: An integer
    @return: an array
    """
    def backPackIII(self, A, V, m):
        # write your code here
        n = len(A)
        if n == 0:
            return 0
        
        
        f = [-1] * (m + 1)
        
        f[0] = 0
        
        for i in range(1, n + 1):
            for w in range(A[i - 1], m + 1):
                # old: f[w]
                # new: f[w - A[i - 1]]

                if f[w - A[i - 1]] != -1:
                    f[w] = max(f[w],f[w - A[i - 1]] + V[i - 1])
                    
        res = 0
        for w in range(m + 1):
            if f[w] != -1:
                res = max(res, f[w])
                
        return res

```

### 18.4 区间型DP

大区间依赖于小区间。

例题 1. []
