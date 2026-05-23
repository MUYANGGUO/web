---
title: "LeetCode 912 Sort An Array - Medium"
date: "2021-01-01"
excerpt: "Given an array of integers nums, sort the array in ascending order."
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 912
comments: true
---

### 912. Sort An Array — Medium

[Open on LeetCode](https://leetcode.com/problems/sort-an-array/)

## Problem

Given an array of integers nums, sort the array in ascending order.

 

Example 1:

Input: nums = [5,2,3,1]
Output: [1,2,3,5]
Example 2:

Input: nums = [5,1,1,2,0,0]
Output: [0,0,1,1,2,5]

## Solution

```python
### Solution 1. QuickSort:

class Solution:
    def sortArray(self, A):
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


### Solution 2. MergeSort
class Solution:
    def sortArray(self, A):
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
