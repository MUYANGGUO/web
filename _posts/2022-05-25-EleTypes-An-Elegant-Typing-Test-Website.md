---
layout: post
title:  "EleTypes.com - An elegant typing test website created with react"
date:   2022-05-25
excerpt: "As a keyboard lover, I love typing. Why don't I create a typing test tool and use my own tool XD"
project: true
tag:
- HTML & CSS
- React
comments: true
---


<figure>
	<a href="https://eletypes.com"><img src="https://raw.githubusercontent.com/gamer-ai/eletype-frontend/main/docs/images/terminalTheme.png"></a>
</figure>


## Eletypes.com is Live:

[www.eletypes.com](https://eletypes.com)

## V1 video demo
[V1 Demo](https://youtu.be/LWRAG05UqUA)

## About this project

I am a topre keyboard lover, I use HHKB and Realforce R2 for my daily coding productivity. 

I am also a fan of customized mechanical keyboards. Day to day, I like typing, and my wpm is about 100+. When I have new keyboard, I often use the famous typing test tool [MonkeyType](www.monkeytype.com) for some typing tests. 

I especially love the website's sleek UI/UX design, and it's typing test rule. Noticing this website is open source, came up with the idea -- that why don't I try to reverse engineering it, and create a simplified version of it but maybe using a different tech stack (just use the create-react-app framework), for fun?

Yep, Let's begin!

<figure>
	<a href="https://eletypes.com"><img src="https://raw.githubusercontent.com/gamer-ai/eletype-frontend/main/docs/images/EletypesThemes.png"></a>
</figure>


### Understand a good typing experience should be like 

#### 1. Random words generation

There is a npm package called [random-words](https://www.npmjs.com/package/random-words) that we could use to generate a sequence of random words. 

In my first trial, I used this library to generate an array of words. The library provides very convienient method that I could define the word length and amount to generate. It works pretty well and has good randomization. However, I realized that the words source this library uses is from the blog posts data, and its use is to generate random blog posts. So after a manual test, I feel the randomized words generated are too difficult for typing test, although I tune the words length and the words distribution to try to make it match the words length that monkeytype website presents, I still got a lower wpm, and a bad typing experience. 

Then I realized, it is not just about the word length, and the distribution. It is about the word itself. And for a typing test, we should really, use the high frequency words. So like monkeytype, I decided to use a similar words source that is the most frequent words in english top 1000 data set. 
After shifting to these data source, I have a similar wpm output like I usually have with other typing test websites. 

#### 2. A simple game loop

Typing test is like a game, it should have a game logic loop. As simple as it is, Wait -> Start -> Finish -> Wait. 

This is just perfect to use react framework for these stateful controls. While in wait state, the app should wait for any user input (type), and the test shall start with a timer count down. When the timer is to 0, the test finishes, and back to wait for next round.

#### 3. A good typing test rule

A good typing test should allow users make mistake. Backspace is our friend, don't lose it!

An observation from the monkeytype experience (default), it allow users to rewind and correct their previous incorrect words till the most recent correct word. 

In my opinion, this set up dramatically improve the typing experience and freedom, as it allows users to make mistakes and also let the users to decide if they want to spend time and effort to correct the mistakes or just move on. 

#### 4. A good interaction

The typing test tool should give feedbacks:

1. a real time feedback for incorrect/correct/extra/missing char
2. an awareness to the current/next typing word

For the correctness determination and feedback，I use different color scheme to address that. And split each word into a sequence of span of char, and apply the color scheme according to user input.

Due to the quick prototyping, I did not use a caret to address the user awareness, instead I use an underline to mark the active word, and it turns out working fine.

#### 5. WPM and stats feedback

At least, we should provide wpm and kpm stats after the test or during the test.
I decide to give transient wpm feedback during the test, and give wpm and accuracy, and kpm after test is completed.
The reason I decided to only show transient wpm is that user should be aware of their current wpm, and they can decide if they want to do an early termination of the test. And I also want the users to focus the test, so just show this one stat only during the test.

#### 6. Aesthetic is important

typing test is an experience and should be aethetic pleasing. I picked a minialist design inspired by the monkeytype site, and developed several theme color schemes. 


### Tech Stack

This website is built purely frontend in react/HTML/CSS. I only used styling libraries for style.

The most tricky part is to implement the "rewind and correct or move on" typing rule. For that I decided 
to use an empheral dictionary to store the history inputs when a "word match" result is determined based on the status of previous word correct/incorrect result. And this dictionary hold the value in current input field. 

Other details regards to the keymap, I disable the tab key, and implement a caps key lock detection. Spacebar is used to skip to next word, and trigger a match determination of the previous word, while clear the input field if the previous word is correct. 

For a complete project codes please visit the github project repo @ [here](https://github.com/gamer-ai/eletype-frontend).



### Next step:

I would like to add some 3D WebGL component for displaying more stats. For example, a heat map of the keystrokes mapped to the keyboard layout, animated typing stats curves etc. More to come, if I have time lol.

---
Copyright 2022 Muyang Guo


