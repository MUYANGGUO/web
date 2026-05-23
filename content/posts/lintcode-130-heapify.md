---
title: "LintCode 130 Heapify - Medium"
date: "2021-01-01"
excerpt: 130. Heapify
kind: leetcode
tags:
  - LintCode
  - Medium
  - Python
order: 130
comments: true
---

### 130. Heapify — Medium

[Open on LintCode](https://www.lintcode.com/problem/130/)

## Problem

130. Heapify

Given an integer array, heapify it into a min-heap array.

For a heap array A, A[0] is the root of heap, and for each A[i], A[i * 2 + 1] is the left child of A[i] and A[i * 2 + 2] is the right child of A[i].
Example
Example 1

Input : [3,2,1,4,5]
Output : [1,2,3,4,5]
Explanation : return any one of the legitimate heap arrays
Challenge
O(n) time complexity

Clarification
What is heap? What is heapify? What if there is a lot of solutions?

Heap is a data structure, which usually have three methods: push, pop and top. where "push" add a new element the heap, "pop" delete the minimum/maximum element in the heap, "top" return the minimum/maximum element.
Convert an unordered integer array into a heap array. If it is min-heap, for each element A[i], we will get A[i * 2 + 1] >= A[i] and A[i * 2 + 2] >= A[i].
Return any of them.

## Solution

```python
### 方法一： siftup 时间复杂度分析：

### 对于每个元素都要遍历一遍，这部分是 O(n)

### 每处理一个元素时，最多需要向根部方向交换 logn次。

### 因此总的时间复杂度是 O(nlogn)


class Solution:
    """
    @param: A: Given an integer array
    @return: nothing
    """
    def siftup(self, A, k):
        #只要k不是数列第一个数（root）
        while k != 0:
            # father 的index：
            father = (k - 1) // 2
            # 如果当前位置的数 比 father 大，不用操作，直接break while 循环 
            if A[k] > A[father]:
                break
            # 如果小于等于：
            # 交换两个数，并且更新k到father (上移动)
            A[k], A[father] = A[father], A[k]
            k = father
            
    def heapify(self, A):
        for i in range(len(A)):
            ### 对每个数进行shiftup,判断是否需要进行往上找的操作
            self.siftup(A, i)


### 方法二：siftdown O(N)

# 时间复杂度分析

# 这个版本的算法，乍一看也是 O(nlogn)， 但是我们仔细分析一下，算法从第 n/2 个数开始，倒过来进行 siftdown。也就是说，相当于从 heap 的倒数第二层开始进行 siftdown 操作，倒数第二层的节点大约有 n/4 个， 这 n/4 个数，最多 siftdown 1次就到底了，所以这一层的时间复杂度耗费是 O(n/4)，然后倒数第三层差不多 n/8 个点，最多 siftdown 2次就到底了。所以这里的耗费是 O(n/8 * 2), 倒数第4层是 O(n/16 * 3)，倒数第5层是 O(n/32 * 4) ... 因此累加所有的时间复杂度耗费为：

# T(n) = O(n/4) + O(n/8 * 2) + O(n/16 * 3) ...

# 然后我们用 2T - T 得到：

# 2 * T(n) = O(n/2) + O(n/4 * 2) + O(n/8 * 3) + O(n/16 * 4) ...

# T(n) = O(n/4) + O(n/8 * 2) + O(n/16 * 3) ...

# 2 * T(n) - T(n) = O(n/2) +O (n/4) + O(n/8) + ...

# = O(n/2 + n/4 + n/8 + ... )

# = O(n)

# 因此得到 T(n) = 2 * T(n) - T(n) = O(n)

class Solution:
    """
    @param: A: Given an integer array
    @return: nothing
    """
    def siftdown(self, A, k):
 
        ### if still have left children in range:
        while k * 2 + 1 < len(A):
            smallest_son = k * 2 + 1
            if k * 2 + 2 < len(A) and A[k * 2 + 1] > A[k * 2 + 2]:
                smallest_son = k * 2 + 2
            
            # compare smallest_son with current number
            
            ### 符合条件直接break不需要再进行while loop
            if A[k] < A[smallest_son]:
                break
            
            A[k], A[smallest_son] = A[smallest_son], A[k]
            k = smallest_son
            
        
        
    def heapify(self, A):
        ### 注意这里这个方法要注意是倒序遍历：
        
        for i in range(len(A) - 1, -1, -1):
            # 对每个数判断是否需要进行shift down 的操作，向下交换
            self.siftdown(A, i)
        return A
```
