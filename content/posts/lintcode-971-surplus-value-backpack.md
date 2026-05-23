---
title: "LintCode 971 Surplus Value Backpack - Hard"
date: "2021-01-01"
excerpt: 971. Surplus Value Backpack
kind: leetcode
tags:
  - LintCode
  - Hard
  - Python
order: 971
comments: true
---

### 971. Surplus Value Backpack — Hard

[Open on LintCode](https://www.lintcode.com/problem/971/)

## Problem

971. Surplus Value Backpack

There is a backpack with a capacity of c.
There are n Class A items, the volume of the i th Class A item is a[i], and the value of the item is the remaining capacity of the backpack after loading the item * k1.
There are m Class B items, the volume of the i th Class B item is b[i], and the value of the item is the remaining capacity of the backpack after loading the item * k2.
Find the maximum value can be obtained.

Example
Example 1:

Given k1 = `3`,k2 = `2`,c = ` 7`,n = `2`,m = `3`,a = `[4,3]`,b = `[1,3,2]`，return `23`.
Input:
3 2 7 2 3
[4,3]
[1,3,2]
Output:
23

Explanation:
2 * (7-1)+2*(6-2) + 3 * (4-3) = 23
Example 2:

Given k1 = `1`,k2 = `2`,c = ` 5`,n = `1`,m = `1`,a = `[2]`,b = `[1]`，return `10`.
Input:
1 2 5 1 1
[2]
[1]
Output:
10

Explanation:
2 * (5-1)+1*(4-2) = 10
Notice
1 <= k1, k2, c, a[i], b[i] <= 10^7
1 <= n, m <= 1000

## Solution

```python
class Solution:
    """
    @param k1: The coefficient of A
    @param k2: The  coefficient of B
    @param T: The volume of backpack
    @param n: The amount of A
    @param m: The amount of B
    @param a: The volume of A
    @param b: The volume of B
    @return: Return the max value you can get
    """
    def getMaxValue(self, k1, k2, T, n, m, a, b):
        # Write your code here 
        
        ### 数组范围非常大的背包问题所以考虑alternative
    
        ### 这道题的关键在于找到放物品的规律。
        
        ### 对于物品m 或者 n，  一定是先放入volume 小的。
        
        ### 与Backpack VI 不同的是，每个物品只能放入一次。
        
        ### 所以不能使用最后一步是放入哪个物品。
        
        ### 需要找到合理的物品顺序。
        
        ### 对于任何一类的物品， 应该先放 volume 最小的。
        
        ### 证明对于依次放入的两个同类物品，重量必须从小到大。
        
        ### 所以 先要对每类物品进行排序。
        
        ### 于是此题变成了双序列型 的DP
        
        ### 取A类的前i个 和 B类 的 前j个。 物品放入背包的最大值f[i][j]
        
        ### initial f[0][0] = 0
        
        
        f = [[0] * (m + 1) for _ in range(n + 1)]
        
        
        ### sort a and b first
        a.sort()
        b.sort()
        
        ### 前缀和的方式优化 
        asum = [0] * (n + 1)
        bsum = [0] * (m + 1)
        
        ### prefix sum for asum and bsum arrays:
        for i in range(n):
            asum[i + 1] = a[i] + asum[i]
        for i in range(m):
            bsum[i + 1] = b[i] + bsum[i]
            
        ### initialization:
        f[0][0] = 0
        
        res = 0
        for i in range(n + 1):
            for j in range(m + 1):
                if (i + j > 0) and (asum[i] + bsum[j] <= T):
                    
                    if i > 0:
                        f[i][j] = f[i - 1][j] + (T - asum[i] - bsum[j]) * k1
                        
                    if j > 0:
                        f[i][j] = max(f[i][j], f[i][j - 1] + (T - asum[i] - bsum[j]) * k2)
                        
                    res = max(res, f[i][j])
                    
        return res
```
