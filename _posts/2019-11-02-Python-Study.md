---
layout: post
title: "Python Notes"
date: 2019-11-02
excerpt: "Some python reminder notes, will update randomly"
tags: [Python]
comments: true
---
## 1. Some general data structure high-level explanation

### Lists

In Python, lists act as dynamic arrays, indexing and assigning to an index position, are operations both designed to be run in constant time, O(1);

built-in range() function is most efficient. 


### Dictionaries:

Dictionaries are an implementation of a hash table. operate with keys and values. getting and setting items in dict is O(1);

---

### Arrays Sequences:

Python has 3 main sequence classes:

List: [1,2,3]

Tuple: (1,2,3)

String: '123'

All support indexing (e.g. t[0] = 1 );

---

#### Low-level Array

Memory of a computer stored in bits/

typical unit is byte/, which is 8 bits/

each byte associated with unite memory address

E.g. Byte#2144 etc. to refer the stored data

> Computer hadware is designed in theory that any byte of the main memory can be efficiently accessed. Main memory performs as random access memory (RAM); 

> Individual byte of memory can be stored or retrieved in O(1) time;

> Python internally represents each Unicode character with 16 bits (i.e. 2 bytes)
    For example: 'SAMPLE' will be stored in 12 consecutive bytes of memory;

#### Referential Arrays 

A signle list instance may include multiple references to the same object as elements of the list. Single object can be an element of two of more lists. When computing the slice of a list, the result is a new list instance. New list has references to the same elements that are in the original list. So it is not creating new object but referencing the original object.
If changing the element of a list, it is simply changing the referencing pointer to another object. 

E.g 

> counters = [0]*8 

All eight cells reference to the same object 0 ;

> counters[2] +=1

Does not technically change the value of the existing integer instance, (was 0), it computes a new integer (0+1 = 1), and index 2 refer to the new integer in the list counters. 

---

#### Dynamic Arrays

Don't need to specify how large an array is beforehand. 

A list instance often has greater capacity than current length. If elements keep getting appended, eventually the extra space runs out. 

就像寄居蟹一样，一旦shell需要变大， 就增加size， 直到shell需要再增加。

Then, how large of a new array to create?

Commonly used rule is for the new array to have twice the capcaity of the existing array that has been filled. 


> Some tips for checking the python created list size (full capacity, how python grab the memory when list is created or updated)

```
import sys

data = a list 
size = sys.getsizeof(data)

```


#### Amortization 

Amortized Analysis of a dynamic array, and why it is quite efficient: 

[check the explanation here](http://www.cs.cmu.edu/afs/cs/academic/class/15451-s10/www/lectures/lect0203.pdf)

<div class="footer">
        Copyright &copy 2019 Muyang Guo
</div>


