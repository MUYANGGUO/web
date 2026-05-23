---
title: "Algorithm Notes: DFS"
date: "2021-01-01"
excerpt: ""
kind: post
tags:
  - Algorithm Notes
  - Study Notes
comments: true
---

## Chapter 6: 遍历法 DFS
1. [480 Binary Tree Paths](https://leetcode.com/problems/binary-tree-paths/)
2. [93 Balanced Binary Tree](https://leetcode.com/problems/balanced-binary-tree/)
3. [97 Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)
4. [628 Maximum Subtree](https://www.lintcode.com/problem/maximum-subtree/description)
5. [65 Median of Two Sorted Arrays](https://www.lintcode.com/problem/median-of-two-sorted-arrays/description)
6. [86 Binary Search Tree Iterator](https://leetcode.com/problems/binary-search-tree-iterator/)
7. [900 Closest Binary Search Tree Value](https://leetcode.com/problems/closest-binary-search-tree-value/)
8. [901 Closest Binary Search Tree Value II](https://leetcode.com/problems/closest-binary-search-tree-value-ii/)
9. [596 Minimum Subtree](https://www.lintcode.com/problem/minimum-subtree/description)
10. [88 Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)
11. [578 Lowest Common Ancestor III](https://www.lintcode.com/problem/lowest-common-ancestor-iii/description)
12. [474 Lowest Common Ancestor II](https://www.lintcode.com/problem/lowest-common-ancestor-ii/description)
13. [453 Flatten Binary Tree to Linked List](https://leetcode.com/problems/flatten-binary-tree-to-linked-list/)
14. [LeetCode-145 Binary Tree Postorder Traversal](https://leetcode.com/problems/binary-tree-postorder-traversal/)






> 补充：
> [LeetCode-226 Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/)



### 6.1 递归-以及利用递归实现的另一种搜索方法， 深度优先搜索（DFS）。

#### 6.1.1 Recursion/DFS/Backtracking 递归/深度搜索/回溯法 之间的区别

1. Resursion
   - 递归函数:程序的一种实现方式,即函数进行了自我调用
   - 递归算法:即大问题的结果依赖于小问题的结果,于是先用递归函数求解小问题
   - 一般我们说递归的时候,大部分时候都在说递归函数而不是递归算法
  
2. DFS
   - 可以使用递归函数来实现
   - 也可以不用递归函数来实现,如自己通过一个手动创建的栈 Stack 进行操作
   - 深度优先搜索通常是指在搜索的过程中优先搜索深度更深的点而不是按照宽
   度搜索同层节点
   
3. Backtracking
   - 回溯法:就是深度优先搜索算法
   - 回溯操作:递归函数在回到上一层递归调用处的时候,一些参数需要改回到调用前的值,这个操作就是回溯,即让状态参数回到之前的值,递归调用前做了什么改动,递归调用之后都改回来

例题： [480 Binary Tree Paths](https://leetcode.com/problems/binary-tree-paths/)

注意这类问题的回溯操作，append更新stack以后，再递归完成时，要pop出去。

不然：

比如：

        1

    /      \

    2       3

    \
    5

1 - append(2) - append(5) - null, return stack = [1, 2, 5]

we need to pop(5) - pop(2) so we have stack = [1]

and we can move to the right path and get stack = [1, 2] correctly.


```python
### DFS + Recursion + Stack:

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def binaryTreePaths(self, root):
        ### start the stack with the root as head
        stack = [root]
        ### contianer
        paths = []
        ### construct the paths output
        self.updatePaths(root, stack, paths)
        return paths
    
    def updatePaths(self,node, stack, paths):
        ### until the node is empty, return
        if not node:
            return
        ### unless left children and right children are all null, meaning reached to the deepest node
        if not node.left and not node.right:
            ### append the stack to the paths
            paths.append('->'.join([str(n.val) for n in stack]))
            return
        
        ### append, update, backtracking(pop out the added one and retrieve the earlier state)
        stack.append(node.left)
        self.updatePaths(node.left, stack, paths)
        ### backtracking, remove the added node (when update Paths reached to end, stack needs to be reset)
        stack.pop()
        
        stack.append(node.right)
        self.updatePaths(node.right, stack, paths)
        stack.pop()
        
```

### 6.2 遍历法 VS 分治法

遍历法 = 一个小人拿着一个记事本走遍所有的节点

分治法 = 分配小弟去做子任务,自己进行结果汇总

例题： [93 Balanced Binary Tree](https://leetcode.com/problems/balanced-binary-tree/)

分治法 DFS 经典题目：

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
    @param root: The root of binary tree.
    @return: True if this Binary tree is Balanced, or false.
    """
    def isBalanced(self, root):
        # write your code here
        is_balanced, _ = self.divideConquer(root)
        return is_balanced
    
    def divideConquer(self, root):
        
        if not root:
            return True, 0
        
        is_left_balanced, left_height = self.divideConquer(root.left)
        is_right_balanced, right_height = self.divideConquer(root.right)
        root_height = max(left_height, right_height) + 1
        
        if not is_left_balanced or not is_right_balanced:
            return False, root_height
        if abs(left_height - right_height) > 1:
            return False, root_height
        return True, root_height
```

例题： [97 Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def maxDepth(self, root):
        max_depth = self.dfs(root)
        return max_depth
    
    def dfs(self, root):
        if not root:
            return 0
        
        left_depth = self.dfs(root.left)
        right_depth = self.dfs(root.right)
        height = max(left_depth, right_depth) + 1
        return height
```

例题： [628 Maximum Subtree](https://www.lintcode.com/problem/maximum-subtree/description)

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
    @param root: the root of binary tree
    @return: the maximum weight node
    """
    maximum_weight = 0
    result = None
    def findSubtree(self, root):
        # write your code here
        self.helper(root)

        return self.result

    def helper(self, root):
        if root is None:
            return 0

        left_weight = self.helper(root.left)
        right_weight = self.helper(root.right)
        
        if left_weight + right_weight + root.val >= self.maximum_weight or self.result is None:
            self.maximum_weight = left_weight + right_weight + root.val
            self.result = root

        return left_weight + right_weight + root.val
```



### 6.3 BST 的中序遍历, 二叉查找树的迭代器 (非递归的方式实现二叉树的遍历)

递归 变成非递归 意味着自己需要控制原来由操作系统控制的 栈 的进进出出。

对于BST二叉树来说：

1.如何找到最小的第一个点？最左边的点就是。

2. 如何求出一个二叉树节点在中序遍历中的下一个节点？

在stack中记录从根节点到当前节点的整条路径。

下一个点 = 右子树最小点 or 路径中最近一个通过左子树 包含当前点的点。（这点非常重要，需要举个例子来说明比较容易理解）

一种 更简单的实现方式：

在stack中不保存哪些已经被iterator访问过的节点，如果iterate到了这个节点，即便右子树还未完全遍历，也从stack里踢出。

例题：[86 Binary Search Tree Iterator](https://leetcode.com/problems/binary-search-tree-iterator/)

1. **必须记住的万能BST iterator 模板**

```python
"""
Definition of TreeNode:
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left, self.right = None, None

Example of iterate a tree:
iterator = BSTIterator(root)
while iterator.hasNext():
    node = iterator.next()
    do something for node 
"""


class BSTIterator:
    """
    @param: root: The root of binary tree.
    """
    def __init__(self, root):
        self.stack = []
        while root != None:
            self.stack.append(root)
            root = root.left

    """
    @return: True if there has next node, or false
    """
    def hasNext(self):
        return len(self.stack) > 0

    """
    @return: return next node
    """
    def next(self):
        node = self.stack[-1]
        ### 如果右边有，那么把右边子树的最左放进stac
        if node.right is not None:
            n = node.right
            while n != None:
                self.stack.append(n)
                n = n.left
        ### 如果没有右枝，那么找最靠近的左parent
        else:
            n = self.stack.pop()
            while self.stack and self.stack[-1].right == n:
                n = self.stack.pop()
        
        return node
```

2. **简单化，但只能从小到大遍历的BST iterator模板。 也需要掌握！！！**

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class BSTIterator:

    def __init__(self, root):
        self.stack = []
        self.find_most_left(root)
    
    def find_most_left(self, node):
        while node:
            self.stack.append(node)
            node = node.left        

    def next(self):
        """
        @return the next smallest number
        """
        node = self.stack.pop()
        if node.right:
            self.find_most_left(node.right)
        return node.val
        #or return node (depends on question)
        

    def hasNext(self):
        """
        @return whether we have a next smallest number
        """
        return bool(self.stack)

```

例题：[900 Closest Binary Search Tree Value](https://leetcode.com/problems/closest-binary-search-tree-value/)

**递归，找出上界和下界即可。经典模板题！！！**

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
    @param root: the given BST
    @param target: the given target
    @return: the value in the BST that is closest to the target
    """
    def closestValue(self, root, target):
        # write your code here
        if root is None:
            return None
            
        lower = self.get_lower_bound(root, target)
        upper = self.get_upper_bound(root, target)
        if lower is None:
            return upper.val
        if upper is None:
            return lower.val
            
        if target - lower.val < upper.val - target:
            return lower.val
        return upper.val
        
    def get_lower_bound(self, root, target):
        # get the largest node that < target
        if root is None:
            return None
        
        if target < root.val:
            return self.get_lower_bound(root.left, target)
            
        lower = self.get_lower_bound(root.right, target)
        return root if lower is None else lower
        
    def get_upper_bound(self, root, target):
        # get the smallest node that >= target
        if root is None:
            return None
        
        if target >= root.val:
            return self.get_upper_bound(root.right, target)
            
        upper = self.get_upper_bound(root.left, target)
        return root if upper is None else upper
```


例题：[901 Closest Binary Search Tree Value II](https://leetcode.com/problems/closest-binary-search-tree-value-ii/)

**这题非常难，需要好好理解，最优解法：**

实现如下的子函数：

getStack() => 在假装插入 target 的时候，看看一路走过的节点都是哪些，放到 stack 里，用于 iterate

moveUpper(stack) => 根据 stack，挪动到 next node

moveLower(stack) => 根据 stack, 挪动到 prev node

有了这些函数之后，就可以把整个树当作一个数组一样来处理，只不过每次 i++ 的时候要用 moveUpper，i--的时候要用 moveLower


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
    @param root: the given BST
    @param target: the given target
    @param k: the given k
    @return: k values in the BST that are closest to the target
    """
    def closestKValues(self, root, target, k):
        # write your code here
        if root is None or k == 0:
            return []
            
        lower_stack = self.get_stack(root, target)
        upper_stack = list(lower_stack)
        if lower_stack[-1].val < target:
            self.move_upper(upper_stack)
        else:
            self.move_lower(lower_stack)
        
        result = []
        for i in range(k):
            if self.is_lower_closer(lower_stack, upper_stack, target):
                result.append(lower_stack[-1].val)
                self.move_lower(lower_stack)
            else:
                result.append(upper_stack[-1].val)
                self.move_upper(upper_stack)
                
        return result
        
    def get_stack(self, root, target):
        stack = []
        while root:
            stack.append(root)
            if target < root.val:
                root = root.left
            else:
                root = root.right
                
        return stack
        
    def move_upper(self, stack):
        if stack[-1].right:
            node = stack[-1].right
            while node:
                stack.append(node)
                node = node.left
        else:
            node = stack.pop()
            while stack and stack[-1].right == node:
                node = stack.pop()
                
    def move_lower(self, stack):
        if stack[-1].left:
            node = stack[-1].left
            while node:
                stack.append(node)
                node = node.right
        else:
            node = stack.pop()
            while stack and stack[-1].left == node:
                node = stack.pop()
                
    def is_lower_closer(self, lower_stack, upper_stack, target):
        if not lower_stack:
            return False
            
        if not upper_stack:
            return True
            
        return target - lower_stack[-1].val < upper_stack[-1].val - target
```


<p align="center"> <b> 练习题 </b> </p>

[LeetCode-226 Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/)

Recursive， Iterative BFS， Iterative DFS：

```python
# recursively
def invertTree1(self, root):
    if root:
        root.left, root.right = self.invertTree(root.right), self.invertTree(root.left)
        return root
        
# BFS
def invertTree2(self, root):
    queue = collections.deque([(root)])
    while queue:
        node = queue.popleft()
        if node:
            node.left, node.right = node.right, node.left
            queue.append(node.left)
            queue.append(node.right)
    return root
    
# DFS
def invertTree(self, root):
    stack = [root]
    while stack:
        node = stack.pop()
        if node:
            node.left, node.right = node.right, node.left
            stack.extend([node.right, node.left])
    return root
```

[596 Minimum Subtree](https://www.lintcode.com/problem/minimum-subtree/description)

最小子树问题，此题和maximum subtree为一套。

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
    @param root: the root of binary tree
    @return: the root of the minimum subtree
    """
    def findSubtree(self, root):
        # write your code here
        minimum, subtree, sum = self.helper(root)
        
        return subtree
        
    def helper(self, root):
        if root is None:
            return sys.maxsize, None, 0
        
        left_minimum, left_subtree, left_sum = self.helper(root.left)
        right_minimum, right_subtree, right_sum = self.helper(root.right)
        
        sum = left_sum + right_sum + root.val
        
        if left_minimum == min(left_minimum, right_minimum, sum):
            return left_minimum, left_subtree, sum
        if right_minimum == min(left_minimum, right_minimum, sum):
            return right_minimum, right_subtree, sum
        
        return sum, root, sum
```

<p align="center"> <b> 重要的LCA系列问题 练习题 </b> </p>

[88 Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def lowestCommonAncestor(self, root, p, q):
        # 如果 A 和 B 都在，return  LCA
        # 如果只有 A 在，return A
        # 如果只有 B 在，return B
        # 如果 A, B 都不在，return None
        ### 分治法,非常经典，需要理解
        
        ### recursion ends 的条件：要么没有p,q, 要么找到了pq
        if root is None:
            return None
        
        if root == p or root == q:        ### 这里比的是内存
            return root
        
        left_LCA = self.lowestCommonAncestor(root.left, p, q)
        right_LCA = self.lowestCommonAncestor(root.right, p, q)
        
        # A 和 B 一边一个
        if left_LCA and right_LCA:
            return root
        # 只有左边有A，B
        if left_LCA:
            return left_LCA
        # 只有右边有A，B
        if right_LCA:
            return right_LCA
        # 两边都没有A，B
        return None
        
```


[578 Lowest Common Ancestor III](https://www.lintcode.com/problem/lowest-common-ancestor-iii/description)

这道题是上一个题目的引申，这道题不保证A，B 会出现在树上。

```python
"""
Definition of TreeNode:
class TreeNode:
    def __init__(self, val):
        this.val = val
        this.left, this.right = None, None
"""


class Solution:
    """
    @param: root: The root of the binary tree.
    @param: A: A TreeNode
    @param: B: A TreeNode
    @return: Return the LCA of the two nodes.
    """
    def lowestCommonAncestor3(self, root, A, B):
        # write your code here
        ### 判断A B 是否全部在树上
        
        ### 我们需要两个flag， a， b
        
        a, b , LCA = self.helper(root, A, B)
        
        if a and b:
            return LCA
        else:
            return None
            
    def helper(self, root, A, B):
        if root is None:
            return False, False, None
        
        left_a, left_b, left_node = self.helper(root.left, A, B)
        right_a, right_b, right_node = self.helper(root.right, A, B)
        
        ### 这里是判断flag 包括了所有情况
        a = left_a or right_a or root == A
        b = left_b or right_b or root == B
        
        if root == A or root == B:
            return a, b, root
        
        if left_node is not None and right_node is not None:
            return a, b, root
        if left_node is not None:
            return a, b, left_node
        if right_node is not None:
            return a, b, right_node
        
        return a, b, None
            
```

[474 Lowest Common Ancestor II](https://www.lintcode.com/problem/lowest-common-ancestor-ii/description)

有parent node指针的LCA题目变形。

```python
"""
Definition of ParentTreeNode:
class ParentTreeNode:
    def __init__(self, val):
        self.val = val
        self.parent, self.left, self.right = None, None, None
"""


class Solution:
    """
    @param: root: The root of the tree
    @param: A: node in the tree
    @param: B: node in the tree
    @return: The lowest common ancestor of A and B
    """
    def lowestCommonAncestorII(self, root, A, B):
        # write your code here
        # 注意这里A，B 也都是Node，所以直接node.parent回去就可以了
        if root is None:
            return None
        if root == A or root == B:
            return root
        A_path = set()
        while A is not root:
            A_path.add(A)
            A = A.parent

        while B is not root:
            if B in A_path:
                return B
            B = B.parent

        return root
```

<p align="center"> <b> 前序遍历 练习题 </b> </p>

[453 Flatten Binary Tree to Linked List](https://leetcode.com/problems/flatten-binary-tree-to-linked-list/)

这里指的是前序遍历二叉树，并且in-place利用右指针当作next的功能，改成一个“假链表”。

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def flatten(self, root):
        """
        Do not return anything, modify root in-place instead.
        """
        if root is None:
            return None
        ### 分治法的思想，先把左子树变成linkedlist再把右子树变成linkedlist，最后合起来
        left = self.flatten(root.left)
        right = self.flatten(root.right)
        
        ### 如果左边不是空，那么通过以root为head依次链接左，右边。
        if left is not None:
            left.right = root.right
            root.right = root.left
            root.left = None
            
        return right or left or root
```


<p align="center"> <b> 非递归 BST Iterator 类型 练习题 </b> </p>

[902 Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)

经典题目：

这道题是必会题目 [Closest Binary Search Tree Value I and II] 这两题的基础。

非常需要注意！！！

这里使用了iterator + DummyNode的做法，O（K + h）， h是树的高度。

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def kthSmallest(self, root, k):
        dummy = TreeNode(0)
        dummy.right = root
        stack = [dummy]
            
        for i in range(k):
            node = stack.pop()
            if node.right:
                node = node.right
                while node:
                    stack.append(node)
                    node = node.left
            if not stack:
                return None
                
        return stack[-1].val
```

<p align="center"> <b> 非递归  BST 后序遍历  类型 讲解 + 练习题 </b> </p>

与前序、中序的非递归方式相同，二叉树的非递归后序遍历也需要借助栈来完成，遍历顺序为左、右、根。

大致思路如下：
1、如果根节点非空，将根节点加入到栈中。
2、如果栈不空，取栈顶元素（暂时不弹出），
a.如果（左子树已访问过或者左子树为空），且（右子树已访问过或右子树为空），则弹出栈顶节点，将其值加入数组，
b.如果左子树不为空，且未访问过，则将左子节点加入栈中，并标左子树已访问过。
c.如果右子树不为空，且未访问过，则将右子节点加入栈中，并标右子树已访问过。
3、重复第二步，直到栈空。

[LeetCode-145 Binary Tree Postorder Traversal](https://leetcode.com/problems/binary-tree-postorder-traversal/)

此模板需要记住！！！

```python
class Solution:
    """
    @param root: A Tree
    @return: Postorder in ArrayList which contains node values.
    """
    def postorderTraversal(self, root):
        result = []
        stack = []
        prev, curr = None, root

        if not root:
            return result

        stack.append(root)
        while len(stack) > 0:
            curr = stack[-1]
            if not prev or prev.left == curr or prev.right == curr:  # traverse down the tree
                if curr.left:
                    stack.append(curr.left)
                elif curr.right:
                    stack.append(curr.right)
            elif curr.left == prev:  # traverse up the tree from the left
                if curr.right:
                    stack.append(curr.right)
            else:  # traverse up the tree from the right
                result.append(curr.val)
                stack.pop()
            prev = curr

        return result
```
