---
title: "LeetCode 424 Longest Repeating Character Replacement - Medium"
date: "2021-01-01"
excerpt: 424. Longest Repeating Character Replacement
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 424
comments: true
---

### 424. Longest Repeating Character Replacement — Medium

[Open on LeetCode](https://leetcode.com/problems/longest-repeating-character-replacement/)

## Problem

424. Longest Repeating Character Replacement

Given a string s that consists of only uppercase English letters, you can perform at most k operations on that string.

In one operation, you can choose any character of the string and change it to any other uppercase English character.

Find the length of the longest sub-string containing all repeating letters you can get after performing the above operations.

Note:
Both the string's length and k will not exceed 104.

Example 1:

Input:
s = "ABAB", k = 2

Output:
4

Explanation:
Replace the two 'A's with two 'B's or vice versa.
 

Example 2:

Input:
s = "AABABBA", k = 1

Output:
4

Explanation:
Replace the one 'A' in the middle with 'B' and form "AABBBBA".
The substring "BBBB" has the longest repeating letters, which is 4.

## Solution

```python
class Solution:
    def characterReplacement(self, s, k):
        ### 同向双指针 sliding window类型经典题目
        if not s:
            return 0
        ### 选择j和i在0，0 起点
        j = 0
        ### 用maxFreq来记录，并且计算窗口中需要replace的少数characters, 这里一定是多数会成为maxFreq，然后去替换少数。
        maxFreq = 0
        
        ### 用dict来maintain window里的计数
        counter = {}
        
        
        res = 0
        for i in range(len(s)):
            
            ### 这里若 j < len(s) 则不会执行了，而j是不断递增地，所以overall，O（N）的复杂度，不是O（n^2） 
            ### 退出条件，如果 j - i - maxFreq <= k, 这里一定是小于等于
            ### j - i 是目前的长度，减去maxFreq那么则是 需要被替换的个数
            while j < len(s) and j - i - maxFreq <= k:
                ### 记录j上的数，放进计数器更新
                counter[s[j]] = counter.get(s[j], 0) + 1
                ### 同时查看新进入window的数 freq是否超过maxFreq，更新
                maxFreq = max(maxFreq, counter[s[j]])
                ### 右移动j指针
                j += 1
            ### 如果跳出了循环，那么check j - i - maxFreq 与k的关系
            if j - i - maxFreq > k:
                ### 大于 k，此时的j之前的一位 j - 1 是没跳出循环前满足条件的位置，那么 j - 1 - i 就是符合条件的长度
                res = max(res, j - i - 1)
            else:
                ### 如果是别的情况，比如是j越界了，但是k还是满足的，那么说明现在位置j仍然满足条件，目前的窗口长度就是j - i
                res = max(res, j - i)
            ### 在iterate 下一个 i 之前，在counter里剪掉 i上的数
            counter[s[i]] -= 1
            ### 不要忘了修改counter以后需要更新maxFreq，这里虽然用了遍历counter.values() 的方式，实际上这个list的key是有限的，因为是按字母存的，可以认为对时间复杂度没有影响。
            maxFreq = max(counter.values())
        
        return res
```
