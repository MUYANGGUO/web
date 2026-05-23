---
title: "LintCode 464 Sort Integers II - Easy"
date: "2021-01-01"
excerpt: 464. 整数排序 II
kind: leetcode
tags:
  - LintCode
  - Easy
  - Python
order: 464
comments: true
---

### 464. Sort Integers II — Easy

[Open on LintCode](https://www.lintcode.com/problem/464/)

## Problem

464. 整数排序 II
给一组整数，请将其在原地按照升序排序。使用归并排序，快速排序，堆排序或者任何其他 O(n log n) 的排序算法。

Example
例1：

输入：[3,2,1,4,5]，
输出：[1,2,3,4,5]。
例2：

输入：[2,3,1]，
输出：[1,2,3]。

## Solution

```python
### Quicksort:
class Solution:
    """
    @param A: an integer array
    @return: nothing
    """
    def sortIntegers2(self, A):
        # write your code here
        if not A:
            return
        self.quicksort(A, 0, len(A) - 1)
        return A
        
    
    def quicksort(self, A, start, end):
        
        ### recursion ending condition
        if start >= end:
            return
        
        ### denote left and right pointers
        left, right = start, end
        ### identify pivot, here choose pivot as the whole array's middle index's value
        pivot = A[int((start + end) / 2)]
        
        ### advancing the left, right ptrs, until we find the two numbers needed to be swapped
        '''
        1. 这里注意一定是left <= right 作为while loop的条件。因为我们需要避免left 和 right 重叠。这是因为quicksort是recursion， 下一步的时候必须保证
        分出的两个部分不能有交集(如果有交集会造成stackoverflow)，所以要在left = right的时候，对left， right也进行一次符合排序逻辑的操作，使得left 和 right不相等，而且可以退出循环。
        2. 同时与pivot的比较的时候，不要包括等于的情况，也会造成stack overflow 你如【1， 1， 1， 1， 1】 这种情况left会一直加到left>right, 造成right没有条件变小。
        导致sort的数组size并没有变化而一直在递归，会stackoverflow。

        '''
        while left <= right:
            while left <= right and A[left] < pivot:
                left += 1
            while left <= right and A[right] > pivot:
                right -= 1 
            ### after found the left, and right, needed to be swamped, here swap them and then advance the left and right ptrs, 
            ### continue to check others and swap, and then continue until out the loop
            if left <= right :
                temp = A[left]
                A[left] = A[right]
                A[right] = temp
                left += 1
                right -= 1
        ### Now we have just divided the A using the pivot value into two parts, 
        ### start to right and left to end. As now left should be larger than right, but they are nor overlapped, 
        ### since we take care of while loop condition.
        self.quicksort(A, start, right)
        self.quicksort(A, left, end)
        ### we perform the quicksort on both parts.
        ### The ending condition will be the inputs for quicksort new start and end, 
        ### start is larger or equal to end, then we came to the end of the sort. 

### Mergesort:

class Solution:
    def sortArray(self, A: List[int]) -> List[int]:
        if not A:
            return
        ### 需要新建一个同样大小的数组。
        temp = [None] * len(A)
        self.mergeSort(A, 0, len(A) - 1, temp)
        
        ### 利用temp对A作改变，最后A应该被temp swap了。所以返回A
        return A
        
    
    def mergeSort(self, A, start, end, temp):
        ### recursion ending condition:
        if start >= end:
            return
        ### 分治法
        middle = int((start + end) / 2 )
        self.mergeSort(A, start, middle, temp)
        self.mergeSort(A, middle + 1, end, temp)
        ### merge
        ### 这个merge算法非常经典，需要熟练掌握。
        self.merge(A, start, end, temp)
     
    def merge(self, A, start, end, temp):
        middle = int((start + end) / 2)
        ptr1 = start
        ptr2 = middle + 1
        
        ### 这里一定要预留出来temp的index是从start开始操作的。
        temp_index = ptr1
        
        ### 注意这里不能用append因为我们一直对temp操作，要操作到index上。append只会添加到temp的结尾，并不能改变temp。
        ### 所以赋值要用while loop
        while ptr1 <= middle and ptr2 <= end:
            if A[ptr1] < A[ptr2]:
                temp[temp_index] = A[ptr1]
                ptr1 += 1
                temp_index += 1
            else:
                temp[temp_index] = A[ptr2]
                ptr2 += 1
                temp_index += 1
        
        ### check if ptr1 still <= middle or ptr2 still <= end:
        while ptr1 <= middle:
            temp[temp_index] = A[ptr1]
            temp_index += 1
            ptr1 += 1
        while ptr2 <= end:
            temp[temp_index] = A[ptr2]
            temp_index += 1
            ptr2 += 1
        ### 此处记得一定要在merge的时候，讲temp里的值一个一个赋值回去到A
        for i in range(start, end + 1):
            A[i] = temp[i]
```
