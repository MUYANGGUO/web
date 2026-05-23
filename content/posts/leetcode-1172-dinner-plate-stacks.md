---
title: "LeetCode 1172 Dinner Plate Stacks - Hard"
date: "2021-01-01"
excerpt: "1172. Dinner Plate Stacks -- Hard"
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 1172
comments: true
---

### 1172. Dinner Plate Stacks — Hard

[Open on LeetCode](https://leetcode.com/problems/dinner-plate-stacks/)

## Problem

1172. Dinner Plate Stacks -- Hard

You have an infinite number of stacks arranged in a row and numbered (left to right) from 0, each of the stacks has the same maximum capacity.

Implement the DinnerPlates class:

DinnerPlates(int capacity) Initializes the object with the maximum capacity of the stacks.
void push(int val) Pushes the given positive integer val into the leftmost stack with size less than capacity.
int pop() Returns the value at the top of the rightmost non-empty stack and removes it from that stack, and returns -1 if all stacks are empty.
int popAtStack(int index) Returns the value at the top of the stack with the given index and removes it from that stack, and returns -1 if the stack with that given index is empty.
Example:

Input: 
["DinnerPlates","push","push","push","push","push","popAtStack","push","push","popAtStack","popAtStack","pop","pop","pop","pop","pop"]
[[2],[1],[2],[3],[4],[5],[0],[20],[21],[0],[2],[],[],[],[],[]]
Output: 
[null,null,null,null,null,null,2,null,null,20,21,5,4,3,1,-1]

Explanation: 
DinnerPlates D = DinnerPlates(2);  // Initialize with capacity = 2
D.push(1);
D.push(2);
D.push(3);
D.push(4);
D.push(5);         // The stacks are now:  2  4
                                           1  3  5
                                           ﹈ ﹈ ﹈
D.popAtStack(0);   // Returns 2.  The stacks are now:     4
                                                       1  3  5
                                                       ﹈ ﹈ ﹈
D.push(20);        // The stacks are now: 20  4
                                           1  3  5
                                           ﹈ ﹈ ﹈
D.push(21);        // The stacks are now: 20  4 21
                                           1  3  5
                                           ﹈ ﹈ ﹈
D.popAtStack(0);   // Returns 20.  The stacks are now:     4 21
                                                        1  3  5
                                                        ﹈ ﹈ ﹈
D.popAtStack(2);   // Returns 21.  The stacks are now:     4
                                                        1  3  5
                                                        ﹈ ﹈ ﹈ 
D.pop()            // Returns 5.  The stacks are now:      4
                                                        1  3 
                                                        ﹈ ﹈  
D.pop()            // Returns 4.  The stacks are now:   1  3 
                                                        ﹈ ﹈   
D.pop()            // Returns 3.  The stacks are now:   1 
                                                        ﹈   
D.pop()            // Returns 1.  There are no stacks.
D.pop()            // Returns -1.  There are still no stacks.
 

Constraints:

1 <= capacity <= 20000
1 <= val <= 20000
0 <= index <= 100000
At most 200000 calls will be made to push, pop, and popAtStack.

## Solution

```python
class DinnerPlates:
    # Use a list stacks to save all stacks.
    # Use a heap queue q to find the leftmost available stack.
    # push, O(logN) time
    # pop, amortized O(1) time
    # popAtStack, O(logN) time
    def __init__(self, capacity: int):
        self.c = capacity
        self.q = [] # record the available stack, will use heap for the smallest available stack
        self.stacks = [] # record values of all stack of plates, its last nonempty stack are the rightmost position
    def push(self, val):
        # To push, we need to find the leftmost available position
        # first, let's remove any stacks on the left that are full
        # 1) self.q: if there is still available stack to insert plate
        # 2) self.q[0] < len(self.stacks): the leftmost available index self.q[0] is smaller than the current size of the stacks
        # 3) len(self.stacks[self.q[0]]) == self.c: the stack has reached full capacity
        while self.q and self.q[0] < len(self.stacks) and len(self.stacks[self.q[0]]) == self.c:
            # we remove the filled stack from the queue of available stacks
            heapq.heappop(self.q)
        # now we reach the leftmost available stack to insert
        # if the q is empty, meaning there are no more available stacks
        if not self.q:
            heapq.heappush(self.q, len(self.stacks))# open up a new stack to insert
        # for the newly added stack, add a new stack to self.stacks accordingly
        if self.q[0] == len(self.stacks):
            self.stacks.append([])
        # append the value to the leftmost available stack
        self.stacks[self.q[0]].append(val)
    def pop(self):
        # To pop, we need to find the rightmost nonempty stack
        # 1) stacks is not empty (self.stacks) and
        # 2) the last stack is empty
        while self.stacks and not self.stacks[-1]:
            # we throw away the last empty stack, because we can't pop from it
            self.stacks.pop()
        # now we reach the rightmost nonempty stack
        # we pop the plate from the last nonempty stack of self.stacks by using popAtStack function
        return self.popAtStack(len(self.stacks) - 1)
    def popAtStack(self, index):
        # To pop from an stack of given index, we need to make sure that it is not empty
        # 1) the index for inserting is valid and，
        # 2) the stack of interest is not empty
        if 0 <= index < len(self.stacks) and self.stacks[index]:
            # we add the index into the available stack
            heapq.heappush(self.q, index)
            # take the top plate, pop it and return its value
            return self.stacks[index].pop()
        # otherwise, return -1 because we can't pop any plate
        return -1


# Your DinnerPlates object will be instantiated and called as such:
# obj = DinnerPlates(capacity)
# obj.push(val)
# param_2 = obj.pop()
# param_3 = obj.popAtStack(index)
```
