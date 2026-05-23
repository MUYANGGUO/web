# muyangguo.xyz

Personal blog and portfolio of Muyang Guo. Built with Next.js 16 (static export) and deployed to Netlify.

## Stack

- **Next.js 16** (App Router, static export via `output: 'export'`)
- **TypeScript** + **Tailwind CSS**
- **gray-matter** + **unified** (remark/rehype) → **shiki** + **KaTeX** for content
- **next-themes** for dark/light
- **Pagefind** for build-time site search
- **Netlify** for hosting (build command: `npm run build`)

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export → out/
```

## Content

Posts live in `content/posts/*.md`. Frontmatter:

```yaml
---
title: "Post title"
date: "2024-01-15"
excerpt: "One-line summary used in cards + meta description"
kind: post        # post | leetcode | project
tags:
  - Tag 1
  - Tag 2
---
```

URLs follow `/:slug/`, matching the legacy Jekyll permalink scheme so existing inbound links and search rankings are preserved.

## Project layout

```
app/             Next.js routes (App Router)
  [slug]/        Individual post page (preserves old /:title/ URLs)
  posts/, leetcode/, projects/, about/, tags/
  sitemap.ts, robots.ts
components/      UI components (bento, nav, footer, search, disqus, …)
content/posts/   Markdown content
lib/             site config, content loader, markdown pipeline
public/          Static assets served at site root
scripts/         migrate.ts (Jekyll → content), feed.ts (Atom feed)
```

## Preserved from the legacy site

- Google Analytics gtag (`UA-157817052-1`)
- Google AdSense (`ca-pub-1032547897605308`)
- Disqus comments (`muyangguo` shortname)
- All post URLs (`/:slug/` lowercased)
- RSS at `/feed.xml`
- Sitemap at `/sitemap.xml`
