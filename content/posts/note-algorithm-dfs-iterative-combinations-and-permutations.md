---
title: "Algorithm Notes: DFS Iterative CombinationsAndPermutations"
date: "2021-01-01"
excerpt: ""
kind: post
tags:
  - Algorithm Notes
  - Study Notes
comments: true
---

## DFS 非递归的方式实现排列组合 习题选

本章关键字：Combination（组合），Permutations（排列），Binary（二进制）。

<p align="center"> <b> 例题 1 组合问题 </b> </p>

用非递归（Non-recursion / Iteration）的方式实现全子集问题，有两种方式：
- 进制转换（Binary）
- 宽度优先搜索（BFS）

**基于进制转换的方法：**

思路就是使用一个 正整数的二进制表示 的第 i 位是 1 还是 0 来代表集合的第 i 个数取或者不取。因为从 0 到 2^n - 1 总共 2^n 个整数，正好对应集合的 2^n 个子集。

比如 {1，2，3} 的子集可以用 0 到 7 来表示。

```
0 -> 000 -> {}
1 -> 001 -> {3}
2 -> 010 -> {2}
3 -> 011 -> {2,3}
4 -> 100 -> {1}
5 -> 101 -> {1,3}
6 -> 110 -> {1,2}
7 -> 111 -> {1,2,3}
```

实现代码 (全子集问题) [LeetCode-78 Subsets](https://leetcode.com/problems/subsets/)

```python
class Solution:
    def subsets(self, nums):
        result = []
        n = len(nums)
        nums.sort()
        for i in range(1 << n):
            subset = []
            for j in range(n):
                if (i & (1 << j)) != 0:
                    subset.append(nums[j])
            result.append(subset)
        return result
```

Bitwise Operators:

x << y

Returns x with the bits shifted to the left by y places (and new bits on the right-hand-side are zeros). This is the same as multiplying x by 2**y.

x >> y

Returns x with the bits shifted to the right by y places. This is the same as //'ing x by 2**y.

x & y

Does a "bitwise and". Each bit of the output is 1 if the corresponding bit of x AND of y is 1, otherwise it's 0.


```python
#例子中:
for i in range(1 << n): ### 这里是在iterate over 0 - 2^n - 1 因为 1<<n is 001 --> 001000
            subset = []
            for j in range(n): ### 这里对 0 - （n - 1） iterate, （bit的位数，对应nums的个数）
                if (i & (1 << j)) != 0: ### 这一步操作最关键。它是在找当前的i里的1出现在哪个bit位置上，出现在哪里，对应的nums的index上的num就要放进subset里成为subset元素的一个。
                ### 比如 1 << j, 是在遍历 001， 010， 100， 1出现的位置。
                    subset.append(nums[j])
            result.append(subset)

```

这里利用bit shift来找 1 位置的小技巧需要记住！

**基于BFS的方法：**

我们很少提到用 BFS 来解决找所有的方案的问题。事实上 BFS 也是可以用来做这件事情的。

用 BFS 来解决该问题时，层级关系如下：

```
第一层: []
第二层: [1] [2] [3]
第三层: [1, 2] [1, 3], [2, 3]
第四层: [1, 2, 3]
```
每一层的节点都是上一层的节点拓展而来。

同样是 Subsets 全子集这道题目基于BFS的代码实现：

```python
class Solution:
    def subsets(self, nums):
        results = []

        if not nums:
            return results

        nums.sort()

        # BFS
        queue = deque()
        queue.append([])

        while queue:
            subset = queue.popleft()
            results.append(subset)

            for i in range(len(nums)):
                if not subset or subset[-1] < nums[i]:
                    nextSubset = list(subset)
                    nextSubset.append(nums[i])
                    queue.append(nextSubset)

        return results

```

<p align="center"> <b> 例题 2 排列问题 </b> </p>

Subsets 这道题目是一道组合问题， 那么对于排列问题， 有什么不同呢？

在学习全排列的解决方法之前，我们先来学习如何求 下一个排列。

[LeetCode-31 Next Permutation](https://leetcode.com/problems/next-permutation/)

问题：给定一个若干整数的排列，给出按整数大小进行字典序从小到大排序后的下一个排列。若没有下一个排列，则输出字典序最小的序列。
从末尾往左走，如果一直递增，例如 {...9,7,5} ，那么下一个排列一定会牵扯到左边更多的数，直到一个非递增数为止，例如 {...6,9,7,5} 。对于原数组的变化就只到 6 这里，和左侧其他数再无关系。6 这个位置会变成6右侧所有数中比 6 大的最小的数，而 6 会进入最后 3 个数中，且后 3 个数必是升序数组。
所以算法步骤如下：

从右往左遍历数组 nums，直到找到一个位置 i ，满足 nums[i] > nums[i - 1] 或者 i 为 0 。
i 不为 0 时，用j再次从右到左遍历 nums ，寻找第一个 nums[j] > nums[i - 1] 。而后交换 nums[j] 和 nums[i - 1] 。注意，满足要求的 j 一定存在！且交换后 nums[i] 及右侧数组仍为降序数组。
将 nums[i] 及右侧的数组翻转，使其升序。

The replacement must be in-place and use only constant extra memory.

Q：i为0怎么办？

A：i为0说明整个数组是降序的，直接翻转整个数组即可。

Q：有重复元素怎么办？

A：在遍历时只要严格满足 nums[i] > nums[i - 1] 和 nums[j] > nums[i - 1] 就不会有问题。

Q：元素过少是否要单独考虑？

A：当元素个数小于等于1个时，可以直接返回。

```python
class Solution:
    # 用于翻转nums[i]到nums[j]，包含两端的这一小段数组
    def swapList(self, nums, i, j):
        while i < j:
            nums[i], nums[j] = nums[j], nums[i]
            i += 1
            j -= 1
            
    """
    @param nums: An array of integers
    @return: nothing
    """
    def nextPermutation(self, nums):
        n = len(nums)
        if n <= 1:
            return
        
        i = n-1
        while i > 0 and nums[i] <= nums[i-1]:
            i -= 1

        if i != 0:
            j = n-1
            while nums[j] <= nums[i-1]:
                j -= 1
            nums[j], nums[i-1] = nums[i-1], nums[j]
        self.swapList(nums, i, n-1)

```

在学习了 下一个排列 的算法之后，对于全排列问题，我们只需要不断调用这个算法的函数就可以啦。
一些可以做得更细致的地方：
为了确定何时结束，建议在迭代前，先对输入nums数组进行升序排序，迭代到降序时，就都找完了。有心的同学可能还记得在 nextPermutation 当中，当且仅当数组完全降序，那么从右往左遍历的指针 i 最终会指向 0 。所以可以为 nextPermutation 带上布尔返回值，当 i 为 0 时，返回 false，表示找完了。要注意，排序操作在这样一个 NP 问题中，消耗的时间几乎可以忽略。
当数组长度为 1 时，nextPermutation 会直接返回 false ；当数组长度为 0 时， nextPermutation 中 i 会成为 -1 ，所以返回 false 的条件可以再加上 i 为 -1 。
Java中，如果输入类型是 int[] ，而输出类型是 List<List> ，要注意，并没有太好的方法进行类型转换，这是由于 int 是基本类型。建议还是自行手动复制，实际工作中还可使用 guava 库。

**全排列** [LeetCode-46 Permutations](https://leetcode.com/problems/permutations/)

```python
class Solution:
    """
    @param: nums: A list of integers.
    @return: A list of permutations.
    """
    def permute(self, nums):
        # write your code here
        nums.sort()
        result = []


        hasNext = True  # hasNext 为 true 时，表示可以继续迭代
        while hasNext:
            current = list(nums)  # 进行数组复制
            result.append(current)
            hasNext = self.nextPermutation(nums)
        
        return result


    def swapList(self, nums, i, j):
        while i < j:
            nums[i], nums[j] = nums[j], nums[i]
            i += 1
            j -= 1
            
    def nextPermutation(self, nums):
        n = len(nums)
        if n <= 1:
            return
        
        i = n - 1
        while i > 0 and nums[i] <= nums[i-1]:
            i -= 1


        if i <= 0:
            return False


        j = n-1
        while nums[j] <= nums[i-1]:
            j -= 1
        nums[j], nums[i-1] = nums[i-1], nums[j]
        
        self.swapList(nums, i, n-1)


        return True
```

而此题的recursive dfs 解法是：

```python
class Solution:
    """
    @param: nums: A list of integers.
    @return: A list of permutations.
    """
    def permute(self, nums):
        # write your code here
        if not nums:
            return [[]]
        permutations = []
        self.dfs(nums, [], set(), permutations)
        return permutations
    
    def dfs(self, nums, permutation, visited, permutations):
        ### exit
        if len(permutation) == len(nums):
            permutations.append(list(permutation))
            return 
        
        for num in nums:
            if num in visited:
                continue
            permutation.append(num)
            visited.add(num)
            self.dfs(nums, permutation, visited, permutations)
            ### backtracking
            permutation.pop()
            visited.remove(num)
```

最后我们来研究下如何求一个排列是第几个。

[197 Permutation Index](https://www.lintcode.com/problem/permutation-index/description)

**题目**：给出一个不含重复数字的排列，求这些数字的所有排列按字典序排序后该排列的编号，编号从1开始。例如排列 [1, 2, 4] 是第 1 个排列。

**算法描述**

只需计算有多少个排列在当前排列A的前面即可。如何算呢?举个例子，[3,7,4,9,1]，在它前面的必然是某位置i对应元素比原数组小，而i左侧和原数组一样。也即 [3,7,4,1,X] ， [3,7,1,X,X] ， [3,1或4,X,X,X] ， [1,X,X,X,X] 。
而第 i 个元素，比原数组小的情况有多少种，其实就是 A[i] 右侧有多少元素比 A[i] 小，乘上 A[i] 右侧元素全排列数，即 A[i] 右侧元素数量的阶乘。 i 从右往左看，比当前 A[i] 小的右侧元素数量分别为 1,1,2,1，所以最终字典序在当前 A 之前的数量为 1×1!+1×2!+2×3!+1×4!=39 ，故当前 A 的字典序为 40。

**具体步骤**：

用 permutation 表示当前阶乘，初始化为 1,result 表示最终结果，初始化为 0 。由于最终结果可能巨大，所以用 long 类型。
i从右往左遍历 A ，循环中计算 A[i] 右侧有多少元素比 A[i] 小，计为 smaller ，result += smaller * permutation。之后 permutation *= A.length - i ，为下次循环 i 左移一位后的排列数。
已算出多少字典序在 A 之前，返回 result + 1 。


Q：为了找寻每个元素右侧有多少元素比自己小，用了O(n^2)的时间，能不能更快些？

A：可以做到O(nlogn)，但是很复杂，这是另外一个问题了，可以使用BST，归并排序或者线段树：http://www.lintcode.com/zh-cn/problem/count-of-smaller-number-before-itself/

Q：元素有重复怎么办？

A：好问题！元素有重复，情况会复杂的多。因为这会影响 A[i] 右侧元素的排列数，此时的排列数计算方法为总元素数的阶乘，除以各元素值个数的阶乘，例如 [1, 1, 1, 2, 2, 3] ，排列数为 6! ÷ (3! × 2! × 1!) 。为了正确计算阶乘数，需要用哈系表记录 A[i] 及右侧的元素值个数，并考虑到 A[i] 与右侧比其小的元素 A[k] 交换后，要把 A[k] 的计数减一。用该哈系表计算正确的阶乘数。而且要注意，右侧比 A[i]小 的重复元素值只能计算一次，不要重复计算！

```python
class Solution:
    """
    @param A: An array of integers
    @return: A long integer
    """
    def permutationIndex(self, A):
        permutation = 1
        result = 0
        for i in range(len(A) - 2, -1, -1):
            smaller = 0
            for j in range(i + 1, len(A)):
                if A[j] < A[i]:
                    smaller += 1
            result += smaller * permutation
            permutation *= len(A) - i
        return result + 1

```
