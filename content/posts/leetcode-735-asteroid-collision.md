---
title: "LeetCode 735 Asteroid Collision - Medium"
date: "2021-01-01"
excerpt: "735. Asteroid Collision -- Medium"
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 735
comments: true
---

### 735. Asteroid Collision — Medium

[Open on LeetCode](https://leetcode.com/problems/asteroid-collision/)

## Problem

735. Asteroid Collision -- Medium

We are given an array asteroids of integers representing asteroids in a row.

For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed.

Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.

 

Example 1:

Input: asteroids = [5,10,-5]
Output: [5,10]
Explanation: The 10 and -5 collide resulting in 10.  The 5 and 10 never collide.
Example 2:

Input: asteroids = [8,-8]
Output: []
Explanation: The 8 and -8 collide exploding each other.
Example 3:

Input: asteroids = [10,2,-5]
Output: [10]
Explanation: The 2 and -5 collide resulting in -5. The 10 and -5 collide resulting in 10.
Example 4:

Input: asteroids = [-2,-1,1,2]
Output: [-2,-1,1,2]
Explanation: The -2 and -1 are moving left, while the 1 and 2 are moving right. Asteroids moving the same direction never meet, so no asteroids will meet each other.
 

Constraints:

1 <= asteroids <= 104
-1000 <= asteroids[i] <= 1000
asteroids[i] != 0

## Solution

```python
class Solution:
    def asteroidCollision(self, asteroids: List[int]) -> List[int]:
        #最后的答案序列或者是全正, 或者是全负, 或者是左负右正.
        #借用栈遍历一次数组就可以判断出哪些行星会因碰撞而爆炸:
        # 碰到正数直接入栈
        # 碰到负数, 不断将它与栈顶比较, 弹出栈顶直至栈顶为负或者栈为空或者栈顶绝对值不小于当前的数.
        # 如果栈为空或栈顶为负数, 入栈 (此时栈内的负数一定就是最后会保留下来的向左移动的行星)
        # 如果栈顶为正且绝对值大于当前的数, 不再做任何操作
        # 如果栈顶为正且绝对值等于当前的数, 将栈顶弹出
        # 这样遍历一次之后, 从栈底到栈顶就是答案序列.
        ans, i, n= [], 0, len(asteroids)
        while i < n:
            if asteroids[i] > 0:
                ans.append(asteroids[i])
            elif len(ans) == 0 or ans[-1] < 0:
                ans.append(asteroids[i])
            elif ans[-1] <= -asteroids[i]:
                if ans[-1] < -asteroids[i]:
                    i -= 1
                ans.pop()
            i += 1
        return ans
```
