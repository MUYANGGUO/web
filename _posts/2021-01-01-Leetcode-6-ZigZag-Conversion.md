---
layout: leetcode-page
title: "Leetcode 6 ZigZag Conversion - Medium"
date: 2021-01-01
order: 6
excerpt: ""
leetcode: true
tags: [Leetcode]
comments: true
---

<h2> 6. ZigZag Conversion - Medium  </h2>

[Go to Leetcode](https://leetcode.com/problems/zigzag-conversion/)

The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

```
P   A   H   N
A P L S I I G
Y   I   R
```

And then read line by line: "PAHNAPLSIIGYIR"

Write the code that will take a string and make this conversion given a number of rows:

> string convert(string s, int numRows);


<code>
Example 1:
</code>

```
Input: s = "PAYPALISHIRING", numRows = 3
Output: "PAHNAPLSIIGYIR"
```

<code>
Example 2:
</code>

```
Input: s = "PAYPALISHIRING", numRows = 4
Output: "PINALSIGYAHRPI"
Explanation:
P     I    N
A   L S  I G
Y A   H R
P     I
```

<code>
Example 3:
</code>

```
Input: s = "A", numRows = 1
Output: "A"
```

<code>
Solution :
</code>

<code>
Math, Space O(N), Time O(N), each element is visited once.
</code>

``` python
class Solution:
    def convert(self, s: str, numRows: int) -> str:
        # check:
        n = len(s)
        if n <= numRows or numRows == 1:
            return s
        
        res = ''
        sequence = numRows * 2 - 2
        
        for i in range(numRows):
            for j in range(i, n, sequence):
                res += s[j]
                # exclude first row and last row, fill the middle rows
                # cooresponding element index from j with sequence, offset
                if i != 0 and i != numRows - 1 and j + sequence - 2*i < n:
                    res += s[j + sequence - 2*i]    
        return res 
```

