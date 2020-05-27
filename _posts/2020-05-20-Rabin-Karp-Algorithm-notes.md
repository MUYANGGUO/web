---
layout: post
title: "Rabin-Karp Algorithm - A rolling hash method to locate substring"
date: 2020-05-20
excerpt: "A very useful concept for string-searhing problem. "
tags: [python]
comments: true
---

> This note is a learning note for the leetcode problem 28 - Implement strStr(). 

## 01 What is strstr() used for?

strstr() is a library function of "<cstring> (string.h)" in C++. 

strstr() is a **searching** function that **locates the substring**. 

```cpp
const char * strstr ( const char * str1, const char * str2 );
      char * strstr (       char * str1, const char * str2 );

```
str1 : C string to be scanned.

str2 : C string containing the sequence of characters to match.

Return Value: A pointer to the first occurrence in str1 of the entire sequence of characters specified in str2, or a null pointer if the sequence is not present in str1.

## 02 LeetCode Problem: 28 Implement strStr()

Implement strStr().

Return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.

    Example 1:

    Input: haystack = "hello", needle = "ll"

    Output: 2

    Example 2:

    Input: haystack = "aaaaa", needle = "bba"

    Output: -1

Clarification:

What should we return when needle is an empty string? This is a great question to ask during an interview.

For the purpose of this problem, we will return 0 when needle is an empty string. This is consistent to C's strstr() and Java's indexOf().


## 03 Naive Solution: O(mn) time complexity
``` python
class Solution:
    def strStr(self, haystack: str, needle: str) -> int:
        m, n = len(needle), len(haystack)

        for start in range(n - m + 1): # O(n)
            if haystack[start: start + m] == needle: # O(m)
                return start
        return -1
```

## 04 Rabin-Karp Method: O(n + m) time complexity

Compared to the naive solution, it takes O(n) to scan the source str1 in the outer for loop, as the iteration advance, it will perform a check procedure, to scan the slice substring of length m, to compare with all the elements in target each time. Which takes O(nm) time complexity. 

We can optimize the O(m) procedure to O(1), so that the overall time complexity is O(n).

Realizing that in this "check" procedure, we check the whole string slice each time, however, from last iteration to current iteration, the string slice really just changed in this pattern, discard the head, and add a tail. There are elements in the middle that has been checked.

For example,

    source : abcde

    target : bcd

    iteration 0: 
    - abc
    - bcd
    - False!
    
    iteration 1:
    - bcd
    - bcd
    - found!

abc --> bcd is "abc" remove head "a" and add tail "d". 
And "bc" was checked twice in the whole process. And optimization can be performed for this step.

### Optimization: Rabin-Karp Way, Rolling Hash method
[Rabin-Karp-Wiki](https://en.wikipedia.org/wiki/Rabin%E2%80%93Karp_algorithm)

> In computer science, the Rabin–Karp algorithm or Karp–Rabin algorithm is a string-searching algorithm created by Richard M. Karp and Michael O. Rabin (1987) that uses hashing to find an exact match of a pattern string in a text. It uses a rolling hash to quickly filter out positions of the text that cannot match the pattern, and then checks for a match at the remaining positions. Generalizations of the same idea can be used to find more than one match of a single pattern, or to find matches for more than one pattern.

### 1. Hash a string to int:

Example:

    'abcde' = (a x 31^4 + b x 31^3 + c x 31^2 + d x 31^1  + e x 31^0 ) % (Large Number, 1000000 etc. )

    31 is an often used match number for hashing, to avoid the result int too large, we need to mod the result with a large number.
    
    The reason we should use a large number, is to avoid collision of hashing. 
     
### 2. Rolling Hash:

Example:

    source: 'abcde'

    target: 'bcd'

    1. get 'abc' hash = (a x 31^2 + b x 31^1 + c x 31^0) % 1000000, denote X
    2. compare with 'bcd' hash value, not match then advance the iteration
    3. get 'bcd' hash:
       - from 'abc' hash value X, use mathematic way to calculate 'abcd' and deduct 'a' in hash value:
       - 'abcd' = ( X x 31 + d ) % 1000000, then
       - 'bcd' = ([( X x 31 + d ) % 1000000] - a x 31^3 % 1000000) ， if negative, just add 1000000, to make it like a circle. 
       - matched with the target hash value,
       - this step is O(1), instead of O(m)

### 3. Collision Check:

**The algorithm only works if perfect hash can be done,**

**Thus, we need to check the actual string when hash value matched with the target!**

So we also need O(m) to make sure the found result correct. So total time compelxity can be reduced to O(n + m) as we assume the collision happened rarely if the hashing function is designed well. 

## 05 Solution Collections:
<div  style="overflow:scroll; height: 500px;">
{% highlight python %}
class Solution:
    def strStr(self, haystack: str, needle: str) -> int:
        if haystack == needle:
            return 0
        
        n = len(needle)
        out = -1
        for i in range(len(haystack)-n+1):

            if haystack[i:i+n] == needle:
                return i
        
        return out
            

class Solution:
    def strStr(self, haystack: str, needle: str) -> int:
        if haystack == needle:
            return 0
        

        for i in range(len(haystack)-len(needle)+1):
            for j in range(len(needle)):
                if haystack[i+j] != needle[j]:
                    break
            else:
                return i

            ### 此处运用了 for else 这个小技巧 处理。for 里面的 break 如果被执行了，就不会执行else了。 如果 没被执行，则会进入else。
            ### 这里注意 for 和 else 是并列的。 
        
        return -1
            
### 以上两种方法是O(n^2)。 此题有O（n）的解法。 KMP 算法。 还有一个更简单的算法 Rabin-Karp 算法。

### Rabin-Karp 推荐算法
class Solution:
    """
    @param source: 
    @param target: 
    @return: return the index
    """
    def strStr(self, source, target):
        # Write your code here
        # Rabin-Karp 算法
        
        # 利用hash function， hash table
        # 将 str 对应到 整数
        
        # 一般采用静置转换，经验上31这个数是base
        
        # cprner cases：
        if source == None or target == None: return -1
        if len(target) == 0: return 0

        
        #31 ^ m
        base = 1000000
        power = 1
        
        for i in range(len(target)):
            power = (power * 31) % base
            
        target_code = 0
        for i in range(len(target)):
            target_code = (target_code * 31 + ord(target[i])) % base
            
        hash_code = 0
        for i in range(len(source)):
            # abc + d
            hash_code = (hash_code * 31 + ord(source[i])) % base
            if i < len(target) - 1:
                continue
            # abcd - a
            if i >= len(target):
                hash_code = hash_code - (ord(source[i-len(target)]) * power) % base
                if hash_code < 0:
                    # 做循环处理
                    hash_code += base
                    
            ## double check, avoid the collision
            if hash_code == target_code:
                if source[i - len(target) + 1: i + 1] == target:
                    return i - len(target) + 1
                    
        return -1

{% endhighlight %}
</div>

