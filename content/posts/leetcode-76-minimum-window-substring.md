---
title: "LeetCode 76 Minimum Window Substring - Hard"
date: "2021-01-01"
excerpt: "76. Minimum Window Substring -- Hard"
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 76
comments: true
---

### 76. Minimum Window Substring — Hard

[Open on LeetCode](https://leetcode.com/problems/minimum-window-substring/)

## Problem

76. Minimum Window Substring -- Hard

Given a string S and a string T, find the minimum window in S which will contain all the characters in T in complexity O(n).

Example:
Input: S = "ADOBECODEBANC", T = "ABC"
Output: "BANC"

Note:
If there is no such window in S that covers all characters in T, return the empty string "".
If there is such window, you are guaranteed that there will always be only one unique minimum window in S.

## Solution

```python
# 追击型Sliding Sindow:
class Solution:
    def minWindow(self, source: str, target: str) -> str:
     # 初始化counter_s和counter_t
        counter_s = defaultdict(int)
        counter_t = defaultdict(int)
        for ch in target:
            counter_t[ch] += 1
        left = 0
        valid = 0
        # 记录最小覆盖子串的起始索引及长度
        start = -1
        minlen = float('inf')
        for right in range(len(source)):
            # 移动右边界, ch 是将移入窗口的字符
            ch = source[right]
            if ch in counter_t:
                counter_s[ch] += 1
                if counter_s[ch] == counter_t[ch]:
                    valid += 1
            
            # 判断左侧窗口是否要收缩
            while valid == len(counter_t):
                # 更新最小覆盖子串
                if right - left < minlen:
                    minlen = right - left
                    start = left
                # left_ch 是将移出窗口的字符
                left_ch = source[left]
                # 左移窗口
                left += 1
                # 进行窗口内数据的一系列更新
                if left_ch in counter_s:
                    counter_s[left_ch] -= 1
                    if counter_s[left_ch] < counter_t[left_ch]:
                        valid -= 1
        # 返回最小覆盖子串
        if start == -1:
            return ""
        return source[start: start + minlen + 1]
```
