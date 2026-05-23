---
title: "Algorithm Notes: BFS"
date: "2021-01-01"
excerpt: ""
kind: post
tags:
  - Algorithm Notes
  - Study Notes
comments: true
---

## Chapter 5: 遍历法 BFS
1. [69 Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)
2. [1479 Can Reach The Endpoint](https://www.lintcode.com/problem/can-reach-the-endpoint/description)
3. [1179 Friend Circles](https://leetcode.com/problems/friend-circles/)
4. [120 Word Ladder](https://www.lintcode.com/problem/word-ladder/description) 
5. [137 Clone Graph](https://leetcode.com/problems/clone-graph/) 
6. [433 Number of Islands](https://leetcode.com/problems/number-of-islands/) 
7. [127 Topological Sorting](https://www.lintcode.com/problem/topological-sorting/description) 
8. [615 Course Schedule](https://leetcode.com/problems/course-schedule/) 
9. [616 Course Schedule II](https://leetcode.com/problems/course-schedule-ii/)
10. [892 Alien Dictionary](https://leetcode.com/problems/alien-dictionary/)
11. [17 Subsets](https://leetcode.com/problems/subsets/)
12. [7 Serialize and Deserialize Binary Tree](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/)
13. [1235 Serialize and Deserialize BST](https://leetcode.com/problems/serialize-and-deserialize-bst/)
14. [611 Knight Shortest Path](https://www.lintcode.com/problem/knight-shortest-path/description)
15. [630 Knight Shortest Path II](https://www.lintcode.com/problem/knight-shortest-path-ii/description)
16. [LeetCode-126 Word Ladder II](https://leetcode.com/problems/word-ladder-ii/)
> 补充：
> [LeetCode-127 Word Ladder](https://leetcode.com/problems/word-ladder/)

### 5.1 BFS 宽度优先搜索的适用场景：

1. 分层遍历：
   - 一层一层的遍历一个图，树，矩阵
   - 简单图的最短路径（简单图：途中所有的边长都一样）
2. 连通块问题：
    - 通过图中的一个点找到其他所有连通的点
    - 找到所有方案问题的一种


### 5.2 BFS 的三种实现方法：

1. 单队列
2. 双队列
3. Dummy Node

**例题：二叉树的分层遍历**

[69 Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)

```python
### 1. 单队列的实现方式：

"""
Definition of TreeNode:
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left, self.right = None, None
"""

class Solution:
    """
    @param root: A Tree
    @return: Level order a list of lists of integer
    """
    def levelOrder(self, root):
        # write your code here
        if not root:
            return []
        # step 1. 把第一层的节点 防盗队列当中
        queue = collections.deque([root])
        res = []
        # step 2. while 队列非空
        while queue:
            level = []
            # step 3 把上一层的节点，拓展出下一层的节
            for _ in range(len(queue)):
                ### pop the first in the queue in current level
                node = queue.popleft()
                ### update this node val in the level list
                level.append(node.val)
                ### find children in left and right, if any append to the tail of teh queue
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
                    
            res.append(level)
            
        return res

```

```python
### 双队列的实现方式：

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def levelOrder(self, root):
        ### two queue (two lists)
        if not root:
            return []
        ### use list for queue and next_queue
        queue = [root]
        res = []
        while queue:
            ### start a new next_queue
            next_queue = []
            res.append([node.val for node in queue])
            for node in queue:
                if node.left:
                    next_queue.append(node.left)
                if node.right:
                    next_queue.append(node.right)
            ### next_queue is now queue
            queue = next_queue
                    
        return res
```

```python
### Dummy Node 的实现方式：

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def levelOrder(self, root):
        ### DummyNode
        ### use a Dummy Node in the queue to represent the end of the level:
        
        if not root:
            return []
        ### 这里要初始化的时候就带上末尾的dummy node
        queue = collections.deque([root, None])
        res, level = [],[]
        
        ### 使用dummy node只需要pop就好
        while queue:
            node = queue.popleft()
            ### 如果当前node是dummy node，说明这一层已经pop完
            if node is None:
                ### 更新level到res里
                res.append(level)
                ### reset level
                level = []
                ### 如果queue里还有node，说明还有下一层
                if queue:
                    ### 那么需要更新下一层的尾巴，加上dummy node
                    queue.append(None)
                ### 这里需要跳过，因为更新到了下一层了
                continue
            ### 如果当前node不是dummy node
            ### 更新 level
            level.append(node.val)
            ### 把当前node的children加进queue
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        
        return res
```

### 5.3 图 Graph：

图在离线数据中的表示方法为<E,V>， E表示Edge， V表示Vertex。图是顶点和边的集合。

图分为：
- 有向图
- 无向图
  
BFS 大部分的时候是在图上进行的。

BFS 在两种图上都适用。另外， 树(Tree) 也是一种特殊的图。

二叉树的BFS VS 图的BFS：

二叉树中进行BFS 和 图中进行BFS 最大的区别就是二叉树中无需使用Hashset 来存储访问过的节点（丢进Queue里的节点）。

因为二叉树这种数据结构，上下层关系分明，没有环（circle）， 所以不可能出现一个节点的儿子是自己的情况。

但是在图中，一个节点的邻居就可能是自己了。

### 5.3.1 如何定义一个图的数据结构？

有很多种方法可以存储一个图，最常用的莫过于：
1. 邻接矩阵
2. 邻接表
   
而邻接矩阵因为耗费空间过大，我们通常在工程中都是使用邻接表作为图的存储结构。

**1. 邻接矩阵**

邻接矩阵 Adjacency Matrix

[
[1,0,0,1],
[0,1,1,0],
[0,1,1,0],
[1,0,0,1]
]

例如上图表示0号点和3号点有连边。1号点和2号点有连边。

当然，每个点和自己也是默认有连边的。

图中的 0 表示不连通，1 表示连通。

我们也可以用一个更具体的整数值来表示连边的长度。

邻接矩阵我们可以直接用一个二维数组表示，如

int[][] matrix;

这种数据结构因为耗费 O(n^2) 的空间，所以在稀疏图上浪费很大，因此并不常用。

**2. 邻接表**

邻接表 (Adjacency List)

[
[1],
[0,2,3],
[1],
[1]
]

这个图表示 0 和 1 之间有连边，1 和 2 之间有连边，1 和 3 之间有连边。即每个点上存储自己有哪些邻居（有哪些连通的点）。
这种方式下，空间耗费和边数成正比，可以记做 O(m)，m代表边数。m最坏情况下虽然也是 O(n^2)，但是邻接表的存储方式大部分情况下会比邻接矩阵更省空间。
可以用自定义的类来实现邻接表。

```python
def DirectedGraphNode:
def init(self, label):
self.label = label
self.neighbors = [] # a list of DirectedGraphNode's
...
```

也可以使用 HashMap 和 HashSet 搭配的方式来存储邻接表
```python
# 假设nodes为节点标签的列表:
# 使用了Python中的dictionary comprehension语法
adjacency_list = {x:set() for x in nodes}
# 另一种写法
adjacency_list = {}
for x in nodes:
    adjacency_list[x] = set()
```

**例题：BFS 类型模板题 遍历矩阵类型** [1479 Can Reach The Endpoint](https://www.lintcode.com/problem/can-reach-the-endpoint/description)

<details>
<summary> BFS 解题模板 </summary>

```python
import queue as Queue

DIRECTIONS = [(-1, 0), (1, 0), (0, 1), (0, -1)]
SAPCE = 1
OBSTACLE = 0
ENDPOINT = 9

class Solution:
    """
    @param map: the map
    @return: can you reach the endpoint
    """
    def reachEndpoint(self, map):
        # Write your code here
        n, m = len(map), len(map[0])
        if n == 0 or m == 0:
            return False

        queue = Queue.Queue()
        queue.put((0, 0))
        
        while not queue.empty():
            curr = queue.get()
            for i in range(4):
                x = curr[0] + DIRECTIONS[i][0]
                y = curr[1] + DIRECTIONS[i][1]
                if not self.isValid(x, y, map):
                    continue
                if map[x][y] == ENDPOINT:
                    return True
                queue.put((x, y))
                
                ### 并且将走过的1变成
                map[x][y] = OBSTACLE
        
        return False
    
    def isValid(self, x, y, map):
        ### 注意不要
        if x < 0 or x >= len(map) or y < 0 or y >= len(map[0]):
            return False
        if map[x][y] == OBSTACLE:
            return False
        return True
```
</details>

**例题：BFS 类型模板题 遍历矩阵类型** [1179 Friend Circles](https://leetcode.com/problems/friend-circles/)

遍历每个人，如果这个人之前没有访问过，说明有多一个新的朋友圈，答案记录加一 就从这个点作为起点 做一次BFS，找出所有的直接朋友与间接朋友，并把他们标记访问。

BFS流程
1. 将起点压入队列，标记访问
2. 取出队首，从队首向外找朋友，看都能扩展到哪些还没访问的朋友，压入队列并标记访问
3. 重复执行上一步，直到队列为空
   
<details>
<summary> BFS 连通块 </summary>

```python
import collections

class Solution:
    def beginbfs(self, M):
        # 人数
        n = len(M)
        # 答案
        ans = 0
        # 标记是否访问过
        visisted = {}
        for i in range(n):
            visisted[i] = False
        # 遍历每个人，如果这个人还没访问过 就从这个人开始做一遍bfs
        for i in range(n):
            if (visisted[i] == False):
                ans += 1
                q = collections.deque()
                # 标记起点并压入队列
                visisted[i] = True
                q.append(i)
                while (len(q) != 0):
                    # 取出队首
                    now = q.popleft()
                    # 从队首找朋友
                    for j in range(n):
                        # 找到新朋友（之前没访问过的朋友）就标记访问并压入队列
                        if (M[now][j] == 1 and visisted[j] == False):
                            visisted[j] = True
                            q.append(j)
        return ans
    """
    @param M: a matrix
    @return: the total number of friend circles among all the students
    """
    def findCircleNum(self, M):
        # Write your code here
        ansbfs = self.beginbfs(M)
        return ansbfs
```
</details>

**question: can this be done like example 1?**

**例题：BFS 类型模板题 最短路径类型** [611 Knight Shortest Path](https://leetcode.com/problems/friend-circles/) 

> 补充
> [LeetCode-1197 Minimum Knight Moves](https://leetcode.com/problems/minimum-knight-moves/)

BFS, 用 distance hash 来记录距离。

<details>
<summary> 611 Knight Shortest Path : BFS + Distance Hash </summary>

```python
"""
Definition for a point.
class Point:
    def __init__(self, a=0, b=0):
        self.x = a
        self.y = b
"""
DIRECTIONS = [
    (-2, -1), (-2, 1), (-1, 2), (1, 2),
    (2, 1), (2, -1), (1, -2), (-1, -2),
]

class Solution:
    """
    @param grid: a chessboard included 0 (false) and 1 (true)
    @param source: a point
    @param destination: a point
    @return: the shortest path 
    """
    def shortestPath(self, grid, source, destination):
        # write your code here
        queue = collections.deque([(source.x, source.y)])
        distance = {(source.x, source.y): 0}

        while queue:
            x, y = queue.popleft()
            if (x, y) == (destination.x, destination.y):
                return distance[(x, y)]
            for dx, dy in DIRECTIONS:
                next_x, next_y = x + dx, y + dy
                if (next_x, next_y) in distance:
                    continue
                if not self.is_valid(next_x, next_y, grid):
                    continue
                distance[(next_x, next_y)] = distance[(x, y)] + 1
                queue.append((next_x, next_y))
        return -1
        
    def is_valid(self, x, y, grid):
        n, m = len(grid), len(grid[0])

        if x < 0 or x >= n or y < 0 or y >= m:
            return False
            
        return not grid[x][y]
```
</details>


<details>
<summary> 1197. Minimum Knight Moves : BFS + Distance Hash </summary>

```python

DIRECTIONS = [
    (-2, -1), (-2, 1), (-1, 2), (1, 2),
    (2, 1), (2, -1), (1, -2), (-1, -2),
]

class Solution:
    def minKnightMoves(self, x: int, y: int) -> int:
        ### source at (0, 0)
        ### target to (x, y)
        queue = collections.deque([(0, 0)])
        distance = {(0,0): 0}
        
        while queue:
            cur_x, cur_y = queue.popleft()
            if (cur_x, cur_y) == (x, y):
                return distance[(cur_x, cur_y)]
            
            for dx, dy in DIRECTIONS:
                next_x, next_y = cur_x + dx, cur_y + dy
                if (next_x, next_y) in distance:
                    continue
                distance[(next_x, next_y)] = distance[(cur_x, cur_y)] + 1
                queue.append((next_x, next_y))
        
        return -1
        
```
</details>

**例题：BFS 类型模板题 最短路径类型** [120 Word Ladder](https://www.lintcode.com/problem/word-ladder/description) 

> 补充：[LeetCode-127 Word Ladder](https://leetcode.com/problems/word-ladder/)

https://leetcode.com/problems/word-ladder/solution/

<details>
<summary> BFS (make a graph by defining a edge logic, in this example, it is difference by only 1 character, and perform BFS from the start ) </summary>

```python
class Solution:
    """
    @param: start: a string
    @param: end: a string
    @param: dict: a set of string
    @return: An integer
    """
    def ladderLength(self, start, end, dict):
        # write your code here
        ### BFS solution
        if end not in dict:
            dict.add(end)
        queue = collections.deque([start])
        visited = set([start])
        
        distance = 0
        while queue:
            distance += 1
            for i in range(len(queue)):
                word = queue.popleft()
                if word == end:
                    return distance
                
                for next_word in self.get_next_words(word):
                    if next_word not in dict or next_word in visited:
                        continue
                    queue.append(next_word)
                    ### 要记住一定是确定放入queue以后再记录进visited hash 里，这样可以避免重复访问。76666666666
                    visited.add(next_word) 

        return 0
        
    # O(26 * L^2)
    # L is the length of word
    def get_next_words(self, word):
        words = []
        for i in range(len(word)):
            left, right = word[:i], word[i + 1:]
            for char in 'abcdefghijklmnopqrstuvwxyz':
                if word[i] == char:
                    continue
                words.append(left + char + right)
        return words

```
</details>


### 5.4 宽度优先搜索 详解！：

什么时候使用宽度优先搜索呢？

1. 图的**层级**遍历
   1. 简单图最短路径 Simple Path Shortest Path，对应的最优算法就是图的层级遍历
   2. 简单图的定义：边的权重都一样的图 
2. 图的连通块问题 Connected Component
   1. 通过一个点找到图中连通的所有点
   2. 非递归的方式找到所有方案
3. 拓扑排序
   1. 求任意拓扑排序
   2. 求是否有拓扑排序
   3. 求字典序最小的拓扑序
   4. 求是否唯一拓扑序

问最短路径：

简单图： BFS； 复杂图： Floyd, Dijkstra, Bellman-ford, SPFA ...

问最长路径： BFS 不能解决，因为BFS的遍历过程不能绕圈。应该用DFS。如果图能分层次：用DP。

**例题 连通块问题** [137 Clone Graph](https://leetcode.com/problems/clone-graph/) 

Graph 的 Deep Copy 问题： 复制所有的点，所有点边。

1. 通过一个Node找到所有的Nodes
2. 复制所有的Nodes
3. 复制所有的Edges

```python
"""
# Definition for a Node.
class Node:
    def __init__(self, val = 0, neighbors = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []
"""

class Solution:
    def cloneGraph(self, node):
        root = node
        if not node:
            return 
        ### BFS to transverse the graph and get all nodes:
        nodes = self.getNodes(root)
        ### mapping old with new nodes:
        ### mapping key old node, value: new Node
        mapping = {}
        for node in nodes:
            ### at the same time creating, the new node using Node() class, using the old node's val first.
            mapping[node] = Node(node.val)
        
        ### mapping, adding neighbors:
        for node in nodes:
            #get new node from mapped hashmap
            new_node = mapping[node]
            #get neighbor list from old node
            for neighbor in node.neighbors: #neignbor are nodes too, so we can find them from the mapping
                #find this neighbor in the mapped hashmap, where we used the old node key and get new node value. so mapping[old key] = new node
                new_neighbor = mapping[neighbor]
                #add this neighbor to the new_node's atrribute
                new_node.neighbors.append(new_neighbor)
        
        return mapping[root]
        
    def getNodes(self, node):
        queue = collections.deque([node])
        res = set()
        res.add(node)
        while queue:
            head = queue.popleft()
            for neighbor in head.neighbors:
                if neighbor not in res:
                    res.add(neighbor)
                    queue.append(neighbor)
        return res
```

BFS 的时间复杂度

O(N + M)

其中 N 为点数,M 为边数

**例题 联通块问题， 矩阵坐标变换数组， 模板类！！！** [433 Number of Islands](https://leetcode.com/problems/number-of-islands/) 

```python

DIRECTIONS = [(-1, 0), (1, 0), (0, -1), (0, 1)]
class Solution:
    """
    @param grid: a boolean 2D matrix
    @return: an integer
    """
    def numIslands(self, grid):
        # write your code here
        n = len(grid)
        if n == 0:
            return 0
        m = len(grid[0])
        if m == 0:
            return 0

        
        islands = 0
        visited = set()
        for i in range(len(grid)):
            for j in range(len(grid[0])):
                if grid[i][j] == 1 and (i, j) not in visited:
                    self.bfs(grid, i, j, visited)
                    islands += 1
                    
        return islands     
        
    def bfs(self, grid, x, y, visited):
        queue = collections.deque([(x, y)])
        visited.add((x, y))
        while queue:
            cur_x, cur_y = queue.popleft()
            for dx, dy in DIRECTIONS:
                next_x = cur_x + dx
                next_y = cur_y + dy
                if (next_x, next_y) in visited:
                    continue
                if not self.is_valid(grid, next_x, next_y):
                    continue
                queue.append((next_x, next_y))
                visited.add((next_x, next_y))
                
    
    def is_valid(self, grid, x, y):
        n, m = len(grid), len(grid[0])
        if x < 0 or x >= n or y < 0 or y >= m:
            return False
        return grid[x][y] == 1
```

**例题 BFS 适合做 拓扑排序** [127 Topological Sorting](https://www.lintcode.com/problem/topological-sorting/description) 

解决拓扑排序类问题的方法：

关键点： 入度（有向图中指向当前节点的点的个数，或者指向当前节点的边的条数）

算法：

1. 统计每个点的入度。
2. 将每个入度为0的点放入队列中去，作为起始的节点(注意可能有多个）
3. 不断从队列中拿出一个点，去掉这个点的所有连边（邻居），其他的点的相应的入度 - 1.（这一步相当于从图中拿出这个点，那么他的邻居相应的入度要减去1）
4. 一旦发现新的入度为0的点，丢回队列中。

拓扑排序并不是传统的排序算法，一个图可能存在多个拓扑序，也可能不存在任何拓扑序。

一般情况下，找先修关系，依赖关系会想到拓扑排序。

如何判断拓扑排序唯一？队列中始终只有一个入度为0的点。

```python
"""
Definition for a Directed graph node
class DirectedGraphNode:
    def __init__(self, x):
        self.label = x
        self.neighbors = []
"""


class Solution:
    """
    @param: graph: A list of Directed graph node
    @return: Any topological order for the given graph.
    """
    def topSort(self, graph):
        # write your code here
        ### 利用hash统计in-degree of nodes
        
        inDegree = {}
        
        for node in graph:
            inDegree[node] = 0
            
        for node in graph:
            for neighbor in node.neighbors:
                inDegree[neighbor] += 1
        # bfs
        order = []
        start_nodes = [n for n in graph if inDegree[n] == 0]
        queue = collections.deque(start_nodes)
        while queue:
            node = queue.popleft()
            order.append(node)
            for neighbor in node.neighbors:
                inDegree[neighbor] -= 1
                if inDegree[neighbor] == 0:
                    queue.append(neighbor)

    
        return order
        
        
    def findHead(self, inDegree):
        for node, degree in inDegree.items():
            if degree == 0:
                return node
        return None
        
```

**例题 BFS 适合做 拓扑排序** [615 Course Schedule](https://leetcode.com/problems/course-schedule/) 

<details>
<summary>  注意这道题需要按照依赖关系，自己用入度构建一个graph </summary>

```python
### Topological Sorting:
class Solution:
    def canFinish(self, numCourses, prerequisites):
        
        ### 建立graph
        ### 邻居list（此处的邻居为prerequisites）
        edges = {i : [] for i in range(numCourses) } 
        ### 入度
        degrees = [0 for i in range(numCourses)]
        
        for i, j in prerequisites:
            edges[j].append(i)
            degrees[i] += 1
            
        queue, count = deque([]), 0
        
        ### 把所有入度为0的node放进queue
        for i in range(numCourses):
            if degrees[i] == 0:
                queue.append(i)

        while queue:
            node = queue.popleft()
            count += 1
            # 将每条邻边删去，如果入度降为 0，再加入队列
            for x in edges[node]:
                degrees[x] -= 1
                if degrees[x] == 0:
                    queue.append(x)

        return count == numCourses
```
</details>

补充：例题 

[616 Course Schedule II](https://leetcode.com/problems/course-schedule-ii/)

<details>
<summary>  Course Schedule II </summary>

```python
class Solution:
    """
    @param: numCourses: a total of n courses
    @param: prerequisites: a list of prerequisite pairs
    @return: the course order
    """
    def findOrder(self, numCourses, prerequisites):
        # write your code here
        ### 建立graph
        ### 邻居list（此处的邻居为prerequisites）
        edges = {i : [] for i in range(numCourses) } 
        ### 入度
        degrees = [0 for i in range(numCourses)]
        
        for i, j in prerequisites:
            edges[j].append(i)
            degrees[i] += 1
            
        queue = collections.deque([])
        order = []
        
        ### 把所有入度为0的node放进queue
        for i in range(numCourses):
            if degrees[i] == 0:
                queue.append(i)

        while queue:
            node = queue.popleft()
            order.append(node)
            # 将每条邻边删去，如果入度降为 0，再加入队列
            for x in edges[node]:
                degrees[x] -= 1
                if degrees[x] == 0:
                    queue.append(x)

        if len(order) == numCourses:
            return order
        return []
```
</details>


**例题 进阶版 字典序 + 堆 + 拓扑排序** [892 Alien Dictionary](https://leetcode.com/problems/alien-dictionary/)

```python
from heapq import heappush, heappop, heapify

class Solution:
    def alienOrder(self, words):
        graph = self.build_graph(words)
        return self.topological_sort(graph)
        
    def build_graph(self, words):
        # key is node, value is neighbors
        graph = {}

        # initialize graph
        for word in words:
            for c in word:
                if c not in graph:
                    graph[c] = set() 

        # add edges        
        n = len(words)
        for i in range(n - 1):
            for j in range(min(len(words[i]), len(words[i + 1]))):
                if words[i][j] != words[i + 1][j]:
                    if words[i + 1][j] not in graph[words[i][j]]:
                        graph[words[i][j]].add(words[i + 1][j])
                    break
            else:
                if len(words[i]) > len(words[i + 1]):
                    return ""
                
        return graph

    def topological_sort(self, graph):
        # before looking into this part of code
        # you should know how to use bfs algorithm to do topological sorting
        # if you don't know, please google it first or join us at 九章算法班.
        
        # initialize indegree 
        indegree = {
            node: 0
            for node in graph
        }
        
        # calculate indegree
        for node in graph:
            for neighbor in graph[node]:
                indegree[neighbor] = indegree[neighbor] + 1
        
        # use heapq instead of regular queue so that we can get the 
        # smallest lexicographical order
        queue = [node for node in graph if indegree[node] == 0]
        heapify(queue)
        
        # regular bfs algorithm to do topological sorting
        topo_order = ""
        while queue:
            node = heappop(queue)
            topo_order += node
            for neighbor in graph[node]:
                indegree[neighbor] -= 1
                if indegree[neighbor] == 0:
                    heappush(queue, neighbor)
            
        # if all nodes popped
        if len(topo_order) == len(graph):
            return topo_order
        
        return ""        
```

### 5.5 使用宽度优先搜索找出所有方案

一个方案 = 一条路径

BFS 善于解决求连通块的问题

把路径看做点，把路径的变化关系看做点的链接关系。

这样就把找所有路径问题变成了找所有连同点的问题。

#### 5.5.1 全子集问题

[17 Subsets](https://leetcode.com/problems/subsets/)

求一个集合的所有子集。（两种搜索树的BFS应用）

```python
### 第一种二分搜索树的BFS：

class Solution:
    """
    @param nums: A set of numbers
    @return: A list of lists
    """
    def subsets(self, nums):
        # write your code here
        if not nums:
            return [[]]
        
        queue = [[]]
        index = 0
        while index < len(queue):
            subset = queue[index]
            index += 1
            for num in nums:
                if subset and subset[-1] >= num:
                    continue
                queue.append(subset + [num])
        
        return queue


### 第二种二分搜索树的BFS：

class Solution:
    """
    @param nums: A set of numbers
    @return: A list of lists
    """
    def subsets(self, nums):
        # write your code here
        if not nums:
            return [[]]
        
        queue = [[]]
        for num in sorted(nums):
            for i in range(len(queue)):
                subset = list(queue[i])
                subset.append(num)
                queue.append(subset)
        
        return queue
```

[761 Smallest Subsets](https://www.lintcode.com/problem/smallest-subset/description)

上一题的变形：通过找子集，BFS， Binary Tree, 找到和大于数组总数和一半的子集即可。因为子集的找法是从空集慢慢增加元素个数，所以第一个返回的一定是符合条件的最短的子集

```python
class Solution:
    """
    @param arr:  an array of non-negative integers
    @return: minimum number of elements
    """
    def minElements(self, arr):
        # write your code here
        n = len(arr)
        totalsum = sum(arr)
        halfsum = int(totalsum / 2)
        
        queue = [[]]
        index = 0
        while index < len(queue):
            subset = queue[index]
            curr_sum = sum(subset)
            index += 1
            ### 只需这里加上判断就好，因为是从小到大，无重复增加子集的长度的方法。
            if curr_sum > halfsum:
                return len(subset)
            for num in arr:
                if subset and subset[-1] >= num:
                    continue
                queue.append(subset + [num])
        return 0

```

### 5.6 采用BFS进行序列化与反序列化

[7 Serialize and Deserialize Binary Tree](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/)

二叉树的序列化与反序列化，用dummy node把空边补上“#”。

```python
"""
Definition of TreeNode:
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left, self.right = None, None
"""


class Solution:
    """
    @param root: An object of TreeNode, denote the root of the binary tree.
    This method will be invoked first, you should design your own algorithm 
    to serialize a binary tree which denote by a root node to a string which
    can be easily deserialized by your own "deserialize" method later.
    """
    def serialize(self, root):
        # write your code here
        if root is None:
            return ""
        
        queue = collections.deque([root])
        bfs_order = []
        while queue:
            node = queue.popleft()
            bfs_order.append(str(node.val) if node else "#")
            if node:
                queue.append(node.left)
                queue.append(node.right)
        return ','.join(bfs_order)
        

    """
    @param data: A string serialized by your serialize method.
    This method will be invoked second, the argument data is what exactly
    you serialized at method "serialize", that means the data is not given by
    system, it's given by your own serialize method. So the format of data is
    designed by yourself, and deserialize it here as you serialize it in 
    "serialize" method.
    """
    def deserialize(self, data):
        # write your code here
        if not data:
            return None
        
        vals = data.split(',')
        root = TreeNode(int(vals[0]))
        queue = [root]
        isLeftChild = True
        index = 0
        
        for val in vals[1:]:
            if val is not "#":
                node = TreeNode(int(val))
                if isLeftChild:
                    queue[index].left = node
                else:
                    queue[index].right = node
                queue.append(node)
            
            if not isLeftChild:
                index += 1
            isLeftChild = not isLeftChild
            
        return root
```
同理 此题也可以这么做。[1235 Serialize and Deserialize BST](https://leetcode.com/problems/serialize-and-deserialize-bst/)。

### 5.7 双向BFS， 双向宽度优先搜索算法：

此类题目可以加速，更好地利用宽度优先搜索。需要记住模板。

[611 Knight Shortest Path](https://www.lintcode.com/problem/knight-shortest-path/description)

经典模板题目：

```python
"""
Definition for a point.
class Point:
    def __init__(self, a=0, b=0):
        self.x = a
        self.y = b
"""

DIRECTIONS = (
    (1, 2),
    (-1, 2),
    (2, 1),
    (-2, 1),
    (-1, -2),
    (1, -2),
    (-2, -1),
    (2, -1),
)


class Solution:
    """
    @param grid: a chessboard included 0 (false) and 1 (true)
    @param source: a point
    @param destination: a point
    @return: the shortest path 
    """
    def shortestPath(self, grid, source, destination):
        if not grid or not grid[0]:
            return -1
            
        n, m = len(grid), len(grid[0])
        if grid[destination.x][destination.y]:
            return -1
        if n * m == 1:
            return 0
        if source.x == destination.x and source.y == destination.y:
            return 0
        
        forward_queue = collections.deque([(source.x, source.y)])
        forward_set = set([(source.x, source.y)])

        backward_queue = collections.deque([(destination.x, destination.y)])
        backward_set = set([(destination.x, destination.y)])
        
        distance = 0
        while forward_queue and backward_queue:
            distance += 1
            if self.extend_queue(forward_queue, forward_set, backward_set, grid):
                return distance
                
            distance += 1
            if self.extend_queue(backward_queue, backward_set, forward_set, grid):
                return distance

        return -1
                
    def extend_queue(self, queue, visited, opposite_visited, grid):
        for _ in range(len(queue)):
            x, y = queue.popleft()
            for dx, dy in DIRECTIONS:
                new_x, new_y = (x + dx, y + dy)
                if not self.is_valid(new_x, new_y, grid, visited):
                    continue
                if (new_x, new_y) in opposite_visited:
                    return True
                queue.append((new_x, new_y))
                visited.add((new_x, new_y))
                
        return False
        
    def is_valid(self, x, y, grid, visited):
        if x < 0 or x >= len(grid):
            return False
        if y < 0 or y >= len(grid[0]):
            return False
        if grid[x][y]:
            return False
        if (x, y) in visited:
            return False
        return True
```

[630 Knight Shortest Path II](https://www.lintcode.com/problem/knight-shortest-path-ii/description)

这个版本是马只能往右边走，但是从end那里反向过来，方向应该是完全相反的。

```python
FORWARD_DIRECTIONS = (
    (1, 2),
    (-1, 2),
    (2, 1),
    (-2, 1),
)

BACKWARD_DIRECTIONS = (
    (-1, -2),
    (1, -2),
    (-2, -1),
    (2, -1),
)

class Solution:
    def shortestPath2(self, grid):
        if not grid or not grid[0]:
            return -1
            
        n, m = len(grid), len(grid[0])
        if grid[n - 1][m - 1]:
            return -1
        if n * m == 1:
            return 0
            
        forward_queue = collections.deque([(0, 0)])
        forward_set = set([(0, 0)])
        backward_queue = collections.deque([(n - 1, m - 1)])
        backward_set = set([(n - 1, m - 1)])
        
        distance = 0
        while forward_queue and backward_queue:
            distance += 1
            if self.extend_queue(forward_queue, FORWARD_DIRECTIONS, forward_set, backward_set, grid):
                return distance
                
            distance += 1
            if self.extend_queue(backward_queue, BACKWARD_DIRECTIONS, backward_set, forward_set, grid):
                return distance

        return -1
                
    def extend_queue(self, queue, directions, visited, opposite_visited, grid):
        for _ in range(len(queue)):
            x, y = queue.popleft()
            for dx, dy in directions:
                new_x, new_y = (x + dx, y + dy)
                if not self.is_valid(new_x, new_y, grid, visited):
                    continue
                if (new_x, new_y) in opposite_visited:
                    return True
                queue.append((new_x, new_y))
                visited.add((new_x, new_y))
                
        return False
        
    def is_valid(self, x, y, grid, visited):
        if x < 0 or x >= len(grid):
            return False
        if y < 0 or y >= len(grid[0]):
            return False
        if grid[x][y]:
            return False
        if (x, y) in visited:
            return False
        return True
```

[LeetCode-127 Word Ladder](https://leetcode.com/problems/word-ladder/)

```python
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

[LeetCode-126 Word Ladder II](https://leetcode.com/problems/word-ladder-ii/)

BFS 搜索最短路径，然后DFS 找到这些路径。

题目要求找出所有从start到end的最短转换序列，显然我们需要考虑bfs搜索最短路，路径中的下一跳都存在于字典内，由于都是小写字母，可以枚举当前字符串下一跳可能的所有字符串,对于字符串s,将他的每一位都用'a'-'z'替换一遍，判断被替换字母后的s是否存在于dict中,这样相比直接在dict中搜索下一跳可以有效的减少时间复杂度（如果直接找下一跳那么必须遍历dict）。跑完所有最短路径后再dfs将图转换为start--end的路径

先添加end到dict中，便于计算

先对start--end通过队列bfs计算出所有最短路

对于每个当前字符串用暴力替换每一位的字母，查找是否存在于dict中

通过dfs遍历所有最短路，打印出所有路径

复杂度分析

时间复杂度O((V+E))

bfs O(V+E)遍历所有边 E（即当前字符串的下一跳）和点V，dfsO(size(dict))跑最后的最短路

空间复杂度O(size(dict)*k)

存每个字符串与下一跳字符串的集合以及最短路径

```python
class Solution:
    def findLadders(self, start, end, dict):

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
                    word=q[0]
                    q.popleft()
                    for nextword in next_word(word):
                        next_word_dict[word].append(nextword)
                       #当下一跳是end时，就可以结束搜索
                        if nextword == end:
                            flag = True
                        #如果没被添加过，则进行添加
                        if nextword not in distance:
                            distance[nextword] = step
                            q.append(nextword)
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

Word Ladder和Knight Shortest Path这两组题目，非常经典，对BFS的解法 必须熟练掌握，是BFS解法的经典。
