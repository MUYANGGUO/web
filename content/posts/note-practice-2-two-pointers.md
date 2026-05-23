---
title: "Practice Notes 2 — Two Pointers"
date: "2021-01-01"
excerpt: ""
kind: post
tags:
  - Algorithm Notes
  - Study Notes
comments: true
---

### Chapter 2  经典双指针题目

1. [LintCode 1343  Sum of Two Strings](https://www.lintcode.com/problem/sum-of-two-stringsdescription)
   
    **Problem:**

    Given you two strings which are only contain digit character. you should return the sum of each digit as string


    **Notes:**

    A and B are strings which are composed of numbers

    **Example:**

    ```
    Input:
    A = "99"
    B = "111"
    Output: "11010"
    Explanation: because 9 + 1 = 10, 9 + 1 = 10, 0 + 1 = 1,connect them，so answer is "11010"

    Input:
    A = "2"
    B = "321"
    Output: "323"
    Explanation: because 2 + 1 = 3, 2 + 0 = 2, 3 + 0 = 3, connect them，so answer is "323"

    ```

    **Solution: 同向双指针**

    ```python
    class Solution:
        """
        @param A: a string
        @param B: a string
        @return: return the sum of two strings
        """
        def SumofTwoStrings(self, A, B):
            # write your code here
            if not A or not B:
                return A or B
            # two pointers:
            end_A = len(A) - 1
            end_B = len(B) - 1
            res = ''
            while end_A >= 0 and end_B >= 0:
                res = str(int(A[end_A]) + int(B[end_B])) + res
                end_A -= 1
                end_B -= 1

            if end_A >= 0:
                res = A[0:end_A + 1] + res
            if end_B >= 0:
                res = B[0:end_B + 1] + res
            return res
                
    ```

    ---

2. [LeetCode 26 Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)

    **Problem:**

    Given a sorted array nums, remove the duplicates in-place such that each element appear only once and return the new length.

    Do not allocate extra space for another array, you must do this by modifying the input array **in-place** with **O(1)** extra memory.

    **Notes:**

    Confused why the returned value is an integer but your answer is an array?

    Note that the input array is passed in by reference, which means modification to the input array will be known to the caller as well.

    Internally you can think of this:

    ```
    // nums is passed in by reference. (i.e., without making a copy)
    int len = removeDuplicates(nums);

    // any modification to nums in your function would be known by the caller.
    // using the length returned by your function, it prints the first len elements.
    for (int i = 0; i < len; i++) {
        print(nums[i]);
    }
    ```

    **Example:**

    ```
    Given nums = [1,1,2],

    Your function should return length = 2, with the first two elements of nums being 1 and 2 respectively.

    It doesn't matter what you leave beyond the returned length.


    Given nums = [0,0,1,1,1,2,2,3,3,4],

    Your function should return length = 5, with the first five elements of nums being modified to 0, 1, 2, 3, and 4 respectively.

    It doesn't matter what values are set beyond the returned length.

    ```

    **Solution: 同向双指针（模板型）**

    ```python
    class Solution:
        def removeDuplicates(self, nums: List[int]) -> int:
            if not nums:
                return 0
            j = 1
            for i in range(len(nums)):
                # find the non-duplicate position
                while j < len(nums) and nums[j] == nums[i]:
                    j += 1
                if j >= len(nums):
                    break
                nums[i + 1] = nums[j]
            return i + 1
    ```

    ---

3. [LeetCode 27. Remove Element](https://leetcode.com/problems/remove-element/)

    **Problem:**

    Given an array nums and a value val, remove all instances of that value in-place and return the new length.

    Do not allocate extra space for another array, you must do this by modifying the input array **in-place with O(1)** extra memory.

    The order of elements can be changed. It doesn't matter what you leave beyond the new length.

    **Notes:**

    Confused why the returned value is an integer but your answer is an array?

    Note that the input array is passed in by reference, which means modification to the input array will be known to the caller as well.

    Internally you can think of this:

    ```
    // nums is passed in by reference. (i.e., without making a copy)
    int len = removeElement(nums, val);

    // any modification to nums in your function would be known by the caller.
    // using the length returned by your function, it prints the first len elements.
    for (int i = 0; i < len; i++) {
        print(nums[i]);
    }
    ```

    **Example:**

    ```
    Given nums = [3,2,2,3], val = 3,

    Your function should return length = 2, with the first two elements of nums being 2.

    It doesn't matter what you leave beyond the returned length.

    Given nums = [0,1,2,2,3,0,4,2], val = 2,

    Your function should return length = 5, with the first five elements of nums containing 0, 1, 3, 0, and 4.

    Note that the order of those five elements can be arbitrary.

    It doesn't matter what values are set beyond the returned length.

    ```

    **Solution: 快慢双指针**

    ```python

    class Solution(object):
        def removeElement(self, nums, val):
            """
            :type nums: List[int]
            :type val: int
            :rtype: int
            """
            ### two pointers
            j = 0
            for i in range(len(nums)):
                # if current is not val
                if nums[i] != val:
                    nums[j] = nums[i]
                    # j move right
                    j += 1
            return j
                    
            ### [3 2 2 3], val = 3
            ###  i
            ###  j
            ###    i
            ###  j
            ###    i
            ###    j
            ###      i
            ###      j
            ###        i
            ###      j
        
    ```

    ---

4. [LeetCode 203 Remove Linked List Elements](https://leetcode.com/problems/remove-linked-list-elements)

    **Problem:**

    Remove all elements from a linked list of integers that have value val.

    **Example:**

    ```
    Input:  1->2->6->3->4->5->6, val = 6
    Output: 1->2->3->4->5
    ```

    **Solution: linkedList 版 dummy node 与快慢双指针**

    ```python
     # Definition for singly-linked list.
     # class ListNode(object):
     #     def __init__(self, val=0, next=None):
     #         self.val = val
     #         self.next = next
     class Solution(object):
         def removeElements(self, head, val):
             """
             :type head: ListNode
             :type val: int
             :rtype: ListNode
             """
             ### Dummy Node
             ### 快慢双指针 Two Pointers (Linked List 版本)
             dummy = ListNode(0, head)
             prev = dummy
             curr = head
             while curr:
                 if curr.val == val:
                     ### delete
                     prev.next = curr.next
                 else:
                     prev = curr
                 curr = curr.next
             return dummy.next
    ```

    ---

5. [LeetCode 283 Move Zeroes](https://leetcode.com/problems/move-zeroes/)

    **Problem:**

    Given an array nums, write a function to move all 0's to the end of it while maintaining the relative order of the non-zero elements.

    **Notes:**

    You must do this **in-place** without making a copy of the array.
    
    Minimize the total number of operations.

    **Example:**

    ```
    Input: [0,1,0,3,12]
    Output: [1,3,12,0,0]
    ```

    **Solution:**

    ```python
    class Solution:
        def moveZeroes(self, nums: List[int]) -> None:
            """
            Do not return anything, modify nums in-place instead.
            """
            j = 0
            # 这里是leetcode 27 remove element的操作
            for i in range(len(nums)):
                if nums[i] != 0:
                    nums[j] = nums[i]
                    j += 1
            # 然后把尾巴修改成0
            while j < len(nums):
                nums[j] = 0
                j += 1
            return 
    ```

    ---

6. [LeetCode 83 Remove Duplicates from Sorted List](https://leetcode.com/problems/remove-duplicates-from-sorted-list)

    **Problem:**

    Given a sorted linked list, delete all duplicates such that each element appear only once.

    **Example:**

    ```
    Input: 1->1->2
    Output: 1->2

    Input: 1->1->2->3->3
    Output: 1->2->3
    ```

    **Solution:**

    用和 LeetCode 203 Remove Linked List Elements 一样的方法。利用Dummy Node 来作 Linked List版本的快慢双指针。

    ```python
    # Definition for singly-linked list.
    # class ListNode:
    #     def __init__(self, val=0, next=None):
    #         self.val = val
    #         self.next = next
    class Solution:
        def deleteDuplicates(self, head: ListNode) -> ListNode:
            dummy = ListNode(None, head)
            prev, curr = dummy, head
            while curr:
                if curr.val == prev.val:
                    prev.next = curr.next
                else:
                    prev = curr
                curr = curr.next
            return dummy.next
    ```

    ---

7. [LeetCode 82 Remove Duplicates from Sorted List II](https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/)

    **Problem:**

    Given a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list.

    Return the linked list sorted as well.


    **Example:**

    ```
    Input: 1->2->3->3->4->4->5
    Output: 1->2->5

    Input: 1->1->1->2->3
    Output: 2->3
    ```

    **Solution:**

    ```python
    # Definition for singly-linked list.
    # class ListNode(object):
    #     def __init__(self, val=0, next=None):
    #         self.val = val
    #         self.next = next
    class Solution(object):
        def deleteDuplicates(self, head):
            """
            :type head: ListNode
            :rtype: ListNode
            """
            dummy = ListNode(None, head)
            prev = dummy
            curr = head
            if head is None or head.next is None:
                return dummy.next
            next = head.next
            # prev , curr , next
            while next:
                if curr.val == next.val:
                    # remember to check edge, ensure next.next exist
                    while next and curr.val == next.val:
                        next = next.next
                    prev.next = next
                    curr = prev
                    next = curr.next
                
                else:
                    prev = prev.next
                    
                # check edge, ensure curr.next,and next.next exist
                if prev.next:
                    curr = curr.next
                    next = next.next

            return dummy.next
                    
    ```

    ---

8. [LintCode 521 Remove Duplicate Numbers in Array](https://www.lintcode.com/problem/remove-duplicate-numbers-in-array/)

    **Problem:**

    Given an array of integers, remove the duplicate numbers in it.

    You should:

    1. Do it in place in the array.
    2. Move the unique numbers to the front of the array.
    3. Return the total number of the unique numbers.

    **Notes:**
    Move duplicate integers to the tail of nums => nums = [1,3,4,2,?,?].

    Return the number of unique integers in nums => 4.
    
    Actually we don't care about what you place in ?, we only care about the part which has no duplicate integers.

    Challenge

    Do it in O(n) time complexity.

    Do it in O(nlogn) time without extra space.

    Notice

    You don't need to keep the original order of the integers.

    **Example:**

    ```
    Input:
    nums = [1,3,1,4,4,2]
    Output:
    [1,3,4,2,?,?]
    4

    Input:
    nums = [1,2,3]
    Output:
    [1,2,3]
    3

    ```

    **Solution 1: 普通解，Hash， extra space， O（n）**

    ```python
    class Solution:
        """
        @param nums: an array of integers
        @return: the number of unique integers
        """
        def deduplication(self, nums):
            # Write your code here
            if not nums:
                return 0
                
            unique = list(set(nums))
            nums[:len(unique)] = unique
            
            return len(unique)
    ```

    **Solution 2: 普通解（同向双指针）， O（nlogn）**

    ```python
    class Solution:
        """
        @param nums: an array of integers
        @return: the number of unique integers
        """
        def deduplication(self, nums):
            # Write your code here
            n = len(nums)
            if n == 0:
                return 0
            # 先sort
            nums.sort()
            result = 1
            for i in range(1, n):
                if nums[i - 1] != nums[i]:
                    nums[result] = nums[i]
                    result += 1
                    
            return result
    ```

    **Solution 3: 经典同向双指针模板解法 O（nlogn）**

    见LeetCode 26 Remove Duplicates from Sorted Array的经典解法。

    ```python
    class Solution:
        """
        @param nums: an array of integers
        @return: the number of unique integers
        """
        def deduplication(self, nums):
            # Write your code here
            if not nums:
                return 0
            nums.sort()
            j = 1
            for i in range(len(nums)):
                while j < len(nums) and nums[j] == nums[i]:
                    j += 1
                if j >= len(nums):
                    break
                nums[i + 1] = nums[j]
            return i + 1

    ```

    ---

9. [LeetCode 88 Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/)

    **Problem:**

    Given two sorted integer arrays nums1 and nums2, merge nums2 into nums1 as one sorted array.

    **Notes:**

    The number of elements initialized in nums1 and nums2 are m and n respectively.

    You may assume that nums1 has enough space (size that is equal to m + n) to hold additional elements from nums2.

    **Example:**

    ```
    Input:
    nums1 = [1,2,3,0,0,0], m = 3
    nums2 = [2,5,6],       n = 3

    Output: [1,2,2,3,5,6]
    ```

    **Constraints:**

    -10^9 <= nums1[i], nums2[i] <= 10^9

    nums1.length == m + n

    nums2.length == n

    **Solution: 双指针，start from end**

    ```python

    class Solution:
        def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:
            """
            Do not return anything, modify nums1 in-place instead.
            """
            p = len(nums1) - 1
            p_1, p_2 = m - 1, n - 1
            while p_2 >= 0 and p_1 >= 0:
                if nums1[p_1] <= nums2[p_2]:
                    nums1[p] = nums2[p_2]
                    p_2 -= 1
                else:
                    nums1[p] = nums1[p_1]
                    p_1 -= 1
                p -= 1
                
            if p_2 >= 0:
                nums1[0:p_2 + 1] = nums2[0:p_2 + 1]
            return
                    
    ```

    ---

10. [LeetCode 21 Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)

    **Problem:**

    Merge two sorted linked lists and return it as a new sorted list. The new list should be made by splicing together the nodes of the first two lists.

    **Example:**

    ```
    Input: 1->2->4, 1->3->4
    Output: 1->1->2->3->4->4
    ```

    **Solution:**

    ```python
    # Definition for singly-linked list.
    # class ListNode:
    #     def __init__(self, val=0, next=None):
    #         self.val = val
    #         self.next = next
    class Solution:
        def mergeTwoLists(self, l1: ListNode, l2: ListNode) -> ListNode:
            dummy = ListNode(None, l1)
            head = dummy
            while l1 and l2:
                if l1.val <= l2.val:
                    head.next = l1
                    l1 = l1.next
                else:
                    head.next = l2
                    l2 = l2.next
                head = head.next
            if l1:
                head.next = l1
            if l2:
                head.next = l2
            return dummy.next
    ```

    ---

11. [LeetCode 986 Interval List Intersections](https://leetcode.com/problems/interval-list-intersections/)

    **Problem:**

    Given two lists of closed intervals, each list of intervals is pairwise disjoint and in sorted order.

    Return the intersection of these two interval lists.

    (Formally, a closed interval [a, b] (with a <= b) denotes the set of real numbers x with a <= x <= b.  The intersection of two closed intervals is a set of real numbers that is either empty, or can be represented as a closed interval.  For example, the intersection of [1, 3] and [2, 4] is [2, 3].)

    **Notes:**

    0 <= A.length < 1000

    0 <= B.length < 1000

    0 <= A[i].start, A[i].end, B[i].start, B[i].end < 10^9

    **Example:**

    ```
    Input: A = [[0,2],[5,10],[13,23],[24,25]], B = [[1,5],[8,12],[15,24],[25,26]]
    Output: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]
    ```

    **Solution: 解法是判定产生交集的条件是什么，并且如何迭代。**

    ```python
    class Solution:
        def intervalIntersection(self, A: List[List[int]], B: List[List[int]]) -> List[List[int]]:
            res = []
            curr_A = 0
            curr_B = 0
            while curr_A < len(A) and curr_B < len(B):
                ### 对起点求max，对终点求min，来判断是否有交集
                low = max(A[curr_A][0], B[curr_B][0])
                high = min(A[curr_A][1], B[curr_B][1])
                ### 存在交集的条件：
                if low <= high:
                    res.append([low, high])
                # Remove the interval with the smallest endpoint
                if A[curr_A][1] < B[curr_B][1]:
                    curr_A += 1
                else:
                    curr_B += 1
            return res
    ```

    ---

12. [LeetCode 763 Partition Labels](https://leetcode.com/problems/partition-labels/)

    **Problem:**

    A string S of lowercase English letters is given. We want to partition this string into as many parts as possible so that each letter appears in at most one part, and return a list of integers representing the size of these parts.

    **Notes:**

    S will have length in range [1, 500].
    S will consist of lowercase English letters ('a' to 'z') only.

    **Example:**

    ```
    Input: S = "ababcbacadefegdehijhklij"
    Output: [9,7,8]
    Explanation:
    The partition is "ababcbaca", "defegde", "hijhklij".
    This is a partition so that each letter appears in at most one part.
    A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits S into less parts.
    ```

    **Solution: 双指针**

    利用Hash表先记录每个char出现最后一次的位置，依据这个Hash表来从头到尾，更新应该被partition的地方在哪（越来越向右边），当当前位置和当前位置下应该partition的地方重合，那么说明在此处partition对前面所有char来说都是符合条件的。然后接着找下一段，更新下一段的起点，同样的方式找下一段的终点。

    ```python
    class Solution:
        def partitionLabels(self, S: str) -> List[int]:
            # 统计每个char的最后一次出现的位置
            lastAt = dict()
            for i, char in enumerate(S):
                lastAt[char] = i
            res = []
            # 双指针
            partitionStart, partitionEnd = 0, 0
            for i, char in enumerate(S):
                # 不断刷新partionEnd的位置
                partitionEnd = max(partitionEnd, lastAt[char])
                # 直到当前位置就是最远的partionEnd
                if partitionEnd == i:
                    # 更新答案
                    res.append(partitionEnd - partitionStart + 1)
                    # 让新的partion开始在下一个char
                    partitionStart = i + 1
            return res
    ```

    ---

13. [LeetCode 42 Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/)

    **Problem:**

    Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it is able to trap after raining.

    **Example:**

    ![img](https://assets.leetcode.com/uploads/2018/10/22/rainwatertrap.png)

    The above elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped. 

    ```
    Input: [0,1,0,2,1,0,1,3,2,1,2,1]
    Output: 6
    ```

    **Solution 1:  One-Pass,相向双指针，趋势选择版本**
    
    不统一迭代left，right而是分别判断趋势每次迭代一个left或者一个right。

    ```python
    class Solution:
        def trap(self, height: List[int]) -> int:
            if not height:
                return 0
            # two pointers
            left, right = 0, len(height) - 1
            left_max, right_max = height[left], height[right]
            sum = 0 
            while left < right:
                # 注意这里要进行一个“趋势”的方向性判断：
                if height[left] <= height[right]:
                    if height[left] <= left_max:
                        sum += (left_max - height[left])
                    else:
                        left_max = height[left]
                    left += 1
                else:
                    if height[right] <= right_max:
                        sum += (right_max - height[right])
                    else:
                        right_max = height[right]
                    right -= 1  
            return sum
                    
    ```

    **Solution 2: Two-Pass 扫描版**

    每个位置上的盛水数目 = min(左侧最高，右侧最高) - 当前高度

    从左到右扫描一边数组，获得每个位置往左这一段的最大值，再从右到左扫描一次获得每个位置向右的最大值。 然后最后再扫描一次数组，计算每个位置上的盛水数目。

    时间复杂度 O(n)，空间复杂度 O(n)

    ```python
    class Solution:
        """
        @param heights: a list of integers
        @return: a integer
        """
        def trapRainWater(self, heights):
            if not heights:
                return 0
                
            left_max = []
            curt_max = -sys.maxsize
            for height in heights:
                curt_max = max(curt_max, height)
                left_max.append(curt_max)
                
            right_max = []
            curt_max = -sys.maxsize
            for height in reversed(heights):
                curt_max = max(curt_max, height)
                right_max.append(curt_max)
                
            right_max = right_max[::-1]
                
            water = 0
            n = len(heights)
            for i in range(n):
                water += (min(left_max[i], right_max[i]) - heights[i])
            return water
    ```

    ---

14. [LeetCode 11 Container With Most Water](https://leetcode.com/problems/container-with-most-water/)

    **Problem:**

    Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of line i is at (i, ai) and (i, 0). Find two lines, which together with x-axis forms a container, such that the container contains the most water.

    **Notes:**
    
    You may not slant the container and n is at least 2.

    **Example:**

    ```
    Input: [1,8,6,2,5,4,8,3,7]
    Output: 49
     ```

    **Solution: 相向双指针**

    和LeetCode 42 Trapping Rain Water相似的解法，这题的本质在于找到短板，移动短板，打擂台找出最优值。

    ```python
    class Solution:
        def maxArea(self, nums: List[int]) -> int:
            if not nums:
                return 0
            left, right = 0, len(nums) - 1
            area = 0
            while left < right:
                if nums[left] <= nums[right]:
                    curr_area = (right - left) * nums[left]
                    left += 1
                else:
                    curr_area = (right - left) * nums[right]
                    right -= 1
                
                if curr_area >= area:
                    area = curr_area
            return area

    ```

    ---

15. [LeetCode 86 Partition List](https://leetcode.com/problems/partition-list/)

    **Problem:**

    Given a linked list and a value x, partition it such that all nodes less than x come before nodes greater than or equal to x.

    You should preserve the original relative order of the nodes in each of the two partitions.


    **Example:**

    ```
    Input: head = 1->4->3->2->5->2, x = 3
    Output: 1->2->2->4->3->5
    ```

    **Solution 1: LinkedList上的双指针**

    分开构造再组合，如下图：(https://leetcode.com/problems/partition-list/solution/)

    ![image](https://leetcode.com/problems/partition-list/Figures/86/86_Partition_List_6.png)

    ```python
    # Definition for singly-linked list.
    # class ListNode:
    #     def __init__(self, val=0, next=None):
    #         self.val = val
    #         self.next = next
    class Solution:
        def partition(self, head: ListNode, x: int) -> ListNode:
            # 分成两个linkedlist分别存储小于x，和大于等于x的node
            before = ListNode(None, None)
            after = ListNode(None, None)
            before_dummy = before
            after_dummy = after
            while head:
                if head.val < x:
                    # assign小的到before
                    before.next = head
                    before = before.next
                else:
                    # assign大或等于的到after
                    after.next = head
                    after = after.next
                head = head.next
            # 最后利用之前存下的dummy node把before 和 after这两条LinkedList连起来
            after.next = None
            before.next = after_dummy.next
            return before_dummy.next
    ```

    ---

16. [LeetCode 19 Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)

    **Problem:**

    Given a linked list, remove the n-th node from the end of list and return its head.

    **Notes:**

    Given n will always be valid.

    Could you do this in one pass?

    **Example:**

    ```
    Given linked list: 1->2->3->4->5, and n = 2.

    After removing the second node from the end, the linked list becomes 1->2->3->5.
    ```

    **Solution: 保持距离的同向双指针**

    ```python
    # Definition for singly-linked list.
    # class ListNode:
    #     def __init__(self, val=0, next=None):
    #         self.val = val
    #         self.next = next
    class Solution:
        def removeNthFromEnd(self, head: ListNode, n: int) -> ListNode:
            dummy = ListNode(None, head)
            slow, fast = dummy, dummy
            distance = 0
            while fast and distance < n + 1:
                fast = fast.next
                distance += 1
            while fast:
                fast = fast.next
                slow = slow.next
            slow.next = slow.next.next
            return dummy.next
    ```

    ---

17. [LeetCode 209 Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/)

    **Problem:**

    Given an array of n positive integers and a positive integer s, find the minimal length of a contiguous subarray of which the sum ≥ s. If there isn't one, return 0 instead.

    **Example:**

    ```
    Input: s = 7, nums = [2,3,1,2,4,3]
    Output: 2
    Explanation: the subarray [4,3] has the minimal length under the problem constraint.
    ```

    **Solution: 同向双指针 + 打擂台**

    ```python
    class Solution:
        def minSubArrayLen(self, s: int, nums: List[int]) -> int:
            if not nums:
                return 0
            right = 0
            SUM = 0
            res = float('inf')
            for left in range(len(nums)):
                while right < len(nums) and SUM < s:
                    SUM += nums[right]
                    right += 1
                if SUM >= s:
                    res = min(res, right - left)
                SUM -= nums[left]
            if res == float('inf'):
                return 0
            return res
    ```

    ---

#### 模板

1. [LeetCode 409 Longest Palindrome](https://leetcode.com/problems/longest-palindrome/) 

    **Problem:**



    **Notes:**


    **Example:**

    ```

    ```

    **Solution:**

    ```python

    ```

    ---
