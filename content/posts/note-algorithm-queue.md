---
title: "Algorithm Notes: Queue"
date: "2021-01-01"
excerpt: ""
kind: post
tags:
  - Algorithm Notes
  - Study Notes
comments: true
---

## Chapter 4: 队列 Queue

> 补充：
> [492 Implement Queue by Linked List](https://www.lintcode.com/problem/implement-queue-by-linked-list/description)
> 

### 4.1 Queue

什么是队列（Queue）？

队列（queue）是一种采用先进先出（FIFO，first in first out）策略的抽象数据结构。比如生活中排队，总是按照先来的先服务，后来的后服务。队列在数据结构中举足轻重，其在算法中应用广泛，最常用的就是在宽度优先搜索(BFS）中，记录待扩展的节点。

队列内部存储元素的方式，一般有两种，数组（array）和链表（linked list）。两者的最主要区别是：
- 数组对随机访问有较好性能。
- 链表对插入和删除元素有较好性能。

**例题** [492 Implement Queue by Linked List](https://www.lintcode.com/problem/implement-queue-by-linked-list/description)

<p align="center"> <b>1. 会出现假溢出的数组实现队列的解法</b> </p>


在使用数组表示队列时，我们首先要创建一个长度为MAXSIZE的数组作为队列。

因为MAXSIZE是数组的长度，那MAXSIZE-1就是队列的最大下标了。

在队列中，除了用一组地址连续的存储单元依次存储从队首到队尾的元素外，还需要附设两个整型变量head和tail分别指示队首和队尾的位置。

我们主要介绍三个操作：

    - 初始化队列
    - enqueue()向队尾插入元素
    - dequeue()删除并返回队首元素


每次元素入队时，tail向后移动；每次元素出队时，head向后移动。

我们可以将队列视作一个类，通过成员变量数组来表示一组地址连续的存储单元，再定义两个成员变量head和tail，将队列的基本操作定义成类的方法。

（注意：为了将重点放在实现队列上，做了适当简化。示范队列仅支持整数类型，若想实现泛型，可用反射机制和object对象传参；此外，可多做安全检查并抛出异常）

```python
class MyQueue(object):

    def __init__(self):
        # do some intialize if necessary
        self.MAXSIZE = 4
        self.queue = [0] * self.MAXSIZE
        self.head, self.tail = 0, 0

    # @param {int} item an integer
    # @return nothing
    def enqueue(self, item):
        queue = self.queue 

        # 队列满 
        if self.tail == self.MAXSIZE:
            return 

        queue[self.tail] = item 
        self.tail += 1 


    # @return an integer
    def dequeue(self):
        queue = self.queue 

        ## 队列为空
        if self.head == self.tail:
            return -1 

        item = queue[self.head]
        self.head += 1 
        return item 
```
但是大家会发现，如果这样实现队列的话，我们考虑MAXSIZE为4的情况，如果我们采取下面的操作

```python
enqueue(1)
enqueue(2)
enqueue(3)
enqueue(4)
dequeue()
dequeue()
```
结束后数组的状态时[^, ^, 3, 4], head = 2, tail = 4。（'^'表示该位置为空，即当前元素已经出队）

从我们之前的判断来看，tail == MAXSIZE , 当前队列已经满了，不能继续添加元素了，但是实际上我们还可以继续添加元素。因此在使用数组实现队列时，可能会出现空间未有效利用的情况，因此，我们有两种解决方法：

1. 使用链表来实现队列
2. 使用数组来实现循环队列


那么我们就先来看用链表来实现队列的方法：

<p align="center"> <b>2. 避免假溢出的 链表实现队列的解法</b> </p>

用链表实现队列

链表是由多个节点构成的，一个节点由两部分组成:一个是数据域,一个是指针域.

链表分为:单链表(只能是父节点引用子节点),双链表(相邻的节点可相互引用),循环链表(在双链表的基础上,头尾节点可相互引用).
实现链表,就是在链表里加入节点,使用节点的引用域使节点之间形成连接,可相互调用.

链表队列的实现原理:首先定义一个节点类,节点类包含引用域和数据域.然后定义一个链表类,链表类形成节点间的引用关系.

我们主要介绍三个操作：

1. 初始化队列
2. enqueue()向队尾插入元素
3. dequeue()删除并返回队首元素

在队列中，我们只要用两个指针head和tail分别指向链表的头部和尾部即可实现基本队列功能

```python
class Node():
    def __init__(self, _val):
        self.next = None
        self.val = _val

class MyQueue(object):

    def __init__(self):
        # do some intialize if necessary
        self.head, self.tail = None, None

    # @param {int} item an integer
    # @return nothing
    def enqueue(self, item):
        if self.head is None:
            self.head = Node(item)
            self.tail = self.head
        else:
            self.tail.next = Node(item)
            self.tail = self.tail.next

    # @return an integer
    def dequeue(self):
        if self.head is not None:
            item = self.head.val
            self.head = self.head.next
            return item
        return -1
```

可以发现链表可以轻松地避免“假溢出”的问题，因为在每次需要新增元素时，只需要新建一个ListNode就可以了。 当然，我们也可以用循环队列来解决这个问题，接下来我们就来看一下循环队列如何实现队列。

<p align="center"> <b>3. 避免假溢出的 数组实现循环队列的解法</b> </p>

如何自己用数组实现循环队列

队列是一种先进先出的线性表，它只允许在表的一端进行插入，而在另一端删除元素。允许插入的一端称为队尾，允许删除的一端称为队首。但是我们之前也提到了，数组实现的队列会导致“虽然数组没满，但是tail已经指向了数组末尾，返回数组已满，队列溢出的错误信号”，我们称之为“假溢出”。

为充分利用向量空间，克服"假溢出"现象的方法是：将向量空间想象为一个首尾相接的圆环，并称这种向量为循环向量。存储在其中的队列称为循环队列（Circular Queue）。循环队列是把顺序队列首尾相连，把存储队列元素的表从逻辑上看成一个环，成为循环队列。

我们主要介绍三个操作：

初始化循环队列
enqueue()向队尾插入元素
dequeue()删除并返回队首元素
在循环队列中，除了用一组地址连续的存储单元依次存储从队首到队尾的元素外，还需要附设两个整型变量head和tail分别指示队首和队尾的位置。

我们可以将循环队列视作一个类，通过成员变量数组来表示一组地址连续的存储单元，再定义两个成员变量head和tail，将循环队列的基本操作定义成类的方法，循环效果则用“模”运算实现，以此来实现循环队列。

每当tail到达末尾的时候，将tail对MAXSIZE取模，使其回到队首。但是如果这样我们会发现一个问题，队列为空和队列已满的条件都成了tail == head。

为了避免这种无法判断的情况，我们规定当循环队列只剩一个空位的时候，就认为队列已满。这样队列已满的条件就成了 (tail + 1) % MAXSIZE == head。

```python
class MyQueue(object):

    def __init__(self):
        # do some intialize if necessary
        self.SIZE = 100000
        self.queue = [0] * self.SIZE
        self.head, self.tail = 0, 0

    # @param {int} item an integer
    # @return nothing
    # 压入队列
    def enqueue(self, item):
        queue = self.queue 

        # 队列满 
        if (self.tail + 1) % self.SIZE == self.head:
            return 

        queue[self.tail] = item 
        self.tail = (self.tail + 1) % self.SIZE


    # @return an integer
    # 弹出元素
    def dequeue(self):
        queue = self.queue 

        ## 队列为空
        if self.head == self.tail:
            return -1 

        item = queue[self.head]
        self.head = (self.head + 1) % self.SIZE
        return item 
```

#### 关于题目中的队列使用

如果不是题目要求实现一个队列，我们都可以使用变成语言自带的队列数据结构，因为这些题目，面试官并不是想考察你是否能够实现队列，而是想考察其他的算法，如果现场实现队列，时间可能会不够。

比如在Java中我们就可以调用Queue接口来实现队列，给我们的代码带来许多便利。那接口到底是什么呢，我们一起来学习一下吧。

（这部分是Java语言专属的特性，其他语言的同学可以跳过）

接下来我们来学习一下Java的接口（Interface），其他语言的同学可以跳过这一部分。

Java接口(Interface)是一系列方法的声明，是一些方法特征的集合，一个接口只有方法的特征没有方法的实现，因此这些方法可以在不同的地方被不同的类实现，而这些实现可以具有不同的行为。打一个比方，接口好比一个戏中的角色，这个角色有一些特定的属性和操作，然后实现接口的类就好比扮演这个角色的人，一个角色可以由不同的人来扮演，而不同的演员之间除了扮演一个共同的角色之外，并不要求其它的共同之处。

接下来我们来介绍几个面试常用的Interface。
1. **Set**
   
Set注重独一无二,该体系集合可以知道某物是否已经存在于集合中,不会存储重复的元素。Set的实现类在面试中常用的是：HashSet 与 TreeSet

HashSet

- 无重复数据
- 可以有空数据
- 数据无序

TreeSet

- 无重复数据
- 不能有空数据
- 数据有序

1. **Map**
   
Map用于存储具有映射关系的数据。Map中存了两组数据(key与value),它们都可以是任何引用类型的数据，key不能重复，我们可以通过key取到对应的value。Map的实现类在面试中常用是：HashMap 和 TreeMap.

HashMap
- key 无重复，value 允许重复
- 允许 key 和 value 为空
- 数据无序

3. **List**

一个 List 是一个元素有序的、可以重复(这一点与Set和Map不同)、可以为 null 的集合，List的实现类在面试中常用是：LinkedList 和 ArrayList

- LinkedList
  - 基于链表实现
  
- ArrayList
  - 基于动态数组实现
  
LinkedList 与 ArrayList 对比：

对于随机访问get和set，ArrayList绝对优于LinkedList，因为LinkedList要移动指针

对于新增和删除操作add和remove，在已经得到了需要新增和删除的元素位置的前提下，LinkedList可以在O(1)的时间内删除和增加元素，而ArrayList需要移动增加或删除元素之后的所有元素的位置，时间复杂度是O(n)的，因此LinkedList优势较大。

4. **Queue**

队列是一种比较重要的数据结构，它支持FIFO(First in First out)，即尾部添加、头部删除（先进队列的元素先出队列），跟我们生活中的排队类似。

PriorityQueue
   - 基于堆(heap)实现
   - 非FIFO(最先出队列的是优先级最高的元素)

HashMap
   - 基于链表实现
   - FIFO
