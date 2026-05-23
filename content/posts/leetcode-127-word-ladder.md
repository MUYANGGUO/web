---
title: "LeetCode 127 Word Ladder - Medium"
date: "2021-01-01"
excerpt: 127. Word Ladder
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 127
comments: true
---

### 127. Word Ladder — Medium

[Open on LeetCode](https://leetcode.com/problems/word-ladder/)

## Problem

127. Word Ladder

Given two words (beginWord and endWord), and a dictionary's word list, find the length of shortest transformation sequence from beginWord to endWord, such that:

Only one letter can be changed at a time.
Each transformed word must exist in the word list.
Note:

Return 0 if there is no such transformation sequence.
All words have the same length.
All words contain only lowercase alphabetic characters.
You may assume no duplicates in the word list.
You may assume beginWord and endWord are non-empty and are not the same.
Example 1:

Input:
beginWord = "hit",
endWord = "cog",
wordList = ["hot","dot","dog","lot","log","cog"]

Output: 5

Explanation: As one shortest transformation is "hit" -> "hot" -> "dot" -> "dog" -> "cog",
return its length 5.
Example 2:

Input:
beginWord = "hit"
endWord = "cog"
wordList = ["hot","dot","dog","lot","log"]

Output: 0

Explanation: The endWord "cog" is not in wordList, therefore no possible transformation.

## Solution

```python
### BFS:

class Solution:
    def ladderLength(self, start, end, wordList):
        """
        :type beginWord: str
        :type endWord: str
        :type wordList: List[str]
        :rtype: int
        """

        ### BFS solution
        ### first，convert list to set for easy access in O(1) time
        word_List = set()
        for word in wordList:
            word_List.add(word)
        
        ### 开始queue
        queue = collections.deque([start])
        ### 开始记录 visited node
        visited = set([start])
        ### 开始记录步数
        distance = 0
        while queue:
            ### 遍历下一层前， distance + 1， 例如： hot - dot， hot - hit， hot - hog 每次仅有一个字母不同的全找到，这为下一层，所以两层distance 为 1
            distance += 1
            for i in range(len(queue)):
                word = queue.popleft()
                if word == end:
                    return distance
                ### 找到以当前 node 为source的所有children
                for next_word in self.get_next_words(word):
                    if next_word not in word_List or next_word in visited:
                        continue
                    ### 如果找到，就append上去。同时标记visited 标记 visited, 是为了保持方向性，不会出现hit - hot - hit这种环的死循环。
                    queue.append(next_word)
                    visited.add(next_word) 

        return 0
        
    # O(26 * L^2)
    # L is the length of word
    def get_next_words(self, word):
        words = []
        for i in range(len(word)):
            left, right = word[:i], word[i + 1:]
            ### 考虑所有情况。
            for char in 'abcdefghijklmnopqrstuvwxyz':
                if word[i] == char:
                    continue
                words.append(left + char + right)
        return words
        


### 双向BFS解法：

class Solution:
    """
    @param: start: a string
    @param: end: a string
    @param: dict: a set of string
    @return: An integer
    """
    def ladderLength(self, start, end, wordSet):
        if start == end:
            return 1
        
        wordSet.add(start)
        wordSet.add(end)
        graph = self.construct_graph(wordSet)
        
        forward_queue = collections.deque([start])
        forward_set = set([start])
        backward_queue = collections.deque([end])
        backward_set = set([end])

        distance = 1
        while forward_queue and backward_queue:
            distance += 1
            if self.extend_queue(graph, forward_queue, forward_set, backward_set):
                return distance
            distance += 1
            if self.extend_queue(graph, backward_queue, backward_set, forward_set):
                return distance
        
        return -1
        
    def extend_queue(self, graph, queue, visited, opposite_visited):
        for _ in range(len(queue)):
            word = queue.popleft()
            for next_word in graph[word]:
                if next_word in visited:
                    continue
                if next_word in opposite_visited:
                    return True
                queue.append(next_word)
                visited.add(next_word)
        return False
            
    def construct_graph(self, wordSet):
        graph = {}
        for word in wordSet:
            graph[word] = self.get_next_words(word, wordSet)
        return graph
    
    def get_next_words(self, word, wordSet):
        next_word_set = set()
        for i in range(len(word)):
            prefix = word[:i]
            suffix = word[i + 1:]
            chars = list('abcdefghijklmnopqrstuvwxyz')
            chars.remove(word[i])
            for char in chars:
                next_word = prefix + char + suffix
                if next_word in wordSet:
                    next_word_set.add(next_word)
        return next_word_set
```
