---
title: "Practice Notes 4 — BFS"
date: "2021-01-01"
excerpt: ""
kind: post
tags:
  - Algorithm Notes
  - Study Notes
comments: true
---

### Chapter 4 BFS

1. [LeetCode 542 01 Matrix](https://leetcode.com/problems/01-matrix/)

    **Problem:**

    Given a matrix consists of 0 and 1, find the distance of the nearest 0 for each cell.

    The distance between two adjacent cells is 1.

    **Note:**

    The number of elements of the given matrix will not exceed 10,000.

    There are at least one 0 in the given matrix.

    The cells are adjacent in only four directions: up, down, left and right.

    **Example:**

    ```
    Input:
    [[0,0,0],
    [0,1,0],
    [0,0,0]]

    Output:
    [[0,0,0],
    [0,1,0],
    [0,0,0]]

    Input:
    [[0,0,0],
    [0,1,0],
    [1,1,1]]

    Output:
    [[0,0,0],
    [0,1,0],
    [1,2,1]]
    ```

    **Solution: BFS + visited 利用深度进行标记**

    ```python
    from collections import deque

    class Solution:
        def updateMatrix(self, matrix: List[List[int]]) -> List[List[int]]:
            
            m, n = len(matrix), len(matrix[0])
            queue = deque()
            directions = [(0, 1),(0, -1),(1, 0), (-1, 0)]
            for i in range(m):
                for j in range(n):
                    if matrix[i][j] != 0:
                        matrix[i][j] = - 1
                        continue
                    ### queue is all zero cells to start, as they have a depth initialization of 0
                    queue.append((i, j))
            
            while queue:
                x, y = queue.popleft()
                #pop 出来一个点 开始BFS
                for dx, dy in directions:
                    new_x, new_y = x + dx, y + dy
                    # 判断边界条件 非法情况忽略
                    if not self.isValid(new_x, new_y, matrix):
                        continue
                    # 如果neigbor depth大于等于0 忽略，
                    # 因为说明neighbor数字为0或者已经被更新过，也就是说有上层邻居更新过，非常巧妙地去重方式。
                    if matrix[new_x][new_y] >= 0:
                        continue
                    matrix[new_x][new_y] = matrix[x][y] + 1
                    queue.append((new_x, new_y))
            return matrix
                
        def isValid(self, x, y, matrix):
            if 0 <= x <len(matrix) and 0 <= y < len(matrix[0]):
                return True
            return False
    ```

    ---

2. [LeetCode 127 Word Ladder](https://leetcode.com/problems/word-ladder/)

    **Problem:**

    Given two words (beginWord and endWord), and a dictionary's word list, find the length of shortest transformation sequence from beginWord to endWord, such that:

    1. Only one letter can be changed at a time.
    2. Each transformed word must exist in the word list.

    **Notes:**

    Return 0 if there is no such transformation sequence.

    All words have the same length.

    All words contain only lowercase alphabetic characters.

    You may assume no duplicates in the word list.

    You may assume beginWord and endWord are non-empty and are not the same.

    **Example:**

    ```
    Input:
    beginWord = "hit",
    endWord = "cog",
    wordList = ["hot","dot","dog","lot","log","cog"]

    Output: 5

    Explanation: As one shortest transformation is "hit" -> "hot" -> "dot" -> "dog" -> "cog",
    return its length 5.

    Input:
    beginWord = "hit"
    endWord = "cog"
    wordList = ["hot","dot","dog","lot","log"]

    Output: 0

    Explanation: The endWord "cog" is not in wordList, therefore no possible transformation.
    ```

    **Solution: BFS + 找出下一层所有符合条件的单词的简化方法**

    ```python
    class Solution:
        def ladderLength(self, start: str, end: str, wordList: List[str]) -> int:
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
                ### 遍历下一层前， distance + 1， 
                ### 例如： hot - dot， hot - hit， hot - hog 
                ### 每次仅有一个字母不同的全找到，这为下一层，所以两层distance 为 1
                distance += 1
                for i in range(len(queue)):
                    word = queue.popleft()
                    if word == end:
                        return distance
                    ### 找到以当前 node 为source的所有children
                    for next_word in self.get_next_words(word):
                        if next_word not in word_List or next_word in visited:
                            continue
                        ### 如果找到，就append上去。同时标记visited 标记 visited, 
                        ### 是为了保持方向性，不会出现hit - hot - hit这种环的死循环。
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
            
    ```

    ---
