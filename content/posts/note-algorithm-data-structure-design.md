---
title: "Algorithm Notes: Data Structure Design"
date: "2021-01-01"
excerpt: ""
kind: post
tags:
  - Algorithm Notes
  - Study Notes
comments: true
---

## 数据结构设计类问题 （Stack， Queue）

关键字：最大栈，最小栈，以及栈和队列的相互实现。

### 例题 1 最小栈  

[LeetCode-155 Min Stack](https://leetcode.com/problems/min-stack/)

设计一个栈，支持 O(1), push， pop， min 和堆的区别是什么？

区别在于pop操作：在堆里，其实是pop min， 但是栈里面，并不是pop的min 而是栈顶的元素。

这题的思路应该是用两个栈来实现，非常巧妙，一个记录数字，一个记录当前最小值。

    push（1） push（2） push（3） push (-1)
    stack = [1 2 3 -1]
    minStack = [1 1 1 -1]

解法：
```python
class MinStack:

    def __init__(self):
        """
        initialize your data structure here.
        """
        self.stack = []
        self.min_stack = []

    def push(self, x):
        self.stack.append(x)
        if not self.min_stack or self.min_stack[-1] >= x:
            self.min_stack.append(x)

    def pop(self):
        number = self.stack.pop()
        if number == self.min_stack[-1]:
            self.min_stack.pop()
        return number
        

    def top(self):
        return self.stack[-1]

    def getMin(self):
        return self.min_stack[-1]
    

# Your MinStack object will be instantiated and called as such:
# obj = MinStack()
# obj.push(x)
# obj.pop()
# param_3 = obj.top()
# param_4 = obj.getMin()

```

### 例题 2 最大栈  

[LeetCode-716 Max Stack](https://leetcode.com/problems/max-stack/)

实现 push， pop， top， peekMax， popMax

这里popMax 的存在，使得时间复杂度不可能为O(1)。注意，最小栈那一题不要求popMin，只是peekMin。

一种暴力解法可以和最小栈方式相同，但是对popMax操作时，要连续pop max之后的很多元素，pop完Max以后再复原，需要用到一个buffer来储存pop的点。这种解法的popMax可以达到O(N)的级别。比如 [5,4,3,2,1], popMax(), 先要把1 2 3 4 pop出来，才能到 5， 然后还要把4 3 2 1 再放回去。

暴力解法：

```python
class MaxStack:
    
    def __init__(self):
        # do intialization if necessary
        self.stack = []
        self.max_stack = []

    """
    @param: number: An integer
    @return: nothing
    """
    def push(self, x):
        # write your code here
        self.stack.append(x)
        if not self.max_stack:
            self.max_stack.append(x)
        
        number = max(self.max_stack[-1], x)
        self.max_stack.append(number)

    """
    @return: An integer
    """
    def pop(self):
        # write your code here
        self.max_stack.pop()
        return self.stack.pop()

    """
    @return: An integer
    """
    def top(self):
        # write your code here
        return self.stack[-1]
    """
    @return: An integer
    """
    def peekMax(self):
        # write your code here
        return self.max_stack[-1]
    """
    @return: An integer
    """
    ### 这里记住要用我们之前写的类pop来操作，因为也会把max_stack里的相应的pop掉，不能只pop stack里，不管max_stac
    def popMax(self):
        # write your code here
        ### 暴力解法，使用buffer来pop，pushback找到max然后pop
        max_num = self.peekMax()
        buffer_stack = []
        ### 把max_num 到栈顶的数全pop出来放进buffer
        while self.top() != max_num:
            buffer_stack.append(self.pop())
        ### pop出Max
        self.pop()
        ### 再把之前放进buffer里的依次还原回去，这样只有max被pop了出
        while buffer_stack:
            restore_num = buffer_stack.pop()
            self.push(restore_num)
        
        return max_num
```

更快的方法： 使用 heap + stack + Hashset结合的方法。

    用Hashset的作用是标记被pop和popMax的那些数。
    用heap的作用是为了快速找到大的数。
    用stack的作用是为了找到位置上最大的数。

如何处理重复的数字？

利用二元组并定义一个primary key给每一个数，key是id，只会+1递增。

使用 heap + stack + Hashset结合的方法 是soft delete思路的实现。标记但不急于删除，而stack和heap各司其职，根据hashset的标记来进行操作和清理。

这样优化：达到push O(logN) ,pop O(1), top O(1), popMax O(logN), peekMax O(logN) 的时间复杂度。

```python
class MaxStack:

    def __init__(self):
        """
        initialize your data structure here.
        """
        self.heap = []
        self.stack = []
        self.popped_set = set()
        self.id = 0

    def push(self, x):
        ### 利用最大堆
        item = (-x, -self.id)
        self.stack.append(item)
        heapq.heappush(self.heap, item)
        self.id += 1
        
    ### 总的来说：这道题的思路是运用了soft delete的思路。
    ### heap和stack各自保存了一组元素，hashset标记哪些元素是被pop的，但实际上只有在进行取值操作的时候，标记的元素才会被删除。对应的pop，top会清理stack，而peekMax和popMax会清理heap。每一次操作将会标记哪些元素被移除。总的来说，heap负责最大值，stack负责栈顶元素，hash负责两类操作soft delete的标记功能。
    def _clear_popped_in_stack(self):
        while self.stack and self.stack[-1] in self.popped_set:
            self.popped_set.remove(self.stack[-1])
            self.stack.pop()
    
    def _clear_popped_in_heap(self):
        while self.heap and self.heap[0] in self.popped_set:
            self.popped_set.remove(self.heap[0])
            heapq.heappop(self.heap)
    
    
    def pop(self):
        self._clear_popped_in_stack()
        item = self.stack.pop()
        self.popped_set.add(item)
        return -item[0]
        

    def top(self):
        self._clear_popped_in_stack()
        item = self.stack[-1]
        return -item[0]

    def peekMax(self):
        self._clear_popped_in_heap()
        item = self.heap[0]
        return -item[0]

    def popMax(self):
        self._clear_popped_in_heap()
        item = heapq.heappop(self.heap)
        self.popped_set.add(item)
        return -item[0]


# Your MaxStack object will be instantiated and called as such:
# obj = MaxStack()
# obj.push(x)
# param_2 = obj.pop()
# param_3 = obj.top()
# param_4 = obj.peekMax()
# param_5 = obj.popMax()

```

### 例题 3 用两个栈实现一个队列

[40. Implement Queue by Two Stacks](https://www.lintcode.com/problem/implement-queue-by-two-stacks/description)

解题思路

先考虑只有一个栈的时候，由于栈的先入后出特性FILO，栈中的元素的顺序是反的，我们无法直接访问栈底的元素。但是当把1号栈中所有元素依次弹出并压入到2号栈中，2号栈顶的元素就变成了原来1 号栈的栈底，即正序。所以我们要提取元素时，只需从2号栈提取即可。

但是由于2号栈中栈顶元素是最先加入队列的元素，所以只有当2号栈为空时，才能将1号栈中所有元素加入到2号栈中。

举例说明：

首先我们有一个主要栈stack1：[1,2,3) ，以下所有栈的表示方式中，圆括号 ')' 均为栈顶。 那么stack1的出栈顺序为3-2-1，其中 1 为我们要找到的元素，也就是队首。

我们需要借助一个辅助栈stack2：[)，将stack1中的元素依次放到stack2中：stack2 [3,2,1)。这时我们发现stack2的栈顶就是我们要找的元素，弹出即可。

此时我们再向主要栈stack1中压入 4 和 5。两个栈状态：stack1 [4,5) 、stack2 [3,2)。

现在我们需要队首的话，应该先弹出辅助栈stack2的栈顶。

如果此时辅助栈空，我们就要执行之前转移的操作，将stack1的所有元素压入stack2，然后弹出stack2的栈顶即可。

代码思路

定义move()，操作是将元素从1号栈转移到2号栈。当要提取元素，且2号栈为空时，调用move()。

复杂度分析

时间复杂度

每个元素最多会别push，pop，move一次，每个操作的均摊时间复杂度为O(1)。

空间复杂度

假设一共操作了N次push，空间复杂度为O(N)。

```python
class MyQueue:
    
    def __init__(self):
        self.stack1 = []
        self.stack2 = []
    """
    @param: element: An integer
    @return: nothing
    """
    def push(self, element):
        self.stack1.append(element)
    """
    @return: An integer
    """
    def pop(self):
        if len(self.stack2) == 0:
            self.move()
        return self.stack2.pop()
    """
    @return: An integer
    """
    def top(self):
        if len(self.stack2) == 0:
            self.move()
        return self.stack2[-1]
    
    # 从1号栈转移到2号栈
    def move(self):
        while len(self.stack1) > 0:
            self.stack2.append(self.stack1.pop())

```

[LeetCode-232 Implement Queue Using Stacks](https://leetcode.com/problems/implement-queue-using-stacks/)

```python
class MyQueue:

    def __init__(self):
        """
        Initialize your data structure here.
        """
        self.stack_normal = []
        self.stack_reverse = []
        

    def push(self, x):
        """
        Push element x to the back of queue.
        """
        self.stack_normal.append(x)
        

    def pop(self):
        """
        Removes the element from in front of queue and returns that element.
        """
        ### here we need to pop 栈底 而不是顶， 因为在模仿queue
        ### 把normal顺序的 stack_normal 把每个元素从栈顶pop依次压入 stack_reverse, 这样就颠倒了栈的顺序，pop stack_reverse 就是栈底。
        if not self.stack_reverse:
            self.move()
        return self.stack_reverse.pop()
            
    def move(self): ### 自己加的
        while self.stack_normal:
            self.stack_reverse.append(self.stack_normal.pop())
        

    def peek(self):
        """
        Get the front element.
        """
        if not self.stack_reverse:
            return self.stack_normal[0]
        return self.stack_reverse[-1]
        

    def empty(self):
        """
        Returns whether the queue is empty.
        """
        if self.stack_normal or self.stack_reverse:
            return False
        return True


# Your MyQueue object will be instantiated and called as such:
# obj = MyQueue()
# obj.push(x)
# param_2 = obj.pop()
# param_3 = obj.peek()
# param_4 = obj.empty()

```

### 例题 4 用两个队列实现一个栈

[494 Implement Stack by Two Queues](https://www.lintcode.com/problem/implement-stack-by-two-queues/description)

[LeetCode-225 Implement Stack Using Queues](https://leetcode.com/problems/implement-stack-using-queues/)

这道题和用两个栈实现一个队列的问题思路相似，但是有很大不同。不同之处在于，栈move栈可以颠倒顺序，但是队列move队列顺序不变，所以当初始队列没有元素的时候，需要彼此交换回来，保持第一个队列是可操作的。


解题思路

队列是一种先进先出FIFO的数据结构，而栈是一种先进后出FILO的数据结构。根据队列的结构，如果我们想用队列取到队列最后一个元素，就必须将前n-1个弹出，那么就需要另一个队列来暂时存放弹出的元素，同时第二个队列还是保持入队的顺序的。当第一个队列变空后，栈顶元素在第二个队列，两个队列的地位刚好转换了一下，可以用上面同样的方法处理。

代码思路

建2个队列，q1和q2。

push时都从q1进入。

如果q1为空时，栈顶元素变到了q2里，交换两个队列。

需要pop和top时，将q1的队首出队，放入q2中，直到只剩1个元素，就是栈顶元素。

复杂度分析

时间复杂度

入栈的复杂度为O(1)。

出栈时，因为要转移队列间的元素，复杂度为O(n)。

空间复杂度

空间使用取决于栈中元素最多时的个数，空间复杂度为O(n)。

```python
class MyStack:

    def __init__(self):
        """
        Initialize your data structure here.
        """
        self.queue_normal = collections.deque()
        self.queue_reverse = collections.deque()

    def push(self, x):
        """
        Push element x onto stack.
        """
        self.queue_normal.append(x)        

    def pop(self):
        """
        Removes the element on top of the stack and returns that element.
        """
        # 如果queue_normal为空，代表栈顶在queue_reverse，交换
        if not self.queue_normal:
            self.queue_normal, self.queue_reverse = self.queue_reverse, self.queue_normal
        # 将queue_normal前n-1个放入queue_reverse，弹出最后的元素
        while len(self.queue_normal) > 1:
            self.queue_reverse.append(self.queue_normal.popleft())
        return self.queue_normal.popleft()
        

    def top(self):
        """
        Get the top element.
        """
        # 如果queue_normal为空，代表栈顶在queue_reverse，交换
        if not self.queue_normal:
            self.queue_normal, self.queue_reverse = self.queue_reverse, self.queue_normal
        # 将queue1前n-1个放入queue2，获得最后的元素
        while len(self.queue_normal) > 1:
            self.queue_reverse.append(self.queue_normal.popleft())
        return self.queue_normal[0]
        

    def empty(self):
        """
        Returns whether the stack is empty.
        """
        return not self.queue_normal and not self.queue_reverse

# Your MyStack object will be instantiated and called as such:
# obj = MyStack()
# obj.push(x)
# param_2 = obj.pop()
# param_3 = obj.top()
# param_4 = obj.empty()

```

### 补充习题 1. 利用队列来实现sliding window的在线算法：

[346. Moving Average from Data Stream](https://leetcode.com/problems/moving-average-from-data-stream/)

```python
class MovingAverage:

    def __init__(self, size):
        """
        Initialize your data structure here.
        """
        self.sum = 0
        self.max_size = size
        self.queue = collections.deque()
        

    def next(self, val):
        self.sum += val
        self.queue.append(val)
        
        if len(self.queue) > self.max_size:
            self.sum = self.sum - self.queue.popleft()
        
        return self.sum / len(self.queue)

# Your MovingAverage object will be instantiated and called as such:
# obj = MovingAverage(size)
# param_1 = obj.next(val)

```

[544. Top k Largest Numbers](https://www.lintcode.com/problem/top-k-largest-numbers/description)

最大堆。

```python
import heapq
class Solution:
    """
    @param nums: an integer array
    @param k: An integer
    @return: the top k largest numbers in array
    """
    
    def topk(self, nums, k):
        # write your code here        # Write your code here
        heapq.heapify(nums)
        topk = heapq.nlargest(k, nums)
        return topk
```
