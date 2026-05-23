---
title: "Algorithm Notes: Hash&Heap Lecture"
date: "2021-01-01"
excerpt: ""
kind: post
tags:
  - Algorithm Notes
  - Study Notes
comments: true
---

## 高频数据结构 -- 哈希表 与 堆

哈希表底层的数据结构运用到了哪些？ 数组 + 链表 + 红黑树

数据结构时间复杂度的衡量方法：

数据结构通常会提供“多个”对外接口，只用一个时间复杂度是很难对其进行正确评价的，所以通常需要对每个接口的时间复杂度进行描述。

### 哈希表

支持操作：O(1) Insert / Find/ Delete

这些操作都是 O(1) 的前提条件是什么？

任何操作的时间复杂度从严格意义上讲，都是 O（size of key） 而不是 O(1)。你不可能在 O(1) 的时间内判断 2 个 1m 长的字符串是否相等。 

哪些key的size可以是O（1）， int， char 等等。

**例题 1** [LeetCode-146 LRU Cache](https://leetcode.com/problems/lru-cache/) 经典问题 缓存淘汰算法， 需要完全记住。

新节点从尾部加入，老节点从头部移走。

```python
class LinkedNode:
    
    def __init__(self, key=None, value=None, next=None):
        self.key = key
        self.value = value
        self.next = next

class LRUCache:

    # @param capacity, an integer
    def __init__(self, capacity):
        self.key_to_prev = {}
        self.dummy = LinkedNode()
        self.tail = self.dummy
        self.capacity = capacity
    
    def push_back(self, node):
        self.key_to_prev[node.key] = self.tail
        self.tail.next = node
        self.tail = node
    
    def pop_front(self):
        # 删除头部
        head = self.dummy.next
        del self.key_to_prev[head.key]
        self.dummy.next = head.next
        self.key_to_prev[head.next.key] = self.dummy
        
    # change "prev->node->next...->tail"
    # to "prev->next->...->tail->node"
    def kick(self, prev):	#将数据移动至尾部
        node = prev.next
        if node == self.tail:
            return
        
        # remove the current node from linked list
        prev.next = node.next
        # update the previous node in hash map
        self.key_to_prev[node.next.key] = prev
        node.next = None

        self.push_back(node)

    # @return an integer
    def get(self, key):
        if key not in self.key_to_prev:
            return -1
        
        prev = self.key_to_prev[key]
        current = prev.next
        
        self.kick(prev)
        return current.value

    # @param key, an integer
    # @param value, an integer
    # @return nothing
    def put(self, key, value):
        if key in self.key_to_prev:	   
            self.kick(self.key_to_prev[key])
            self.key_to_prev[key].next.value = value
            return
        
        self.push_back(LinkedNode(key, value))  #如果key不存在，则存入新节点
        if len(self.key_to_prev) > self.capacity:		#如果缓存超出上限
            self.pop_front()					#删除头部


# Your LRUCache object will be instantiated and called as such:
# obj = LRUCache(capacity)
# param_1 = obj.get(key)
# obj.put(key,value)

```

**例题 2** [LeetCode-380 Insert Delete GetRandom O(1)](https://leetcode.com/problems/insert-delete-getrandom-o1/)

补充：[526 Load Balancer](https://www.lintcode.com/problem/load-balancer/description)

不同于LRU那题，这题可以用到的数据结构是数组+哈希表。

使用数组来保存当前集合中的元素，同时用一个hashMap来保存数字与它在数组中下标的对应关系。

插入操作时：

若已存在此元素返回false
不存在时将新的元素插入数组最后一位，同时更新hashMap。

删除操作时：

若不存在此元素返回false
存在时先根据hashMap得到要删除数字的下标，再将数组的最后一个数放到需要删除的数的位置上，删除数组最后一位，同时更新hashMap。

获取随机数操作时：

根据数组的长度来获取一个随机的下标，再根据下标获取元素。

```python
class RandomizedSet:

    def __init__(self):
        """
        Initialize your data structure here.
        """
        self.nums = []
        self.val2index = {}
        

    def insert(self, val):
        """
        Inserts a value to the set. Returns true if the set did not already contain the specified element.
        """
        if val in self.val2index:
            return False
        
        self.nums.append(val)
        self.val2index[val] = len(self.nums) - 1
        return True
        

    def remove(self, val):
        """
        Removes a value from the set. Returns true if the set contained the specified element.
        """
        if val not in self.val2index:
            return False
        
        index = self.val2index[val]
        last_num = self.nums[-1]
        self.val2index[last_num] = index
        self.nums[index] = last_num
        
        self.nums.pop()
        del self.val2index[val]
        
        return True
        
        

    def getRandom(self):
        """
        Get a random element from the set.
        """
        return self.nums[random.randint(0, len(self.nums) - 1)]


# Your RandomizedSet object will be instantiated and called as such:
# obj = RandomizedSet()
# param_1 = obj.insert(val)
# param_2 = obj.remove(val)
# param_3 = obj.getRandom()

```

**例题 3** [960 First Unique NUmber in Data Stream II](https://www.lintcode.com/problem/first-unique-number-in-data-stream-ii/description)

只允许遍历一次。

因为需要支持从中间删除，所以应该用链表来配合哈希表。很类似LRU这题。

使用类似 LRU Cache 的做法来做。 hash 的 key 为 num，value 为对应的 linkedlist 上的 previous node

```python
class DataStream:

    def __init__(self):
        self.dummy = ListNode(0)
        self.tail = self.dummy
        self.num_to_prev = {}
        self.duplicates = set()
          
    """
    @param num: next number in stream
    @return: nothing
    """
    def add(self, num):
        if num in self.duplicates:
            return
        
        if num not in self.num_to_prev:
            self.push_back(num)            
            return
        
        # find duplicate, remove it from hash & linked list
        self.duplicates.add(num)
        self.remove(num)
    
    def remove(self, num):
        prev = self.num_to_prev.get(num)
        del self.num_to_prev[num]
        prev.next = prev.next.next
        if prev.next:
            self.num_to_prev[prev.next.val] = prev
        else:
            # if we removed the tail node, prev will be the new tail
            self.tail = prev

    def push_back(self, num):
        # new num add to the tail
        self.tail.next = ListNode(num)
        self.num_to_prev[num] = self.tail
        self.tail = self.tail.next

    """
    @return: the first unique number in stream
    """
    def firstUnique(self):
        if not self.dummy.next:
            return None
        return self.dummy.next.val

```

补充： [685. First Unique Number in Data Stream](https://www.lintcode.com/problem/first-unique-number-in-data-stream/description) (允许遍历两次)


```python

class Solution:
    """
    @param nums: a continuous stream of numbers
    @param number: a number
    @return: returns the first unique number
    """
    def firstUniqueNumber(self, nums, number):
        counter = {}
        for num in nums:
            counter[num] = counter.get(num, 0) + 1
            if num == number:
                break
        else:
            return -1
            
        for num in nums:
            if counter[num] == 1:
                return num
            if num == number:
                break

        return -1


```


### Heap 堆

支持操作: O(log N) Add / O(log N) Remove / O(1) Min or Max

python: heapq, java: PriorityQueue

构建一个Heap (Heapify) 的时间复杂度是 O(log N)

遍历一个Heap的时间复杂度（从小到大）的时间复杂度是 O(N Log N), 不断pop堆顶，不断构造堆。


**例题 1** [LeetCode-264 Ugly Number II](https://leetcode.com/problems/ugly-number-ii/)

虽然Heap不是最优解，但用heap来做这道题非常简单易懂，O(N log N).

最优解则是（O（N））

```python
### Heap Solution:

class Solution:
    def nthUglyNumber(self, n):
        heap = [1]
        visited = set([1])
        
        val = None
        for i in range(n):
            val = heapq.heappop(heap)
            for factor in [2, 3, 5]:
                if val * factor not in visited:
                    visited.add(val * factor)
                    heapq.heappush(heap, val * factor)
            
        return val**
```


**例题 2** [612 K Closest Points](https://www.lintcode.com/problem/k-closest-points/) 经典题目！！！

可以用quickselect直接转换成kth 问题，然后遍历第二次就可以了。

此处的做法是maintain一个最大堆（利用取负的）方式，当堆的长度大于k时，就把堆顶的最大值踢出去，直到遍历完所有的点。那么剩下的就是最小的k个点在堆里。

```python
"""
Definition for a point.
class Point:
    def __init__(self, a=0, b=0):
        self.x = a
        self.y = b
"""
import heapq

class Solution:
    """
    @param points: a list of points
    @param origin: a point
    @param k: An integer
    @return: the k closest points
    """
    def kClosest(self, points, origin, k):
        # write your code here
        heap = []
        for point in points:
            dist = self.getDistance(point, origin)
            ### 此处取负值，并且用最小堆maintain，堆顶其实对应的就是实际的最大值，这样我们其实用最大堆的概念，不断踢出堆顶，保留的都是小的。
            heapq.heappush(heap, (-dist, -point.x, -point.y))
            ### 如果长度超出k，就把堆顶的“最大”踢出
            if len(heap) > k:
                heapq.heappop(heap)
        ### 剩下的heap就是最近的k个距离和点
        ret = []
        while len(heap) > 0:
            ### pop 出来取负回去以后仍然是最大的数，所以最后ret要reverse
            _, x, y = heapq.heappop(heap)
            ret.append(Point(-x, -y))

        ret.reverse()
        return ret

    def getDistance(self, a, b):
        return (a.x - b.x) ** 2 + (a.y - b.y) ** 

```


相似问题(在线算法，属于stream的时候)：[545. Top k Largest Numbers II](https://www.lintcode.com/problem/top-k-largest-numbers-ii/description)

```python

import heapq

class Solution:
    """
    @param: k: An integer
    """
    def __init__(self, k):
        self.k = k
        self.heap = []
        
    # @param {int} num an integer
    def add(self, num):
        heapq.heappush(self.heap, num)
        if len(self.heap) > self.k:
            heapq.heappop(self.heap)

    # @return {int[]} the top k largest numbers in array
    def topk(self):
        return sorted(self.heap, reverse=True)

```

相似问题：[LeetCode-703 Kth Largest Element in a Stream](https://leetcode.com/problems/kth-largest-element-in-a-stream/)

```python
class KthLargest:

    def __init__(self, k, nums):
        self.minheap = nums
        heapq.heapify(self.minheap)
        self.k = k
        while len(self.minheap) > self.k:
            heapq.heappop(self.minheap)
        
        
        
    def add(self, val):
      
        heapq.heappush(self.minheap, val)
        if len(self.minheap) > self.k:
            heapq.heappop(self.minheap)

        return self.minheap[0]

# Your KthLargest object will be instantiated and called as such:
# obj = KthLargest(k, nums)
# param_1 = obj.add(val)

```
