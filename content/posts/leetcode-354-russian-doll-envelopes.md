---
title: "LeetCode 354 Russian Doll Envelopes - Hard"
date: "2021-01-01"
excerpt: "You have a number of envelopes with widths and heights given as a pair of integers (w, h). One envelope can fit into another if and only …"
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 354
comments: true
---

### 354. Russian Doll Envelopes — Hard

[Open on LeetCode](https://leetcode.com/problems/russian-doll-envelopes/)

## Problem

You have a number of envelopes with widths and heights given as a pair of integers (w, h). One envelope can fit into another if and only if both the width and height of one envelope is greater than the width and height of the other envelope.

What is the maximum number of envelopes can you Russian doll? (put one inside other)

Note:
Rotation is not allowed.

Example:

Input: [[5,4],[6,4],[6,7],[2,3]]
Output: 3 
Explanation: The maximum number of envelopes you can Russian doll is 3 ([2,3] => [5,4] => [6,7]).

## Solution

```python
class Solution:
    def maxEnvelopes(self, envelopes: List[List[int]]) -> int:
                # write your code here
        if not envelopes or len(envelopes) == 0:
            return 0

        envelopes.sort(key = lambda x: (x[0], -x[1]))
        result = []
        
        for envelope in envelopes:
            height = envelope[1]
            if len(result) == 0 or height > result[-1]:
                result.append(height)
            else:
                index = bisect.bisect_left(result, height)
                result[index] = height
        
        return len(result)
        
        
#排序时width按升序排，width相同时height按降序排，这样在width相同时，第一个信封肯定是height最大的那个，
# 就不会出现width相同时height小的替换height大的情况。
# （因为如果后面一个信封的height值大于前一个，那么它的width值也一定大于前一个信封。）

# 在这种情况下，按顺序抽取每个信封，如果比前面大，则可以直接append，
# 否则就在result list中找到合适的位置插入，最终result的长度便是要的结果。


class Solution:
    # @param {int[][]} envelopes a number of envelopes with widths and heights
    # @return {int} the maximum number of envelopes
    def maxEnvelopes(self, envelopes):
        # Write your code here
        height = [a[1] for a in sorted(envelopes, key = lambda x: (x[0], -x[1]))]
        dp, length = [0] * len(height), 0

        import bisect
        for h in height:
            i = bisect.bisect_left(dp, h, 0, length)
            dp[i] = h
            if i == length:
                length += 1
        return length


# 考点：

# 贪心
# dp
# 题解：

# 信封存在两个维度，首先贪心按照其中一个维度将信封排序，一个维然后在另度上面寻找最长上升子序列。
# 此处使用二分优化最长上升子序列，在dp数组中二分查找h的位置，dp[i] = h，当i = length，说明插入位置为最后，则length += 1。
```
