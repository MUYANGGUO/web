---
title: "Algorithm Notes: DFS Permutations"
date: "2021-01-01"
excerpt: ""
kind: post
tags:
  - Algorithm Notes
  - Study Notes
comments: true
---

## DFS - Permutations

全排列问题：

全排列问题是“排列式”深度优先搜索问题的鼻祖，很多搜索的问题都可以用类似全排列的代码来完成。包括前面的全子集问题。


### 排列式搜索

问题的模型是求出一个集合中所有元素的满足某个条件的排列

排列和组合的区别是排列是有顺序的

[1,2,3] 和 [3,2,1] 是同一个组合但不是同一个排列

[LeetCode-46 Permutations](https://leetcode.com/problems/permutations/)

```python

class Solution:
    def permute(self, nums):
        if not nums:
            return [[]]
        permutations = []
        self.dfs(nums, [], set(), permutations)
        return permutations
    
    ### 定义：找到以permutation为开头的所有排列
    def dfs(self, nums, permutation, visited, permutations):
        ### 出口
        if len(permutation) == len(nums):
            permutations.append(list(permutation))
            return
    
        ### 分解
        for num in nums:
            if num not in visited:
                # [] -> [1], [2], [3]
                permutation.append(num)
                visited.add(num)
                self.dfs(nums, permutation, visited, permutations)
                permutation.pop()
                visited.remove(num)

```

[LeetCode-47 Permutations II](https://leetcode.com/problems/permutations-ii/)

去重操作和DFS combinations 的去重操作是一样的。

```python
class Solution:
    def permuteUnique(self, nums):
        ### 这题的关键操作是去重 比如
        ###  [1, 2', 2'']  chose, not choosing [1, 2'', 2']
        ### 那么选择的顺序应该是  [1] [1 2'] [1 2' 2'']
        ### 那么关键操作是先排序
        nums.sort()
        if not nums:
            return [[]]
        ### 注意这里visited 不能用set了，因为会有重复数组写进去 比如 [1, 2', 2''], 但一定是按照顺序写进去的。
        visited = [False] * len(nums)
        permutations = []
        self.dfs(nums, [], visited, permutations)
        return permutations
    
    ### 定义：找到以permutation为开头的所有排列
    def dfs(self, nums, permutation, visited, permutations):
        ### 出口
        if len(permutation) == len(nums):
            permutations.append(list(permutation))
            return
    
        ### 分解
        for i in range(len(nums)):
            if visited[i]:
                # [] -> [1], [2], [3]
                continue
                
            ### 去重：如果当前的数和上一个数一样，但是上一个数并没有算进去，那么说明当前的数和当前的数往后都是无效的。
            
            if i > 0 and nums[i - 1] == nums[i] and not visited[i - 1]:
                continue
            permutation.append(nums[i])
            visited[i] = True
            self.dfs(nums, permutation, visited, permutations)
            permutation.pop()
            visited[i] = False

```


### 著名的NP问题：TSP问题 的五种解法： 非常经典的题目，所有算法必须全部掌握。

[816 Traveling Salesman Problem](https://www.lintcode.com/problem/traveling-salesman-problem/)

#### 1.暴力DFS：

```python
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

```

#### 2.暴力DFS + 最优性剪枝 (speed up dramatically)：

```python
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

```

DFS 的两种方式， n！*n 的时间复杂度的量级。 （方式数*取得此方式需要花费的时间）


#### 3. 状态压缩 动态规划 （最优解 达到 2^n * n^2）：

```python

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
        ### 返回所有状态被选中的最小值
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


```

#### 4. TSP 问题的随机化算法：（近似算法，工程中解决NP问题是很有价值的算法，结果不一定最优或者完全正确，但是是在短时间内求近似的好方法）

随机化一个初始方案，通过一个调整策略调整到局部最优值， 在时间限制内重复上述过程直到快要超时。

使用随机化算法，不保证正确性，但是可以处理很大的数据，得到近似答案。 调整策略是交换 i, j 两个点的位置，看看是否能得到更优解 测试中如果失败了可以多跑几次。

```python
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

```

另外一种随机化。调整策略是反转(reverse)中间的 i~j 这一段看看是否可以得到更优解。


```python
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
