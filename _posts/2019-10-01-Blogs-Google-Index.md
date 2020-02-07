---
layout: post
title: "Blog building essentials with Jekyll, and getting indexed by google search"
date: 2019-10-01
excerpt: "Some general maintaining notes for my blogs"
tags: [Website]
comments: true
---

## Google Analytics Setup
1. Sign up google analytics. [here](https://support.google.com/analytics/answer/1042508)
2. Go to Admin, create a new account. 
3. Create a new property under that account. 
4. Setup the gtag.js (global site code) tracking code, mustbe in the `<head>`tag of each web page. 
5. Go to data view, now the site is being tracked by google. 
6. For firebase projects utilizing google anlytics already, there is no need to set up again, google analytics is already tracking it.

## Getting google search indexed
1. Go to google search console [here](https://search.google.com/search-console/about)
2. Add new resources, the website.
3. Simply choose use URL prefix, so that no need to verify the DNS manually (should add all prefix for the website, http, https, with www or without www)
4. If the gtag.js has been added to the global, the verify is easy, just go with verify with google analytics.
5. Add sitemap for accelerating the google crawler get your all pages easily
6. There is a very easy way to generate the sitemap under jekyll and I found a very good example 
> [Link](http://www.independent-software.com/generating-a-sitemap-xml-with-jekyll-without-a-plugin.html)
7. I just followed this scheme. 
8. Simply build the website on the server
9. and submit the sitemap.xml url to the google search console
10. It took about 1 day to get all my pages indexed by google
11. Google ignore the priority so need to worry about that. 
12. Make sure for the robot.txt, to welcome the crawlers lol.
```
# Allow crawling of all content
User-agent: *
Disallow:
```



---
Copyright 2019 Muyang Guo