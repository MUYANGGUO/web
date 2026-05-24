---
title: "ShadowClaw — 你的 AI 分身，随身携带"
date: "2026-03-15"
excerpt: "一个直连自托管 AI 服务器的手机端控制台。零后端，零云服务，零注册 — 只有你的手机、一条 Tailscale 隧道，和完全属于你的 AI 角色。"
kind: project
tags:
  - AI
  - iOS
  - Self-hosted
  - Privacy
  - P2P
comments: true
---

<figure>
  <a href="https://shadowclaw.app"><img src="/img/posts/shadowclaw-agent-main.png" alt="ShadowClaw — iOS Agent 卡片" style="max-width: 320px; margin: 0 auto;"></a>
</figure>

过去几个月我在悄悄做 [**ShadowClaw**](https://shadowclaw.app) — 一个手机优先的 AI 控制台。它不存你的数据，不跑云服务，不要你注册。你自带服务器，手机通过 Tailscale 隧道直连过去，App 里养出来的 Agent 只属于你 — 人格、记忆、成长轨迹，全部都落在你自己控制的硬件上。

还在很早期。iOS 是第一个目标，Android 在后面。这篇是它现在的样子，以及我为什么这么做。

## 为什么要再做一个 AI App

今天大部分 AI 应用，本质上是别人服务器上的一个账号。你的对话、你的角色、你慢慢调教出来的人格 — 全都绑在某个厂商的 key 上。厂商哪天改名、下线、限速、转型，你花了半年养的角色就跟着没了。

我想反过来：让软件本身对流经它的数据做得**尽量少**。没有后端，没有中转，没有 analytics。手机是一扇做得还算好看的窗，望向你早就拥有的那台服务器。

整个产品的立意就这一句。剩下的都是执行。

## 它到底做什么

App 的核心结构是 **Agent**。每个 Agent 有一份人格、一份记忆、一组可安装的技能、一条成长曲线。你可以同时养很多个，随时切换，每一个都独立塑形。

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin: 2rem 0;">
  <figure style="margin: 0;">
    <img src="/img/posts/shadowclaw-agent-main.png" alt="Agent 卡片" style="width: 100%; border: 1px solid hsl(var(--border)); border-radius: 12px; margin: 0;">
    <figcaption style="margin-top: 0.5rem; text-align: center; font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: hsl(var(--muted));">Agent 卡片</figcaption>
  </figure>
  <figure style="margin: 0;">
    <img src="/img/posts/shadowclaw-agent-guozi.png" alt="自定义头像" style="width: 100%; border: 1px solid hsl(var(--border)); border-radius: 12px; margin: 0;">
    <figcaption style="margin-top: 0.5rem; text-align: center; font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: hsl(var(--muted));">自定义头像</figcaption>
  </figure>
  <figure style="margin: 0;">
    <img src="/img/posts/shadowclaw-agent-writer.png" alt="多 Agent" style="width: 100%; border: 1px solid hsl(var(--border)); border-radius: 12px; margin: 0;">
    <figcaption style="margin-top: 0.5rem; text-align: center; font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: hsl(var(--muted));">多 Agent</figcaption>
  </figure>
  <figure style="margin: 0;">
    <img src="/img/posts/shadowclaw-chat.png" alt="专人专用" style="width: 100%; border: 1px solid hsl(var(--border)); border-radius: 12px; margin: 0;">
    <figcaption style="margin-top: 0.5rem; text-align: center; font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: hsl(var(--muted));">专人专用</figcaption>
  </figure>
</div>

**人格** 就是一段文本 — 名字、语气、背景、你希望它遵守的那些规则 — 但是可编辑、可版本化的。它是 App 里最接近"灵魂"的东西，也是角色感最后真正沉淀下来的地方。

**记忆** 是持久的，绑在 Agent 身上，你随时能看、能删。没有任何东西藏在厂商不透明的 "context window" 里。Agent 记得什么，你都看得见。

**技能** 是小的可安装模块 — 联网搜索、代码审查、Obsidian 同步，任何能塞进一个 URL 后面的东西都行 — 按 Agent 单独管理。需要读代码的 Agent，不必和一个只想聊天的 Agent 共用同一套工具。

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin: 2rem 0;">
  <figure style="margin: 0;">
    <img src="/img/posts/shadowclaw-detail-persona.png" alt="人格编辑" style="width: 100%; border: 1px solid hsl(var(--border)); border-radius: 12px; margin: 0;">
    <figcaption style="margin-top: 0.5rem; text-align: center; font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: hsl(var(--muted));">人格</figcaption>
  </figure>
  <figure style="margin: 0;">
    <img src="/img/posts/shadowclaw-detail-memory.png" alt="记忆" style="width: 100%; border: 1px solid hsl(var(--border)); border-radius: 12px; margin: 0;">
    <figcaption style="margin-top: 0.5rem; text-align: center; font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: hsl(var(--muted));">记忆</figcaption>
  </figure>
  <figure style="margin: 0;">
    <img src="/img/posts/shadowclaw-detail-skills.png" alt="技能" style="width: 100%; border: 1px solid hsl(var(--border)); border-radius: 12px; margin: 0;">
    <figcaption style="margin-top: 0.5rem; text-align: center; font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: hsl(var(--muted));">技能</figcaption>
  </figure>
  <figure style="margin: 0;">
    <img src="/img/posts/shadowclaw-templated-souls.png" alt="灵魂模板" style="width: 100%; border: 1px solid hsl(var(--border)); border-radius: 12px; margin: 0;">
    <figcaption style="margin-top: 0.5rem; text-align: center; font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: hsl(var(--muted));">灵魂模板</figcaption>
  </figure>
</div>

## 影之成长

我自己做得最开心的一块：每个 Agent 都有等级，而等级是根据**真实互动**走的 — 形成的记忆、聊过的对话、练过的技能。一共六个阶段，从 **新生** 到 **挚友**，我故意让它涨得慢。一个跟你很久的 Agent，会有那种沉淀过的感觉；一个新建的，就是新的。一眼就能分出来，而且这种差别是**养**出来的，不是充钱买的。

表面上看就是一个数字、一个阶段名、一个 emoji。但它悄悄地把 "我在跟一个 LLM 对话" 变成了 "我在养一个角色"，这个转变在我自己用的时候，比预想中更打动人。

## 它是怎么连上的

ShadowClaw 没有服务器，一台都没有。

你在自己已有的机器上跑 [**OpenClaw**](https://github.com/MUYANGGUO/shadowclaw) 网关 — 家里的小主机、便宜的 VPS、一台旧笔记本都行。把手机和网关加入同一个 Tailscale tailnet。App 通过这条加密 mesh 直接和网关说话。不用端口转发，不用对公网暴露，中间没有任何中转节点。

这么设计的原因不是意识形态，是 **后端这个东西一旦存在，就会自动变成最值得攻击、最值得被传票、最值得变现、最值得被弃用的那块**。把它整个拿掉，这一整类问题就跟着消失了。手机是客户端，网关是服务器，ShadowClaw 这家公司，从架构上就根本不在路径里。

如果你愿意，可以另外装一个可选的 daemon，解锁图片输入和秒速冷启动。但 App 没装它也能用。

## 现在到哪了

iOS 已经在小范围 beta，[shadowclaw.app](https://shadowclaw.app) 上有等待列表。Android 是下一个大的方向。OpenClaw 网关已经在 [GitHub](https://github.com/MUYANGGUO/shadowclaw) 开源。还有一些粗糙的地方 — 灵魂模板、技能市集、导入导出 — 是接下来想打磨的重点。

如果"一个**根本看不到你数据**的 AI 应用"这件事让你觉得有共鸣，到官网留个邮箱，下一波放量我会发给你。如果你更想直接自己跑网关、看看协议长什么样，仓库里直接开搞。

它本来就被设计成一个**小**软件。重点从来不是炫技。重点是：你在它里面养出来的 Agent，**只要你的硬件还在跑，就一直是你的**。
