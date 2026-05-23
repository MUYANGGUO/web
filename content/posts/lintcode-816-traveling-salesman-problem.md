---
title: "LintCode 816 Traveling Salesman Problem - Hard"
date: "2021-01-01"
excerpt: 816. Traveling Salesman Problem
kind: leetcode
tags:
  - LintCode
  - Hard
  - Python
order: 816
comments: true
---

### 816. Traveling Salesman Problem — Hard

[Open on LintCode](https://www.lintcode.com/problem/816/)

## Problem

816. Traveling Salesman Problem

Give n cities(labeled from 1 to n), and the undirected road's cost among the cities as a three-tuple [A, B, c](i.e there is a road between city A and city B and the cost is c). We need to find the smallest cost to travel all the cities starting from 1.

Example
Example 1

Input: 
n = 3
tuple = [[1,2,1],[2,3,2],[1,3,3]]
Output: 3
Explanation: The shortest path is 1->2->3
Example 2

Input:
n = 1
tuple = []
Output: 0
Notice
1.A city can only be passed once.
2.You can assume that you can reach all the rest cities.

## Solution

```python
### 解法1-暴力DFS 

class Solution:
    """
    @param n: an integer,denote the number of cities
    @param roads: a list of three-tuples,denote the road between cities
    @return: return the minimum cost to travel all cities
    """
    result = float('inf')
    
    
    def minCost(self, n, roads):
        # Write your code here
        graph = self.construct_graph(roads, n)
        self.dfs(1, n, set([1]), 0, graph)
        return self.result
    
    def dfs(self, city, n, visited, cost, graph):

        if len(visited) == n:
            self.result = min(self.result, cost)
            return 
        
        for next_city in graph[city]:
            if next_city in visited:
                continue
            visited.add(next_city)
            self.dfs(next_city, n, visited, cost + graph[city][next_city], graph)
            visited.remove(next_city)

    def construct_graph(self, roads, n):
        graph = {
            i : {j : float('inf') for j in range(1 , n + 1)}
            for i in range(1, n + 1)
        }
        
        for a, b, c in roads:
            graph[a][b] = min(graph[a][b], c)
            graph[b][a] = min(graph[b][a], c)
        return graph

### 利用添加result class的方法 来进行对原地址的修改，使用instance的方式，比直接使用global类变量更好。
class Result:
    def __init__(self):
        self.min_cost = float('inf')

class Solution:
    """
    @param n: an integer,denote the number of cities
    @param roads: a list of three-tuples,denote the road between cities
    @return: return the minimum cost to travel all cities
    """
    def minCost(self, n, roads):
        # Write your code here
        graph = self.construct_graph(roads, n)
        result = Result()
        self.dfs(1, n, set([1]), 0, graph, result)
        return result.min_cost
    
    def dfs(self, city, n, visited, cost, graph, result):

        if len(visited) == n:
            result.min_cost = min(result.min_cost, cost)
            return 
        
        for next_city in graph[city]:
            if next_city in visited:
                continue
            visited.add(next_city)
            self.dfs(next_city, n, visited, cost + graph[city][next_city], graph, result)
            visited.remove(next_city)

    def construct_graph(self, roads, n):
        graph = {
            i : {j : float('inf') for j in range(1 , n + 1)}
            for i in range(1, n + 1)
        }
        
        for a, b, c in roads:
            graph[a][b] = min(graph[a][b], c)
            graph[b][a] = min(graph[b][a], c)
        return graph




### DFS + 最优性剪枝：

class Result:
    def __init__(self):
        self.min_cost = float('inf')

class Solution:
    """
    @param n: an integer,denote the number of cities
    @param roads: a list of three-tuples,denote the road between cities
    @return: return the minimum cost to travel all cities
    """
    def minCost(self, n, roads):
        # Write your code here
        graph = self.construct_graph(roads, n)
        result = Result()
        self.dfs(1, n, [1], set([1]), 0, graph, result)
        return result.min_cost
    
    def dfs(self, city, n, path, visited, cost, graph, result):

        if len(visited) == n:
            result.min_cost = min(result.min_cost, cost)
            return 
        
        for next_city in graph[city]:
            if next_city in visited:
                continue
            ### prunning 
            if self.has_better_path(graph, path, next_city):
                continue
            path.append(next_city)
            visited.add(next_city)
            self.dfs(next_city, n, path, visited, cost + graph[city][next_city], graph, result)
            path.pop()
            visited.remove(next_city)

    def construct_graph(self, roads, n):
        graph = {
            i : {j : float('inf') for j in range(1 , n + 1)}
            for i in range(1, n + 1)
        }
        
        for a, b, c in roads:
            graph[a][b] = min(graph[a][b], c)
            graph[b][a] = min(graph[b][a], c)
        return graph
        
    ### 剪枝策略：
    ### 正要添加next_city 到 path
    ### Example: path = [1, 2] next_city: [3, 4, 5]
    ### when i = 1 (example, i is index starting from 1)
    ### 1 -> 2 cost + 2 -> 3 cost if larger than 1 -> 2 cost + 2 - > 3 cost?
    ### No
    ### Example continue path = [1, 2, 3] next_city: [4, 8]
    ### when i = 1
    ### 1 -> 2 cost + 3 -> 4 cost if larger than 1 -> 3 , + 2 -> 4 ？
    ### yes
    ### 那么可以直接跳过4去看8了，不必再考虑4 后面所有的可能性 ，因为4显然不应该放在3的后面
    ### 4 应该可能出现在1，3，2 这个path的后面，但绝对不应该出现在1，2，3这条path的后面。
    ### 这样剪枝的精髓在于，对已经pick的点，对即将pick的点进行选择
    ### 1 2 3 后面不会是 4， 但是 1 3 2 后面可能会是4， 那么在对1 2 3 讨论时，就不需要考虑4 放在 3 后面这个情况后的所有情况了。

    def has_better_path(self, graph, path, city):
        for i in range(1, len(path)):
            if graph[path[i - 1]][path[i]] + graph[path[-1]][city] > \
            graph[path[i - 1]][path[-1]] + graph[path[i]][city]:
                return True
        return False



#### 3. 状态压缩 动态规划 （最优解 达到 2^n * n^2）：

class Solution:
    """
    @param n: an integer,denote the number of cities
    @param roads: a list of three-tuples,denote the road between cities
    @return: return the minimum cost to travel all cities
    """
    def minCost(self, n, roads):
        # Write your code here
        graph = self.construct_graph(roads, n)
        ### 状态压缩，利用足够长的二进制字符串来表示状态
        ### 比如 1001 表示第一个和第四个点被遍历了。
        
        state_size = 1 << n
        f = [
            [float('inf')] * (n + 1) for _ in range(state_size)
                ]
        
        f[1][1] = 0
        for state in range(state_size):
            for i in range(2, n + 1):
                if state & (1 << (i - 1)) == 0:
                    continue
                prev_state = state ^ (1 << (i - 1))
                for j in range(1, n + 1):
                    if prev_state & (1 << (j - 1)) == 0:
                        continue
                    f[state][i] = min(f[state][i], f[prev_state][j] + graph[j][i])
        return min(f[state_size - 1])
                    
                    
                    
    def construct_graph(self, roads, n):
        graph = {
            i : {j : float('inf') for j in range(1 , n + 1)}
            for i in range(1, n + 1)
        }
        
        for a, b, c in roads:
            graph[a][b] = min(graph[a][b], c)
            graph[b][a] = min(graph[b][a], c)
        return graph


#### 使用随机化算法，不保证正确性，但是可以处理很大的数据，得到近似答案。 调整策略是交换 i, j 两个点的位置，看看是否能得到更优解 测试中如果失败了可以多跑几次。

# increase RANDOM_TIMES or submit your code again 
# if you got wrong answer.
RANDOM_TIMES = 1000

class Solution:
    """
    @param n: an integer,denote the number of cities
    @param roads: a list of three-tuples,denote the road between cities
    @return: return the minimum cost to travel all cities
    """
    def minCost(self, n, roads):
        graph = self.construct_graph(roads, n)
        min_cost = float('inf')
        for _ in range(RANDOM_TIMES):
            path = self.get_random_path(n)
            cost = self.adjust_path(path, graph)
            min_cost = min(min_cost, cost)
        return min_cost
        
    def construct_graph(self, roads, n):
        graph = {
            i: {j: float('inf') for j in range(1, n + 1)}
            for i in range(1, n + 1)
        }
        for a, b, c in roads:
            graph[a][b] = min(graph[a][b], c)
            graph[b][a] = min(graph[b][a], c)
        return graph
    
    def get_random_path(self, n):
        import random
        
        path = [i for i in range(1, n + 1)]
        for i in range(2, n):
            j = random.randint(1, i)
            path[i], path[j] = path[j], path[i]
        return path
        
    def adjust_path(self, path, graph):
        n = len(graph)
        adjusted = True
        while adjusted:
            adjusted = False
            for i in range(1, n):
                for j in range(i + 1, n):
                    if self.can_swap(path, i, j, graph):
                        path[i], path[j] = path[j], path[i]
                        adjusted = True
        cost = 0
        for i in range(1, n):
            cost += graph[path[i - 1]][path[i]]
        return cost
    
    def can_swap(self, path, i, j, graph):
        before = self.adjcent_cost(path, i, path[i], graph)
        before += self.adjcent_cost(path, j, path[j], graph)
        after = self.adjcent_cost(path, i, path[j], graph)
        after += self.adjcent_cost(path, j, path[i], graph)
        return before > after
    
    def adjcent_cost(self, path, i, city, graph):
        cost = graph[path[i - 1]][city]
        if i + 1 < len(path):
            cost += graph[city][path[i + 1]]
        return cost



#### 另外一种随机化。调整策略是反转(reverse)中间的 i~j 这一段看看是否可以得到更优解。


# increase RANDOM_TIMES or submit your code again 
# if you got wrong answer.
RANDOM_TIMES = 1000

class Solution:
    """
    @param n: an integer,denote the number of cities
    @param roads: a list of three-tuples,denote the road between cities
    @return: return the minimum cost to travel all cities
    """
    def minCost(self, n, roads):
        graph = self.construct_graph(roads, n)
        min_cost = float('inf')
        for _ in range(RANDOM_TIMES):
            path = self.get_random_path(n)
            cost = self.adjust_path(path, graph)
            min_cost = min(min_cost, cost)
        return min_cost
        
    def construct_graph(self, roads, n):
        graph = {
            i: {j: float('inf') for j in range(1, n + 1)}
            for i in range(1, n + 1)
        }
        for a, b, c in roads:
            graph[a][b] = min(graph[a][b], c)
            graph[b][a] = min(graph[b][a], c)
        return graph
    
    def get_random_path(self, n):
        import random
        
        path = [i for i in range(1, n + 1)]
        for i in range(2, n):
            j = random.randint(1, i)
            path[i], path[j] = path[j], path[i]
        return path
        
    def adjust_path(self, path, graph):
        n = len(graph)
        adjusted = True
        while adjusted:
            adjusted = False
            for i in range(1, n):
                for j in range(i + 1, n):
                    if self.can_reverse(path, i, j, graph):
                        self.reverse(path, i, j)
                        adjusted = True
        cost = 0
        for i in range(1, n):
            cost += graph[path[i - 1]][path[i]]
        return cost
    
    def can_reverse(self, path, i, j, graph):
        before = graph[path[i - 1]][path[i]]
        if j + 1 < len(path):
            before += graph[path[j]][path[j + 1]]
        after = graph[path[i - 1]][path[j]]
        if j + 1 < len(path):
            after += graph[path[i]][path[j + 1]]
        return before > after

    def reverse(self, path, i, j):
        while i < j:
            path[i], path[j] = path[j], path[i]
            i += 1
            j -= 1
```
