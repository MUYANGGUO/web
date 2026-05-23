---
title: "LeetCode 535 Encode And Decode Tiny URL - Medium"
date: "2021-01-01"
excerpt: 535. Encode and Decode TinyURL
kind: leetcode
tags:
  - LeetCode
  - Medium
  - Python
order: 535
comments: true
---

### 535. Encode And Decode Tiny URL — Medium

[Open on LeetCode](https://leetcode.com/problems/encode-and-decode-tiny-url/)

## Problem

535. Encode and Decode TinyURL

Note: This is a companion problem to the System Design problem: Design TinyURL.
TinyURL is a URL shortening service where you enter a URL such as https://leetcode.com/problems/design-tinyurl and it returns a short URL such as http://tinyurl.com/4e9iAk.

Design the encode and decode methods for the TinyURL service. There is no restriction on how your encode/decode algorithm should work. You just need to ensure that a URL can be encoded to a tiny URL and the tiny URL can be decoded to the original URL.

## Solution

```python
import random

class Codec:

    chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    longURLs = {}
    shortURLs = {}
        

    def encode(self, longUrl: str):
        """Encodes a URL to a shortened URL.
        """
        if longUrl in self.longURLs:
            return longURLs[longRrl]
        
        short = self.getShort(longUrl)
        while short in self.shortURLs:
            short = self.getShort(longUrl)
        self.longURLs[longUrl] = short
        self.shortURLs[short] = longUrl
        return short
        

    def decode(self, shortUrl: str):
        """Decodes a shortened URL to its original URL.
        """
        if shortUrl in self.shortURLs:
            return self.shortURLs[shortUrl]
        return None
    
    def getShort(self, url):
        res = ''
        for _ in range(6):
            res += random.choice(self.chars)
        return 'http://tiny.url/' + res

# Your Codec object will be instantiated and called as such:
# codec = Codec()
# codec.decode(codec.encode(url))
```
