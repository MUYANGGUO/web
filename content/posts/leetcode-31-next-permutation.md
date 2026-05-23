---
title: "LeetCode 31 Next Permutation - Medium"
date: "2021-01-01"
excerpt: 31. Next Permutation
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 31
comments: true
---

### 31. Next Permutation — Medium

[Open on LeetCode](https://leetcode.com/problems/next-permutation/)

## Problem

31. Next Permutation

Implement next permutation, which rearranges numbers into the lexicographically next greater permutation of numbers.

If such arrangement is not possible, it must rearrange it as the lowest possible order (ie, sorted in ascending order).

The replacement must be in-place and use only constant extra memory.

Here are some examples. Inputs are in the left-hand column and its corresponding outputs are in the right-hand column.

1,2,3 → 1,3,2
3,2,1 → 1,2,3
1,1,5 → 1,5,1

## Solution

```python
### 此题可以看作是是 全排列 的 非递归方式的 一个基础子函数。

class Solution:
    def nextPermutation(self, nums):
        """
        Do not return anything, modify nums in-place instead.
        """
        if not nums:
            return nums
        n = len(nums)
        if n <= 1:
            return nums
        ### 从右往左找第一个为降序的 比如  8 10 9 7 6 next is 9 6 7 8 10
        ### 8 10 9 7 6
        ### *          8 是第一个降序的，也就是说，下一个permutation一定是把8放在右边，替换成一个比8稍大一点的数，很显然8左边如果有数字一定是升序的，所以比8大的一定是在右边
        ### 替换谁？替换右边最小的比8大的数, 9
        ### 8 10 9 7 6
        ### *    ^
        ### 9 10 8 7 6
        ### 调整，9 是lead，右边应该是升序，才是以9为开头的第一个permutation
        ### 9 6 7 8 10 <-- output
        
        ### Step 1. from right to left, find the element to swap leading position
        
        position2change = n - 1
        while position2change > 0 and nums[position2change] <= nums[position2change - 1]:
            position2change -= 1
            
        ### 因为position2change是右侧第一个数，所以改成真正的位置要-1
        position2change = position2change - 1
        
        ### 找到了当前的leading position，例子中的8
        ### 下一步找比8大的最小的数
        ### 这里注意position2change 不能为 -1， 越界。
        if position2change != -1:
            candidate = n - 1
            while nums[candidate] <= nums[position2change]:
                candidate -= 1
       
            nums[candidate], nums[position2change] = nums[position2change], nums[candidate]

        ### 最后一步 reverse右侧
        self.swapInPlace(nums, position2change + 1, n - 1)
        
    def swapInPlace(self, nums, i, j):
        while i < j:
            nums[i], nums[j] = nums[j], nums[i]
            i += 1
            j -= 1
```
