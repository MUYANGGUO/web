---
title: "Algorithm Notes: Two Pointers"
date: "2021-01-01"
excerpt: ""
kind: post
tags:
  - Algorithm Notes
  - Study Notes
comments: true
---

### 双指针习题集
双指针的类型：
1. 背向双指针：
   1. 中心线枚举，比如 Longest Palindromic Substring
   2. 二分法，find K Closet Elements
2. 相向双指针：
   1. Reverse 型
   2. Two Sum 型
   3. Partition 型
3. 同向双指针：
   1. 滑动窗口类 sliding window
   2. 快慢指针类 Fast & Slow Poionters
   
#### 相向双指针：
两根指针一头一尾， 向中间靠拢直到相遇为止。O(n)

[587 Two Sum - Unique pairs](https://www.lintcode.com/problem/two-sum-unique-pairs/description)
<details>
<summary> 解法1：双指针 + 利用tuples来大擂台的小技巧</summary>

```python
class Solution:
    """
    @param nums: an array of integer
    @param target: An integer
    @return: An integer
    """
    def twoSum6(self, nums, target):
        # write your code here
        if not nums or len(nums) <= 2:
            return 0
        ### to use two pointers, sort first
        nums.sort()
        
        left, right = 0, len(nums) - 1
        count = 0
        
        ###利用tuple来打擂台！小技巧！！超级实用还省时间空间。
        last_pair = (None, None)
        
        while left < right:
            if nums[left] + nums[right] == target:
                if (nums[left] , nums[right]) != last_pair:
                    ### 更新count和last_pair
                    count += 1
                    last_pair = (nums[left] , nums[right])
                left += 1
                right -= 1
            elif nums[left] + nums[right] > target:
                right -= 1
            else:
                left += 1
        
        return count
```

</details>

<details>
<summary> 解法2 双指针 + 经典去重操作</summary>

```python
class Solution:
    """
    @param nums: an array of integer
    @param target: An integer
    @return: An integer
    """
    def twoSum6(self, nums, target):
        # write your code here

        if not nums or len(nums) < 3:
            return 0
            
        nums.sort()
        
        left, right = 0, len(nums) - 1
        
        count = 0
        
        while left < right:
            if nums[left] + nums[right] == target:
                count += 1
                left += 1
                right -= 1
                ### 经典相向双指针去重操作：
                ### 注意下标，和谁比
                while left < right and nums[left] == nums[left - 1]:
                    left += 1
                while left < right and nums[right] == nums[right + 1]:
                    right -= 1

            elif nums[left] + nums[right] > target:
                right -= 1
            else:
                left += 1
        
        return count
                
```

</details>

<details>
<summary> 解法3 Hashmap + 去重复判断条件 </summary>

```python
class Solution:
    """
    @param nums: an array of integer
    @param target: An integer
    @return: An integer
    """
    def twoSum6(self, nums, target):
        # write your code here
        if not nums or len(nums) < 3:
            return 0
            
        counter = {}
        
        for num in nums:
            counter[num] = counter.get(num, 0) + 1
        
        res = 0

        for num, count in counter.items():
            diff = target - num
            if num <= target // 2 and diff in counter and (num != diff or count > 1):
                res += 1
        return res
```

</details>



[LeetCode-611 Valid Triangle Number](https://leetcode.com/problems/valid-triangle-number/) & [382 Triangle Count](https://www.lintcode.com/problem/triangle-count/description)

这题属于3Sum 的引申版本。

此题的解的个数是Cn3， 也就是说N^3。

但我们使用O(n^2)的时间复杂度就可以解，是因为我们优化的时候是按批计数的。res = res + right - left。

<details>
<summary> 解法3 Hashmap + 去重复判断条件 </summary>

```python
class Solution:
    def triangleNumber(self, nums):
        if not nums or len(nums) < 3:
            return 

        nums.sort()
        ### Two Pinters:
        res = 0
        ### iterate all target
        for i in range(len(nums)):
            ### Apply two pointers, two sum type
            left, right = 0, i - 1
            while left < right :
                if nums[left] + nums[right] > nums[i]:
                    ### 如果right 可以， 那么right不变，left如果取这里一次性把left到right 所有数字也可以。
                    res = res + right - left
                    right -= 1
                else:  
                    left += 1
        return res
```
</details>


#### 与此题相似的还有以下3题。


[443 Two Sum - Greater than target](https://www.lintcode.com/problem/two-sum-greater-than-target/description)

Triangle Count 基础。

<details>
<summary> 解</summary>

```python
class Solution:
    """
    @param nums: an array of integer
    @param target: An integer
    @return: an integer
    """
    def twoSum2(self, nums, target):
        # write your code here
        if not nums or len(nums) < 2:
            return 0
        nums.sort()
        res = 0
        left, right = 0, len(nums) - 1
        while left < right:
            if nums[left] + nums[right] > target:
                res += right - left
                right -= 1
            else:
                left += 1
        
        return res
```
</details>

[609 Two Sum - Less than or equal to target](https://www.lintcode.com/problem/two-sum-less-than-or-equal-to-target/description)

Triangle Count 基础。

<details>
<summary> 解</summary>

```python
class Solution:
    """
    @param nums: an array of integer
    @param target: an integer
    @return: an integer
    """
    def twoSum5(self, A, K):
        # write your code here
        if not A:
            return 0
        
        A.sort()
        res = 0
        left, right = 0, len(A) - 1
        while left < right:
            if A[left] + A[right] > K:
                right -= 1
            else:
                res += right - left
                left += 1
        return res
```
</details>

[LeetCode-1099 Two Sum Less Than K](https://leetcode.com/problems/two-sum-less-than-k/)

Triangle Count 基础。

<details>
<summary> 解</summary>

```python
class Solution:
    def twoSumLessThanK(self, A, K):
        if not A:
            return -1
        
        A.sort()
        res = -1
        left, right = 0, len(A) - 1
        while left < right:
            if A[left] + A[right] >= K:
                right -= 1
            else:
                res = max(res, A[left] + A[right])
                left += 1
        return res
```
</details>


[533 Two Sum - Closet to target](https://www.lintcode.com/problem/two-sum-closest-to-target/description)

<details>
<summary> Two Sum 的引申。 此题注意的是 计算新diff的 符号问题 </summary>

```python
class Solution:
    """
    @param nums: an integer array
    @param target: An integer
    @return: the difference between the sum and the target
    """
    def twoSumClosest(self, nums, target):
        # write your code here
        if not nums:
            return 
        
        nums.sort()
        
        left, right = 0, len(nums) - 1 
        diff = sys.maxsize
        while left < right :
            if nums[left] + nums[right] > target:
                ### 这里注意计算diff的符号问题
                diff = min(nums[left] + nums[right] - target, diff)
                right -= 1
            elif nums[left] + nums[right] < target:
                ### 这里注意计算diff的符号问题
                diff = min(target - nums[left] - nums[right], diff)
                left += 1
            else:
                return 0
        return diff
```
</details>


[59 3Sum Closest](https://leetcode.com/problems/3sum-closest/)

<details>
<summary> Three Sum 的引申， 和Two Sum Closest 同理 </summary>

```python
### Two Pointers:
class Solution:
    def threeSumClosest(self, nums, target):
        if not nums or len(nums) < 3:
            return 
        
        nums.sort()
        
        res = None
        ### iterate the target, after sorting, reducing the searching range each time.
        for i in range(len(nums) - 2):
            left = i + 1
            right = len(nums) - 1
            while left < right:
                SUM = nums[i] + nums[left] + nums[right]
                if res == None:
                    res = SUM
                if abs(SUM - target) < abs(res - target):
                    #update res
                    res = SUM
                if SUM > target:
                    right -= 1
                elif SUM == target:
                    return SUM
                else:
                    left += 1
                    
        return res
```
</details>


[58 4Sum](https://leetcode.com/problems/4sum/)

<details>
<summary> Three Sum 的引申， 和Three Sum 同理, 去重操作，因为要返回unique解 </summary>

```python

### Find a + b + c + d = target:

class Solution:
    def fourSum(self, nums, target):
        if not nums or len(nums) < 4:
            return
        ### 先sort
        nums.sort()
        n = len(nums)
        res = []
        for i in range(n):
            ### 去重a
            if i > 0 and nums[i - 1] == nums[i]:
                continue
            for j in range(i + 1, n):
                ### 去重b
                ### 这里 j > i + 1 是十分必要的，因为要避免 nums[i] = nums[j] at j = i + 1 被跳过的情况。
                if j > i + 1 and nums[j - 1] == nums[j]:
                    continue
                ### Now convert the 4 sum to 2 Sum problem with the rest array.
                new_target = target - nums[i] - nums[j]
                self.twoSum(nums, i, j, n - 1, new_target, res)
        return res
    
    def twoSum(self, nums, i, j, end, new_target, res):
        left, right = j + 1, end
        while left < right:
            if nums[left] + nums[right] > new_target:
                right -= 1
            elif nums[left] + nums[right] == new_target:
                res.append([nums[i], nums[j], nums[left], nums[right]])
                left += 1
                right -= 1
                while left < right and nums[left - 1] == nums[left]:
                    left += 1
                while left < right and nums[right + 1] == nums[right]:
                    right -= 1
            else:
                left += 1
        return
```
</details>


[LeetCode-454 4SumII](https://leetcode.com/problems/4sum-ii/)


a, b, c, d from 4 lists. find a + b + c + d = 0, how many pairs.

4Sum 的变形。

利用hashmap存 任意 a+b 的和，然后枚举任意c+d的和，然后再用hashmap方法求two Sum。 
非常有意思的一道题目。

参考：https://leetcode.com/problems/4sum-ii/solution/

> 时间复杂度和空间复杂度均为 O(n^2) 将 a,b 组成的和及其组成方案个数统计在hash里，然后再去枚举 c,d 的组合，然后找 -(c+d) 在 hash 里的组合数。

<details>
<summary> Hashmap解法（经典） </summary>

```python
class Solution:
    def fourSumCount(self, A, B, C, D):
        counter = {}
        for a in A:
            for b in B:
                counter[a + b] = counter.get(a + b, 0) + 1
        answer = 0
        for c in C:
            for d in D:
                answer += counter.get(-c - d, 0)
        return answer
```
</details>

#### Partition 类型

[31 Partition Array](https://www.lintcode.com/problem/partition-array/description)

<details>
<summary>Partition Array 经典双指针 QuickSelect O（n）解</summary>

```python
class Solution:
    """
    @param nums: The integer array you should partition
    @param k: An integer
    @return: The index after partition
    """
    def partitionArray(self, nums, k):
        # write your code here
        if not nums:
            return 0
        left, right = 0, len(nums) - 1
       
        while left <= right:
            
            while left <= right and nums[right] >= k:
                right -= 1
            while left <= right and nums[left] < k:
                left += 1
            if left <= right:
                nums[left], nums[right] = nums[right], nums[left]
                left += 1
                right -= 1

        return left
```
</details>
 
[144 Interleaving Positive and Negative Numbers](https://www.lintcode.com/problem/interleaving-positive-and-negative-numbers/description)

想法：先确定正负数个数，再in-place partition分正负，再利用双指针一遍 in-place交换
要求不花费额外空间。

<details>
<summary>Partition + 双指针</summary>

```python
class Solution:
    """
    @param: A: An integer array.
    @return: nothing
    """
    def rerange(self, A):

        pos, neg = 0, 0
        for num in A:
            if num > 0:
                pos += 1
            else:
                neg += 1
                
        ### partition in-place
        self.partition(A, pos > neg)
        
        ### interleave in-place
        self.interleave(A, pos == neg)
            
    def partition(self, A, start_positive):
        ### use flag to arrange the partition
        flag = 1 if start_positive else -1
        left, right = 0, len(A) - 1
        while left <= right:
            while left <= right and A[left] * flag > 0:
                left += 1
            while left <= right and A[right] * flag < 0:
                right -= 1
            if left <= right:
                A[left], A[right] = A[right], A[left]
                left += 1
                right -= 1
    
    def interleave(self, A, has_same_length):
        left, right = 1, len(A) - 1
        ### according the length we need to determine the pointer start position
        
        ### EX:
        ### equal length:
        ### -----+++++
        ###  L      R
        ### -+---+++-+
        ###    L  R
        ### -+-+-+-+-+
        
        if has_same_length:
            right = len(A) - 2
            
        while left < right:
            A[left], A[right] = A[right], A[left]
            left, right = left + 2, right - 2
```
</details>


[373 Partition Array by Odd and Even](https://www.lintcode.com/problem/partition-array-by-odd-and-even/description) & [LeetCode-Sort Array By Parity](https://leetcode.com/problems/sort-array-by-parity/)

<details>
<summary>Partition Array 经典双指针 判断条件为奇偶数，此题为LeetCode版本题解</summary>

```python
class Solution:
    def sortArrayByParity(self, A):
        
        left, right = 0, len(A) - 1
        while left <= right:
            while left <= right and A[left] % 2 == 0:
                left += 1
            while left <= right and A[right] % 2 != 0:
                right -= 1
            
            if left <= right:
                A[left], A[right] = A[right], A[left]
                left += 1
                right -= 1
        return A
```
</details>

[49 Sort Letters by Case](https://www.lintcode.com/problem/sort-letters-by-case/description)
<details>
<summary>Partition Array 经典双指针 判断条件为letter的大小写</summary>

```python
class Solution:
    """
    @param: chars: The letter array you should sort by Case
    @return: nothing
    """
    def sortLetters(self, chars):
        # write your code here
        # 定义左右指针并初始化
        left = 0
        right = len(chars) - 1

        # 两指针相向移动，交会则结束
        while left <= right:
            # 左指针向右移动，直到找到第一个大写字母
            while left <= right and chars[left] >= 'a' and chars[left] <= 'z':
                left += 1

            # 右指针向左移动，直到找到第一个小写字母
            while left <= right and chars[right] >= 'A' and chars[right] <= 'Z':
                right -= 1

            # 将左边的大写字母和右边的小写字母交换位置
            if left <= right:
                tmp = chars[left]
                chars[left] = chars[right]
                chars[right] = tmp
                left += 1
                right -= 1
```
</details>

[148 Sort Colors](https://leetcode.com/problems/sort-colors/)

此题可以通过partition的方法一0， 1 分别作pivot，两次scan完成, Space O(1) 。或者是通过counting sort的方法，也是两次scan完成。都是O（n）解, Space O(n)。

<details>
<summary> 普通解：两次扫描，双指针quicksort优化版</summary>

```python
class Solution:
    def sortColors(self, nums):
        """
        Do not return anything, modify nums in-place instead.
        """
        left, right = 0, len(nums) - 1
        new_left = self.partition(nums, left, right, 0)
        self.partition(nums, new_left, right, 1)
                
    def partition(self, nums, left, right, pivot):
        while left <= right:
            while left <= right and nums[right] != pivot:
                right -= 1
            while left <= right and nums[left] == pivot:
                left += 1
            if left <= right:
                nums[left], nums[right] = nums[right], nums[left]
                left += 1
                right -= 1
        return left
            
```

</details>


<details>
<summary> 最优解： 基于双指针的 三指针 One Pass （一次扫描 O(n)) 最优解</summary>

```python
class Solution:
    def sortColors(self, nums):
        """
        Do not return anything, modify nums in-place instead.
        """
        # for all idx < p0 : nums[idx < p0] = 0
        # curr is an index of element under consideration

        ### p0 : ptr to zeros,
        ### p2 : ptr to twos
        ### curr : should be ptr on ones

        ### the move on p0 and p2 depends on curr's value

        p0 = curr = 0
        # for all idx > p2 : nums[idx > p2] = 2
        p2 = len(nums) - 1

        while curr <= p2:
            if nums[curr] == 0:
                nums[p0], nums[curr] = nums[curr], nums[p0]
                p0 += 1
                curr += 1
            elif nums[curr] == 2:
                nums[curr], nums[p2] = nums[p2], nums[curr]
                p2 -= 1
            else:
                curr += 1
            
```
</details>

[143 Sort Colors II (Rainbow Sort)](https://www.lintcode.com/problem/sort-colors-ii/description)

经典排序，Rainbow Sort，复杂度为O(nlogk), 以k二分作为partition的判断标准。又有些类似merge sort。

（分治法），注意，merge sort和这题都只能些小于等于，不能用小于。因为会造成左侧没有elements。

实际操作是quicksort，但是对k的区间变化是mergesort，这题需要好好记住。

<details>
<summary> Rainbow Sort</summary>

```python
class Solution:
    
    """

    @param colors: A list of integer

    @param k: An integer

    @return: nothing

    """

    def sortColors2(self, colors, k):

        self.sort(colors, 0, len(colors) - 1, 1, k)

        

    def sort(self, colors, start, end, colorFrom, colorTo):

        #若处理区间长度为小于等于1或颜色区间长度为1，则不需要再进行处理

        if start >= end or colorFrom == colorTo:

            return

        #设置左右指针以及中间的颜色， 利用中点。  

        colorMid = colorFrom + (colorTo - colorFrom) // 2

        left, right = start, end

        while left <= right:

            #找到左侧大于中间颜色的位置, 注意这里colors必须是小于等于。避免左侧没有数。

            while left <= right and colors[left] <= colorMid:

                left += 1

            #找到右侧小于等于中间颜色的位置

            while left <= right and colors[right] > colorMid:

                right -= 1

            #交换左右指针指向的颜色

            if left <= right:

                colors[left], colors[right] = colors[right], colors[left]

        #继续递归处理左右两半序列

        self.sort(colors, start, right, colorFrom, colorMid)

        self.sort(colors, left, end, colorMid + 1, colorTo)
            
```
</details>


[559 Move Zeros](https://leetcode.com/problems/move-zeroes/)

<details>
<summary> 普通解 + 最优解 + Explain</summary>

```python
### 无法保证minimize的普通解， 机遇swap。
class Solution:
    """
    @param nums: an integer array
    @return: nothing
    """
    def moveZeroes(self, nums):
        left, right = 0, 0
        while right < len(nums):
            if nums[right] != 0:
                nums[left], nums[right] = nums[right], nums[left]
                left += 1
            right += 1
            

### 保证minimize的最优解， 不着急swap，先赋值，最后直接改。
class Solution:
    def moveZeroes(self, nums):
        """
        Do not return anything, modify nums in-place instead.
        """
        ### minimize the write operations:
        ### EX:
        ### 1 0 2 3 0
        ### L
        ### R
        ### 1 0 2 3 0
        ###   L
        ###   R(nums[R] == 0, skip)
        ### 1 0 2 3 0
        ###   L
        ###     R(nums[R] != 0, change  L, L += 1)
        ### 1 2 2 3 0
        ###     L
        ###       R(nums[R] != 0, change  L, L += 1)
        ### 1 2 3 3 0
        ###       L
        ###         R(nums[R] == 0, skip, end of loop)
        ### 1 2 3 3 0
        ###       L (L is not zero, change to 0, L += 1)
        ### 1 2 3 0 0
        ###         L (end)
        # write your code here
        left, right = 0, 0
        while right < len(nums):
            if nums[right] != 0:
                if left != right:
                    nums[left] = nums[right]
                left += 1
            right += 1
            
        while left < len(nums):
            if nums[left] != 0:
                nums[left] = 0
            left += 1


```
</details>
