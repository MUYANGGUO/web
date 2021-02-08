---
layout: leetcode-page
title: "Leetcode 1 Two Sum - Easy"
date: 2021-01-01
order: 1
excerpt: ""
leetcode: true
tags: [Leetcode]
comments: true
---

<h2> 1. Two Sum - Easy </h2>
[Go to Leetcode](https://leetcode.com/problems/two-sum/)

Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have **exactly one** solution, and you may not use the same element twice.

You can return the answer in any order.

<code>
Example:
</code>
<pre>
Given nums = [2, 7, 11, 15], target = 9,
Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].
</pre>

<code>
Method 1 Hashmap One Pass, Space O(N), Time O(N)
</code>

``` python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        if not nums:
            return [-1, -1]
        # create a empty dict
        mapping = {}
        # use enumerate because need index as output
        for i, v in enumerate(nums):
            # diff: the other value in the list that sum up with the current checked value
            diff = target - v
            # check if diff has been stored or not
            # if not exist, store the current value in dict as key, and its index as value in dict.
            # if exists, means we found the pair.
            if diff in mapping:
                return [mapping[diff], i]
            else:
                mapping[v] = i
                # store the value as the key in dict, 
                # the key's value is the index in the original list
        return [-1, -1]
```

<code>
Method 2 Two Pointers (with Sort), Space O(N), Time O(NlogN)
</code>

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        if not nums:
            return [-1, -1]
        # use tuple to sort nums with index。
        nums = [(number, index) for index, number in enumerate(nums)]
        # sort the nums
        nums.sort()
        ### two pointers
        left, right = 0, len(nums) - 1
        while left < right:
            ### nums is in increasing order
            ### if left + right > target， shift pointer left
            if nums[left][0] + nums[right][0] > target:
                right -= 1
            ### if left + right < target， shift pointer right
            elif nums[left][0] + nums[right][0] < target:
                left += 1
            else:  
                ### if equal, found
                return sorted([nums[left][1], nums[right][1]])
        return [-1, -1]
```