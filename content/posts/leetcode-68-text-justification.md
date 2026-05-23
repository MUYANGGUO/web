---
title: "LeetCode 68 Text Justification - Hard"
date: "2021-01-01"
excerpt: "68. Text Justification -- Hard"
kind: leetcode
tags:
  - LeetCode
  - Hard
  - Python
order: 68
comments: true
---

### 68. Text Justification — Hard

[Open on LeetCode](https://leetcode.com/problems/text-justification/)

## Problem

68. Text Justification -- Hard

Given an array of words and a width maxWidth, format the text such that each line has exactly maxWidth characters and is fully (left and right) justified.

You should pack your words in a greedy approach; that is, pack as many words as you can in each line. Pad extra spaces ' ' when necessary so that each line has exactly maxWidth characters.

Extra spaces between words should be distributed as evenly as possible. If the number of spaces on a line do not divide evenly between words, the empty slots on the left will be assigned more spaces than the slots on the right.

For the last line of text, it should be left justified and no extra space is inserted between words.

Note:

A word is defined as a character sequence consisting of non-space characters only.
Each word's length is guaranteed to be greater than 0 and not exceed maxWidth.
The input array words contains at least one word.
 

Example 1:

Input: words = ["This", "is", "an", "example", "of", "text", "justification."], maxWidth = 16
Output:
[
   "This    is    an",
   "example  of text",
   "justification.  "
]

Example 2:

Input: words = ["What","must","be","acknowledgment","shall","be"], maxWidth = 16
Output:
[
  "What   must   be",
  "acknowledgment  ",
  "shall be        "
]
Explanation: Note that the last line is "shall be    " instead of "shall     be", because the last line must be left-justified instead of fully-justified.
Note that the second line is also left-justified becase it contains only one word.

Example 3:

Input: words = ["Science","is","what","we","understand","well","enough","to","explain","to","a","computer.","Art","is","everything","else","we","do"], maxWidth = 20
Output:
[
  "Science  is  what we",
  "understand      well",
  "enough to explain to",
  "a  computer.  Art is",
  "everything  else  we",
  "do                  "
]
 

Constraints:

1 <= words.length <= 300
1 <= words[i].length <= 20
words[i] consists of only English letters and symbols.
1 <= maxWidth <= 100
words[i].length <= maxWidth

## Solution

```python
class Solution:
    def fullJustify(self, words: List[str], maxWidth: int) -> List[str]:
        if not words:
            return []

        line = []  # words in the current line
        line_chcnt = 0
        result = []

        for word in words:
            if line_chcnt + len(line) + len(word) <= maxWidth:
                line += [word]
                line_chcnt += len(word)
            else:
                # line if full
                modline = self.format_line(line, line_chcnt, maxWidth)
                result += [modline]
                line = [word]
                line_chcnt = len(word)

        # if line has words here, that is the last line that hasnt been formatted yet
        if line:
            modline = self.format_last_line(line, maxWidth)
            result += [modline]
        return result

    def format_last_line(self, line, maxWidth):
        linestr = " ".join(line)
        linestr += " " * (maxWidth - len(linestr))
        return linestr

    def format_line(self, line, chcnt, maxWidth):
        if len(line) == 1:
            return self.format_last_line(line, maxWidth)
        edgecnt = len(line) - 1
        totalsp = maxWidth - chcnt
        minsp = totalsp // edgecnt
        extrasp = totalsp % edgecnt
        linestr = ""
        for edgeidx in range(edgecnt):
            extra = " " if edgeidx < extrasp else ""
            linestr += line[edgeidx] + " " * minsp + extra
        linestr += line[-1]
        return linestr
```
