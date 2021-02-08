---
layout: leetcode-page
title: "Leetcode 4 Median of Two Sorted Arrays - Hard"
date: 2021-01-01
order: 4
excerpt: ""
leetcode: true
tags: [Leetcode]
comments: true
---

<h2> 4. Median of Two Sorted Arrays - Medium  </h2>

[Go to Leetcode](https://leetcode.com/problems/median-of-two-sorted-arrays/)

Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

**Follow up**: The overall run time complexity should be O(log (m+n)).

<code>
Example 1:
</code>

```
Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.
```

<code>
Example 2:
</code>

```
Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
```

<code>
Example 3:
</code>

```
Input: nums1 = [0,0], nums2 = [0,0]
Output: 0.00000
```

<code>
Example 4:
</code>

```
Input: nums1 = [], nums2 = [1]
Output: 1.00000
```

<code>
Solution 1:
</code>

<code>
Binary Search, Space O(1), Time O(log(m + n))
</code>

``` python
class Solution:
    def findMedianSortedArrays(self, A: List[int], B: List[int]) -> float:
        m, n = len(A), len(B)
        # if total length is odd
        # simply find kth val
        if (m + n) % 2 == 1:
            return self.getKth(A, 0, len(A) - 1, B, 0, len(B) - 1, (m + n) // 2  + 1)
        # if total length is even
        # need to do an average to get median
        left = self.getKth(A, 0, len(A) - 1, B, 0, len(B) - 1, (m + n) // 2)
        right = self.getKth(A, 0, len(A) - 1, B, 0, len(B) - 1, (m + n) // 2 + 1)
        return (left + right) / 2

    def getKth(self, A, start1, end1, B, start2, end2, k):
        len1 = end1 - start1 + 1
        len2 = end2 - start2 + 1
        # always make A the shorter list
        # if A length is longer,
        # swap A and B list
        if (len1 > len2): 
            return self.getKth(B, start2, end2, A, start1, end1, k)
        # check A length
        # if A is checked
        # simply return B
        if (len1 == 0):
            return B[start2 + k - 1]
        # when k is reduced to 1, we found
        if k == 1:
            return min(A[start1], B[start2])
        # binary search, i, j are the pivots, limit is k//2
        i = start1 + min(len1, k // 2) - 1
        j = start2 + min(len2, k // 2) - 1
        if (A[i] > B[j]):
            return self.getKth(A, start1, end1, B, j + 1, end2, k - (j - start2 + 1))
        else:
            return self.getKth(A, i + 1, end1, B, start2, end2, k - (i - start1 + 1))  
```

<code>
Solution 2:
</code>

<code>
Quick Select, Space O(1), Time O(log min(m + n))
</code>

```python
class Solution:
    def findMedianSortedArrays(self, A: List[int], B: List[int]) -> float:
        # swap A and B is A is longer
        if len(A) > len(B):
            return self.findMedianSortedArrays(B, A)
        
        m, n = len(A), len(B)
        # use smaller, A length for pivots to partition A and B, 
        # CONDITION 1
        # make GROUPS: LEFT{len(A1) + len(B1)} = RIGHT{len(A2) + len(B2)}
        # BINARY SEARCH CONDITION 2
        # max(A1[:], B1[:]) <= min(A2[:], B2[:]) 
        # meaning we divide A and B with the partitions equally
        # and all elements in A1 and B1 less than A2.and B2
        low, high = 0, m
        while low <= high:
            # CONDITION 1
            partition_A = low + (high - low) // 2
            partition_B = (m + n + 1)// 2 - partition_A
            # Initialize the boundary for LEFT and RIGHT
            if partition_A == 0:
                max_left_A = float('-inf')
            else:
                max_left_A = A[partition_A - 1]
            if partition_A == m:
                min_right_A = float('inf')
            else:
                min_right_A = A[partition_A]
            if partition_B == 0:
                max_left_B = float('-inf')
            else:
                max_left_B = B[partition_B - 1]
            if partition_B == n:
                min_right_B = float('inf')
            else:
                min_right_B = B[partition_B]
            
            # CONDITION 2 Binary Search
            if max_left_A <= min_right_B and max_left_B <= min_right_A:
                if (m + n) % 2 == 0:
                    return (max(max_left_A, max_left_B) + min(min_right_A, min_right_B)) / 2
                else:
                    return max(max_left_A, max_left_B)
            # too far on right side for partitionA. Go on left side. 
            elif max_left_A > min_right_B:
                high = partition_A - 1
            # too far on left side for partitionA. Go on right side.
            else:
                low = partition_A + 1
        return 0
```