---
title: "LintCode 560 Friendship Service - Easy"
date: "2021-01-01"
excerpt: 560. Friendship Service
kind: leetcode
tags:
  - LintCode
  - Easy
  - Python
order: 560
comments: true
---

### 560. Friendship Service — Easy

[Open on LintCode](https://www.lintcode.com/problem/560/)

## Problem

560. Friendship Service

Support follow & unfollow, getFollowers, getFollowings.
Note: the results of getfollow() are sorted.

Example
follow(1, 3)
getFollowers(1) // return [3]
getFollowings(3) // return [1]
follow(2, 3)
getFollowings(3) // return [1,2]
unfollow(1, 3)
getFollowings(3) // return [2]

## Solution

```python
class FriendshipService:
    
    def __init__(self):
        # do intialization if necessary
        self.followers = {}
        self.followings = {}

    """
    @param: user_id: An integer
    @return: all followers and sort by user_id
    """
    def getFollowers(self, user_id):
        # write your code here
        if user_id not in self.followers:
            return []
        res = list(self.followers[user_id])
        res.sort()
        return res
   

    """
    @param: user_id: An integer
    @return: all followings and sort by user_id
    """
    def getFollowings(self, user_id):
        # write your code here
        if user_id not in self.followings:
            return []
        res = list(self.followings[user_id])
        res.sort()
        return res
        

    """
    @param: from_user_id: An integer
    @param: to_user_id: An integer
    @return: nothing
    """
    def follow(self, to_user_id, from_user_id):
        # write your code here
        # add to following list
        if from_user_id not in self.followings:
            self.followings[from_user_id] = set()
       
        self.followings[from_user_id].add(to_user_id)
        # add to follower list
        if to_user_id not in self.followers:
            self.followers[to_user_id] = set()

        self.followers[to_user_id].add(from_user_id)
        return
    """
    @param: from_user_id: An integer
    @param: to_user_id: An integer
    @return: nothing
    """
    def unfollow(self, to_user_id, from_user_id):
        # write your code here
        if from_user_id in self.followings:
            if to_user_id in self.followings[from_user_id]:
                self.followings[from_user_id].remove(to_user_id)
        if to_user_id in self.followers:
            if from_user_id in self.followers[to_user_id]:
                self.followers[to_user_id].remove(from_user_id)
        return
```
