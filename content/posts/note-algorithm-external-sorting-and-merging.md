---
title: "Algorithm Notes: External Sorting And Merging"
date: "2021-01-01"
excerpt: ""
kind: post
tags:
  - Algorithm Notes
  - Study Notes
comments: true
---

## 外排序和K路归并算法

外排序算法（External Sorting）
外排序算法是指在内存不够的情况下，如何对存储在一个或者多个大文件中的数据进行排序的算法。外排序算法通常是解决一些大数据处理问题的第一个步骤，或者是面试官所会考察的算法基本功。外排序算法是海量数据处理算法中十分重要的一块。
在学习这类大数据算法时，经常要考虑到内存、缓存、准确度等因素，这和我们之前见到的算法都略有差别。

外排序算法分为两个基本步骤：

- 将大文件切分为若干个个小文件，并分别使用内存排好序
- 使用K路归并算法（k-way merge）将若干个排好序的小文件合并到一个大文件中

第一步：文件拆分
根据内存的大小，尽可能多的分批次的将数据 Load 到内存中，并使用系统自带的内存排序函数（或者自己写个快速排序算法），将其排好序，并输出到一个个小文件中。比如一个文件有1T，内存有1G，那么我们就这个大文件中的内容按照 1G 的大小，分批次的导入内存，排序之后输出得到 1024 个 1G 的小文件。

第二步：K路归并算法
K路归并算法使用的是数据结构堆（Heap）来完成的，使用 Java 或者 C++ 的同学可以直接用语言自带的 PriorityQueue（C++中叫priority_queue）来代替。

我们将 K 个文件中的第一个元素加入到堆里，假设数据是从小到大排序的话，那么这个堆是一个最小堆（Min Heap）。每次从堆中选出最小的元素，输出到目标结果文件中，然后如果这个元素来自第 x 个文件，则从第 x 个文件中继续读入一个新的数进来放到堆里，并重复上述操作，直到所有元素都被输出到目标结果文件中。

Follow up: 一个个从文件中读入数据，一个个输出到目标文件中操作很慢，如何优化？
如果我们每个文件只读入1个元素并放入堆里的话，总共只用到了 1024 个元素，这很小，没有充分的利用好内存。另外，单个读入和单个输出的方式也不是磁盘的高效使用方式。因此我们可以为输入和输出都分别加入一个缓冲（Buffer）。假如一个元素有10个字节大小的话，1024 个元素一共 10K，1G的内存可以支持约 100K 组这样的数据，那么我们就为每个文件设置一个 100K 大小的 Buffer， 每次需要从某个文件中读数据，都将这个 Buffer 装满。当然 Buffer 中的数据都用完的时候，再批量的从文件中读入。输出同理，设置一个 Buffer 来避免单个输出带来的效率缓慢。
那下面我们就来熟悉下两路归并和K路归并的算法。

**例题 1** [6 Merge Two Sorted Arrays](https://www.lintcode.com/problem/merge-two-sorted-arrays/description) 

```python
class Solution:
    """
    @param A: sorted integer array A
    @param B: sorted integer array B
    @return: A new sorted integer array
    """
    def mergeSortedArray(self, A, B):
        # write your code here
        i, j = 0, 0
        merged = []
        while i < len(A) and j < len(B):
            if A[i] < B[j]:
                merged.append(A[i])
                i += 1
            else:
                merged.append(B[j])
                j += 1
            
        while i < len(A):
            merged.append(A[i])
            i += 1
        while j < len(B):
            merged.append(B[j])
            j += 1
        # 或者这样：
        # if i < len(A):
        #     merged += A[i:]
        # if j < len(B):
        #     merged += B[j:]       
        return merged
```

Follow Up：[LeetCode-88 Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/)

把小数组合并到大数组。希望用O（N + M）的最优时间复杂度来完成。那么应该从后往前合并，比大的，放大的。

```python
class Solution:
    """
    @param: A: sorted integer array A which has m elements, but size of A is m+n
    @param: m: An integer
    @param: B: sorted integer array B which has n elements
    @param: n: An integer
    @return: nothing
    """
    def mergeSortedArray(self, A, m, B, n):
        # write your code here
        pos = m + n - 1 
        i = m - 1  
        j = n - 1
        while  i >= 0 and j >= 0 :
            if A[i]>B[j] :
                A[pos]=A[i]
                pos-=1
                i-=1
            else :
                A[pos]=B[j]
                pos-=1
                j-=1
                
        while i >= 0 :
            A[pos] = A[i]
            pos-=1
            i-=1
        while j >= 0:
            A[pos] = B[j]
            pos-=1
            j-=1
```



**例题 2**  [LeetCode-21 Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def mergeTwoLists(self, l1, l2):
        dummy = ListNode(0)
        temp = dummy
        
        while l1 != None and l2 != None:
            if l1.val < l2.val:
                temp.next = l1
                l1 = l1.next
            else:
                temp.next = l2
                l2 = l2.next
            temp = temp.next
        
        if l1 != None:
            temp.next = l1
        else:
            temp.next = l2
        
        return dummy.next
```

**例题 3** [LeetCode-23 Merge K Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)

K 路归并算法。（共三种实现方法）

1.利用priority queue的方法可以在O（NlogK）的时间复杂度完成。[Heap]

2.利用二叉树的形式，两两归并，时间复杂度（ONlogK），利用的是merge two sorted lists。[从下往上]

3.分治法解决，（最应该掌握的算法，K路归并算法）[从上往下]

1.Heap做法，需要overwrite以下ListNode类的比较方程（__lt___), lessthan function, 这样就能直接把node放进heap里了。
```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

### overwrite the comparator function first, so that we could directly put ListNode into a heapq
import heapq

ListNode.__lt__ = lambda x, y: (x.val < y.val)

class Solution:
    def mergeKLists(self, lists):
        if not lists:
            return None
        
        dummy = ListNode(None)
        tail = dummy
        heap = []
        for head in lists:
            if head:
                heapq.heappush(heap, head)
        
        while heap:
            head = heapq.heappop(heap)
            tail.next = head
            tail = head
            if head.next:
                heapq.heappush(heap, head.next)
        
        return dummy.next

```
2.从下而上， 两两归并。两两归并，就是用merge two sorted lists就可以了。这题的思路和mergesort算法非常一致。
   
```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def mergeKLists(self, lists):
        ### 自顶部向下走：

        if not lists:
            return None
        
        return self.merge_range_lists(lists, 0, len(lists) -1)
    
    def merge_range_lists(self, lists, start, end):
        
        if start == end:
            return lists[start]
        
        mid = (start + end) // 2
        
        left = self.merge_range_lists(lists, start, mid)
        right = self.merge_range_lists(lists, mid + 1, end)
        return self.merge_two_lists(left, right)
    
    def merge_two_lists(self, head1, head2):
        tail = dummy = ListNode(None)
        while head1 and head2:
            if head1.val < head2.val:
                tail.next = head1
                head1 = head1.next
            else:
                tail.next = head2
                head2 = head2.next
            tail = tail.next
            
        if head1:
            tail.next = head1
        if head2:
            tail.next = head2

        return dummy.next
```

3.经典算法，k路并归，从上而下。 也是两两并归。 

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def mergeKLists(self, lists):
        if not lists:
            return None
        
        while len(lists) > 1:
            next_lists = []
            for i in range(0, len(lists), 2):
                if i + 1 < len(lists):
                    new_list = self.merge_two_lists(lists[i], lists[i + 1])
                else:
                    new_list = lists[i]
                
                next_lists.append(new_list)
                
            lists = next_lists
            
        return lists[0]
    
    def merge_two_lists(self, head1, head2):
        tail = dummy = ListNode(None)
        while head1 and head2:
            if head1.val < head2.val:
                tail.next = head1
                head1 = head1.next
            else:
                tail.next = head2
                head2 = head2.next
            tail = tail.next
        
        if head1:
            tail.next = head1
        if head2:  
            tail.next = head2
        
        return dummy.next
```

**例题 4** [839 Merge Two Sorted Interval Lists](https://www.lintcode.com/problem/merge-two-sorted-interval-lists/description)

算法：贪心+双指针

算法思路

用两个指针index1和index2分别指向list1和list2的头部，然后比较两个区间的左端点，挑出左端点较小的，将其与答案中最后一个区间进行比较，如果可以合并则合并，否则就将那个区间加入到答案最后。直到所有区间都被合并或者加入到答案中为止

代码思路

先进行特判，若其中一个list为空则直接返回另一个list

将两个指针index1和index2分别指向list1和list2的头部，即等于0

比较指针指向的两个区间的左端点，取出较小的一个左端点的区间，将其赋值给变量now，并将该指针右移一位

将now的左端点与答案list中末尾的右端点比较，若小于末尾右端点则将其合并，即last.end = max(last.end, now.end)，否则将now 作为一个独立的区间加入到答案list中

重复3、4两个步骤，直到其中一个指针指向末尾

若有指针还未指向末尾，将指针不断右移并将其指向的区间加入或合并至答案中（判断条件与方法与第四步相同）

复杂度分析

N表示list1的长度，M表示list2的长度

空间复杂度：O(N+M)

时间复杂度：O(N+M)

```python
"""
Definition of Interval.
class Interval(object):
    def __init__(self, start, end):
        self.start = start
        self.end = end
"""

class Solution:
    """
    @param list1: one of the given list
    @param list2: another list
    @return: the new sorted list of interval
    """
    def mergeTwoInterval(self, list1, list2):
        i, j = 0, 0
        intervals = []
        while i < len(list1) and j < len(list2):
            if list1[i].start < list2[j].start:
                self.push_back(intervals, list1[i])
                i += 1
            else:
                self.push_back(intervals, list2[j])
                j += 1
        while i < len(list1):
            self.push_back(intervals, list1[i])
            i += 1
        while j < len(list2):
            self.push_back(intervals, list2[j])
            j += 1
        
        return intervals
        
    def push_back(self, intervals, interval):
        if not intervals:
            intervals.append(interval)
            return
        
        last_interval = intervals[-1]
        if last_interval.end < interval.start:
            intervals.append(interval)
            return
        
        intervals[-1].end = max(intervals[-1].end, interval.end)

```
补充： [LeetCode-56 Merge Intervals](https://leetcode.com/problems/merge-intervals/)

此题是lists不是tuple，略有不同，但思路解法都是一致的。

```python
class Solution:
    def merge(self, intervals):
        intervals.sort()
        res = []
        for interval in intervals:
            self.push_back(interval, res)
        return res
        
    def push_back(self, interval, res):
        if not res:
            res.append(interval)
            return 
        last_interval = res[-1]
        end_boundary = last_interval[-1]
        if end_boundary < interval[0]:
            res.append(interval)
            return
        
        res[-1][-1] = max(res[-1][-1], interval[-1])
            
```

**例题 5** [577 Merge K Sorted Interval Lists](https://www.lintcode.com/problem/merge-k-sorted-interval-lists/description)

1.heap 做法：
```python
"""
Definition of Interval.
class Interval(object):
    def __init__(self, start, end):
        self.start = start
        self.end = end
"""
import heapq


class Solution:
    """
    @param intervals: the given k sorted interval lists
    @return:  the new sorted interval list
    """
    def mergeKSortedIntervalLists(self, intervals):
        # write your code here
        result = []
        heap = []
        for index, array in enumerate(intervals):
            if len(array) == 0:
                continue
            heapq.heappush(heap, (array[0].start, array[0].end, index, 0))
             
        while len(heap):
            start, end, x, y = heap[0]
            heapq.heappop(heap)
            self.append_and_merge(result, Interval(start, end))
            if y + 1 < len(intervals[x]):
                heapq.heappush(heap, (intervals[x][y + 1].start, intervals[x][y + 1].end, x, y + 1))
            
        return result
        
    def append_and_merge(self, intervals, interval):
        if not intervals:
            intervals.append(interval)
            return
        
        last_interval = intervals[-1]
        if last_interval.end < interval.start:
            intervals.append(interval)
            return
        
        last_interval.end = max(last_interval.end, interval.end)
```
2.LeetCode Merge Interval (Sorting 做法)：

```python
"""
Definition of Interval.
class Interval(object):
    def __init__(self, start, end):
        self.start = start
        self.end = end
"""


class Solution:
    """
    @param intervals: the given k sorted interval lists
    @return:  the new sorted interval list
    """
    def mergeKSortedIntervalLists(self, intervals):
        # write your code here
        arr = []
        for i in intervals:
            for j in i:
                arr.append(j)
        arr = sorted(arr, key=lambda o: o.start)
        ans = []
        if (len(arr) == 0) :
            return ans 
        ans.append(arr[0])
        for i in range(1, len(arr)):
            if (ans[len(ans) - 1].end >= arr[i].start):
                ans[len(ans) - 1].end = max(ans[len(ans) - 1].end, arr[i].end)
            else :
                ans.append(arr[i])
        return ans

```

**例题 6** [LeetCode-349 Intersection Of Two Arrays](https://leetcode.com/problems/intersection-of-two-arrays/)

python做这道题相对来说比较方便，调用将array转换成set后再调用set类的intersection（）函数后把结果转换成list就好。

```python
class Solution:
    def intersection(self, nums1, nums2):
        return list(set(nums1).intersection(set(nums2)))
        
```

这么写虽然简单，但是他的时间复杂度为O（N），空间复杂度(额外)也是O（N）。

我们还可以利用sort + binary search 将时间复杂度变成O（NlogN），空间复杂度变成O（1）。

当然也可以用merge two sorted array的方法。 时间复杂度为O（nlogn + mlogm + n + m) if n < m. 空间复杂度 O（1）。

    双指针
    解题思路
    首先，将nums1和nums2排序。
    定义双指针i和j，分别指向两个数组。从前向后遍历寻找交集元素
    当nums1[i] < nums2[j]，i后移1位
    当nums1[i] > nums2[j]，j后移1位
    当nums1[i] == nums2[j]，把nums1[i]加入集合intersect，i后移1位，j后移1位
    将集合intersect的元素加入res中

```python
class Solution:

    """

    @param nums1: an integer array

    @param nums2: an integer array

    @return: an integer array

    """

    def intersection(self, nums1, nums2):

        res = []

        # 排序

        nums1.sort()
        nums2.sort()

        # 双指针遍历
        i, j = 0, 0
        intersect = set()
        while(i < len(nums1) and j < len(nums2)):
            if nums1[i] < nums2[j]:
                i += 1
            elif nums1[i] > nums2[j]:
                j += 1

            else:

                intersect.add(nums1[i])
                i += 1
                j += 1

        # 把intersect的元素加入到res中

        for num in intersect:
            res.append(num)
            
        return res

```

**例题 7** [654 Sparse Matrix Multiplication](https://www.lintcode.com/problem/sparse-matrix-multiplication/description)

将此题目转换成intersection类型题目来思考。

```python
class Solution:
    """
    @param A: a sparse matrix
    @param B: a sparse matrix
    @return: the result of A * B
    """
    def multiply(self, A, B):
        # write your code here
        row_vectors = self.convert_to_row_vectors(A)
        col_vectors = self.convert_to_col_vectors(B)
        
        matrix = []
        for row_vector in row_vectors:
            row = []
            for col_vector in col_vectors:
                row.append(self.multi_vector(row_vector, col_vector))
            matrix.append(row)
        return matrix
        
    def convert_to_row_vectors(self, matrix):
        vectors = []
        for row in matrix:
            vector = []
            for index, col in enumerate(row):
                if col != 0:
                    vector.append((index, col))
            vectors.append(vector)
        return vectors
        
    def convert_to_col_vectors(self, matrix):
        n, m = len(matrix), len(matrix[0])
        vectors = []
        for j in range(m):
            vector = []
            for i in range(n):
                if matrix[i][j] != 0:
                    vector.append((i, matrix[i][j]))
            vectors.append(vector)
        return vectors

    def multi_vector(self, v1, v2):
        i, j = 0, 0
        result = 0
        
        while i < len(v1) and j < len(v2):
            if v1[i][0] < v2[j][0]:
                i += 1
            elif v1[i][0] > v2[j][0]:
                j += 1
            else:
                result += v1[i][1] * v2[j][1]
                i += 1
                j += 1
                
        return result
```
