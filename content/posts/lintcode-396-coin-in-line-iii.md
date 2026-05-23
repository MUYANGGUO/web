---
title: "LintCode 396 Coin In Line III - Hard"
date: "2021-01-01"
excerpt: "有 n 个硬币排成一条线, 第 i 枚硬币的价值为 values[i]."
kind: leetcode
tags:
  - LintCode
  - Hard
  - Python
order: 396
comments: true
---

### 396. Coin In Line III — Hard

[Open on LintCode](https://www.lintcode.com/problem/396/)

## Problem

有 n 个硬币排成一条线, 第 i 枚硬币的价值为 values[i].

两个参赛者轮流从任意一边取一枚硬币, 直到没有硬币为止. 拿到硬币总价值更高的获胜.

请判定 第一个玩家 会赢还是会输.

您在真实的面试中是否遇到过这个题？  
样例
样例 1:

输入: [3, 2, 2]
输出: true
解释: 第一个玩家在刚开始的时候拿走 3, 然后两个人分别拿到一枚 2.
样例 2:

输入: [1, 20, 4]
输出: false
解释: 无论第一个玩家在第一轮拿走 1 还是 4, 第二个玩家都可以拿到 20.
挑战
在 n 是偶数时做到O(1) 空间, O(n) 时间

## Solution

```python
class Solution:
    """
    @param values: a vector of integers
    @return: a boolean which equals to true if the first player will win
    """
    def firstWillWin(self, values):
        # write your code here
        
        ### 区间型态动态规划
        
        ### 此题非常需要注意的是，我们应该找出双方得分差来表示状态。
        
        ### 假设A 为先手，第一pick 为 m， 之后A所pick的和为 Sa,B所pick的和为Sb，那么对于A来表示A和B分数差为
        
        ### m + Sa - Sb
        
        ### 也就是说对于A 为先手，他选了一个分数m，剩下的Sa - Sb 是区间内A和B上一局的分数差。
        ### 那么到了B为先手时，B也需要选一个m 然后加上上一局的Sb - Sa。
        
        ### 综上，也就是说状态方程可看成：
        
        ### 先手目前的最大得分 = 先手选择头 或 尾巴 - 后手的分数差 （先手和后手不断交替
        
        
        n = len(values)
        if n == 0:
            return 0
        
        MIN = -float('Inf')
        f = [[MIN] * n for _ in range(n)]
        
        for i in range(n):
            f[i][i] = values[i]
        
        for length in range(2, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1
                
                f[i][j] = max(values[i] - f[i + 1][j], values[j] - f[i][j - 1])
                
        return f[0][n - 1] >= 0
```
