---
title: "Algorithm Notes: DFS Lecture Part1"
date: "2021-01-01"
excerpt: ""
kind: post
tags:
  - Algorithm Notes
  - Study Notes
comments: true
---

## DFS 精讲 part 1 (streaming lecture)


### 1. 什么时候使用DFS？

Binary Tree 的问题大部分都是DFS， 而一般来说，碰到找所有方案的题目，基本可以确定是DFS， 除了二叉树以外的90% DFS 的题，则要么是排列，要么是组合。

找所有满足某个条件的方案

找到图中的所有满足条件的路径

路径 = 方案 = 图中节点的排列组合

很多题不像二叉树那样直接给你一个图(二叉树也是一个图), 点、边、路径是需要你自己去分析的 (Implicit Graph)

点:集合中的元素

边:元素与元素之间用**有向边**连接,小的点指向大的点(为了避免选出 12 和 21 这种重复集合)

路径:= 子集 = 图中任意点出发到任意点结束的一条路径

一般来说：

**组合问题**

问题模型:求出所有满足条件的“组合”。

判断条件:组合中的元素是顺序无关的。

时间复杂度:与 2^n 相关。


**排列问题**‘

问题模型:求出所有满足条件的“排列”。

判断条件:组合中的元素是顺序“相关”的。

时间复杂度:与 n! 相关。

### 2. DFS 时间复杂度通用计算公式

O(方案个数 * 构造每个方案的时间)

排列问题 = O(n! * n)

组合问题 = O(2^n * n)


### 3. DFS 搜索去重的诀窍 -- 选代表

错误的方法是 hashset法。 正确的方法是： 在每组重复方案中选出代表方案。比如[1, 2', 2''] 选择而不选[1, 2'', 2']。

例题 1：[10 String Permutation II](https://www.lintcode.com/problem/string-permutation-ii/my-submissions)

 递归DFS + 去重操作：

```python
class Solution:
    """
    @param str: A string
    @return: all permutations
    """
    def stringPermutation2(self, str):
        # write your code here
        ### 想去重，同样需要现排序
        chars = sorted(list(str))
        visited = [False] * len(chars)
        permutations = []
        self.dfs(chars, visited, [], permutations) 
        return permutations

    def dfs(self, chars, visited, permutation, permutations):
        if len(chars) == len(permutation):
            permutations.append(''.join(permutation))
            return    
        
        for i in range(len(chars)):
            if visited[i]:
                continue
            ### 去重
            if i > 0 and chars[i] == chars[i - 1] and not visited[i - 1]:
                # a' a" b
                # => a' a" b => √
                # => a" a' b => x
                # 不能跳过一个a选下一个a
                continue

            # make changes
            visited[i] = True
            permutation.append(chars[i])

            # 找到所有 permutation 开头的排列
            # 找到所有 "a" 开头的
            self.dfs(chars, visited, permutation, permutations)

            # backtracking
            permutation.pop()
            visited[i] = False
```

例题 2 [LeetCode-39 Combination Sum](https://leetcode.com/problems/combination-sum/)

这题则是可以重复选取数字。我们利用start index 进行递归，下一次递归 仍是在start index就可以达成目的。

而为了这么做，还先要把数组去重，让每个数都是unique，然后再考虑是否重复选取。


```python

class Solution:
    """
    @param candidates: A list of integers
    @param target: An integer
    @return: A list of lists of integers
    """
    def combinationSum(self, candidates, target):
        # write your code here
        ### 利用set来去重
        candidates = sorted(list(set(candidates)))
        results = []
        self.dfs(candidates, target, 0, [], results)
        return results

    # 递归的定义：在candidates[start ... n-1] 中找到所有的组合，他们的和为 target
    # 和前半部分的 combination 拼起来放到 results 里
    # （找到所有以 combination 开头的满足条件的组合，放到 results）
    def dfs(self, candidates, target, start, combination, results):
        # 递归的出口：target <= 0
        if target < 0:
            return
        
        if target == 0:
            # deepcooy
            return results.append(list(combination))
            
        # 递归的拆解：挑一个数放到 combination 里
        for i in range(start, len(candidates)):
            # [2] => [2,2]
            combination.append(candidates[i])
            
            ### 下次递归还是 i 为start index，这样就能重复选择。
            self.dfs(candidates, target - candidates[i], i, combination, results)

            # [2,2] => [2]
            combination.pop()  # backtracking

```

补充：[LeetCode-40 Combination Sum II](https://leetcode.com/problems/combination-sum-ii/)

```python
class Solution:
    def combinationSum2(self, candidates, target):
        # write your code here
        candidates = sorted(candidates)
        results = []
        self.dfs(candidates, target, 0, [], results)
        return results

    # 递归的定义：在candidates[start ... n-1] 中找到所有的组合，他们的和为 target
    # 和前半部分的 combination 拼起来放到 results 里
    # （找到所有以 combination 开头的满足条件的组合，放到 results）
    def dfs(self, candidates, target, start, combination, results):
        # 递归的出口：target <= 0
        if target < 0:
            return
        
        if target == 0:
            # deepcooy
            return results.append(list(combination))
            
        # 递归的拆解：挑一个数放到 combination 里
        for i in range(start, len(candidates)):
            if candidates[i]>target:
                return 
            # subset with duplicate 的判定
            if candidates[i] == candidates[i-1] and i > start:
                continue 
            # [2] => [2,2]
            combination.append(candidates[i])
            self.dfs(candidates, target - candidates[i], i + 1, combination, results)
            # [2,2] => [2]
            combination.pop()  # backtracking

```

例题 3 [90 k Sum II](https://www.lintcode.com/problem/k-sum-ii/description)

与例题2很相像。

```python

class Solution:
    """
    @param: A: an integer array
    @param: k: a postive integer <= length(A)
    @param: targer: an integer
    @return: A list of lists of integer
    """
    def kSumII(self, A, k, target):
        # write your code here
        A = sorted(A)
        subsets = []
        self.dfs(A, 0, k, target, [], subsets)
        return subsets
        
    def dfs(self, A, index, k, target, subset, subsets):
        if k == 0 and target == 0:
            subsets.append(list(subset))
            return
        
        if k == 0 or target <= 0:
            return
        
        for i in range(index, len(A)):
            subset.append(A[i])
            self.dfs(A, i + 1, k - 1, target - A[i], subset, subsets)
            subset.pop()

```

starting index 方法一般用来求组合问题，visited array 一般用来求排列问题。


例题 4 [LeetCode-17 Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/)

```python
### 自己做一个常量表

KEYBOARD = {
    '2':'abc',
    '3':'def',
    '4':'ghi',
    '5':'jkl',
    '6':'mno',
    '7':'pqrs',
    '8':'tuv',
    '9':'wxyz'
}

class Solution:
    def letterCombinations(self, digits):
        if not digits:
            return []
        
        res = []
        self.dfs(digits, 0, [], res)
        return res
        
    def dfs(self, digits, start, chars, res):
        if start == len(digits):
            ### 通过创建string 完成类似deepcopy的操作。
            res.append(''.join(chars))
            return
        
        for letter in KEYBOARD[digits[start]]:
            chars.append(letter)
            self.dfs(digits, start + 1, chars, res)
            chars.pop()
```

Follow up: 如果有一个词典（dictionary）要求组成的单词都是词典里的如何优化？

应该用Trie数据结构。Hashset也可以用来替代Trie的作用， 来做前缀查询。下面的例题也用到了这个概念。

例题 5 [LeetCode-212 Word Search II](https://leetcode.com/problems/word-search-ii/)

在矩阵上进行DFS。

这道题目的搜索策略应该是：for 矩阵里的每个单词 『check 单词 是否 在词典里』

```python
DIRECTIONS = [(0, -1), (0, 1), (-1, 0), (1, 0)]


class Solution:
    def findWords(self, board, words):
        if board is None or len(board) == 0:
            return []
        
        # pre-process
        # 预处理
        word_set = set(words)
        prefix_set = set()
        for word in words:
            for i in range(len(word)):
                prefix_set.add(word[:i + 1])
        
        result = set()
        for i in range(len(board)):
            for j in range(len(board[0])):
                self.dfs(
                    board,
                    i,
                    j,
                    board[i][j],
                    word_set,
                    prefix_set,
                    set([(i, j)]),
                    result,
                )
                
        return list(result)
        
    def dfs(self, board, x, y, word, word_set, prefix_set, visited, result):
        if word not in prefix_set:
            return
        
        if word in word_set:
            result.add(word)
        
        for delta_x, delta_y in DIRECTIONS:
            x_ = x + delta_x
            y_ = y + delta_y
            
            if not self.inside(board, x_, y_):
                continue
            if (x_, y_) in visited:
                continue
            
            visited.add((x_, y_))
            self.dfs(
                board,
                x_,
                y_,
                word + board[x_][y_],
                word_set,
                prefix_set,
                visited,
                result,
            )
            visited.remove((x_, y_))
            
    def inside(self, board, x, y):
        return 0 <= x < len(board) and 0 <= y < len(board[0])

```

例题拓展：

1. [1848 Search Words III](https://www.lintcode.com/problem/word-search-iii/description)
2. [635 Boggle Game](https://www.lintcode.com/problem/boggle-game/description)


例题 6： [LeetCode-126 Word Ladder II](https://leetcode.com/problems/word-ladder-ii/)

找所有最短路径。

BFS + DFS

```python
from collections import deque

class Solution:
    """
    @param: start: a string
    @param: end: a string
    @param: dict: a set of string
    @return: a list of lists of string
    """
    def findLadders(self, start, end, dict):
        dict.add(start)
        dict.add(end)
        indexes = self.build_indexes(dict)
        
        distance = self.bfs(end, indexes)
        
        results = []
        self.dfs(start, end, distance, indexes, [start], results)
        
        return results
        
    def build_indexes(self, dict):
        indexes = {}
        for word in dict:
            for i in range(len(word)):
                key = word[:i] + '%' + word[i + 1:]
                if key in indexes:
                    indexes[key].add(word)
                else:
                    indexes[key] = set([word])
        return indexes

    def bfs(self, end, indexes):
        distance = {end: 0}
        queue = deque([end])
        while queue:
            word = queue.popleft()
            for next_word in self.get_next_words(word, indexes):
                if next_word not in distance:
                    distance[next_word] = distance[word] + 1
                    queue.append(next_word)
        return distance
    
    def get_next_words(self, word, indexes):
        words = []
        for i in range(len(word)):
            key = word[:i] + '%' + word[i + 1:]
            for w in indexes.get(key, []):
                words.append(w)
        return words
                        
    def dfs(self, curt, target, distance, indexes, path, results):
        if curt == target:
            results.append(list(path))
            return
        
        for word in self.get_next_words(curt, indexes):
            if distance[word] != distance[curt] - 1:
                continue
            path.append(word)
            self.dfs(word, target, distance, indexes, path, results)
            path.pop()
```

补充例题： [680 Split String](https://www.lintcode.com/problem/split-string/description)

DFS

算法分析
由于本题可以选择在一个字符或两个相邻字符之后拆分字符串，且最后需输出所有可能的组合，即每次都需要把整个字符串按照特定要求切分完毕，可以想到利用递归dfs来完成；

算法步骤
对字符串进行深度优先搜索，当前位置达到字符串末尾作为边界。搜索时有两种情况：

1. 切割当前的1个字符：

将这1个字符单独作为字符串存入列表

当前位置步进1

2. 切割当前的连续2个字符（需满足当前位置不是字符串末尾）：

将连续2个字符保存为字符串存入列表

当前位置步进2

复杂度分析
时间复杂度：O(2^n), n为字符串长度

除了字符串最后一位，其他位置都有两种切割方式
空间复杂度：O(2^n^2),n为字符串长度

存储所有情况需要所有切分方式*n 的空间


```python
class Solution:

    """

    @param: : a string to be split

    @return: all possible split string array

    """

    def splitString(self, s):

        # write your code here

        result = []

        self.dfs(result, [], s)

        return result 

    

    def dfs(self, result, current, s):

        if s == "":

            result.append(current[:])

            return 

        #利用python字符串分片，可以用循环来完成两种切割方式

        for i in range(2):

            if i+1 <= len(s):

                current.append(s[:i+1])

                self.dfs(result, current, s[i+1:])

                current.pop()

```

补充例题： [LeetCode-291 Word Pattern II](https://leetcode.com/problems/word-pattern-ii/)

深度优先搜索算法。 这个题不能使用动态规划或者记忆化搜索，因为参数列表中 mapping 和 used 无法记录到记忆化的哈希表中。

算法：DFS

1. 本题和字模式I不同,题干没有给出要配对的字符串,因此需要定义一个map类型dict来记录模板pattern中的字母对应配对的字符串,set类型used记录这个配对的字符串是否被枚举过。

2. 对输入的字符串str进行深度优先搜索，传入的参数包括：模板pattern、字符串str、dict、used；

    a. 当pattern搜索到末尾且str也搜索到末尾即能完全匹配，返回true；

    b. 如果当前模板的字母已经有匹配过字符串word:

        如果word和现应匹配的str不匹配，则返回false；（例如模板为：ABA，字符串为abc，则搜索到第三位时A已经匹配过a，但现在str中是c无法匹配；）

        如果word和现应匹配的str匹配，则递归调用dfs并返回结果，步进为：pattern往后1位，str往后word的长度位数；

    c. 如果当前模板的字母未匹配过字符串：

遍历整个str，枚举字符串前缀word的作为匹配；

若当前的word在set中则证明其已经在b.步骤中完成，可以剪枝；

将word加入dict和used；

递归调用dfs并返回结果，步进为：pattern往后1位，str往后word长度位数；

将word从dict和used中删除；

若所有的word都无法匹配，返回false；

复杂度分析
时间复杂度：O(lengthStr^lengthPattern)

每次递归有lengthStr种匹配串，一共有lengthPattern次，为指数级；
空间复杂度：O(lengthPattern)

需要使用map和set进行存储记录；

```python
class Solution:
    def wordPatternMatch(self, pattern, string):
        
        return self.is_match(pattern, string, {}, set())
    
    def is_match(self, pattern, string, mapping, used):
        
        if not pattern:
            return not string
        
        char = pattern[0]
        
        ### 如果mapping里已经有当前的char
        if char in mapping:
            word = mapping[char]
            ### startwith is a python function cheking prefix of a string, if contain, return true, else return false
            if not string.startswith(word):
                return False
            return self.is_match(pattern[1:], string[len(word):], mapping, used)
        ### 如果没有当前的char
        for i in range(len(string)):
            word = string[:i + 1]
            if word in used:
                continue
            
            used.add(word)
            ### 添加进mapping
            mapping[char] = word
            
            if self.is_match(pattern[1:], string[i + 1:], mapping, used):
                return True
            
            del mapping[char]
            used.remove(word)
            
        
        return False
            

```
