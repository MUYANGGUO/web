---
title: "LeetCode 87 Scramble String - Hard"
date: "2021-01-01"
excerpt: "Given a string s1, we may represent it as a binary tree by partitioning it to two non-empty substrings recursively."
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 87
comments: true
---

### 87. Scramble String — Hard

[Open on LeetCode](https://leetcode.com/problems/scramble-string/)

## Problem

Given a string s1, we may represent it as a binary tree by partitioning it to two non-empty substrings recursively.

Below is one possible representation of s1 = "great":

    great
   /    \
  gr    eat
 / \    /  \
g   r  e   at
           / \
          a   t
To scramble the string, we may choose any non-leaf node and swap its two children.

For example, if we choose the node "gr" and swap its two children, it produces a scrambled string "rgeat".

    rgeat
   /    \
  rg    eat
 / \    /  \
r   g  e   at
           / \
          a   t
We say that "rgeat" is a scrambled string of "great".

Similarly, if we continue to swap the children of nodes "eat" and "at", it produces a scrambled string "rgtae".

    rgtae
   /    \
  rg    tae
 / \    /  \
r   g  ta  e
       / \
      t   a
We say that "rgtae" is a scrambled string of "great".

Given two strings s1 and s2 of the same length, determine if s2 is a scrambled string of s1.

Example 1:

Input: s1 = "great", s2 = "rgeat"
Output: true
Example 2:

Input: s1 = "abcde", s2 = "caebd"
Output: false

## Solution

```python
# 如果组成 s1 和 s2 的每种字符的数量不同, 可以直接判定为 false, 例如样例2的 "a" 和 "b". 以及两个字符串长度不相同也可以直接返回 false.

# 这道题目的重点实际上是找到构造二叉树的方式. 二叉树的构造决定了 s1 的哪些部分可以交换位置来得到新的字符串. 下面提供了多个版本算法的代码, 这里只介绍动态规划的思路:

# 设定状态: f[l1][r1][l2][r2] 表示是否可以由 s1 的[l1, r1]的子串攀爬得到 s2 的[l2, r2]的子串. 决策便是从哪里分割 s1, 所以我们枚举分割的点, 于是达到了子问题.

# 不过需要注意的是, 由于二叉树的子节点可以被交换, 所以 s2 可能是被交换过的, 所以完整的状态转移方程是:

# // 枚举k, 表示从 s1的 [l1, r1] 的第k个字符后分割, 只要有其中一种分割可以得到 s2 即可, 因此是在枚举的 k 中取 或运算
# f[l1][r1][l2][r2] = OR (f[l1][l1 + k - 1][l2][l2 + k - 1] && f[l1 + k][r1][l2 + k][r2]) // 该节点的两个子节点没有交换过
#                     OR (f[l1][l1 + k - 1][r2 - k + 1][r2] && f[l1 + k][r1][l2][r2 - k]) // 该节点的两个子节点交换过
# 边界状态即: f[l1][l1][l2][l2] = (s1[l1] == s2[l2])

# 注意到 r1 - l1 == r2 - l2, 所以这个四维数组可以被优化掉一维.


### 普通DP

class Solution:
    def isScramble(self, s1, s2):
        n = len(s1)
        # 此处的trick是利用长度降维，k为长度。
        # f[i][j][k] 表示 s1[i : i + k] 攀爬能否得到 s2[j : j + k]
        f = [[[False] * (n + 1) for _ in range(n)] for _ in range(n)]
        for i in range(n):
            for j in range(n):
                f[i][j][1] = s1[i] == s2[j]
        for k in range(2, n + 1):
            for i in range(0, n - k + 1):
                for j in range(0, n - k + 1):
                    for t in range(1, k):
                        if f[i][j][t] and f[i + t][j + t][k - t]:
                            f[i][j][k] = True
                            break
                        if f[i][j + k - t][t] and f[i + t][j][k - t]:
                            f[i][j][k] = True
                            break
        return f[0][0][n]



### 记忆化搜索 DP：

def isScramble(self, s1, s2):
    memo = {}
    return self.is_scramble_string(s1, 0, s2, 0, len(s1),  memo)

# 递归的定义
# 判断从i,j长度len为n的子串, 这里是指s1, s2 （已经切割好了）, 是否scramble
def is_scramble_string(self, s1, i, s2, j, k, memo):
    if (i, j, k) in memo:
        return memo[(i, j, k)]

    # write your code here
    # 递归的出口
    if s1 == s2: 
        memo[(i, j, k)] = True
        return True
    
    if len(s1) != len(s2): 
        memo[(i, j, k)] = False
        return False

    if collections.Counter(s1) != collections.Counter(s2): 
        memo[(i, j, k)] = False
        return False

    # 或者sorted后比较，但计算复杂度变高
    # if sorted(s1) != sorted(s2): 
    #     memo[(i, j, k)] = False
    #     return False

    # 递归的拆解
    for ii in range(1, len(s1)):

        # 情况一 比较 两个前缀和两个后缀
        if self.is_scramble_string(s1[:ii], i, s2[:ii], j, ii, memo) and self.is_scramble_string(s1[ii:], i + ii, s2[ii:], j + ii, k - ii, memo): 
            memo[(i, j, k)] = True
            return True
        # 情况二 比较前缀和后缀
        if self.is_scramble_string(s1[:ii], i, s2[-ii:], j + k - ii, ii, memo) and self.is_scramble_string(s1[ii:], i + ii, s2[:-ii], j, k - ii, memo):
            memo[(i, j, k)] = True
            return True
    memo[(i, j, k)] = False
    return False


### DFS：
class Solution:
    def isScramble(self, s1, s2):
        if len(s1) != len(s2):
            return False
        if s1 == s2:
            return True
        if sorted(list(s1)) != sorted(list(s2)):
            return False
        length = len(s1)
        for i in range(1, length):
            if self.isScramble(s1[:i], s2[:i]) and self.isScramble(s1[i:], s2[i:]):
                return True
            if self.isScramble(s1[:i], s2[length-i:]) and self.isScramble(s1[i:], s2[:length-i]):
                return True
        return False
```
