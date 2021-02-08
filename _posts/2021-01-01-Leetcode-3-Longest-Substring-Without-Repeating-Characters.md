---
layout: leetcode-page
title: "Leetcode 3 Longest Substring Without Repeating Characters - Medium"
date: 2021-01-01
order: 3
excerpt: ""
leetcode: true
tags: [Leetcode]
comments: true
---

<h2> 3. Longest Substring Without Repeating Characters - Medium  </h2>

[Go to Leetcode](https://leetcode.com/problems/longest-substring-without-repeating-characters/)

Given a string s, find the length of the **longest substring** without repeating characters.

<code>
Example 1:
</code>

```
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
```

<code>
Example 2:
</code>

```
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
```

<code>
Example 3:
</code>

```
Input: s = ""
Output: 0
```

<code>
Solution:
</code>

<code>
Two Pointers - Sliding Window, Hash Set for detecting duplicates, Space O(N), Time O(N)
</code>

``` python
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        longest = 0
        visited = set()
        j = 0
        for i in range(len(s)):
            while j < len(s) and s[j] not in visited:
                visited.add(s[j])
                j += 1
                longest = max(longest, j - i)
            # sliding the window, 
            # by removing the i ptr element in visited
            visited.remove(s[i])
            # prunning
            if j >= len(s):
                break
        return longest      
```
