---
title: "LintCode 1331 English Software - Easy"
date: "2021-01-01"
excerpt: 1331. English Software
kind: leetcode
tags:
  - LintCode
  - Easy
  - Python
order: 1331
comments: true
---

### 1331. English Software — Easy

[Open on LintCode](https://www.lintcode.com/problem/1331/)

## Problem

1331. English Software

Xiao Lin is a representative of the English class in the class. He wants to develop a software to handle the grades of classmates.
Xiao LIn ’s software has a magical feature that can reflect the position of your grades in the class through a percentage. "Classmates with grades exceeding…%".
Suppose this percentage is p, and s score is tested, then p can be calculated by the following formula:
p = (number of people whose score does not exceed s-1) / total number of students in the class * 100%
Please design this software

Example
Example 1:

Input: score= [100,98,87], ask=[1,2,3]
Output: [66,33,0] 
Explanation:
The first person scored 100 points, more than 66% of students
Notice
The score array is given to represent the i-th person to take score[i] points
Give the ask array to represent the score of the i-th individual
Each query will output the corresponding score percentage, no need to output a percent sign
The answer is rounded down（To avoid loss of precision, please calculate multiplication first）

## Solution

```python
### PrefixSum Count Sort 的做法:

class Solution:
    """
    @param score: Each student's grades
    @param ask: A series of inquiries
    @return: Find the percentage of each question asked
    """
    def englishSoftware(self, score, ask):
        # write your code here
        scores_bucket = [0] * (max(score) + 1)
        prefixsum = [0]* (len(scores_bucket) + 1)
        for student_score in score:
            scores_bucket[student_score] += 1
        for idx in range(len(scores_bucket)):
            prefixsum[idx] = prefixsum[idx - 1] + scores_bucket[idx]
        res = []
        for student in ask:
            check = score[student - 1]
            res.append(math.floor(float((prefixsum[check] - 1))*100 / len(score)) )
        return res
```
