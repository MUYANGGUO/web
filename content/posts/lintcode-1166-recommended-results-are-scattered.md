---
title: "LintCode 1166 Recommended Results Are Scattered - Easy"
date: "2021-01-01"
excerpt: 1166. Recommended Results are Scattered
kind: leetcode
tags:
  - LintCode
  - Easy
  - Python
order: 1166
comments: true
---

### 1166. Recommended Results Are Scattered — Easy

[Open on LintCode](https://www.lintcode.com/problem/1166/)

## Problem

1166. Recommended Results are Scattered

Description

A recommendation system will recommend a list of video and picture elements. x is the element number, V_x is the video, and P_x is the image.Now you need to shatter these elements, and the rules are as follows:

The position of the first [picture P] remains unchanged;
Starting from the first [picture P], there is exactly 1 [picture P] in every n element;
The relative order between the pictures remains unchanged;
Elements that do not satisfy the shatter rule need to be discarded. Give you the list of elements and the value of n, please return the list of elements after scattering.

1 ≤ number of elements ≤10000
2 ≤ n ≤ number of elements
Make sure there's at least 1 [picture P] in the elements.

Have you met this question in a real interview?  
Example
Example 1:
Input sample:
elements=["V_0", "V_1", "V_2", "P_3", "P_4", "P_5", "V_6", "P_7", "V_8", "V_9"] , n=3
Output sample:
["V_0", "V_1", "V_2", "P_3", "V_6", "V_8", "P_4", "V_9"]
Sample explanation:
P_3 needs to appear in the 3rd bit starting from 0, since there is exactly 1 P in every 3 elements. P_5 and P_7 cannot meet the shatter requirements, so they are deleted.

Example 2:
Input sample:
elements=["V_0", "P_1", "V_2", "V_3", "V_4"] , n=2
Output sample:
["V_0", "P_1", "V_2"]
Sample explanation:
P_1 needs to appear in the first bit starting from 0, since there is exactly 1 P in every 2 elements. V_3 and V_4 cannot meet the shatter requirements, so they are deleted.

## Solution

```python
用两个队列来做模拟法：

import queue

class Solution:
    """
    @param elements: A list of recommended elements.
    @param n: [picture P] can appear at most 1 in every n
    @return: Return the scattered result.
    """

    def scatter(self, elements, n):
        # write your code here
      # write your code here
        #  定义双队列，分别存储图片元素 P, 视频元素 V
        queueP = queue.Queue()
        queueV = queue.Queue()

        #  第 1 个图片 P 出现的位置
        firstP = -1
        for i in range(0, len(elements)):
            if elements[i][0] == 'P':
                #  第 1 个图片 P
                if firstP == -1:
                    firstP = i
                #  该元素加入 P 队列
                queueP.put(elements[i])
            else:
                #  该元素加入 V 队列
                queueV.put(elements[i])

        # 定义打散后的结果序列
        result = []

        # 将出现第 1 个 P 前的 V 元素存入结果序列
        while firstP > 0:
            firstP -= 1
            result.append(queueV.get())

        while queueP.empty() == False:
            #  每 n 个元素中需要恰好有 1 个 P
            result.append(queueP.get())

            # 辅助变量
            step = n

            # 将 n-1 个 V 元素存入结果序列
            while queueV.empty() == False and step > 1:
                result.append(queueV.get())
                step -= 1

            # 若当前已经无法满足打散要求，直接结束
            if step > 1:
                break

        return result
```
