---
title: "LeetCode 126 Word Ladder II - Hard"
date: "2021-01-01"
excerpt: 126. Word Ladder II
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 126
comments: true
---

### 126. Word Ladder II — Hard

[Open on LeetCode](https://leetcode.com/problems/word-ladder-ii/)

## Problem

126. Word Ladder II

Given two words (beginWord and endWord), and a dictionary's word list, find all shortest transformation sequence(s) from beginWord to endWord, such that:

Only one letter can be changed at a time
Each transformed word must exist in the word list. Note that beginWord is not a transformed word.
Note:

Return an empty list if there is no such transformation sequence.
All words have the same length.
All words contain only lowercase alphabetic characters.
You may assume no duplicates in the word list.
You may assume beginWord and endWord are non-empty and are not the same.
Example 1:

Input:
beginWord = "hit",
endWord = "cog",
wordList = ["hot","dot","dog","lot","log","cog"]

Output:
[
  ["hit","hot","dot","dog","cog"],
  ["hit","hot","lot","log","cog"]
]
Example 2:

Input:
beginWord = "hit"
endWord = "cog"
wordList = ["hot","dot","dog","lot","log"]

Output: []

Explanation: The endWord "cog" is not in wordList, therefore no possible transformation.

## Solution

```python
### BFS + DFS 解法：


class Solution:
    def findLadders(self, start: str, end: str, dict: List[str]) -> List[List[str]]:

        from collections import defaultdict
        dict = set(dict)
        #将end添加进dict,防止结果为[]
        if end not in dict:
            return []
        res = []
        # 记录单词下一步能转到的单词
        next_word_dict = defaultdict(list)
        # 记录到start距离
        distance = {}
        distance[start] = 0
        
        # 暴力匹配,当前字符串修改一个字母后的新字符串存在于dict中
        def next_word(word):
            ans = []
            for i in range(len(word)):
            #97=ord('a')，123=ord('z')+1  
                for j in range(97, 123):
                    tmp = word[:i] + chr(j) + word[i + 1:]
                    if tmp != word and tmp in dict:
                        ans.append(tmp)
            return ans
        # 求到start的距离
        def bfs():
            q = collections.deque()
            q.append(start)
            step = 0
            flag = False #标记是否找到结果
            while len(q) is not 0:
                step += 1
                n=len(q)
                for i in range(n):
                    word = q.popleft()
                    for nextword in next_word(word):
                        next_word_dict[word].append(nextword)
                        #如果没被添加过，则进行添加
                        if nextword not in distance:
                            distance[nextword] = step
                            q.append(nextword)
                       #当下一跳是end时，就可以结束搜索
                        if nextword == end:
                            flag = True

                if flag:
                    break
                    
        # 遍历所有从start到end的路径
        def dfs(tmp, step):
            if tmp[-1] == end:
                res.append(tmp)
                return
            for word in next_word_dict[tmp[-1]]:
                if distance[word] == step + 1:
                    dfs(tmp + [word], step + 1)
        #bfs搜start--end的最短路径           
        bfs()
        #dfs输出距离最短的路径
        dfs([start], 0)
        return res
```
