---
title: "LeetCode 1216 Valid Palindrome III - Hard"
date: "2021-01-01"
excerpt: 1216. Valid Palindrome III
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 1216
comments: true
---

### 1216. Valid Palindrome III — Hard

[Open on LeetCode](https://leetcode.com/problems/valid-palindrome-iii/)

## Problem

1216. Valid Palindrome III

Given a string s and an integer k, find out if the given string is a K-Palindrome or not.

A string is K-Palindrome if it can be transformed into a palindrome by removing at most k characters from it.

 

Example 1:

Input: s = "abcdeca", k = 2
Output: true
Explanation: Remove 'b' and 'e' characters.
 

Constraints:

1 <= s.length <= 1000
s has only lowercase English letters.
1 <= k <= s.length

## Solution

```python
### Solution 1: recursion，属于Valid Palindrome II延伸， 会超时：

class Solution:
    
    def isValidPalindrome(self, s, k):
        return self.isValid(s, 0, len(s) - 1, 0, k)
    
    def isValid(self,s, left, right, count, k):
        left, right = self.find_ptrs(s, left, right)
        if count > k: 
            return False
        if left >= right: 
            return True
        return self.isValid(s, left + 1, right, count + 1, k) or self.isValid(s, left, right - 1, count + 1, k)
    
    def find_ptrs(self, s, left, right):
        while left < right :
            if s[left] != s[right]:
                return left, right     
            left += 1
            right -= 1
        return left, right

### Solution 2 拓展了Edit Distance的经典匹配型DP的方法：

class Solution:
    def isValidPalindrome(self, s: str, k: int) -> bool:
        ### convert to Edit Distance Problem 
        ### ==> word1: s, word2: s.reverse(),
        ### 匹配型DP, f[i][j], s中的前i个，
        ### 需要remove几次才能匹配s.reverse()的前j个。
        ### 这题在决策时不需要考虑replace的情况。
        n = len(s)
        f = [[0] * (n + 1) for _ in range(n + 1)]
        
        for i in range(n + 1):
            for j in range(n + 1):
                # 初始化
                if i == 0:
                    f[0][j] = j
                    continue
                if j == 0:
                    f[i][0] = i
                    continue
                    
                # 决策：
                if s[i - 1] != s[n - j]:
                    f[i][j] = min(f[i - 1][j], f[i][j - 1]) + 1
                else:
                    f[i][j] = f[i - 1][j - 1]
                    
        # 这里注意是两倍的k，
        # 因为在进行删除操作时，
        # 例如“abcca“和”accba“
        # 进行到在f[2][x]删除一个正序里的"b",
        # 进行到f[y][4]也会删掉一个倒序的”b“，
        # 但计算到f[y][4]会把f[2][x]的操作算进去。
        # 因为是同一个字符串的相反关系。
        # 与edit distance那题不同之处之一在于此。
        # 所以每一次删除操作，实际上是被算了两次。
        return f[n][n] <= 2 * k
```
