---
title: "Keyboard Lab: an in-browser 3D keyboard designer"
date: "2026-05-23"
lastUpdated: "2026-05-23"
excerpt: "A data-driven 3D keyboard design platform built with three.js + react-three-fiber: 7 layouts, 8 keycap profiles, KLE import, parametric case editor, schema-versioned JSON."
kind: post
tags:
  - Three.js
  - React Three Fiber
  - WebGL
  - Keyboards
  - Schema Design
comments: true
---

> Standalone tool at **[eletypes.com/keyboardlab](https://eletypes.com/keyboardlab)** — part of the [Eletypes](/eletypes-four-years-later/) ecosystem.

## What it is

A 3D keyboard customization playground that runs entirely in the browser. Pick a layout (60% / 65% / HHKB / 75% Generic or Cyberboard / TKL / Full-size), pick a keycap profile (Cherry / OEM / SA / MT3 / KAT / DSA / XDA / Low Profile), tune the case profile in a 2D editor, set the legend, swap the render style. Save the design as a JSON bundle, share it, reload it.

This is the biggest three.js project I've shipped and the one I get the most curious "how did you do this" messages about. So: a tour.

## The schema is the architecture

Most "design tools" I've seen treat the rendered object as the source of truth — you mutate a big mutable scene graph and call it a day. Keyboard Lab takes the opposite position: **the source of truth is JSON**, and the renderer is a pure function of that JSON.

There are eight versioned schemas:

| Schema | Purpose |
|---|---|
| `eletypes-kbd/1` | Layout — board metadata + key placement |
| `eletypes-cap/1` | Keycap profile — sculpt curves + procedural geometry |
| `eletypes-legend/1` | Legend — font, size, color, position |
| `eletypes-visual/1` | Visual — colors, materials, per-key overrides |
| `eletypes-shell/1` | Shell — case geometry, padding, corner radius |
| `eletypes-caseProfile/1` | Case profile — 2D cross-section + mount surface |
| `eletypes-renderStyle/1` | Render style — material pipeline (PBR / cel / lofi / …) |
| `eletypes-design/1` | Composition doc — refs to all the above + overrides |

A saved design is wrapped in an `eletypes-design-bundle/1` envelope that includes the design document plus all embedded asset docs, so a bundle is **fully portable** — you can email someone your design and they can open it without needing your server.

The composition pipeline reads like a tiny compiler:

```
Design Document (eletypes-design/1)
  ├─ refs.layout, refs.keycap, refs.legend, refs.shell, refs.caseProfile
  └─ overrides (visual, opacity, legend, per-key)
         ↓
  Asset Resolver  (bundled → embedded → remote)
         ↓
  Normalization Pipeline
         ↓
  NormalizedKeyboard → 2D Editor / 3D Renderer / JSON Export
```

`NormalizedKeyboard` is an **ephemeral** runtime model, never persisted. Everything that hits disk goes through the schemas. The benefit shows up the first time you need to migrate a format: write a migrator once at the asset boundary; the renderer never knows there was an older version.

## Why this shape

Three properties drove the design: **plug-and-play**, **extensible**, **normalized schema**. Each asset is a swappable JSON document; the design doc just refs assets by ID; format migrations live at the asset boundary, never in the renderer. New keycap family, new render mode, new layout source — all additions, not rewrites.

## On the three.js side

The patterns the project ended up with (instanced meshes split by group, demand-mode rendering, procedurally generated keycaps instead of GLB assets, a critically-damped spring for the keypress feel) all came from necessity, not foresight. None of them looked like the obvious answer until something else broke. If you want the actual code, it's all open on GitHub — link at the bottom.

## The case profile editor

Probably my favorite piece. The user draws a 2D cross-section of the case (SVG with draggable control points), and the tool extrudes it symmetrically into a 3D case. Click any edge to make it the **mount surface** — keys auto-place onto that face with the correct tilt angle. Per-edge **color accents** light up with emissive glow for an LED-strip effect. Per-vertex inset lets you narrow the case at specific vertices for chamfers and bevels.

This means custom case shapes aren't fixed presets — they're a small parametric language. Four presets ship (Cyberboard Wedge / Flat Box / Chamfered Wedge / Ergonomic) and they're just starting points for the editor.

## KLE import

[keyboard-layout-editor.com](https://www.keyboard-layout-editor.com/) (KLE) is the de-facto layout exchange format. Keyboard Lab accepts both pasted raw data and dropped `.json` files. The parser is opinionated about handling KLE's "raw data" tab, which is *almost* JSON but not quite — bare keys, literal newlines inside strings, missing wrapping brackets. The importer tries strict `JSON.parse` first, then falls back to repairing the raw-data format (wrap brackets, quote keys, escape newlines). On success, each import gets a unique asset ref (`layout/kle-<timestamp>-<rand>@1`) so re-imports never collide.

The Monaco preview shows the parsed result before commit, with a **Convert** button that only fires if parsing succeeds. Errors stay inline; the modal doesn't close on failure. Small detail, big quality-of-life win.

## Render-style pipeline

Newest, in beta — `eletypes-renderStyle/1`. The idea: the whole keyboard's *look* (PBR realistic / cel-shaded / lofi flat / blueprint / risograph / pixel) is a separate concern from its *shape* (layout / keycaps / case) and its *content* (legends / colors). You can swap render style without touching anything else.

```
modes shipped:   pbr, cel-hard, lofi-flat
modes scaffolded: risograph, painterly, pixel, blueprint, x-ray
layer-blend:     [mode, mode]
```

The cel-hard implementation is a `MeshToonMaterial` with a per-step `DataTexture` gradient map; outlines are a BackSide-scaled `InstancedMesh` mirroring the regular keycaps. No shader surgery — the trick is just instancing the outline mesh slightly larger and flipping its face direction. Cheap and works.

There's a parser (`resolveRenderStyle`) that clamps every numeric parameter to safe bounds and falls back to PBR for unimplemented modes, so a future version of the schema can be opened by a current build without exploding.

## Workspace UI — bento cards

The right sidebar is a vertical stack of **bento cards**, one per asset: Design / Layout / Shell / Case Profile / Keycap / Legend. Each card has three tabs (**Config / JSON / Doc**) plus a 2D layout preview embedded in the Layout card. Click a tab on a collapsed card and it auto-expands. Each card owns its own Monaco JSON editor and mounts it lazily — only when the JSON tab is active.

The 2D layout preview inside Layout > Config auto-fits via `ResizeObserver` so it never overflows the card. Mount X/Y/Z, fit ratio, case scale, font size, opacities, legend inset — all number inputs, not sliders, because typing `12.5` is more precise than dragging to `12.4 / 12.6 / 12.5`.

The design card has a two-column **Refs** display showing all current asset references, color-coded to the accent. It's basically the "build graph" of your keyboard, visible at all times.

## What's next

A short list, in priority order:

1. **Online cloud save** — currently designs are localStorage + manual bundle export. Cloud save unlocks community sharing.
2. **Community gallery** — browse, share, remix designs.
3. **Drag-and-drop 2D layout editor** — reposition keys directly, instead of editing JSON.
4. **Spline / Bézier case profiles** — for smooth organic shapes the current polygon editor can't express.
5. **Render-style expansion** — finish the risograph / painterly / pixel / blueprint / x-ray pipeline.
6. **Extract the core engine as `@eletypes/keyboard-lab`** — npm-installable, headless, so other people can build interfaces on it.

## On shipping speed

A confession: this project sat at "I'll add some 3D stuff someday" for three years. What broke the dam was harnessing the current generation of AI tooling. The math-heavy bits — keycap geometry, the 2D-to-3D case extruder, the legend position parser with clamped insets — were the kinds of things I'd been quietly putting off because they were finicky, not because they were hard. With a collaborator who's happy to type out the trigonometry, those went from "weekend project I keep dodging" to "afternoon." Reviving the old work and shipping the new accelerated dramatically, and the schema-first architecture above turned out to be exactly the kind of structure that's easy to keep on disk and hand off — to a future me, or to anything else helping along.

## Try it

- **App**: [eletypes.com/keyboardlab](https://eletypes.com/keyboardlab)
- **Source**: [github.com/gamer-ai/eletypes-frontend](https://github.com/gamer-ai/eletypes-frontend) (the `src/components/features/KeyboardLab/` directory is the entry point)
- **Spec**: [`KEYBOARD_LAB.md`](https://github.com/gamer-ai/eletypes-frontend/blob/main/src/components/features/KeyboardLab/KEYBOARD_LAB.md) for the full schema reference

If you build keyboards, customize keycaps, or just want to noodle with 3D in the browser, take it for a spin. Drop feedback in the Eletypes Discord or open an issue on GitHub.
