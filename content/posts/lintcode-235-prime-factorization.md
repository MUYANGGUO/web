---
title: "LintCode 235 Prime Factorization - Easy"
date: "2021-01-01"
excerpt: 235. Prime Factorization
kind: leetcode
tags:
  - LintCode
  - Easy
  - Python
order: 235
comments: true
---

### 235. Prime Factorization — Easy

[Open on LintCode](https://www.lintcode.com/problem/235/)

## Problem

235. Prime Factorization

Prime factorize a given integer.

Example
Example 1:

Input: 10
Output: [2, 5]
Example 2:

Input: 660
Output: [2, 2, 3, 5, 11]
Notice
You should sort the factors in ascending order.

## Solution

```python
# 最多只有一个质因子大于sqrt(n)，若有两个这样的质因子，则它们相乘>n，所以不存在。如果i+=1这样不停相除寻找，只需要到刚大于sqrt(n)即可。


class Solution:
    """
    @param num: An integer
    @return: an integer array
    """
    def primeFactorization(self, num):
        # write your code here
        result = []
        up = int(math.sqrt(num))
        
        k = 2
        while k <= up and num > 1:
            while num % k == 0:
                num //= k
                print(num)
                result.append(k)
            k += 1
            
        if num > 1:
            result.append(num)
        
        return result
```
