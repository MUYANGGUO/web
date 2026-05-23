---
title: "Algorithm Notes: DFS Combinations"
date: "2021-01-01"
excerpt: ""
kind: post
tags:
  - Algorithm Notes
  - Study Notes
comments: true
---

## DFS - Combinations

1. [LeetCode-78 Subsets](https://leetcode.com/problems/subsets/) 
2. [LeetCode-90 Subsets II](https://leetcode.com/problems/subsets-ii/)

组合类例题：

[LeetCode-78 Subsets](https://leetcode.com/problems/subsets/)

求所有可能方式，大概率可以用DFS。

一. 递归的DFS：（每一层是:每一个数要不要放进去）

```python
class Solution:
    def subsets(self, nums):
        result = []
        if not nums:
            return [[]]
        ### 先排序，因为最后子集合内的结果应该是升序的
        nums.sort()
        
        ### 开始DFS递归：
        
        self.dfs(nums, 0, [], result)
        
        return result
    
    ### 1.递归的定义
    def dfs(self, nums, index, subset, result):
        ### 3. 递归的出口
        if index == len(nums):
            result.append(list(subset))
            return
        ### 2. 递归的拆解：
        # 选择添加 nums[index];
        subset.append(nums[index])
        self.dfs(nums, index + 1, subset, result)
        # backtracking, 移除添加的nums[index], 即不选择添加
        subset.pop()
        self.dfs(nums, index + 1, subset, result)
```

此解法描述的是如下的树，每层添加一个nums的元素。

```
                 []
        []              [1]
     []   [2]      [1]      [1 2]
   [][3] [2][23] [1][13] [1 2] [1 2 3]  ### 最后一层就是答案
```

二. DFS 描述的另一种树。 （下一个能放哪个数？）

```             
                []
        [1]     [2]     [3]
    [1 2] [1 3]    [2 3]   
[1 2 3]

### 每层都是答案 （这种方法更加通用）
```

```python
class Solution:
    def subsets(self, nums):
        result = []
        if not nums:
            return [[]]
        
        nums.sort()
        
        self.dfs(nums, 0, [], result)
        return result
        
    def dfs(self, nums, start_index, subset, result):
        result.append(list(subset))
        for i in range(start_index, len(nums)):
            #[1] = > [1, 2]
            #去寻找以[1, 2]开头的所有子集 
            subset.append(nums[i])
            self.dfs(nums, i + 1, subset, result)
            subset.pop()
            #[1,2] => [1] backtracking
            #进入for循环下一个

```

[LeetCode-90 Subsets II](https://leetcode.com/problems/subsets-ii/)

带重复元素的子集。(搜索过程中的去重问题)

非Hash的方法： - 选代表，采取的办法是从若干个数字相同但是顺序不同的小集合中拿出一个有序的集合作为代表，将剩下的无序集合舍弃。

```python
class Solution:
    def subsetsWithDup(self, nums):
        result = []
        if not nums:
            return [[]]
        
        nums.sort()
        
        self.dfs(nums, 0, [], result)
        return result
        
    def dfs(self, nums, start_index, subset, result):
        result.append(list(subset))
        for i in range(start_index, len(nums)):
            #[1] = > [1, 2]
            #去寻找以[1, 2]开头的所有子集 
            ### 去重操作，因为nums已经被排序了，所以可以这么做：判断当前要添加的数是不是不同。
            ### ---
            if i != 0 and nums[i] == nums[i - 1] and i > start_index:
                continue
            ### ---

            subset.append(nums[i])
            self.dfs(nums, i + 1, subset, result)
            subset.pop()
            #[1,2] => [1] backtracking
            #进入for循环下一个
```
