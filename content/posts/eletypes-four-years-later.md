---
title: "Eletypes, four years later"
date: "2026-05-23"
lastUpdated: "2026-05-23"
excerpt: "What started as a weekend MonkeyType rewrite is now a small community site — used daily by typers, students learning English, keyboard hobbyists, and bloggers. A retrospective."
kind: project
tags:
  - React
  - Three.js
  - Keyboards
  - Community
comments: true
---

<figure>
	<a href="https://eletypes.com"><img src="/img/posts/eletypes-hero.png" alt="Eletypes today"></a>
</figure>

In May 2022 I shipped [Eletypes](https://eletypes.com) as a weekend project. I love typing, I love mechanical keyboards, and at some point "what if I made my own MonkeyType" stopped being a thought and became a few late nights of CRA + React. The [original build journal is still here](/eletypes-an-elegant-typing-test-website/) if you want the origin story.

The plan was simple: build a tool I'd actually use myself, then open-source it and share it. That was it.

Four years later, the repo has crossed [500+ stars](https://github.com/gamer-ai/eletypes-frontend), and a small group of contributors I've never met in person have been shipping into the codebase alongside me. The open-source spirit is something I'd read about and admired from a distance; this was the first time I felt it on something I started.

## Who's actually here

Every day, people show up to type. Speed typers, keeb collectors, English learners, bloggers, students, note-takers — different reasons, same site.

The one I never planned: **keyboard reviewers and YouTubers** who type into Eletypes on camera during keyboard reviews, because the aesthetics match the kind of video they want to make. Clean typography, calm themes, no clutter. A few have started building their own custom themes — channel palette, font weight, even the test words tuned to switch names or model numbers — and the site just becomes a typing-shaped surface for their videos.

That one took me a while to notice. People weren't using Eletypes because of a particular feature. They were using it because it felt right to spend a few minutes in.

## What's there today

<div class="gallery">
  <figure>
    <a href="https://eletypes.com/keyboardlab"><img src="/img/posts/eletypes-keyboardlab.png" alt="Keyboard Lab" /></a>
    <figcaption><strong>Keyboard Lab</strong> — design custom 3D keyboards in the browser</figcaption>
  </figure>
  <figure>
    <a href="https://eletypes.com"><img src="/img/posts/eletypes-themes.gif" alt="Dynamic WebGL themes" /></a>
    <figcaption><strong>Dynamic WebGL themes</strong> — Tranquiluxe · Lumiflex · Opulento · Velustro</figcaption>
  </figure>
  <figure>
    <a href="https://eletypes.com/markdown"><img src="/img/posts/eletypes-markdown.png" alt="Markdown editor" /></a>
    <figcaption><strong>Markdown editor</strong> — live preview with syntax highlighting</figcaption>
  </figure>
  <figure>
    <a href="https://eletypes.com"><img src="/img/posts/eletypes-zen.png" alt="Ultra Zen mode" /></a>
    <figcaption><strong>Ultra Zen</strong> — auto-highlight, auto-dim, distraction-free</figcaption>
  </figure>
</div>

Four pillars now — typing test, Vocab Cards, Keyboard Lab, Markdown editor. Eighteen themes. Custom themes you can paint yourself, custom word lists you can paste in. A proper stats dashboard — activity heatmap, WPM trend, outlier detection — the kind of evaluation suite you'd want if you actually took typing seriously. A leaderboard that asks only for a display name. None of that is really the point, though. The point is the **calm**: open the site, type for a minute, leave feeling slightly better than when you opened it. That's still the only thing it has to do.

## Three things I'm glad about

**It grew naturally, and it stayed.** No marketing, no launches, no growth-hack period — the site just grew the way small open-source tools grow, slowly and by word of mouth. Active users aren't huge, but they've been here for four years and they're happy to keep it alive. That's the part that surprised me most.

**Three.js, finally with a real excuse.** I've always loved three.js and browser 3D rendering, and I'd been looking for a project to seriously sink my teeth into. Keyboard Lab is where I squeezed it in — and it grew into its own thing. The full deep-dive is [here](/keyboardlab/).

**No sign-ups, ever.** I genuinely hate signing up for tools I just want to use for a minute. So Eletypes doesn't have it. No email, no password, no profile. Pick a name on the leaderboard, type, leave. That's it.

## A note on shipping speed

A lot of this version — the new modes, the 3D pipeline, dozens of small UX polishes — had been sitting in my "I'll get to it eventually" list for years. What actually moved the needle was harnessing the current generation of AI tooling and treating it as a serious collaborator. Tedious or finicky work I'd been putting off (case extrusion math, schema migrations, theme systems) became evenings, not weekends. The taste calls still have to come from me. But the activation energy to revive an old project dropped a lot, and that turned out to matter more than I expected.

## Try it

- **App** — [eletypes.com](https://eletypes.com)
- **Keyboard Lab beta** — [eletypes.com/keyboardlab](https://eletypes.com/keyboardlab)
- **Source** — [github.com/gamer-ai/eletypes-frontend](https://github.com/gamer-ai/eletypes-frontend)

If you make keyboard content, build a custom theme — colors that match your channel, the exact words you want on screen, in whatever order. If you're studying English, try the Vocab Cards recite mode. And if you just want to type for a minute and feel calmer, that's still the default. Always will be.
