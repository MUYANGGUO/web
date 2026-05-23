---
title: "Algorithm Notes: Binary Search"
date: "2021-01-01"
excerpt: ""
kind: post
tags:
  - Algorithm Notes
  - Study Notes
comments: true
---

## Chapter 3: 二分法
1. [458 Last Position of Target](https://www.lintcode.com/problem/last-position-of-target/)
2. [585 Maximum Number in Mountain Sequence](https://www.lintcode.com/problem/maximum-number-in-mountain-sequence/description)
3. [460 Find K Closest Elements](https://leetcode.com/problems/find-k-closest-elements/)
4. [447 Search in a Big Sorted Array](https://www.lintcode.com/problem/search-in-a-big-sorted-array/description)
5. [460 Find K Closest Elements](https://leetcode.com/problems/find-k-closest-elements/)
6. [159 Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)
7. [75 Find Peak Element](https://leetcode.com/problems/find-peak-element/)
8. [183 Wood Cut](https://www.lintcode.com/problem/wood-cut/description)
9. [600 Smallest Rectangle Enclosing Black Pixels](https://leetcode.com/problems/smallest-rectangle-enclosing-black-pixels/)
10. [74 First Bad Version](https://leetcode.com/problems/first-bad-version/)
11. [437. Copy Books](https://www.lintcode.com/problem/copy-books/description)
12. [140 Fast Power](https://www.lintcode.com/problem/fast-power/description)
13. [845 Greatest Common Divisor](https://www.lintcode.com/problem/greatest-common-divisor/description)
14. [235 Prime Factorization](https://www.lintcode.com/problem/prime-factorization/description)
15. [65 Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/)



> 补充：
1. [LeetCode-658. Find K Closest Elements](https://leetcode.com/problems/find-k-closest-elements/)
2. [LeetCode-50. Pow(x, n)](https://leetcode.com/problems/super-pow/)
3. [249. Count of Smaller Number before itself](https://www.lintcode.com/problem/count-of-smaller-number-before-itself/description)

## Chapter 3: 二分法 O(logN)

二分法是每次通过 O(1) 的时间将规模为 n 的问题降低为规模为 n/2的问题。 如下为二分法时间复杂的推导。

```
T(n) = T(n/2) + O(1)
     = T(n/4) + O(1) + O(1)
     = T(n/8) + O(1) * 3
     = T(n/16) + O(1) * 4
     ...
     = T(1) + O(1) * logn
     = O(logn)

```

### 3.1 算法与其对应的时间复杂度 归纳：

|     复杂度            |        算法           |
| --- | --- |
| O（1） | 位运算 |
| O（logn） | 二分法，倍增法，快速幂算法，辗转相除法 |
| O（n） | 	枚举法，双指针算法，单调栈算法，KMP算法，Rabin Karp，Manacher's Algorithm	又称作线性时间复杂度 |
| O（nlogn） | 快速排序，归并排序，堆排序 |
| O（n^2） | 枚举法，动态规划，Dijkstra |
| O（n^3） | 枚举法，动态规划，Floyd |
| O（2^n） | 	与组合有关的搜索问题 |
| O（n!） | 与排列有关的搜索问题 |

### 3.2 递归算法

例题：[366 Fibonacci](https://leetcode.com/problems/fibonacci-number/)

递归的intuitive解法：O(2^n)

```python
class Solution:
    def fib(self, n: int) -> int:
        if n <= 1:
            return n
        return self.fib(n - 1) + self.fib(n - 2)

```

<details>
<summary> DP的递推解法：O(N)</summary>

```python
class Solution:
    def fib(self, n: int) -> int:
        if n <= 1:
            return n
        
        f = [0] * (n + 1)
        f[0] = 0
        f[1] = 1
        for i in range(2, n + 1):
            f[i] = f[i - 1] + f[i - 2]
        
        return f[n]
        
```

</details>

### 3.2 二分法的递归实现：
例题 [457 Classical Binary Search](https://leetcode.com/problems/binary-search/)

经典例题！！！

```python
class Solution:
    def search(self, nums, target):
        return self.binarySearch(nums, 0, len(nums) - 1 , target)
    
    def binarySearch(self, nums, start, end, target):
        ### 在不可能出现的区间search那就return
        if start > end:
            return - 1
        ### 利用中点来判断，划分下一层递归的区间。
        mid = int((start + end) / 2)
        if nums[mid] == target:
            return mid
        
        if nums[mid] < target:
            return self.binarySearch(nums, mid + 1, end, target)
        
        return self.binarySearch(nums, start, mid - 1, target)
```

### 3.3 内存中的栈空间与堆空间

我们通常所说的内存空间，包含了两个部分：栈空间（Stack space）和堆空间（Heap space）。

当一个程序在执行的时候，操作系统为了让进程可以使用一些固定的不被其他进程侵占的空间用于进行函数调用，递归等操作，会开辟一个固定大小的空间（比如 8M）给一个进程使用。这个空间不会太大，否则内存的利用率就很低。这个空间就是我们说的栈空间，Stack space。

我们通常所说的栈溢出（Stack Overflow）是指在函数调用，或者递归调用的时候，开辟了过多的内存，超过了操作系统余留的那个很小的固定空间导致的。那么哪些部分的空间会被纳入栈空间呢？栈空间主要包含如下几个部分：

1. 函数的参数与返回值
2. 函数的局部变量

栈空间里存储的内容，会在函数执行结束的时候被撤回

简而言之可以这么区别栈空间和堆空间：

new 出来的就放在堆空间，其他都是栈空间

### 3.4 递归的深度
```python
def factorial(n):
    if n == 1:
        return 1
    return factorial(n-1) * n
```
当n=100时，递归深度就是100。一般来说，我们更关心递归深度的数量级，在该阶乘函数中递归深度是O(n)，而在二分查找中，递归深度是O(log(n))。

太深的递归会内存溢出。

... factorial(1)这些函数，它们从栈底向栈顶方向不断扩展。

当递归过深时，栈空间会被耗尽，这时就无法开辟新的函数，会报出stack overflow这样的错误。

所以，在考虑空间复杂度时，递归函数的深度也是要考虑进去的。

尾递归：若递归函数中，递归调用是整个函数体中最后的语句，且它的返回值不属于表达式的一部分时，这个递归调用就是尾递归。（上例factorial函数满足前者，但不满足后者，故不是尾递归函数）

尾递归函数的特点是：在递归展开后该函数不再做任何操作，这意味着该函数可以不等子函数执行完，自己直接销毁，这样就不再占用内存。一个递归深度O(n)的尾递归函数，可以做到只占用O(1)空间。这极大的优化了栈空间的利用。

但要注意，这种内存优化是由编译器决定是否要采取的，不过大多数现代的编译器会利用这种特点自动生成优化的代码。在实际工作当中，尽量写尾递归函数，是很好的习惯。

### 3.5 二分法 详解

#### 3.5.1 二分法 大致的二分种类：

1. 在排序的数据集上进行二分
2. 找到满足某个条件的第一个位置或者最后一个位置。
3. 在未排序的数据集上进行二分
4. 保留有解的一半，或者去掉无解的一半
5. 在答案集上进行二分
6. 二分答案并验证答案偏大还是偏小

在使用二分法的时候，我们首先应该弄明白的是 需要返回的数是任意位置，还是第一个位置，还是最后一个位置。

[457 Classical Binary Search](https://leetcode.com/problems/binary-search/) 

[14 First Position of Target](https://www.lintcode.com/problem/first-position-of-target/description)

<details>
<summary> 根据binary search 更改的解， 无死循环模板</summary>

```python
class Solution:
    """
    @param nums: The integer array.
    @param target: Target to find.
    @return: The first position of target. Position starts from 0.
    """
    def binarySearch(self, nums, target):
        # write your code here
        if not nums:
            return -1
            
        start, end = 0, len(nums) - 1
        
        while start + 1 < end:
            
            mid = int((start + end) / 2)
        
            if nums[mid] == target:
                ### since we are looking for first, so update end, search in left part, including mid!
                end = mid
            
            elif nums[mid] < target:
                start = mid + 1
            else:
                end = mid - 1
                
        ### out the loop, leave start, end, start + 1 = end:
        #since we are looking for first, so we should check the left part first:
        if nums[start] == target:
            return start
        
        if nums[end] == target:
            return end
        
        return -1
```

</details>

[458 Last Position of Target](https://www.lintcode.com/problem/last-position-of-target/description) 

<details>
<summary> 根据binary search 更改的解， 无死循环模板</summary>

```python
class Solution:
    """
    @param nums: An integer array sorted in ascending order
    @param target: An integer
    @return: An integer
    """
    def lastPosition(self, nums, target):
        # write your code here
        if not nums:
            return -1
        
        start, end = 0, len(nums) - 1
        
        while start + 1 < end:
            mid = int((start + end) / 2)
            
            if nums[mid] == target:
                ### search last part, so including current mid, and search in right half:
                start = mid
            elif nums[mid] < target:
                start = mid + 1
            else:
                end = mid - 1
        
        ### out the loop, we should have start + 1 = end:
        ### check end first since looking for last position
        if nums[end] == target:
            return end
        
        if nums[start] == target:
            return start
        
        return - 1

```

</details>

这三类问题，其实可以拥有一个大致相同的模板，就是利用start + 1 < end, 然后再根据要求的是什么，对start和end进行判断。这样更容易一些。


#### 3.5.2 避免死循环的二分法 模板。

二分法与哈希表相比的优势在于二分法不被内存所限制。

**避免死循环的二分法代码实现**

例题 [457 Classical Binary Search](https://leetcode.com/problems/binary-search/) 

```python
class Solution:
    # @param nums: The integer array
    # @param target: Target number to find
    # @return the first position of target in nums, position start from 0 
    def binarySearch(self, nums, target):
        if not nums:
            return -1

        start, end = 0, len(nums) - 1
        # 用 start + 1 < end 而不是 start < end 的目的是为了避免死循环
        # 在 first position of target 的情况下不会出现死循环
        # 但是在 last position of target 的情况下会出现死循环
        # 样例：nums=[1，1] target = 1
        # 为了统一模板，我们就都采用 start + 1 < end，就保证不会出现死循环
        while start + 1 < end:
            # python 没有 overflow 的问题，直接 // 2 就可以了
            # java和C++ 最好写成 mid = start + (end - start) / 2
            # 防止在 start = 2^31 - 1, end = 2^31 - 1 的情况下出现加法 overflow
            mid = (start + end) // 2

            # > , =, < 的逻辑先分开写，然后在看看 = 的情况是否能合并到其他分支里
            if nums[mid] < target:
                start = mid + 1
            elif nums[mid] == target:
                end = mid
            else: 
                end = mid - 1

        # 因为上面的循环退出条件是 start + 1 < end
        # 因此这里循环结束的时候，start 和 end 的关系是相邻关系（1和2，3和4这种）
        # 因此需要再单独判断 start 和 end 这两个数谁是我们要的答案
        # 如果是找 first position of target 就先看 start，否则就先看 end
        if nums[start] == target:
            return start
        if nums[end] == target:
            return end

        return -1
```

1. 如果你之前写过二分的题目，你会发现在二分问题中，最常见的错误就是死循环。而这个模版一定不会出现死循环。为什么呢？

    因为我们这边使用了start + 1 < end, 而不是start < end 或者 start <= end

    二分法的模板中，整个程序架构分为两个部分：

    通过 while 循环，将区间范围从 n 缩小到 2 （只有 start 和 end 两个点）。

    在 start 和 end 中判断是否有解。

    而普通的start < end 或者 start <= end 在寻找目标最后一次出现的位置的时候，可能出现死循环。

2. 为什么明明可以 start = mid + 1 偏偏要写成 start = mid?

    大部分时候，mid 是可以 +1 和 -1 的。在一些特殊情况下，比如寻找目标的最后一次出现的位置时，当 target 与 nums[mid] 相等的时候，是不能够使用 mid + 1 或者 mid - 1 的。因为会导致漏掉解。那么为了节省脑力，统一写成 start = mid / end = mid 并不会造成任何解的丢失，并且也不会损失效率——log(n) 和 log(n+1) 没有区别。


#### 3.5.3 详解例题：

例题 1. [447 Search in a Big Sorted Array](https://www.lintcode.com/problem/search-in-a-big-sorted-array/description)

倍增法！！！当右端点模糊时，比如无穷长的数组。我们要考虑使用倍增法（Exponential Backoff)

倍增法找右端点的模板。

```python
        ### 倍增
        kth = 1
        while reader.get(kth - 1) < target:
            kth = kth * 2

        ### 找到区间
        left = kth // 2 - 1
        right = kth - 1
        
```

<details>
<summary> 倍增法 + 二分查找 </summary>

```python
class Solution:
    """
    @param reader: An instance of ArrayReader.
    @param target: An integer
    @return: An integer which is the first index of target.
    """
    def searchBigSortedArray(self, reader, target):
        # write your code here
        if not reader:
            return -1
        
        ###  这题的特点是数组假设无穷大。所以没有确定的右端点。
        ### 那么如何在logK 的时间复杂度找到target呢？
        ### 需要使用倍增法。
        
        ### 倍增
        kth = 1
        while reader.get(kth - 1) < target:
            kth = kth * 2
        
        ### now we found the right side larger than target, kth - 1 as the right
        ### 那么找到left 和 right， 对此区间再进行二分查找就可以了。
        left = kth // 2 - 1
        right = kth - 1
        while left + 1 < right:
            mid = int((left + right) / 2)
            
            if reader.get(mid) == target:
                right = mid
                
            elif reader.get(mid) < target:
                left = mid + 1
            else:
                right = mid - 1
            
        if reader.get(left) == target:
            return left 
        
        if reader.get(right) == target:
            return right
            
        return -1
        
```
</details>

例题 2. [460 Find K Closest Elements](https://leetcode.com/problems/find-k-closest-elements/)

> 补充
> 相关例题： [LeetCode-658. Find K Closest Elements](https://leetcode.com/problems/find-k-closest-elements/)
> 这题是返回sorted的结果。（https://leetcode.com/problems/find-k-closest-elements/solution/）


1. 找到分界线，确定left和right， 如果 right: >= target, left: < target。
2. 那么 right 为大于等于target的第一个数的位置，left = right - 1
3. 找k个接近的数，比较left和right谁更接近谁就拿出来。（背向双指针）
4. 用简单逻辑 描述筛选过程的小技巧。
   
```python
class Solution:
    """
    @param A: an integer array
    @param target: An integer
    @param k: An integer
    @return: an integer array
    """
    def kClosestNumbers(self, A, target, k):
        # write your code here
        if not A:
            return 
        
        results = []
        ### cut 代表>= target 的第一个
        ### 那么按照中心线枚举 cut就是中心线的右边      
        ### left就是cut - 1
        cut = self.findCut(A, target)   
        left, right = cut - 1, cut
        
        # 两根指针从中间往两边扩展，依次找到最接近的 k 个数
        for _ in range(k):
            if self.isLeftCloser(A, target, left, right):
                results.append(A[left])
                left -= 1
            else:
                results.append(A[right])
                right += 1
        
        return results
    
    def findCut(self, A, target):
        left, right = 0, len(A) - 1
        while left + 1 < right:
            mid = int((left + right) / 2)
            if A[mid] >= target:
                right = mid
            else:
                left = mid + 1   

        if A[left] >= target:
            return left
            
        if A[right] >= target:
            return right
    
        ### 找不到的情况下：
        ### 因为我们上一步找的是大于等于的
        ### 如果left 和 right都没有满足大于等于的条件，说明他们都是小于的
        ### 那么此时最接近target应该是right，因为数组是升序排列
        return right

    ### 利用封装判断函数的小技巧，配合for循环，把筛选的逻辑变简单，非常值得学习的技巧。 
    def isLeftCloser(self, A, target, left, right):
        if left < 0:
            return False
        if right >= len(A):
            return True
        return target - A[left] <= A[right] - target
    
```

例题 3. [585 Maximum Number in Mountain Sequence](https://www.lintcode.com/problem/maximum-number-in-mountain-sequence/description)

<details>
<summary> 注意这类题目 二分的区间要框住解 </summary>

```python
class Solution:
    """
    @param nums: a mountain sequence which increase firstly and then decrease
    @return: then mountain top
    """
    def mountainSequence(self, nums):
        if not nums:
            return -1
            
        # find first index i so that nums[i] > nums[i + 1]
        start, end = 0, len(nums) - 1
        while start + 1 < end:
            mid = (start + end) // 2
            # mid + 1 保证不会越界
            # 因为 start 和 end 是 start + 1 < end
            if nums[mid] > nums[mid + 1]:
                end = mid
            else:
                start = mid
        
        return max(nums[start], nums[end])
```
</details>

例题 4. [159 Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)

利用首位和重点位置的大小关系，来判断如何划分的经典题目。

```python
class Solution:
    def findMin(self, nums):
        ### 这道题的关键在于找到分割方式
        ### 很显然：
        ### 4 5 6 7 8 9 0 1 2
        ###             ^
        ###        mid
        ### if nums[mid] > nums[end]，很显然 minimum在右边
        ### 反之，minimum一定在左边
        if not nums:
            return
        
        start, end = 0, len(nums) - 1
        while start + 1 < end:
            mid = int((start + end) / 2)
            if nums[mid] > nums[end]:
                start = mid
            else:
                end = mid
        
        return min(nums[start], nums[end])
    
```
Follow up: 如果有重复的数?

可以证明,无法保证在 Log(N) 的时间复杂度内解决

例子:[1,1,1,1,1....,1] 里藏着一个0

最坏情况下需要把每个位置上的1都看一遍,才能找到最后一个有0 的位置考点:能否想到这个最坏情况的例子。

例题 5.  [62 Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)

这题是给出了target来找位置。与例题4不同。做这题我们可以利用排除法的思想，排除掉没有解的那一半。

可以先找到minmum 和target 比 然后再二分。这样等于是two pass的解法。

但是这题是可以用一次二分法 one pass 解决的。

判断可以利用的四个数：start, Mid, End 和 target 的位置，大小关系。


```python
# Mid在左上边时：当target在start 和Mid中间时, ，target一定是在向上的左边区间，其他情况则在右边。
# 4 5 6 7 0 1 2 , target = 5
# S T   M
# Mid 在右下一半的时: T > E 可判断T在左边。
# 6 7 0 1 2 4 5 , target = 5
# S T   M     E
```
<details>
<summary> One Pass Binary Search 解 </summary>

```python
class Solution:
    def search(self, A, target):
        if not A:
            return -1

        start, end = 0, len(A) - 1
        while start + 1 < end:
            mid = (start + end) // 2
            if A[mid] >= A[start]:
                if A[start] <= target <= A[mid]:
                    end = mid
                else:
                    start = mid
            else:
                if A[mid] <= target <= A[end]:
                    start = mid
                else:
                    end = mid
                    
        if A[start] == target:
            return start
        if A[end] == target:
            return end
        return -1
        
```
</details>

例题 6. [75 Find Peak Element](https://leetcode.com/problems/find-peak-element/)

<details>
<summary>  这题是分析数组的趋势 注意给出 末尾一定是下降的趋势 </summary>

```python
class Solution:
    def findPeakElement(self, nums):
        ### return any peak
        ### Binary Search
        ### 1 2 1 3 5 6 4
        ### S     M     E
        ### since num[-1] is negative infinity
        ### if we have  nums[mid - 1] < nums[mid], we know there must be a peak at [mid, :]
        ### otherwise, peak should be contained in left part
        if not nums:
            return None
        
        start, end = 0, len(nums) - 1
        while start + 1 < end:
            mid = int((start + end) / 2)
            if nums[mid - 1] < nums[mid]:
                start = mid
            else:
                end = mid
        
        if nums[start] > nums[end]:
            return start
        else:
            return end
```    
</details>

例题 7. [183 Wood Cut](https://www.lintcode.com/problem/wood-cut/description)

<details>
<summary> 难题，考虑切木头长短，和k值的变化规律 </summary>

```python
class Solution:
    """
    @param L: Given n pieces of wood with length L[i]
    @param k: An integer
    @return: The maximum length of the small pieces
    """
    def woodCut(self, L, k):
        # write your code here
        if not L:
            return 0
            
        max_len = int(sum(L) / k)
        min_len = int(min(L) / k)
        start, end = min_len, max_len
        
        if end <= 1:
            return end

        while start + 1 < end:
            mid = int((start + end) / 2)
            # 长度为mid时能够切出的段数如果大于等于k
            # 把mid作为起点开始新的搜索
            if self.count_k(mid, L) >= k:
                start = mid 
            else:
                end = mid - 1

        if self.count_k(end, L) >= k:
            return end
        if self.count_k(start, L) >= k:
            return start

        return 0
        
    def count_k(self, mid, L):
        k_size = 0
        for l in L:
            k_size += l // mid
        return k_size
        

```
</details>

例题 8. [600 Smallest Rectangle Enclosing Black Pixels](https://leetcode.com/problems/smallest-rectangle-enclosing-black-pixels/)

这道题我们可以考虑从边界出发对矩阵的column，row分别进行二分。一共进行了四次二分，找到所有需要的边界坐标。

<details>
<summary> 进行四次二分法的题目，解体过程，封装小函数等技巧都非常经典。</summary>

```python
class Solution:
    def minArea(self, image, x, y):
        if not image or not image[0]:
            return 0
        
        n, m = len(image), len(image[0])
        left = self.find_first(image, 0, y, self.check_column)
        right = self.find_last(image,y, m - 1, self.check_column)
        up = self.find_first(image, 0, x, self.check_row)
        down = self.find_last(image, x, n - 1, self.check_row)
        
        return (right - left + 1) * (down - up + 1)
        
    ### 通过四个二分完成
    ### https://leetcode.com/problems/smallest-rectangle-enclosing-black-pixels/solution/
    
    def find_first(self, image, start, end, check_func):
        while start + 1 < end:
            mid = int((start + end) / 2)
            if check_func(image, mid):
                end = mid
            else:
                start = mid
        if check_func(image, start):
            return start
        return end

    def find_last(self, image, start, end, check_func):
        while start + 1 < end:
            mid = int((start + end) / 2)
            if check_func(image, mid):
                start = mid
            else:
                end = mid
        if check_func(image, end):
            return end
        return start

    def check_column(self, image, col):
        for i in range(len(image)):
            if image[i][col] == '1':
                return True
        return False

    def check_row(self, image, row):
        for j in range(len(image[0])):
            if image[row][j] == '1':
                return True
        return False
        
```
</details>

难题！[437. Copy Books](https://www.lintcode.com/problem/copy-books/description)

<details>
<summary> 划分型 DP  和 Binary Search 的两种解。</summary>

```python
### 以下为可通过的解法: Binary Search, DP

class Solution:
    """
    @param pages: an array of integers
    @param k: An integer
    @return: an integer
    """
    def copyBooks(self, pages, k):
        n = len(pages)
        if n == 0:
            return 0
        l = max(pages)
        r = sum(pages)
        while l < r:
            mid = (l + r) // 2
            if self.ok(pages, k, mid):
                r = mid
            else:
                l = mid + 1 
        return l

    def ok(self, pages, k, tm):
        num = 1
        pageSum = 0
        for i in pages:
            if pageSum + i <= tm:
                pageSum += i 
            else:
                num += 1  
                pageSum = i
        return num <= k

# DP
class Solution:
    """
    @param pages: an array of integers
    @param k: An integer
    @return: an integer
    """

    def copyBooks(self, pages, k):
        n = len(pages)
        if k > n:
            k = n

        if n == 0:
            return 0

        sum = [0] * n
        sum[0] = pages[0]
        for i in range(1, n):
            sum[i] = sum[i - 1] + pages[i]

        f = [[0] * k for _ in range(n)]

        for i in range(n):
            f[i][0] = sum[i]

        for j in range(1, k):
            p = 0
            f[0][j] = pages[0]
            for i in range(1, j):
                f[i][j] = max(f[i - 1][j], pages[i])

            for i in range(j, n):
                while (p < i and f[p][j - 1] < sum[i] - sum[p]):
                    p += 1
                f[i][j] = max(f[p][j - 1], sum[i] - sum[p])
                if p > 0:
                    p -= 1
                f[i][j] = min(f[i][j], max(f[p][j - 1], sum[i] - sum[p]))
        return f[n-1][k-1]


### My DP solution: Time limit Exceeded

class Solution:
    """
    @param pages: an array of integers
    @param k: An integer
    @return: an integer
    """
    def copyBooks(self, pages, k):
        # write your code here
        # 划分型动态规划
        
        # 有点类似greedy的思路
        
        # 需要找到一种分段方式， 分成不超过k段，考虑到可能有人没有workload，使得所有段的数字之和，的最大值， 最小。
        
        
        # last person (Kth person) on pages[j], pages[j+1] ... pages[n - 1] , j = 0, 1, 2,...,i - 1, i is from {n}
        # K-1 previous persons distributed on pages[0]...pages[j - 1]
        
        n = len(pages)
        if not pages or n == 0 or k == 0:
            return 0
        
        ### 考虑 k> n
        
        if k > n:
            k = n

        
        MAX = float('Inf')
        f = [[MAX] * (n + 1) for _ in range(k + 1)]
        f[0][0] = 0
        for i in range(1, k + 1):
            f[i][0] = 0

            
        for t in range(1, k + 1):
            for i in range(1, n + 1):
                temp = 0
                for j in range(i, -1, -1):
                    # temp  = A[j] + ... + A[i - 1 ]
                    if f[t - 1][j] != MAX:
                        f[t][i] = min(f[t][i], max(f[t - 1][j], temp))
                    # update temp
                    if j > 0:
                        temp += pages[j - 1]
                    
                    # 此处剪枝
                    if f[t][i] < temp:
                        break
        return f[k][n]
```
</details>

### 3.6 其他时间复杂度为低于O(N)的算法（当二分法不适用时）：
1. 快速幂算法 O(logN)
2. 辗转相除法 O(logN)
3. 质因数分解法 O(sqrt(N))
4. 分块检索法 O(sqrt(N))

### 3.6.1 快速幂算法

modulus取模的运算法则：

(a + b) % c = (a % c + b % c) % c

(a * b) % c = (a % c * b % c) % c

(a - b) % c = ((a % c - b % c) % c + c) % c (避免负数取模出错)

除法不适用。

#### 快速幂的算法：O(logN) 复杂度的超大数的幂运算

[LeetCode-50 Pow(x, n)](https://leetcode.com/problems/super-pow/)

```python
class Solution:
    def myPow(self, x, n):
        ### 矩阵快速幂
        ### 计算x的n次方，即x^n
        ### x^n = x^(n/2) * x^(n/2)
        ### So a O(n) problem can be transferred to a O(logn) Problem.
        if n == 0:
            return 1
        if n < 0:
            temp =  1 / self.myPow(x, -n // 2)
            if n % 2 == 0:
                return temp * temp
            else:
                return temp * temp * 1/x
        else:
            temp = self.myPow(x, n // 2)
            if n % 2 == 0:
                return temp * temp
            else:
                return temp * temp * x
        
```

[140 Fast Power](https://www.lintcode.com/problem/fast-power/description)

1. 快速幂的递归方法：

```python
class Solution:
    """
    @param a: A 32bit integer
    @param b: A 32bit integer
    @param n: A 32bit integer
    @return: An integer
    """
    def fastPower(self, a, b, n):
        # write your code here
        ### ending condition:
        if n == 0:
            return 1 % b ### 注意！！！ 此处必须有b，因为按照公式，始终要对因数做取模
        product = self.fastPower(a, b, n // 2)
        product = product * product % b
        if n % 2 == 1:
            product = product * a % b
        
        return product
```

2. 快速幂的二进制算法：

```python
class Solution:
    """
    @param a: A 32bit integer
    @param b: A 32bit integer
    @param n: A 32bit integer
    @return: An integer
    """
    def fastPower(self, a, b, n):
        # write your code here
        ### ending condition:
        res = 1
        while n > 0:
            if n % 2 == 1:
                res = res * a % b
            a = a * a % b
            n = n // 2
        
        return res % b
```
### 3.6.2 辗转相除法--求两数的最大公约数
辗转相除法， 又名欧几里德算法， 是求最大公约数的一种方法。它的具体做法是：用较大的数除以较小的数，再用除数除以出现的余数（第一余数），再用第一余数除以出现的余数（第二余数），如此反复，直到最后余数是0为止。如果是求两个数的最大公约数，那么最后的除数就是这两个数的最大公约数。

```python
def gcd(big, small):
    if small != 0:
        return gcd(small, big % small)
    else:
        return big
```

[845 Greatest Common Divisor](https://www.lintcode.com/problem/greatest-common-divisor/description)

<details>
<summary> 辗转相除法 O(logN) </summary>

```python
class Solution:
    """
    @param a: the given number
    @param b: another number
    @return: the greatest common divisor of two numbers
    """
    def gcd(self, a, b):
        # write your code here
        if a > b:
            small = b
            big = a
        else:
            small = a
            big = b
        
        if small != 0:
            return self.gcd(small, big % small)
        else:
            return big
```
</details>

### 3.6.3 两个排序数组的中位数

[65 Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/)

> 在两个排序数组中，求他们合并到一起之后的中位数
> 时间复杂度要求：O(log(n+m))，其中 n, m 分别为两个数组的长度

解法

1. 基于 FindKth 的算法。整体思想类似于 median of unsorted array 可以用 find kth from unsorted array 的解题思路。
2. 基于二分的方法。二分 median 的值，然后再用二分法看一下两个数组里有多少个数小于这个二分出来的值。

**算法描述**

先将找中点问题转换为找第 k 小的问题，这里直接令k = (n + m) / 2。那么目标是在 logk = log((n+m)/2) = log(n+m) 的时间内找到A和B数组中从小到大第 k 个。

比较 A 数组的第 k/2 小和 B 数组的第 k/2 小的数。谁小，就扔掉谁的前 k/2 个数。

将目标寻找第 k 小修改为寻找第 (k-k/2) 小

回到第 2 步继续做，直到 k == 1 或者 A 数组 B 数组里已经没有数了。

F.A.Q
Q: 如何 O(1) 时间移除数组的前 k/2 个数？

A: 给两个数组一个起始位置的标记参数（相当于一个offset，偏移位），把这个起始位置 + k/2 就可以了。

Q: 不是让我们找中点么？怎么变成了找第 k 小？

A: 找第 k 小如果能在 log(k) 的时间内解决，那么找中点就可以在 log( (n+m)/2 ) 的时间内解决。

Q.如何证明谁的第 k/2 个数比较小就扔掉谁的前 k/2 个数这个理论？

A: 直观的，我们看一个例子

A=[1,3,5,7]

B=[2,4,6,8]

假如我们要找第 4 小。也就是 k = 4。算法会去比较两个数组中第 2 小的数。也就是 A[1]=3 和 B[1]=4 这两个数的大小。然后会发现，3比较小，然后就决定扔掉 A 的前 k/2 = 2 个数。也就是，接下来，需要去找

A=[5,7]

B=[2,4,6,8]

中的第 k-k/2=2 小的数。这里我们扔掉了 [1,3]，扔掉的这些数中，一定不会包含我们要找的第 4 小的数——4。因为从位置上，他们在 A 和 B合并到一起之后，都会排在 4 的前面。

抽象的证明一下：

我们需要回顾一下 Merge Two Sorted Arrays 这道题目。算法的做法是，每一次比较两个数组中比较小的数，然后谁小，谁先被拿出来，放到最后的合并结果中。那么假设 A 和 B中 A[k/2 - 1] <= B[k/2 - 1]（反之同理）。我们会决定扔掉A[0..k/2-1]，因为这些数在 A 与 B 做简单的 Merge 的过程中，会优先于目标第 k 个数现出来。为什么？因为既然A[k/2-1] <= B[k/2-1]，那么当我们用最简单的 Merge Two Sorted Arrays 的算法一个个从A和B里拿数出来的时候，当 A[k/2 - 1] 出来的时候，B[k/2 - 1] 一定还没有被拿出来，那么此时A里出来了 k/2 个数，B里出来的数一定不够 k/2 个（因为第 k/2 个数都还没出来），所以加起来总共出来的数肯定不够k个，所以第k小的数一定还留在AB数组中。

因此我们证明了：扔掉较小的一部分的前 k/2 个数，不会扔掉要找的第 k 小的数。

**基于二分的算法**

算法描述

我们需要先确定二分的上下界限，由于两个数组 A, B 均有序，所以下界为 min(A[0], B[0])，上界为 max(A[A.length - 1], B[B.length - 1]).
判断当前上下界限下的 mid(mid = (start + end) / 2) 是否为我们需要的答案；这里我们可以分别对两个数组进行二分来找到两个数组中小于等于当前 mid 的数的个数cnt1与 cnt2，sum = cnt1 + cnt2 即为 A 跟 B 合并后小于等于当前mid的数的个数.

如果 sum < k，即中位数肯定不是 mid，应该大于 mid，更新 start 为 mid，否则更新 end 为 mid，之后再重复第二步
当不满足 start + 1 < end 这个条件退出二分循环时，再分别判断一下start跟 end ，最终返回符合要求的那个数即可

算法详解

如果对该算法有点疑问，我们下面来详细讲解一下：

这一题如果用二分法来做，其实就是一个二分答案的过程

首先我们已经得到了上下界限，那么答案必定是在这个上下界限中的，需要实现的就是从这个歌上下界限中找出答案

我们每次取的 mid，其实就是我们每次在假设答案为 mid，二分的过程就是不断的推翻这个假设，然后再假设新的答案

需要满足的条件为：

上面算法描述中的 sum 需要等于 k，这里的 k = (A.length + B.length) / 2. 如果 sum < k，很明显当前的 mid 偏小，需要增大，否则就说明当前的 mid 偏大，需要缩小.

最终在 start 与 end 相邻的时候退出循环，判断 start 跟 end 哪个符合条件即可得到最终结果

<details>
<summary> 普通解：转化成FindKth问题</summary>

```python
class Solution:
    """
    @param A: An integer array.
    @param B: An integer array.
    @return: a double whose format is *.5 or *.0
    """
    def findMedianSortedArrays(self, A, B):
        n = len(A) + len(B)
        if n % 2 == 1:
            return self.findKth(A, 0, B, 0, n // 2 + 1)
        else:
            smaller = self.findKth(A, 0, B, 0, n // 2)
            bigger = self.findKth(A, 0, B, 0, n // 2 + 1)
            return (smaller + bigger) / 2

    def findKth(self, A, index_a, B, index_b, k):
        if len(A) == index_a:
            return B[index_b  + k - 1]
        if len(B) == index_b:
            return A[index_a + k - 1]
        if k == 1:
            return min(A[index_a], B[index_b])
        
        a = A[index_a + k // 2 - 1] if index_a + k // 2 <= len(A) else None
        b = B[index_b + k // 2 - 1] if index_b + k // 2 <= len(B) else None
        
        if b is None or (a is not None and a < b):
            return self.findKth(A, index_a + k // 2, B, index_b, k - k // 2)
        return self.findKth(A, index_a, B, index_b + k // 2, k - k // 2)

```

</details>


但是存在更好的解法，通过binary search， 有点类似bitonic sequence的感觉，只需要O（log min(m, n)）就能通过寻找两个array 各自partition的位置，来找到中点。

|     left_part            |        right_part           |
| --- | --- |
|`A[0], A[1], ..., A[i-1]` |  `A[i], A[i+1], ..., A[m-1]`|
|`B[0], B[1], ..., B[j-1]` |  `B[j], B[j+1], ..., B[n-1]`| 

We need to find maxLeft A <= minRight B, and maxLeft Y <= minRight X,  需要找到符合条件的i，通过对较短的一个array进行满足此条件的binary search

参考：

https://www.jiuzhang.com/solution/median-of-two-sorted-arrays/#tag-highlight-lang-java

https://www.youtube.com/watch?v=do7ibYtv5nk

https://www.youtube.com/watch?v=KB9IcSCDQ9k

<details>
<summary> 最优解： 基于寻找Binary Search， search partition的方法。</summary>

```python
class Solution:
    def findMedianSortedArrays(self, nums1, nums2):
        #get overall sense:
        a = len(nums1)
        b = len(nums2)
        length = a+b
        # found the total size of the "merged" array
        # now define them short, long, based on their length
        # notice that:
        # short and long will contribute a portion to the merged array left side before the median, we need to find out the location that happend in short, and long. 
        # For example:
        # short: 1,3,4
        # long : 2,5,9,10
        # mergerd: 1,(2),3,4,(5),(9),(10)
        # here we have: median happened at index = 3 <== (3+5)/2 = 4th number, as the median number, thus
        # including the median number, the left has a total of 4 numbers, three are from short, only one is from long.
        # to find out the "three" and "one", which are the numbers contributed from both long, and short, we could easily identify the median number of the merged array.
        # so we do the following to ensure that we are operating on the short and long lists by redefining them:
        
        if a > b:
            short = b
            short_v = nums2
            long = a
            long_v = nums1
            imax = b
        else:
            short = a
            short_v = nums1
            long = b
            long_v = nums2
            imax = a
            
        imin = 0
        
        if long == 0:
            raise ValueError
          
        median_index = (length+1) // 2 
        
        #let us define ptrs imin, imax, 
        # recall the example, short, long
        # consider the imin, and imax are searched range for i ptr, on the short array:
        # thus, imin starts at 0, imax starts from the end of short array.
        # thus, imin = 0, imax = len(short) at the begining.
        # performing the binary search on the short array, we could narrow down the imin, imax range, adn finally locate the i index at short, so that we could know j index at long, both numbers including ith, jth in short and long, contributed towards the left part of the merged array.
        
        #binary search:
        while imin <= imax:
            # binary search guess i happen at the middle
            i = (imin+imax) // 2
            # derive j, according to i, known that how many numbers should exist in left
            j = median_index - i
            # validate the guess and iterate
            # if the i does not exceed the short, and the long last contributed is larger than the next remaining of the short, meaning the long contributed last one should not count, but should be the shor16. 

            elif i> 0 and short_v[i-1] > long_v[j]:
                imax = i-1
                
            #eventually, we should have the perfect i, that indicated short contributed i numbers, long contributed j numbers, the last contirbuted short number is smaller than the remining of the long. and long's last contributed number is also smaller than the short remaining next number.
            
            else:
            # we need consider several cases when i, or j could be zero, otherwise, the max left will be the maximum between each long and short contributed last number
                if i == 0: max_left = long_v[j-1]
                elif j == 0: max_left = short_v[i-1]
                else: max_left = max(long_v[j-1],short_v[i-1])
                
                # if the merged size is odd, the max_left is the single number, which should be the last number of left part
                if (length) % 2 == 1:
                    return max_left
                
                # we also need to consider when all short or all long contributed, as well as when the merged size is even:
                if i == short: min_right = long_v[j]
                elif j == long: min_right = short_v[i]
                #then the min_right is the minimum between the long remaining next and short remaining next
                else: min_right = min(long_v[j], short_v[i])
                #return the median calculation from left and right. 
                return(max_left+min_right) /2.0
```

</details>


### 3.6.4 分解质因数 O(sqrt(N))

以 sqrt{n} 为时间复杂度的算法并不多见，最具代表性的就是分解质因数了。

具体步骤

1. 记up = sqrt{n}，作为质因数k的上界, 初始化k=2。
2. 当k <= up 且 n不为1 时，执行步骤3，否则执行步骤4。
3. 当n被k整除时，不断整除并覆盖n，同时结果中记录k，直到n不能整出k为止。之后k自增，执行步骤2。
4. 当n不为1时，把n也加入结果当中，算法结束。

几点解释

- 不需要判定k是否为质数，如果k不为质数，且能整出n时，n早被k的因数所除。故能整除n的k必是质数。
- 为何引入up？为了优化性能。当k大于up时，k已不可能整除n，除非k是n自身。也即为何步骤4判断n是否为1，n不为1时必是比up大的质数。
- 步骤2中，也判定n是否为1，这也是为了性能，当n已为1时，可早停。

复杂度分析

- 最坏时间复杂度O(sqrt (n) )。当n为质数时，取到其最坏时间复杂度。
- 空间复杂度O(log(n)), 当n质因数很多时，需要空间大，但总不会多于O(log(n))个

延伸

质因数分解有一种更快的算法，叫做Pollard Rho快速因数分解。该算法时间复杂度为O(n^{1/4})，其理解起来稍有难度，有兴趣的同学可以进行自学。

[235 Prime Factorization](https://www.lintcode.com/problem/prime-factorization/description)

```python
def primeFactorization(n):
    result = []
    up = int(math.sqrt(n));
    
    k = 2
    while k <= up and n > 1: 
        while n % k == 0:
            n //= k
            result.append(k)
        k += 1
            
    if n > 1:
        result.append(n)
        
    return result
```

### 3.6.5 分块检索法 O(sqrt(N)) -- “根号N算法“， 划分成根号N个小区间。
将长度为N的区间分成sqrt(N)的大小的小区间。

大型综合类型的难题！！！

[249. Count of Smaller Number before itself](https://www.lintcode.com/problem/count-of-smaller-number-before-itself/description)

这道题需要好好花时间理解。整体的构造比较复杂，用到了分块检索的算法。（他的标准解应该是线段树解法）

```python
class Block:
    def __init__(self):
        self.total = 0
        self.counter = {}
        
        
class BlockArray:
    def __init__(self, max_value):
        self.blocks = [
            Block()
            for _ in range(max_value // 100 + 1)
        ]
    
    def count_smaller(self, value):
        count = 0
        block_index = value // 100
        for i in range(block_index):
            count += self.blocks[i].total
        
        counter = self.blocks[block_index].counter
        for val in counter:
            if val < value:
                count += counter[val]
        return count
        
    def insert(self, value):
        block_index = value // 100
        block = self.blocks[block_index]
        block.total += 1
        block.counter[value] = block.counter.get(value, 0) + 1


class Solution:
    """
    @param A: an integer array
    @return: A list of integers includes the index of the first number and the index of the last number
    """
    def countOfSmallerNumberII(self, A):
        if not A:
            return []

        block_array = BlockArray(10000)
        results = []
        for a in A:
            count = block_array.count_smaller(a)
            results.append(count)
            block_array.insert(a)
        return results
```





<p align="center"> <b> 二分法 练习题 </b> </p>

[74 First Bad Version](https://leetcode.com/problems/first-bad-version/)

<details>
<summary> Binary Search </summary>

```python
class Solution:
    def firstBadVersion(self, n):
        """
        :type n: int
        :rtype: int
        """
        # write your code here
        start, end = 1, n
        while start + 1 < end:
            mid = int((start + end) / 2)
            if isBadVersion(mid):
                end = mid
            else:
                start = mid + 1
        if isBadVersion(start):
            return start
        return end
        
```
</details>

[14 First Position of Target](https://www.lintcode.com/problem/first-position-of-target/description)

<details>
<summary> 根据binary search 更改的解， 无死循环模板</summary>

```python
class Solution:
    """
    @param nums: The integer array.
    @param target: Target to find.
    @return: The first position of target. Position starts from 0.
    """
    def binarySearch(self, nums, target):
        # write your code here
        if not nums:
            return -1
            
        start, end = 0, len(nums) - 1
        
        while start + 1 < end:
            
            mid = int((start + end) / 2)
        
            if nums[mid] == target:
                ### since we are looking for first, so update end, search in left part, including mid!
                end = mid
            
            elif nums[mid] < target:
                start = mid + 1
            else:
                end = mid - 1
                
        ### out the loop, leave start, end, start + 1 = end:
        #since we are looking for first, so we should check the left part first:
        if nums[start] == target:
            return start
        
        if nums[end] == target:
            return end
        
        return -1
```

</details>

[458 Last Position of Target](https://www.lintcode.com/problem/last-position-of-target/description) 

<details>
<summary> 根据binary search 更改的解， 无死循环模板</summary>

```python
class Solution:
    """
    @param nums: An integer array sorted in ascending order
    @param target: An integer
    @return: An integer
    """
    def lastPosition(self, nums, target):
        # write your code here
        if not nums:
            return -1
        
        start, end = 0, len(nums) - 1
        
        while start + 1 < end:
            mid = int((start + end) / 2)
            
            if nums[mid] == target:
                ### search last part, so including current mid, and search in right half:
                start = mid
            elif nums[mid] < target:
                start = mid + 1
            else:
                end = mid - 1
        
        ### out the loop, we should have start + 1 = end:
        ### check end first since looking for last position
        if nums[end] == target:
            return end
        
        if nums[start] == target:
            return start
        
        return - 1

```

</details>


[LeetCode-34 Find First and Last Position of Element in Sorted Array](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/)


<details>
<summary> 根据binary search 更改的解， 无死循环模板</summary>

```python
class Solution:
    def searchRange(self, nums, target):
        if not nums:
            return [-1, -1]
        return [self.searchFirst(nums, target), self.searchLast(nums, target)]

    
    def searchFirst(self, nums, target):
        start, end = 0, len(nums) - 1
        while start + 1 < end:
            mid = int((start + end) / 2)
            if nums[mid] == target:
                end = mid
            elif nums[mid] < target:
                start = mid + 1
            else:
                end = mid - 1
        
        if nums[start] == target:
            return start
        if nums[end] == target:
            return end
        return -1
    def searchLast(self, nums, target):
        start, end = 0, len(nums) - 1
        while start + 1 < end:
            mid = int((start + end) / 2)
            if nums[mid] == target:
                start = mid
            elif nums[mid] < target:
                start = mid + 1
            else:
                end = mid - 1
                
        if nums[end] == target:
            return end
        if nums[start] == target:
            return start

        return -1

```
</details>

<p align="center"> <b> 二分法 练习题 找peak</b> </p>

[585 Maximum Number in Mountain Sequence](https://www.lintcode.com/problem/maximum-number-in-mountain-sequence/description)
<details>
<summary> 利用单调性的二分法！！！</summary>

```python
class Solution:
    """
    @param nums: a mountain sequence which increase firstly and then decrease
    @return: then mountain top
    """
    def mountainSequence(self, nums):
        if not nums:
            return -1
            
        # find first index i so that nums[i] > nums[i + 1]
        start, end = 0, len(nums) - 1
        while start + 1 < end:
            mid = (start + end) // 2
            # mid + 1 保证不会越界
            # 因为 start 和 end 是 start + 1 < end
            if nums[mid] > nums[mid + 1]:
                end = mid
            else:
                start = mid
        
        return max(nums[start], nums[end])
```
</details>

[LeetCode-852 Peak Index in a Mountain Array](https://leetcode.com/problems/peak-index-in-a-mountain-array/) &
[1476 Peak Index in a Mountain Array](https://www.lintcode.com/problem/peak-index-in-a-mountain-array/description)

<details>
<summary> 利用单调性的二分法！！！</summary>

```python
class Solution:
    def peakIndexInMountainArray(self, nums: List[int]) -> int:
        if not nums:
            return -1
    
        start, end = 0, len(nums) - 1
        while start + 1 < end:
            mid = int((start + end) / 2)
            
            if nums[mid] > nums[mid + 1]:
                end = mid
            else:
                start = mid
        
        if nums[start] >= nums[end]:
            return start
        else:
            return end
```
</details>

<p align="center"> <b> 3 Step Reverse （经典例题）</b> </p>

给定一个旋转排序数组，在原地恢复其排序。（升序）

基于二分法上的找最小值, 注意此题如何修改二分法，严格意义上并不算是二分法，有点像打擂台。

[39 Recover Rotated Sorted Array](https://www.lintcode.com/problem/recover-rotated-sorted-array/description)

<details>
<summary> 打擂台 + 二分法</summary>

```python
class Solution:
    """
    @param nums: An integer array
    @return: nothing
    """
    def recoverRotatedSortedArray(self, nums):
        # write your code here
        minIndex = self.findCut(nums)
        print(minIndex)
        if minIndex == 0:
            return
        
        start, end = 0, len(nums) - 1 
        self.rotateArray(nums, start, minIndex - 1)
        self.rotateArray(nums, minIndex, end)
        self.rotateArray(nums, start, end)
    
    
    def findCut(self, nums):
        if nums is None or len(nums) < 2:
            return 0
            
        start, end = 0, len(nums) - 1
    
        while start + 1< end:
            mid = int((start + end) / 2)
            if nums[mid] > nums[end]:
                start = mid + 1
            elif nums[mid] < nums[end]:
                end = mid
            else:
                end -= 1
        if nums[start] > nums[end]:
    
            return end
        else:
            return start
    
    def rotateArray(self, nums, left, right):
        while left <= right:
            nums[left], nums[right] = nums[right], nums[left]
            left += 1 
            right -= 1
```
</details>

<p align="center"> <b> Search A 2D matrix I and II, 经典例题</b> </p>

[LeetCode-74 Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/)

<details>
<summary>二分法 在矩阵中的查找</summary>

```python
### Binary Search ! 此题注意处理矩阵坐标的小技巧。
class Solution:
    def searchMatrix(self, matrix, target):
        m = len(matrix)
        if m == 0:
            return False
        n = len(matrix[0])
        if n == 0:
            return False

        start, end = 0, n*m - 1
        while start + 1 < end:
            mid = int((start + end) / 2)
            pivot = matrix[mid // n][mid % n]
            if pivot == target:
                return True
            else:
                if target < pivot:
                    end = mid - 1
                else:
                    start = mid + 1
        if matrix[start // n][start % n] == target or matrix[end // n][end % n] == target:
            return True
                    
        return False

```
</details>

[LeetCode-240 Search a 2D Matrix II](https://leetcode.com/problems/search-a-2d-matrix-ii/)

类似题目：[38 Search a 2D Matrix II](https://www.lintcode.com/problem/search-a-2d-matrix-ii/description)

<details>
<summary>LeetCode 版本： O(m + n) 的 Search Space Reduction 解法</summary>

```python
class Solution:
    def searchMatrix(self, matrix, target):
        """
        :type matrix: List[List[int]]
        :type target: int
        :rtype: bool
        """
        ### start from the top-right corner:
        m = len(matrix)
        if m == 0:
            return False
        n = len(matrix[0])
        if n == 0:
            return False
        
        x, y = 0, n - 1
        
        while x <= m - 1 and y >= 0:
            if matrix[x][y] == target:
                return True
            elif matrix[x][y] < target:
                x += 1
            else:
                y -= 1
        
        return False
```
</details>

[其他解法，包括二分法，分治法， 等等，这题要注意不同解法的时间复杂度。](https://leetcode.com/problems/search-a-2d-matrix-ii/solution/)

<p align="center"> <b> 数学递归 经典例题</b> </p>

[845 Greatest Common Divisor](https://www.lintcode.com/problem/greatest-common-divisor/description)

辗转相除法， 又名欧几里德算法， 是求最大公约数的一种方法。它的具体做法是：用较大的数除以较小的数，再用除数除以出现的余数（第一余数），再用第一余数除以出现的余数（第二余数），如此反复，直到最后余数是0为止。如果是求两个数的最大公约数，那么最后的除数就是这两个数的最大公约数。

<details>
<summary>辗转相除法</summary>

```python
class Solution:
    """
    @param a: the given number
    @param b: another number
    @return: the greatest common divisor of two numbers
    """
    def gcd(self, a, b):
        # write your code here
        if a > b:
            small = b
            big = a
        else:
            small = a
            big = b
        
        if small != 0:
            return self.gcd(small, big % small)
        else:
            return big
```
</details>

[LeetCode-50 Pow(x, n)](https://leetcode.com/problems/powx-n/)

快速幂：计算x的n次方， 即计算x^n。

由公式可知： x^n = x^{n/2} * x^{n/2}。

如果我们求得x^{n/2}

， 则可以O(1)求出x^n, 而不需要再去循环剩下的n/2次。

以此类推，若求得x^{n/4}，则可以O(1)求出x^{n/2} 。
。。。

因此一个原本O(n)的问题，我们可以用O(logn)复杂度的算法来解决。

<details>
<summary>快速幂，递归</summary>

```python
class Solution:
    def myPow(self, x, n):
        ### 矩阵快速幂
        ### 计算x的n次方，即x^n
        ### x^n = x^(n/2) * x^(n/2)
        ### So a O(n) problem can be transferred to a O(logn) Problem.
        if n == 0:
            return 1
        if n < 0:
            temp =  1 / self.myPow(x, -n // 2)
            if n % 2 == 0:
                return temp * temp
            else:
                return temp * temp * 1/x
        else:
            temp = self.myPow(x, n // 2)
            if n % 2 == 0:
                return temp * temp
            else:
                return temp * temp * x
        
```
</details>

[462 Total Occurence of Target](https://www.lintcode.com/problem/total-occurrence-of-target/description)

二分法经典模板 一题练习两次。

```python
class Solution:
    """
    @param A: A an integer array sorted in ascending order
    @param target: An integer
    @return: An integer
    """
    def totalOccurrence(self, A, target):
        # write your code here

        if not A:

            return 0

        

        #寻找第一次出现的位置

        left, right = 0, len(A) - 1

        while left + 1 < right:

            mid = left + (right - left) // 2

            if A[mid] >= target:

                right = mid

            else:

                left = mid

        

        if A[left] == target:

            first = left

        elif A[right] == target:

            first = right

        #若找不到直接返回0

        else:

            return 0

        

        #寻找最后一次出现的位置

        left, right = 0, len(A) - 1

        while left + 1 < right:

            mid = left + (right - left) // 2

            if A[mid] <= target:

                left = mid

            else:

                right = mid

        

        #注意与first的判断顺序有别，要先判右侧的

        if A[right] == target:

            last = right

        elif A[left] == target:

            last = left

        

        return last - first + 1

```

[61. Search for a Range](https://www.lintcode.com/problem/search-for-a-range/description)

相似练习题：

```python
class Solution:
    """
    @param A: an integer sorted array
    @param target: an integer to be inserted
    @return: a list of length 2, [index1, index2]
    """
    # 寻找左端点
    def find_first_target_num(self, A, target, n):
        left, right = 0, n - 1
        while left + 1 < right:
            mid = left + (right - left) // 2
            if A[mid] < target:
                left = mid
            else:
                right = mid
        if left < n and A[left] == target:
            return left
        if right >= 0 and A[right] == target:
            return right
        return -1
    
    # 寻找右端点
    def find_last_target_num(self, A, target, n):
        left, right = 0, n - 1
        while left + 1 < right:
            mid = left + (right - left) // 2
            if A[mid] <= target:
                left = mid
            else:
                right = mid
        if right >= 0 and A[right] == target:
            return right
        if left < n and A[left] == target:
            return left
        return -1
    
    def searchRange(self, A, target):
        n = len(A)
        interval = [-1, -1]
        interval[0] = self.find_first_target_num(A, target, n)
        interval[1] = self.find_last_target_num(A, target, n)
        return interval

```
