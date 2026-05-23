---
title: "Algorithm Notes: DFS Lecrture Part2"
date: "2021-01-01"
excerpt: ""
kind: post
tags:
  - Algorithm Notes
  - Study Notes
comments: true
---

## DFS 精讲 part 2 (replay lecture)

### 难题 1. N-Queens 皇后问题

皇后问题是经典的回溯算法的应用，也是一道可以被看作**排列搜索**的题目。

[LeetCode-51 N-Queens](https://leetcode.com/problems/n-queens/)

> 另一种问法： 问方案总数 (N Queens II)  

> [LeetCode-52 N-Queens II](https://leetcode.com/problems/n-queens-ii/)

借助此问题，来学习DFS搜索类问题的程序结构。

一般来说：

结构：

1. 入口函数
2. 搜索函数
3. 判断函数
4. 打印函数

这道题的解法就很好的遵循了这四个步骤方程。

```python
class Solution:
    def solveNQueens(self, n):
        results = []
        self.search(n, [], results)
        return results
    
    def search(self, n, cols, results):
        row = len(cols)
        if row == n:
            results.append(self.draw_chessboard(cols))
            return
        
        for col in range(n):
            if not self.is_valid(cols, row, col):
                continue
            cols.append(col)
            self.search(n, cols, results)
            cols.pop()
    
    def draw_chessboard(self, cols):
        n = len(cols)
        board = []
        for i in range(n):
            row = ['Q' if j == cols[i] else '.' for j in range(n)]
            board.append(''.join(row))
        return board
    
    def is_valid(self, cols, row, col):
        for r, c in enumerate(cols):
            ### 直线
            if c == col:
                return False
            ### 双斜线
            if r - c == row - col or r + c == row + col:
                return False
        
        return True
```

可以如下优化is_valid()这个判断函数 O（N） ->  O(1)，但是对整体的时间复杂度并没有影响。

通过哈希表 记录哪些列，斜对角线被占。

```python
class Solution:
    """
    @param: n: The number of queens
    @return: All distinct solutions
    """
    def solveNQueens(self, n):
        boards = []
        visited = {
            'col': set(),
            'sum': set(),
            'diff': set(),
        }
        self.dfs(n, [], visited, boards)
        return boards
        
    def dfs(self, n, permutation, visited, boards):
        if n == len(permutation):
            boards.append(self.draw(permutation))
            return
        
        row = len(permutation)
        for col in range(n):
            if not self.is_valid(permutation, visited, col):
                continue
            permutation.append(col)
            visited['col'].add(col)
            visited['sum'].add(row + col)
            visited['diff'].add(row - col)
            self.dfs(n, permutation, visited, boards)
            visited['col'].remove(col)
            visited['sum'].remove(row + col)
            visited['diff'].remove(row - col)
            permutation.pop()

    # O(1)
    def is_valid(self, permutation, visited, col):
        row = len(permutation)
        if col in visited['col']:
            return False
        if row + col in visited['sum']:
            return False
        if row - col in visited['diff']:
            return False
        return True
        
    def draw(self, permutation):
        board = []
        n = len(permutation)
        for col in permutation:
            row_string = ''.join(['Q' if c == col else '.' for c in range(n)])
            board.append(row_string)
        return board

```

[LeetCode-52 N-Queens II](https://leetcode.com/problems/n-queens-ii/)

```python
class Solution:
    ### use class global variable to pass/modify value in recursion
    results = 0

    def totalNQueens(self, n):
        self.search(n, [], self.results)
        return self.results
    
    def search(self, n, cols, results):
        row = len(cols)
        if row == n:
            self.results += 1
            return
        
        for col in range(n):
            if not self.is_valid(cols, row, col):
                continue
            cols.append(col)
            self.search(n, cols, results)
            cols.pop()
    
    def is_valid(self, cols, row, col):
        for r, c in enumerate(cols):
            ### 直线
            if c == col:
                return False
            ### 双斜线
            if r - c == row - col or r + c == row + col:
                return False
        return True
```


### 难题 2. 数独问题

[LeetCode-37 Sudoku Solver](https://leetcode.com/problems/sudoku-solver/)

第一种：暴力DFS（回溯），参照皇后问题里第二种解法，利用哈希表的方法。初始化9个row，9个col，9个box一共27个hash set。

```python
class Solution:
    def solveSudoku(self, board):
        """
        Do not return anything, modify board in-place instead.
        """
        used = self.initial_used(board)
        self.dfs(board, 0, used)
        
        
    def initial_used(self, board):
        used = {
            'row': [set() for _ in range(9)],
            'col': [set() for _ in range(9)],
            'box': [set() for _ in range(9)],
        }
        
        for i in range(9):
            for j in range(9):
                if board[i][j] == '.':
                    continue
                used['row'][i].add(board[i][j])
                used['col'][j].add(board[i][j])
                used['box'][i // 3 * 3 + j // 3].add(board[i][j])
                
        return used
        
    def dfs(self, board, index, used):
        if index == 81:
            return True
            
        i, j = index // 9, index % 9
        if board[i][j] != '.':
            return self.dfs(board, index + 1, used)
        
        for val in range(1, 10):
            ### 注意题目里都是str
            val = str(val)
            if not self.is_valid(i, j, val, used):
                continue
            
            board[i][j] = val
            used['row'][i].add(val)
            used['col'][j].add(val)
            used['box'][i // 3 * 3 + j // 3].add(val)
            
            if self.dfs(board, index + 1, used):
                return True
            
            used['box'][i // 3 * 3 + j // 3].remove(val)
            used['col'][j].remove(val)
            used['row'][i].remove(val)
            board[i][j] = '.'
        
        return False
            
    def is_valid(self, i, j, val, used):
        if val in used['row'][i]:
            return False
        if val in used['col'][j]:
            return False
        if val in used['box'][i // 3 * 3 + j // 3]:
            return False
        return True
```

优化搜索顺序：

优化方法：DFS的常用优化策略之一，优先搜索那些可能方案少的位置。比如说box里只有一个格子为空，那么可以直接填写，或者某一列某一行交叉的地方只有一个数能填写，就先把确定的填进去，而不是像之前是从左往右，从上到下遍历board的空格。这样可以减少一些不必要的尝试。

```python
class Solution:
    def solveSudoku(self, board):
        used = self.initial_used(board)
        self.dfs(board, used)
        
    def initial_used(self, board):
        used = {
            'row': [set() for _ in range(9)],
            'col': [set() for _ in range(9)],
            'box': [set() for _ in range(9)],
        }
        
        for i in range(9):
            for j in range(9):
                if board[i][j] == '.':
                    continue
                used['row'][i].add(board[i][j])
                used['col'][j].add(board[i][j])
                used['box'][i // 3 * 3 + j // 3].add(board[i][j])
                
        return used
        
    def dfs(self, board, used):
        i, j, choices = self.get_least_choices_grid(board, used)
        
        if i is None:
            return True
        
        for val in choices:
            val = str(val)
            board[i][j] = val
            used['row'][i].add(val)
            used['col'][j].add(val)
            used['box'][i // 3 * 3 + j // 3].add(val)
            
            if self.dfs(board, used):
                return True
            
            used['box'][i // 3 * 3 + j // 3].remove(val)
            used['col'][j].remove(val)
            used['row'][i].remove(val)
            board[i][j] = '.'
            
        return False
            
    def get_least_choices_grid(self, board, used):
        x, y, choices = None, None, ['.'] * 10
        
        for i in range(9):
            for j in range(9):
                if board[i][j] != '.':
                    continue
                vals = []
                for val in range(1, 10):
                    val = str(val)
                    if self.is_valid(i, j, val, used):
                        vals.append(val)
                if len(vals) < len(choices):
                    x, y, choices = i, j, vals
                    
        return x, y, choices
            
    def is_valid(self, i, j, val, used):
        if val in used['row'][i]:
            return False
        if val in used['col'][j]:
            return False
        if val in used['box'][i // 3 * 3 + j // 3]:
            return False
        return True
```
