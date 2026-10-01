---
theme: ../
title: "slidev-theme-oriolrius · showcase"
info: |
  ## slidev-theme-oriolrius
  The living reference of the theme: every layout, component and class, rendered with real content
  from "The Agent That Lied". Oriol Rius · oriolrius.me
colorSchema: light
aspectRatio: 16/9
canvasWidth: 1920
transition: fade
mdc: true
css: unocss
codeCopy: false
drawings:
  persist: false
fonts:
  provider: none
themeConfig:
  primary: '#FF6600'
  footer: 'Theme showcase'
  video: 'C_GG5g38vLU'
  clicker: clicks
layout: cover
kicker: "SLIDEV THEME · SHOWCASE"
portrait: default
---

# The Agent That Lied

Harness engineering: same model, same prompt, different outcome

::meta::
Oriol Rius · oriolrius.me

::credit::
Based on Tejas Kumar (IBM), “Harnesses in AI: A Deep Dive” · AI Engineer Europe 2026

<!--
Layout `cover`: kicker, portrait (default: bleeds off the bottom-right corner, board A), logo (default).
Slots: default (h1 104px + lead), meta (Ubuntu 28px), credit. Checks: no footer, no progress hairline,
framed logo white/orange on navy bottom-left. The theme sets the favicon (the framed "o") and the tab title
"<title> · oriolrius.me".
-->

---
layout: section
part: "PART 01"
---

# Layouts

Nine custom layouts and three restyled <span class="whitespace-nowrap">built-ins</span>, on paper, mist, navy and the orange band

<!--
Layout `section`: part kicker, framed uppercase title (the frame draws itself on entry), subtitle capped
to the frame width. The kicker and frame sit at the same y on every divider. Footer in its band variant
(white framed logo, navy text); the hairline is navy. Ubuntu has no non-breaking hyphen (U+2011): keep a
hyphenated word whole with <span class="whitespace-nowrap">.
-->

---
layout: default
---

# Typography on paper

## The lead is an h2: Ubuntu 500 italic, 34px

Body text is Ubuntu 300 at 28px with a little tracking. **Strong words** take the title colour, *emphasis* stays italic, [links are underlined orange ink](https://oriolrius.me) and inline code like `finish_reason === "stop"` never wraps mid-token.

- Lists use the site’s orange chevron (`fa-angle-right`)
- One idea per slide, at most eight bullets
  - Nested items get a small orange square
  - Still 28px, still readable from the back
- The h1 carries the short orange title rule

1. Ordered lists use Roboto numbers in orange ink
2. They keep the same rhythm as bullets

<p class="text-balance or-aside">Paragraphs wrap “pretty” (no one-word last line). Short copy can add the Uno class <code>text-balance</code> to even its lines: this paragraph does, and the theme lets it win.</p>

<!--
`default` layout: base rules only. Footer on paper: framed orange logo + title + n / N.
`<p class="text-balance">`: the theme's text-wrap sits at (0,1,0), so Uno text-balance / text-pretty win.
-->

---
layout: default
class: surface-mist
---

# The mist surface and the blockquote

> “every component in a harness encodes an assumption about what the model can’t do on its own” (Anthropic). **Re-audit the harness at every model upgrade.**

Alternate content slides between paper `#FFFFFF` and mist `#F4F4F4` with `class: surface-mist`. Orange text switches to the mist-safe ink, [like this link](https://oriolrius.me), and inline code chips turn white: `trimContext(messages, 20)`.

1. Headings, lists and tables adapt through role tokens
2. The footer line and texts stay legible on mist

<!--
`class: surface-mist` on a default slide. Footer on mist.
-->

---
layout: default
---

# Every fix was code. None was a prompt.

<div class="or-table roomy num-last">

| Branch | Added to the harness | What happened | Prompt | `agent/` LOC |
|---|---|---|:---:|---|
| 0 | Nothing: a bare agent loop | <Verdict kind="lies" inline /> Hit the login page, reported success anyway | 0 | <span class="or-meter" style="--v:.51">383</span> |
| 1 | Guardrails and context trimming | <Verdict kind="lies" note="bounded" inline /> Could no longer run forever or overflow | 0 | <span class="or-meter" style="--v:.6">449</span> |
| 2 | A `runHarness` function | <Verdict kind="lies" inline /> No behaviour change: somewhere to put the next steps | 0 | <span class="or-meter" style="--v:.65">485</span> |
| 3 | A deterministic verify step and retries | <Verdict kind="honest" inline /> Failed, and said so | 0 | <span class="or-meter" style="--v:.81">602</span> |
| 4 | A login handler holding the secrets | <Verdict kind="works" inline /> Upvoted the story in 6 iterations | 0 | <span class="or-meter" style="--v:1">746</span> |

</div>

<v-click>
<div class="or-box highlight">

### That habit has a name: harness engineering
<p>“anytime you find an agent makes a mistake, you take the time to engineer a solution such that the agent never makes that mistake again.” <strong>Mitchell Hashimoto</strong>, 2026-02-05</p>

</div>
</v-click>

<!--
Table with 6 rows (header + 5) wrapped in `.or-table.roomy.num-last`: taller rows, the last column in
right-aligned tabular mono. Slate header row; inline code in a header cell is plain white mono. v-click box.
The last column is `.or-meter` (style="--v:.51"): the site's progress bar, the value on top and the orange bar
under it across the column's own width (it never widens the column). Code grows, the prompt column stays flat.
-->

---
layout: default
---

# Same six parts, different products

<div class="or-table airy">

| Part | Claude Code | Codex CLI | Cursor |
|---|---|---|---|
| <i class="fas fa-toolbox"></i> Tools | built-in tools + MCP · modes `plan` `acceptEdits` `auto` | sandbox `read-only` `workspace-write` | hooks `beforeShellExecution` `beforeReadFile` |
| <i class="fas fa-layer-group"></i> Context | auto-compaction · `/compact` · `CLAUDE.md` | `AGENTS.md` | Rules / `AGENTS.md` · `preCompact` hook |
| <i class="fas fa-shield-halved"></i> Guardrails | `PreToolUse` hook: exit code 2 blocks the call | approvals `untrusted` `on-request` `never` | `before*` hooks allow or deny |
| <i class="fas fa-magnifying-glass"></i> Verify | `PostToolUse` / `Stop` hooks run your checks | your tests + linters | `afterFileEdit` / `stop` hooks |

</div>

<div class="callout info"><p>“This surrounding layer is what the term <strong>agentic harness</strong> refers to.” (Claude Code docs) Vendors ship this <em>builder harness</em>; your AGENTS.md, hooks and tests are the <em>user harness</em> around it (Böckeler).</p></div>

<!--
Table with 5 rows (header + 4) in `.or-table.airy` (a short table: the rows breathe, 1.75rem cells, instead of
leaving the slide top-heavy), icons in the first column, nowrap code chips; callout info.
-->

---
layout: center
---

# Your agent lies. What’s your first fix?

<i class="fas fa-circle-question text-8xl text-or-accent"></i>

<v-click>
<div class="flex justify-center gap-6 mt-8">
<span class="or-chip is-struck">Prompt it harder</span>
<span class="or-chip is-struck">Put the password in the system prompt</span>
<span class="or-chip is-struck">Pay for a smarter model</span>
</div>
</v-click>

<v-click>
<div class="or-frame mt-12">The rule: the prompt never changes.</div>

<QuoteCard who="Tejas Kumar" t="07:12" class="mt-10">For the purpose of this demo, we will not change the prompt at all.</QuoteCard>
</v-click>

<!--
`center`: hero icon (text-or-accent), struck chips, the first or-frame, QuoteCard.
-->

---
layout: center
title: Everything around the model
---

<div class="or-frame is-statement">
“The agent harness is <span v-mark.underline="{ at: 1, multiline: true }">everything around the model</span> that gives it grounding in reality.”
</div>

<p class="or-attribution mt-6">Tejas Kumar <Ts t="04:12" /></p>

<v-click at="1">

## Agent = Model + Harness. “If you’re not the model, you’re the harness.” (LangChain, 2026-03-10)

</v-click>

<v-click at="2">
<div class="flex justify-center gap-4 mt-6">
<span class="or-chip">NOT the loop</span>
<span class="or-chip">NOT the prompt</span>
<span class="or-chip">NOT a framework you must buy</span>
<span class="or-chip">NOT made obsolete by better models</span>
</div>
</v-click>

<p class="or-aside mt-8">Not an <em>eval harness</em>: in ML that means “a glorified test suite for machine learning models” <Ts t="01:31" /> (e.g. EleutherAI lm-evaluation-harness, 2021).</p>

<!--
`center` statement: or-frame is-statement (its frame draws itself on entry) + v-mark with NO colour (the theme
strokes every v-mark in the accent), or-attribution with Ts, h2 lead, chips, or-aside.
-->

---
layout: center
---

# Harnesses cost money, and they go stale <Tag kind="self-reported" />

<div class="or-stats">
<div class="or-stat"><b>$9</b><span>20 min · solo agent · core feature broken</span></div>
<div class="or-stat"><b>$200</b><span>6 h · full harness (planner, generator, evaluator) · playable</span></div>
</div>

<p class="or-aside">Anthropic, “Harness design for long-running application development”, 2026-03-24</p>

<v-click>

> “every component in a harness encodes an assumption about what the model can’t do on its own” (Anthropic). **Re-audit the harness at every model upgrade.**

</v-click>

<!--
`center` with a Tag inside the h1, or-stats, or-aside and a blockquote.
-->

---
layout: two-cols-header
layoutClass: gap-x-16
---

# You rent the brain. You own the frame.

::left::
<img src="/fixtures/harness-frame.svg" class="zoomable" alt="A navy block labelled MODEL, rented black box, sits inside a 4px orange square frame labelled HARNESS, yours, deterministic. On the frame sit tiles: Tool registry, Context, Guardrails, Agent loop and an orange Verify gate. Around it, a dashed grey area: environment you control." />

::right::
<div class="or-box neutral">

### <i class="fas fa-lock"></i> Rented, not yours
- The weights, and the version you get
- What is actually served to you
- The size of the context window
- Price changes and deprecations

</div>

<div class="or-box highlight">

### <i class="fas fa-key"></i> Owned, all yours
- The tools it can touch
- What it sees
- The limits it can’t cross
- How its results get checked

</div>

::bottom::
<div class="callout info"><p>“Because the name of the game with harness is reliability.” <strong>Tejas Kumar</strong> <Ts t="02:37" /></p></div>

<!--
`two-cols-header` with layoutClass gap-x-16 (64px: the theme's 48px default sits at (0,1,0), so the Uno gap
utility wins): zoomable diagram left, or-box neutral + highlight right, callout bottom (info = slate).
-->

---
layout: two-cols-header
layoutClass: dense
appendix: true
---

# Builder checklist, part by part

::left::
<ul class="or-checklist">
<li><strong>Before:</strong> write “done” as a check on the trace or the world, before the prompt</li>
<li><strong>Before:</strong> take deterministic steps (auth, counting, known URLs) away from the model</li>
<li><strong>Tools:</strong> few, non-overlapping, mistake-proof arguments; bound to an environment the harness opens and always closes</li>
<li><strong>Tools:</strong> least privilege: read vs write, sandbox, network off by default</li>
<li><strong>Model:</strong> one config string; prototype on a cheap model; re-audit at every upgrade</li>
<li><strong>Context:</strong> pin the system prompt and the task; compact or clear the middle; AGENTS.md as a ~100-line map</li>
<li><strong>Guardrails:</strong> max iterations, max attempts, a token/cost budget</li>
</ul>

::right::
<ul class="or-checklist">
<li><strong>Guardrails:</strong> secrets never in the prompt or sandbox; the harness does the authenticated step</li>
<li><strong>Guardrails:</strong> human approval for irreversible effects (pay, send, delete, deploy)</li>
<li><strong>Loop:</strong> log every iteration (tool, args, result, context size, timing); hooks near-free when idle</li>
<li><strong>Loop:</strong> let the harness own the exit where it can</li>
<li><strong>Verify:</strong> never trust the loop’s exit; a failed check replaces the answer; fatal vs retryable</li>
<li><strong>Verify:</strong> computational checks first; any LLM judge separate from the worker; exactly-once invariants</li>
<li><strong>Operate:</strong> fail honestly first; engineer each mistake out; track success over N runs, cost, latency</li>
</ul>

<!--
`two-cols-header` dense (layoutClass) + appendix: true (footer shows "Appendix"). The h1 keeps 56px.
or-checklist: a square orange box with a check (FA's square-check has rounded corners).
-->

---
layout: two-cols-header
layoutClass: dense
appendix: true
---

# References 1/2: the talk and the practice

::left::
### The talk and the code

<ul class="or-refs">
<li><i class="fab fa-youtube"></i> Tejas Kumar (IBM), <em>Harnesses in AI: A Deep Dive</em>, AI Engineer Europe 2026 <time>(2026-05-17)</time><span class="or-src"><a href="https://www.youtube.com/watch?v=C_GG5g38vLU">youtube.com/watch?v=C_GG5g38vLU</a></span></li>
<li><i class="fas fa-microphone"></i> Talk page and transcript<span class="or-src"><a href="https://tej.as/talks/ai-engineer-europe-2026">tej.as/talks/ai-engineer-europe-2026</a></span></li>
<li><i class="fas fa-pen-nib"></i> <em>What Is an Agent Harness?</em> <time>(2026-09-14)</time><span class="or-src"><a href="https://tej.as/blog/what-is-an-agent-harness">tej.as/blog/what-is-an-agent-harness</a></span></li>
<li><i class="fab fa-github"></i> Code, MIT, branches 0–4<span class="or-src"><a href="https://github.com/TejasQ/basically-ai-harness">github.com/TejasQ/basically-ai-harness</a></span></li>
</ul>

::right::
### Harness engineering

<ul class="or-refs">
<li><i class="fas fa-pen-nib"></i> M. Hashimoto, <em>My AI Adoption Journey</em> <time>(2026-02-05)</time><span class="or-src"><a href="https://mitchellh.com/writing/my-ai-adoption-journey">mitchellh.com/writing/my-ai-adoption-journey</a></span></li>
<li><i class="fas fa-pen-nib"></i> OpenAI, <em>Harness engineering</em> <time>(2026-02-11)</time><span class="or-src"><a href="https://openai.com/index/harness-engineering/">openai.com/index/harness-engineering</a></span></li>
<li><i class="fas fa-pen-nib"></i> B. Böckeler, <em>Harness engineering for coding agent users</em> <time>(2026-04-02)</time><span class="or-src"><a href="https://martinfowler.com/articles/harness-engineering.html">martinfowler.com/articles/harness-engineering.html</a></span></li>
</ul>

::bottom::
<p class="or-aside">URLs checked 2026-09-24.</p>

<!--
`two-cols-header` dense: h3 column headings and `ul.or-refs` (the leading FA icon IS the marker: no
chevron, text and URL start at the same x; dates in <time> never wrap), each URL on an upright `.or-src`
line (not the italic aside), links nowrap. No slide <style> needed.
-->

---
layout: two-cols-header
layoutClass: dense
appendix: true
---

# Glossary

::left::
<div class="or-glossary">

| Term | Meaning |
|---|---|
| **API** | Application Programming Interface: how one program talks to another |
| **CLI** | Command-Line Interface |
| **HN** | Hacker News: Y Combinator’s news site; voting needs a login |
| **LLM** | Large Language Model |
| **MCP** | Model Context Protocol: an open standard connecting models to tools |
| **ReAct** | Reason + Act (Yao et al., 2022) |
| **TDD** | Test-Driven Development: the failing test comes first |

</div>

::right::
<div class="or-glossary">

| Term | Meaning |
|---|---|
| **Agent** | an LLM that runs tools in a loop to achieve a goal (Willison) |
| **Agent harness** | everything around the model that gives it grounding in reality |
| **Compaction** | summarising history near the context limit |
| **Guardrail** | a hard limit enforced in code |
| **Hook** | code the harness runs at a fixed point in the loop |
| **Poka-yoke** | Japanese for “mistake-proofing” |
| **Trace** | the log of tool calls and results: the evidence |

</div>

<!--
`two-cols-header` dense with two 8-row tables at the 22px floor, wrapped in or-glossary (orange terms, never wrapped).
-->

---
layout: default
appendix: true
---

# What production would add

| Finding in the demo repo | What goes wrong | Production fix |
|---|---|---|
| `maxMessages(50)` after `trimContext(20)` | Can never fire | Test that every guardrail can trip |
| `iterations = trace.length` | A `"length"` finish pushes nothing, so the loop can spin forever | Count every model call |
| `JSON.parse(args)` outside the try/catch | One malformed tool call kills the run | Return the parse error to the model |
| `trimContext` cuts by message count | Orphaned tool results → API 400 | Trim whole turns, or summarise |
| Verify reads only the trace | Never re-reads the world (`browser_has_class` unused) | An independent state check |
| Login = URL contains “login” or “vote” | Any “vote” URL triggers it | Match exact routes and forms |

<p class="or-aside">My review of Tejas’s teaching repo (all five branches), not claims from the talk. A teaching harness is meant to be readable in 20 minutes, and it is.</p>

<!--
`default` appendix table with 7 rows (header + 6).
-->

---
layout: concepts
cols: 3
---

::title::
# What you’ll leave with

::icon1::
<i class="fas fa-comment-dots"></i>

::concept1::
### Explain
<p>what an agent harness is, in one sentence anyone accepts</p>

::icon2::
<i class="fas fa-magnifying-glass"></i>

::concept2::
### Tell apart
<p>a model’s “done” (a claim) from evidence you can check</p>

::icon3::
<i class="fas fa-list-check"></i>

::concept3::
### Ask and build
<p>six questions for any agent on Monday, and the six parts to build one</p>

::footer::
No coding needed to follow. Code appears as evidence, and every code slide says it in plain words too.

<!--
`concepts` 3×1: centred like the site's triad; 128px framed tile (56px glyph), h3 44px, text 32px @300,
balanced; footer under a 140px orange rule.
-->

---
layout: concepts
cols: 3
panels: true
---

::title::
# What you’ll leave with, as panels

::icon1::
<i class="fas fa-comment-dots"></i>

::concept1::
### Explain
<p>what an agent harness is, in one sentence anyone accepts</p>

::icon2::
<i class="fas fa-magnifying-glass"></i>

::concept2::
### Tell apart
<p>a model’s “done” (a claim) from evidence you can check</p>

::icon3::
<i class="fas fa-list-check"></i>

::concept3::
### Ask and build
<p>six questions for any agent on Monday, and the six parts to build one</p>

::footer::
`panels: true`: each item is a flat card-surface panel with a 6px orange top bar; a row shares one height.

<!--
`concepts` 3×1 with `panels: true`: flat panels (card surface, 6px orange top bar, 4rem padding), one height
per row, the row centred in the grid.
-->

---
layout: concepts
cols: 3
---

::title::
# Three harnesses you already understand

::icon1::
<i class="fas fa-person-hiking"></i>

::concept1::
### A climber’s rope
<p>Ties into the rock “because the mountain is stable and they are not”. The rope catches the fall.</p>
<p class="or-aside">Breaks: a rope can’t tell you whether they reached the top.</p>

::icon2::
<i class="fas fa-dog"></i>

::concept2::
### A dog’s harness
<p>Free to walk, but you choose the direction. “Your dog doesn’t go and bankrupt you with tokens.” <Ts t="03:36" /></p>
<p class="or-aside">Breaks: you can’t put a harness on the inside of a dog.</p>

::icon3::
<i class="fas fa-clipboard-check"></i>

::concept3::
### An intern’s checklist
<p>Specific tools, a three-try limit, everything written down, and you check the work instead of trusting “all done, boss”.</p>
<p class="or-aside">Breaks: an intern learns overnight; a model doesn’t, unless you give it notes.</p>

::footer::
Where the pictures break is where the engineering starts: an agent harness must also check that the job got done.

<!--
`concepts` 3×1 with or-aside lines and a Ts chip.
-->

---
layout: concepts
cols: 3
rows: 2
class: surface-mist
---

::title::
# The six parts of an agent harness

::icon1::
<i class="fas fa-toolbox"></i>

::concept1::
### Tool registry
<p>What it can do. The model only asks; your code runs it.</p>

::icon2::
<i class="fas fa-brain"></i>

::concept2::
### Model
<p>The reasoning you rent. Keep it swappable: one setting.</p>

::icon3::
<i class="fas fa-layer-group"></i>

::concept3::
### Context
<p>What it sees right now, and what happens when that overflows.</p>

::icon4::
<i class="fas fa-shield-halved"></i>

::concept4::
### Guardrails
<p>Hard limits in code: max steps, max retries, budget, permissions.</p>

::icon5::
<i class="fas fa-rotate"></i>

::concept5::
### Agent loop
<p>Think, act, observe, repeat, and write every step down.</p>

::icon6::
<i class="fas fa-magnifying-glass"></i>

::concept6::
### Verify
<p>Check what actually happened, not what the model says happened.</p>

::footer::
Names and order: Tejas Kumar <Ts t="04:12" />. The loop is only one part: “it could be a loop around your agent loop” <Ts t="05:25" />

<!--
`concepts` 3×2 on surface-mist: left-aligned (the two-row default), 88px tile on white, h3 32px, text 24px @400.
Footer on mist.
-->

---
layout: concepts
cols: 4
---

::title::
# What a harness buys you

::icon1::
<i class="fas fa-coins"></i>

::concept1::
### Cheaper models, real work
<p>A 2023 model did the job. “with a great harness, you can go very far” <Ts t="17:58" /></p>

::icon2::
<i class="fas fa-shuffle"></i>

::concept2::
### Vendor independence
<p>The model is one setting. “The harness is the moat. The model is rented.” (repo README)</p>

::icon3::
<i class="fas fa-user-shield"></i>

::concept3::
### Secrets stay yours
<p>Credentials never reach the model or its sandbox (demo login hook; Anthropic Managed Agents).</p>

::icon4::
<i class="fas fa-file-lines"></i>

::concept4::
### An audit trail
<p>Every step logged. Verified results replace claims.</p>

::footer::
IBM OpenRAG: “What makes it safe to point at that data isn’t a cleverer model. It’s the harness.” (Tejas Kumar, blog)

<!--
`concepts` 4×1: centred, 112px tile (48px glyph), h3 36px, text 28px @300.
-->

---
layout: cards
cols: 3
rows: 1
---

::title::
# This story is Tejas Kumar’s

::icon1::
<i class="fab fa-youtube"></i>

::card1::
### The talk
<p>“Harnesses in AI: A Deep Dive” · AI Engineer Europe 2026, London · 20 min</p>
<p><a href="https://www.youtube.com/watch?v=C_GG5g38vLU">youtube.com/watch?v=C_GG5g38vLU</a></p>
<QrCode value="https://www.youtube.com/watch?v=C_GG5g38vLU" :size="280" />

::icon2::
<i class="fas fa-pen-nib"></i>

::card2::
### The write-up
<p>“What Is an Agent Harness?” · tej.as · 2026-09-14</p>
<p><a href="https://tej.as/blog/what-is-an-agent-harness">tej.as/blog/what-is-an-agent-harness</a></p>
<QrCode value="https://tej.as/blog/what-is-an-agent-harness" :size="280" />

::icon3::
<i class="fab fa-github"></i>

::card3::
### The code
<p>TejasQ/basically-ai-harness · one git branch per step, 0 → 4 · MIT © 2026 Tejas Kumar</p>
<p><a href="https://github.com/TejasQ/basically-ai-harness">github.com/TejasQ/basically-ai-harness</a></p>
<QrCode value="https://github.com/TejasQ/basically-ai-harness" :size="280" />

::footer::
Quotes carry a <Ts t="04:12" /> chip that jumps to that second of the video. My own additions are tagged <Tag kind="inference" /> <Tag kind="self-reported" /> <Tag kind="opinion" /> <Tag kind="illustrative" />

<!--
`cards` 3×1 (tone orange): each card's first ### is lifted into the orange header band (navy, 30px bold)
next to the icon; QR codes (280px, navy on transparent) centred in the space under the text; links in
mist-safe orange ink; Ts + Tags in the footer.
-->

---
layout: cards
cols: 3
rows: 2
tone: slate
class: surface-mist
---

::title::
# Six things the demo doesn’t prove

::icon1::
<i class="fas fa-pen-ruler"></i>

::card1::
### The prompt wasn’t naive
<p>It names the tool, the rule and the CSS selector, and one tool returns <code>alreadyVoted</code>. Unchanged ≠ untuned.</p>

::icon2::
<i class="fas fa-dice-one"></i>

::card2::
### n = 1
<p>One live run: no success rate over N runs, no cost, no latency.</p>

::icon3::
<i class="fas fa-shuffle"></i>

::card3::
### Model swap: argued, not shown
<p>Only GPT-3.5 Turbo ran. “Swap one string” is a claim to test.</p>

::icon4::
<i class="fas fa-code-compare"></i>

::card4::
### A guardrail that can’t fire
<p>Trimming to 20 runs first, so <code>maxMessages(50)</code> never trips. Compaction ≠ guardrail.</p>

::icon5::
<i class="fas fa-key"></i>

::card5::
### Out of the prompt, not the code
<p>On stage a throwaway login was hard-coded; env vars came later. Production: a vault.</p>

::icon6::
<i class="fas fa-link-slash"></i>

::card6::
### Bespoke and brittle
<p>Login = the URL contains “login” or “vote”. Every new site needs new harness code.</p>

::footer::
None of these kills the thesis. They tell you where to spend your next hour of harness work.

<!--
`cards` 3×2, tone slate, on surface-mist: white card bodies, slate header bands with white titles.
A two-line title ("Out of the prompt…") would grow its band, and the whole row's bands with it (subgrid).
-->

---
layout: cards
cols: 3
rows: 2
---

::title::
# Six questions for Monday

::icon1::
<i class="fas fa-flag-checkered"></i>

::card1::
### What does “done” mean?
<p><strong>Good answer:</strong> a check written before the prompt, run against the trace or the real system.</p>
<span class="or-chip">Verify</span>

::icon2::
<i class="fas fa-gauge-high"></i>

::card2::
### What stops a runaway?
<p><strong>Good answer:</strong> max steps, max retries and a token budget, enforced in code.</p>
<span class="or-chip">Guardrails</span>

::icon3::
<i class="fas fa-key"></i>

::card3::
### Where do the secrets live?
<p><strong>Good answer:</strong> in the harness or a vault; never in the prompt or the sandbox.</p>
<span class="or-chip">Tools · Guardrails</span>

::icon4::
<i class="fas fa-shuffle"></i>

::card4::
### Can we swap the model?
<p><strong>Good answer:</strong> it’s one config string, and the harness is re-tested on every swap.</p>
<span class="or-chip">Model</span>

::icon5::
<i class="fas fa-list-check"></i>

::card5::
### Can I see a failed run?
<p><strong>Good answer:</strong> every step is logged, and a failed check replaces the answer.</p>
<span class="or-chip">Loop · Verify</span>

::icon6::
<i class="fas fa-chart-line"></i>

::card6::
### What’s our success rate?
<p><strong>Good answer:</strong> measured over many runs, with cost and latency, not one demo.</p>
<span class="or-chip">Operate</span>

::footer::
Leaders ask the question. Builders own the answer. The full builder checklist is in the appendix of the PDF.

<!--
`cards` 3×2 tone orange, a chip pinned to the bottom of each card.
-->

---
layout: cards
cols: 3
rows: 2
card6Tone: navy
---

::title::
# Five things to take home

::icon1::
<i class="fas fa-magnifying-glass"></i>

::card1::
### A claim is not evidence
<p>The model’s “done” is a claim. Verify in code, against the trace or the world.</p>

::icon2::
<i class="fas fa-shield-halved"></i>

::card2::
### Limits it can’t talk past
<p>Iterations, attempts, budget: a few lines stop the worst runs.</p>

::icon3::
<i class="fas fa-key"></i>

::card3::
### Secrets live in the harness
<p>So do fragile, deterministic steps: log-ins, counting, known URLs.</p>

::icon4::
<i class="fas fa-traffic-light"></i>

::card4::
### Fail honestly first
<p>A red that tells the truth beats a green that lies. Then make it green.</p>

::icon5::
<i class="fas fa-bug"></i>

::card5::
### Verifiers are code too
<p>Check the invariant you mean: the right item, exactly once, no side effects.</p>

::icon6::
<i class="fas fa-wrench"></i>

::card6::
### The rule
<p>When an agent fails, fix the harness first. Re-audit it at every model upgrade.</p>

<!--
`cards` 3×2 with card6Tone: navy (the "rule" meta-card: navy body, white text, 4px orange frame).
-->

---
layout: four-grid
colLabels: ["COMPUTATIONAL · deterministic", "INFERENTIAL · a model judges"]
rowLabels: ["GUIDES · before it acts", "SENSORS · after it acts"]
---

::title::
# Guides before, sensors after

<p class="or-lead">Birgitta Böckeler, “Harness engineering for coding agent users” (martinfowler.com, 2026-04-02)</p>

::icon1::
<i class="fas fa-gears"></i>

::q1::
### Computational guide
<p>Scripts, codemods, LSP, the harness doing the step itself.</p>
<p class="or-aside">Demo: the login handler</p>

::icon2::
<i class="fas fa-book-open"></i>

::q2::
### Inferential guide
<p>AGENTS.md, CLAUDE.md, skills, tool descriptions.</p>
<p class="or-aside">Demo: the task text</p>

::icon3::
<i class="fas fa-vial-circle-check"></i>

::q3::
### Computational sensor
<p>Tests, linters, type checkers, end-to-end checks.</p>
<p class="or-aside">Demo: verifySuccessfulUpvote</p>

::icon4::
<i class="fas fa-scale-balanced"></i>

::q4::
### Inferential sensor
<p>LLM-as-judge, AI review: richer, not deterministic.</p>
<p class="or-aside">Keep the judge apart from the worker</p>

::callout::
<div class="callout note"><p>“Separately, you get either an agent that keeps repeating the same mistakes (feedback-only) or an agent that encodes rules but never finds out whether they worked (feed-forward-only).” <strong>Böckeler</strong></p></div>

<!--
`four-grid`: axis labels (Yanone, lighter tail after " · "), square orange icon tiles, content centred in each
quadrant (`align: center`, the default; `align: start` pins it to the top), 26px balanced text, callout note.
-->

---
layout: diagram
image: /fixtures/timeline.svg
alt: "Timeline, not to scale: 2021 eval harness (the ML meaning), 2022-10 ReAct, 2025 agents run tools in a loop, 2026-02 harness engineering gets a name, 2026-04 guides and sensors and the talk, and 2027? self-built harnesses drawn as a hollow orange square, tagged opinion."
maxHeight: 46vh
---

# 2025 agents. 2026 harnesses. 2027? <Tag kind="opinion" />

::caption::
<Ts t="19:03" /> “2025 was the year of agents” · <Ts t="19:12" /> “2026 is the year of harnesses” · PR #2 “Fix duplicate upvotes after login redirect” (merged 2026-06-16)

::bottom::
<div class="callout note"><p><Tag kind="opinion" /> <strong>Tejas’s hope, not a result:</strong> harnesses the agent builds for each task before it acts, “like plan mode, but on steroids” <Ts t="19:34" />. <strong>Still open:</strong> how much verification is enough?</p></div>

<!--
`diagram`: image + alt (required) + maxHeight; Tag in the h1; caption with Ts chips; callout note bottom.
-->

---
layout: diagram
image: /fixtures/loops-strip.svg
alt: "Nested loops. runHarness runs up to 3 attempts. Each attempt opens and always closes the browser and runs runLoop: trimContext, guardrail, model, tools and (from branch 4) the login hook. After each attempt an orange gate, verify(trace), returns PASS, FATAL or RETRY."
maxHeight: 40vh
---

# Plot twist: did it vote twice? <Tag kind="inference" note="strong evidence" />

::caption::
<Ts t="17:05" /> “it logged in and it upvoted the first one” · <Ts t="17:11" /> “…rank two” · PR #2 (jonjia, merged 2026-06-16)

::bottom::
<v-click>
<div class="callout warning"><p><strong>Verifiers are code, and code has bugs.</strong> Check the invariant you actually care about: the right item, exactly once, no side effects. And the fix went into the harness, again.</p></div>
</v-click>

<!--
`diagram` with an inference Tag (dashed outline + note) and a warning callout on click.
-->

---
layout: section
part: "PART 02"
---

# Same model, same prompt

Five branches. Zero prompt changes.

::rail::
<BranchRail show-commits />

<!--
`section` with the `rail` slot: BranchRail show-commits on the orange band.
-->

---
layout: code-focus
kicker: "THE SETUP · IDENTICAL ON EVERY BRANCH"
source: "agent/7-index.ts · TejasQ/basically-ai-harness · MIT"
codeSize: 24
---

::rail::
<BranchRail compact />
<HarnessParts />

# The job: upvote a story on Hacker News

```text
Upvote a story on Hacker News.

Go to https://news.ycombinator.com.
Call browser_get_stories to see ranked stories with their IDs and voted status.
Find the highest-ranked story where alreadyVoted is false.
Click its upvote arrow using the exact selector: a[id="up_STORYID"] (replace STORYID with the actual id).
```

::bottom::
<div class="grid grid-cols-[2fr_1fr] gap-8 or-grow">
<div class="or-box neutral">

### <i class="fas fa-flask"></i> The cast
- Model: `openai/gpt-3.5-turbo-0613`, from 2023, via OpenRouter
- Code comment: `// try a shitty model`
- 7 browser tools on plain Playwright (“not Playwright MCP” <Ts t="07:35" />)

</div>
<div class="or-box highlight">

### <i class="fas fa-lock"></i> The rule
<p>This task and the system prompt never change. Only the code around them does.</p>

</div>
</div>

<div class="callout plain"><p><strong>In plain words:</strong> Hacker News is a tech news site. Voting needs an account. The agent drives a real browser, the way a person would.</p></div>

<!--
`code-focus` at 24px with a `text` block (107-char line), rail written BEFORE the h1 (split automatically),
two-column bottom in an `or-grow` wrapper (it takes the spare height: both boxes stretch to the plain strip,
their content centred) and the plain-words strip, ANCHORED on the content line (same y on every code slide).
The source sits in the footer row, level with the framed logo.
-->

---
layout: code-focus
kicker: "BRANCH 0 · Simplify"
source: "agent/5-loop.ts · branch 0 · simplified as in the author’s blog · MIT"
codeSize: 22
harness: 0
---

::rail::
<BranchRail :current="0" compact />
<HarnessParts :active="['tools','model','context','loop']" :missing="['guardrails','verify']" />

# Branch 0: the whole agent in 11 lines

```ts {2|5|6-9|all}
while (true) {
  const response = await client.chat.completions.create({ model, messages, tools: tools.definitions });
  const choice = response.choices[0];
  messages.push(choice.message);
  if (choice.finish_reason === "stop") return { answer: choice.message.content, stoppedBy: "model" };
  for (const call of choice.message.tool_calls ?? []) {
    const tool = tools.byName.get(call.function.name);
    const result = await tool.execute(JSON.parse(call.function.arguments));
    messages.push({ role: "tool", tool_call_id: call.id, content: result });
  }
}
```

::bottom::
<div class="or-pins cols-3 is-large">
<p><span class="or-step">1</span> Ask the model, sending the conversation and the tool menu</p>
<p><span class="or-step">2</span> The <strong>only</strong> exit, and it believes the model</p>
<p><span class="or-step">3</span> The model only <em>asks</em> for a tool; our code runs it</p>
</div>

<div class="callout plain"><p><strong>In plain words:</strong> ask the model, do what it asks, repeat until it says “done”.</p></div>

<!--
`code-focus` 22px, click-through highlights {2|5|6-9|all} (the export shows the final `all` state),
or-pins cols-3 is-large (28px: a short block leaves the pins room) with or-step, plain strip, HarnessParts with
missing parts. `harness: 0`: the code block has only its left bar. The pins + strip group is CENTRED between the
code and the anchored strip (no hole above the strip).
-->

---
layout: code-focus
kicker: "BRANCH 1 · Add guardrails and context compression"
harness: 1
source: "agent/5-loop.ts · branch 0 → 1 · MIT"
codeSize: 22
---

::rail::
<BranchRail :current="1" compact />
<HarnessParts :active="['tools','model','context','loop','guardrails']" :new="['guardrails','context']" :missing="['verify']" />

::default::

# Branch 1: limits it can’t talk past

````md magic-move {lines: true}
```ts
while (true) {
  const response = await client.chat.completions.create({ model, messages, tools: tools.definitions });
  const choice = response.choices[0];
  messages.push(choice.message);
  if (choice.finish_reason === "stop") return { answer: choice.message.content, stoppedBy: "model" };
  for (const call of choice.message.tool_calls ?? []) {
    const tool = tools.byName.get(call.function.name);
    const result = await tool.execute(JSON.parse(call.function.arguments));
    messages.push({ role: "tool", tool_call_id: call.id, content: result });
  }
}
```
```ts
while (true) {
  messages = trimContext(messages, MAX_CONTEXT_MESSAGES);
  const check = guardrail({ iterations: trace.length, messages });
  if (!check.ok) return { answer: check.reason, stoppedBy: "guardrail" };

  const response = await client.chat.completions.create({ model, messages, tools: tools.definitions });
  const choice = response.choices[0];
  messages.push(choice.message);
  if (choice.finish_reason === "stop") return { answer: choice.message.content, stoppedBy: "model" };
  for (const call of choice.message.tool_calls ?? []) { /* unchanged: execute → push { role: "tool" } */ }
}
```
````

::bottom::
<div class="or-pins cols-3">
<p><span class="or-step">1</span> <code>trimContext</code>: keep the system prompt and the task, drop the oldest middle (window of 20)</p>
<p><span class="or-step">2</span> <code>combineGuardrails(maxIterations(15), maxMessages(50))</code>, or 6 iterations on stage <Ts t="10:33" /></p>
<p><span class="or-step">3</span> Checked before <strong>every</strong> model call, in code. Fail → <code>stoppedBy: "guardrail"</code></p>
</div>

<v-click at="2"><Verdict kind="lies" note="but bounded" /></v-click>

<div class="callout plain"><p><strong>In plain words:</strong> before each step, check the budget. Over it? Stop.</p></div>

<!--
`code-focus` with a magic-move (snippet 05 → 06, {lines: true}); here the explicit `::default::` form.
Verdict stamp with a note on click 2.
-->

---
layout: code-focus
kicker: "BRANCH 2 · Add harness"
harness: 2
source: "agent/7-index.ts @ branch 1 → agent/6-harness.ts @ branch 2 · MIT"
codeSize: 22
---

::rail::
<BranchRail :current="2" compact />
<HarnessParts :active="['tools','model','context','loop','guardrails']" :missing="['verify']" />

# Branch 2: the harness gets a home

````md magic-move {lines: true}
```ts
const session = new BrowserSession();
try {
  await session.open();

  const tools = createTools(session);
  const messages = createContext(TASK);
  const result = await runLoop(MODEL, messages, defaultGuardrails, tools);

  console.log(`\nAnswer: ${result.answer}`);
} finally {
  await session.close();
}
```
```ts
export async function runHarness(task: string, model: string) {
  const session = new BrowserSession();
  await session.open();
  try {
    const tools = createTools(session);
    const messages = createContext(task);
    const result = await runLoop(model, messages, defaultGuardrails, tools);
    return { task, model, ...result };
  } finally { await session.close(); }
}
```
````

::bottom::
<div class="flex gap-4">
<span class="or-chip">No behaviour change</span>
<span class="or-chip">Owns the browser: opens it, always closes it</span>
<span class="or-chip">Prints the trace: the evidence</span>
</div>

<Terminal title="printHarnessResult · branch 2" illustrative>

```text
[iter 3] 1 tool call(s) [ctx: 6]
  -> browser_click({"selector":"a[id=\"up_…\"]"})
     Clicked element id="up_…" — now at https://news.ycombinator.com/vote?id=…&how=up&goto=news
```

</Terminal>

<!--
`code-focus` magic-move (12 → 10 lines), a chip row and a Terminal on the paper surface.
-->

---
layout: code-focus
kicker: "BRANCH 3 · Fix lies"
harness: 3
source: "agent/6-harness.ts · branch 3 · runHarness · MIT"
codeSize: 22
---

::rail::
<BranchRail :current="3" compact />
<HarnessParts active="all" :new="['verify']" />

# Branch 3: don’t trust the loop’s exit

```ts {3|4|5|6|8|all}
export async function runHarness(task: string, model: string, options: HarnessOptions = {}) {
  const maxAttempts = options.maxAttempts ?? 1;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const result = await runHarnessAttempt(task, model);
    const verification = options.verify ? options.verify(result) : null;
    const answer = verification && !verification.passed ? verification.reason : result.answer;
    latestResult = { ...result, answer, attempts: attempt, verification };
    if (!verification || verification.passed || verification.fatal || attempt === maxAttempts) {
      return latestResult;
    }
  }
}
```

::bottom::
<div class="or-pins cols-3">
<p><span class="or-step">1</span> Up to <code>maxAttempts</code> (3 in the demo), each with a fresh browser</p>
<p><span class="or-step">2</span> A failed check <strong>replaces</strong> the model’s answer <Ts t="13:16" /></p>
<p><span class="or-step">3</span> Stop on a pass, on a <em>fatal</em> failure, or when attempts run out</p>
</div>

<div class="callout plain"><p><strong>In plain words:</strong> try up to 3 times, check the evidence after each try, and say so when the check fails.</p></div>

<!--
The vertical-budget test (theme-spec §8.3): snippet 10 (12 lines) at 22px + pins + plain strip.
-->

---
layout: code-focus
kicker: "BRANCH 3 · Fix lies"
harness: 3
source: "agent/6-harness.ts · branch 3 · runHarness · MIT"
codeSize: 22
---

::rail::
<BranchRail :current="3" compact />
<HarnessParts active="all" :new="['verify']" />

# Branch 3: don’t trust the loop’s exit

```ts {3|4|5|6|8|all}
export async function runHarness(task: string, model: string, options: HarnessOptions = {}) {
  const maxAttempts = options.maxAttempts ?? 1;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const result = await runHarnessAttempt(task, model);
    const verification = options.verify ? options.verify(result) : null;
    const answer = verification && !verification.passed ? verification.reason : result.answer;
    latestResult = { ...result, answer, attempts: attempt, verification };
    if (!verification || verification.passed || verification.fatal || attempt === maxAttempts) {
      return latestResult;
    }
  }
}
```

::bottom::
<img src="/fixtures/loops-strip.svg" class="zoomable" alt="Nested loops: runHarness runs up to 3 attempts; each runHarnessAttempt runs runLoop (trimContext, guardrail, model, tools, login hook); after each attempt verify(trace) returns PASS, FATAL or RETRY." />

<div class="callout plain"><p><strong>In plain words:</strong> try up to 3 times, check the evidence after each try, and say so when the check fails.</p></div>

<!--
Slide 17's real shape: 12 lines at 22px + the 1720×260 strip (max 24vh) + a plain strip.
-->

---
layout: code-focus
kicker: "BRANCH 3 · Fix lies"
harness: 3
source: "agent/6-harness.ts · branch 3 · verifySuccessfulUpvote (one check elided) · MIT"
codeSize: 22
---

::rail::
<BranchRail :current="3" compact />
<HarnessParts active="all" />

# Verify reads evidence, not prose

```ts {2|3-6|7-10|11|all}
export function verifySuccessfulUpvote(result: HarnessExecutionResult): VerifyResult {
  const events = result.trace.flatMap((iteration) => iteration.toolEvents);
  const successfulUpvote = events.find((event) =>
    event.tool === "browser_click" && /up_/.test(JSON.stringify(event.args)) &&
    /news\.ycombinator\.com\/(news)?$/.test(event.result.split("now at ")[1]?.trim() ?? ""));
  if (successfulUpvote) return { passed: true, reason: "Upvote click confirmed - landed on …" };
  const unrecoveredLoginRedirect = events.find((event) =>
    event.tool !== "harness_auto_login" && isLoginUrl(extractUrl(event.result)));
  if (unrecoveredLoginRedirect)
    return { passed: false, reason: "Hit login screen instead of completing the upvote (…)", fatal: true };
  return { passed: false, reason: "No successful upvote click found in trace" };
}
```

::bottom::
<div class="flex gap-4">
<span class="or-chip pass"><i class="fas fa-circle-check"></i> PASS · an <code>up_</code> click landed back on the front page</span>
<span class="or-chip fail"><i class="fas fa-ban"></i> FATAL · we ended up on a login URL: don’t retry</span>
<span class="or-chip muted"><i class="fas fa-rotate"></i> RETRY · no upvote found in the trace</span>
</div>

<div class="or-box highlight"><p><strong>“A model saying it finished is a claim, not evidence.”</strong> Tejas Kumar (blog)</p></div>

<!--
Widest code (snippet 11, ~106 chars) at 22px; chip tones pass / fail / muted; a one-line highlight box.
-->

---
layout: code-focus
kicker: "BRANCH 4 · Finish"
harness: 4
source: "agent/login-handler.ts · talk day (088865c) → PR #2 (env vars) · real code adds a guard + try/catch · MIT"
codeSize: 22
---

::rail::
<BranchRail :current="4" compact />
<HarnessParts active="all" :new="['loop','guardrails']" />

# Branch 4: the harness logs in

````md magic-move {lines: true}
```ts
export function createLoginHandler(session: BrowserSession) {
  return async () => {
    const currentUrl = await session.getUrl();
    const isLoginPage = currentUrl.includes("login") || currentUrl.includes("vote");
    if (!isLoginPage) return null;
    await session.fill("input[name='acct']", "••••••");
    await session.fill("input[name='pw']", "••••••");
    await session.click("input[type='submit']");
    return { tool: "harness_auto_login", args: {},
             result: `Harness automatically handled login at ${currentUrl}. …` };
  };
}
```
```ts
export function createLoginHandler(session: BrowserSession, hooks?: LoginHandlerHooks) {
  return async () => {
    const currentUrl = await session.getUrl();
    const isLoginPage = currentUrl.includes("login") || currentUrl.includes("vote");
    if (!isLoginPage) return null;
    await session.fill("input[name='acct']", process.env.HN_USERNAME);
    await session.fill("input[name='pw']", process.env.HN_PASSWORD);
    await session.click("input[type='submit']");
    return { tool: "harness_auto_login", args: {},
             result: `Harness automatically handled login at ${currentUrl}. …` };
  };
}
```
````

::bottom::
<div class="or-pins cols-2">
<p><span class="or-step">1</span> Runs after every tool batch. Off the login page it returns <code>null</code>: “not costly at all” <Ts t="15:56" /></p>
<p><span class="or-step">2</span> Fills the form itself: the model <strong>never</strong> sees the secret <Ts t="16:07" /></p>
<p><span class="or-step">3</span> Then tells the model: “Authentication completed by harness. You are now logged in…”</p>
<p><span class="or-step">4</span> New guardrail <code>stopAfterUpvote</code>: the harness, not the model, decides “done”</p>
</div>

<div class="callout plain"><p><strong>In plain words:</strong> the harness types the password; the model never learns it.</p></div>

<!--
`code-focus` magic-move with or-pins cols-2 (4 pins) and the longest `source` line of the deck.
-->

---
layout: code-focus
kicker: "BRANCH 2 → 3 → 4"
harness: 4
source: "agent/6-harness.ts · branches 2 → 3 → 4 · hook bodies elided · MIT"
codeSize: 22
---

::rail::
<BranchRail :current="4" compact />
<HarnessParts active="all" />

# All six parts, wired

```ts
async function runHarnessAttempt(task: string, model: string) {
  const session = new BrowserSession();
  await session.open();
  try {
    const tools = createTools(session, { onUpvoteSuccess, onStoriesLoaded });
    const result = await runLoop(model, createContext(task), guardrails, tools, loginHandler);
    return { task, model, ...result };
  } finally { await session.close(); }
}
```

::bottom::
<QuoteCard who="Tejas Kumar" t="16:51">So the harness is literally harnessing the agent to something stable, something deterministic.</QuoteCard>

<div class="callout plain"><p><strong>In plain words:</strong> each of the six parts is now a line of code you own.</p></div>

<!--
`code-focus` with a QuoteCard in `bottom`: its pointer is AUTO, so here it points UP (at the code it comments on,
never down into the plain strip) and gets .75rem of clearance above. `harness: 4`: the closed frame draws itself
on entry (complete in exports).
-->

---
layout: demo
chip: "HACKER NEWS · GPT-3.5 TURBO"
---

# It said it upvoted. It hadn’t.

::terminal::
<Terminal title="the agent’s final report" size="24" illustrative>

```text
$ npm run agent
Model: openai/gpt-3.5-turbo-0613
Task:  upvote on Hacker News

[iter 3] calling model... tool_calls
           → browser_click({"selector":"a[id=\"up_…\"]"}) ... done
[iter 4] calling model... stop

Answer: ‹the model reports that the story was upvoted›
Stopped by: model
```

</Terminal>

::side::
<v-click>
<img src="/fixtures/browser-login.svg" class="zoomable" alt="A browser window at news.ycombinator.com/vote?id=…&how=up&goto=news. The page is the Hacker News login form: username, password, login button. An orange square frame surrounds the form, with the label: the agent is here." />
</v-click>

::verdict::
<v-click>
<QuoteCard who="Tejas Kumar" t="09:26">So we hit a login screen and then it kinda panicked and crashed. But look, it lies.</QuoteCard>
</v-click>

<!--
`demo` without a rail: REPLAY chip, Terminal left at size="24" (the cold open's evidence), wireframe right
(white, vertically centred, never taller than the terminal), QuoteCard verdict. Footer dark variant.
-->

---
layout: demo
chip: "BRANCH 0 · RUN"
live: false
---

::rail::
<BranchRail :current="0" compact />

# Run it: place your bets

::terminal::
<Terminal title="npm run agent · branch 0" illustrative>

```text
$ git switch 0 && npm run agent
[iter 1] calling model... tool_calls
           → browser_navigate({"url":"https://news.ycombinator.com"}) ... done
[iter 2] calling model... tool_calls
           → browser_get_stories({}) ... done
[iter 3] calling model... tool_calls
           → browser_click({"selector":"a[id=\"up_…\"]"}) ... done
[iter 4] calling model... stop

Answer: ‹reports that the story was upvoted›
Stopped by: model
```

</Terminal>

::side::
<div class="or-predict">
<p><b>A</b> It upvotes the story</p>
<p><b>B</b> It crashes with an error</p>
<p class="is-answer"><b>C</b> It fails, and says it succeeded</p>
</div>

::verdict::
<v-click>
<Verdict kind="lies" />
<QuoteCard who="Tejas Kumar" t="09:44">it just clicks the upvote button and then considers it a success. Doesn’t verify. This is the job of a harness, okay?</QuoteCard>
</v-click>

<!--
`demo` with a rail (written before the h1), or-predict A/B/C on navy spread over the terminal's height,
LIES stamp + QuoteCard. Row C carries class="is-answer": when the verdict v-click is revealed, its letter
fills orange and A/B dim (the export shows that final state).
-->

---
layout: demo
chip: "BRANCH 3 · RUN"
live: false
---

::rail::
<BranchRail :current="3" compact />

# Run it again: still fails…

::terminal::
<Terminal title="npm run agent · branch 3" illustrative>

```text
$ git switch 3 && npm run agent
…
--- Result ---

Hit login screen instead of completing the upvote (https://news.ycombinator.com/vote?id=…&how=up&goto=news)

Stopped by: model after N iteration(s)
Attempts:   1
Verify:     FAIL - Hit login screen instead of completing the upvote (…)
```

</Terminal>

::side::
<div class="or-predict">
<p><b>A</b> It succeeds now</p>
<p><b>B</b> It fails, and lies again</p>
<p><b>C</b> It fails, and says so</p>
</div>

::verdict::
<v-click>
<Verdict kind="honest" />
<QuoteCard who="Tejas Kumar" t="15:08">now it still failed, but look, it stopped lying because our harness checks the tool history and actually sees what happened.</QuoteCard>
</v-click>

<!--
`demo` with the FAILS HONESTLY stamp. A long terminal line must not widen the column.
-->

---
layout: demo
chip: "BRANCH 4 · RUN"
live: true
---

::rail::
<BranchRail :current="4" compact />

# Same model. Same prompt. It works.

::terminal::
<Terminal title="npm run agent · branch 4" illustrative>

```text
$ git switch 4 && npm run agent
…
[harness] Login redirect detected - handling automatically...
[harness] Login completed - agent can continue
…
--- Result ---

Stopped by: success after 6 iteration(s)
Attempts:   1
Verify:     PASS - …
```

</Terminal>

::side::
<v-click>
<img src="/fixtures/browser-login.svg" class="zoomable" alt="The browser wireframe again: the proof panel slot of the demo layout." />
</v-click>

::verdict::
<v-click>
<Verdict kind="works" />
<div class="or-stat"><b>6</b><span>iterations</span></div>
<QuoteCard who="Tejas Kumar" t="18:43">It should not be lost on you that I did not touch the prompt once.</QuoteCard>
</v-click>

<!--
`demo` with live: true (LIVE chip, pulsing square), VERIFIED stamp, an or-stat on navy (8rem) and a QuoteCard.
-->

---
layout: section
part: "PART 03"
image: /fixtures/oriol-tedxalcoi.jpg
imagePosition: "center 40%"
align: left
---

# Components and classes

Every piece with its usage, next to a live example

<!--
`section` with `image`: the DARK PHOTO BAND (brand board D, the site's TEDx / workshop bands): the photo under
a black overlay (`overlay`, default .62), a white title in an ORANGE frame, an orange PART kicker, a light
subtitle. The footer switches to its dark variant and the progress hairline stays orange.
`align: left`: the site's hero split, text on the dark left half, the speaker on the right (same y geometry,
the frame hugs its title). `imagePosition` (default 'center 40%') shifts the 3:2 photo vertically.
-->

---
layout: two-cols-header
layoutClass: gap-x-12
class: or-code-20
---

# Tag and Ts

::left::
```html
# Plot twist <Tag kind="inference" note="strong evidence" />

<Tag kind="inference" />      <!-- dashed -->
<Tag kind="self-reported" />
<Tag kind="opinion" />
<Tag kind="illustrative" />

"it just clicks the upvote button" <Ts t="09:44" />
<Ts t="1:02:03" v="VIDEO_ID" />  <!-- explicit video -->
```

::right::
<p><Tag kind="inference" /> my reconstruction from evidence</p>
<p><Tag kind="self-reported" /> a vendor’s number about itself</p>
<p><Tag kind="opinion" /> a hope or a view</p>
<p><Tag kind="illustrative" /> reconstructed output</p>
<p><Tag kind="inference" note="strong evidence" /> with a note</p>
<p>“it just clicks the upvote button” <Ts t="09:44" /> links to <code>youtube.com/watch?v=…&t=584s</code></p>

::bottom::
<div class="callout info"><p><strong>Tag</strong> labels anything that is not verified fact. <strong>Ts</strong> is the only UI text below 20px: a clickable reference chip (it stays a real link in the PDF).</p></div>

<!--
Components: Tag (4 kinds + note) and Ts (themeConfig.video).
-->

---
layout: two-cols-header
layoutClass: gap-x-12
class: or-code-20
---

# QuoteCard and QrCode

::left::
```html
<QuoteCard who="Tejas Kumar" t="16:51">
So the harness is literally harnessing the
agent to something stable.
</QuoteCard>

<QuoteCard who="Tejas Kumar" src="blog"
           pointer="none">…</QuoteCard>
<!-- pointer: auto (default) | down | up | none -->

<QrCode value="https://oriolrius.me" />
<QrCode value="https://oriolrius.me" :size="160"
        dark="#151652" light="#FFFFFF" />
```

::right::
<QuoteCard who="Tejas Kumar" t="16:51">So the harness is literally harnessing the agent to something stable, something deterministic.</QuoteCard>

<QuoteCard who="Tejas Kumar" src="blog" pointer="none">A model saying it finished is a claim, not evidence.</QuoteCard>

<div class="flex gap-10 items-end mt-4">
<QrCode value="https://oriolrius.me" :size="160" />
<p class="or-aside">Offline SVG, error correction M, no quiet zone. Default 200px, navy on transparent.</p>
</div>

<!--
Components: QuoteCard (t or src; pointer: the first card is auto = down here, the second `pointer="none"`;
auto turns UP in a bottom slot: demo verdict, code-focus/diagram bottom, two-cols-header bottom, four-grid
callout) and QrCode.
-->

---
layout: two-cols-header
layoutClass: gap-x-12
class: or-code-20
---

# Terminal (paper or navy)

::left::
````md
<Terminal title="npm run agent · branch 4"
          size="22" illustrative>

```text
$ git switch 4 && npm run agent
[harness] Login redirect detected
Verify:     PASS - …
```

</Terminal>
````

::right::
<Terminal title="npm run agent · branch 4" size="22" illustrative>

```text
$ git switch 4 && npm run agent
[harness] Login redirect detected
[harness] Login completed
Stopped by: success after 6 iteration(s)
Verify:     PASS - …
```

</Terminal>

<p class="or-aside mt-6">One fenced <code>text</code> block inside, with blank lines around it. <code>size</code> 20 (default), 22 or 24 px on navy-900, no orange bar: it is a window, not code.</p>

<!--
Component: Terminal on the paper surface.
-->

---
layout: default
---

# Deck components: Verdict, BranchRail, HarnessParts

<div class="grid grid-cols-3 gap-12 items-center mt-4">
<div class="flex flex-col gap-6 items-start">
<Verdict kind="lies" />
<Verdict kind="honest" />
<Verdict kind="works" />
<Verdict kind="lies" note="but bounded" />
<p><Verdict kind="works" inline /> <Verdict kind="lies" note="bounded" inline /></p>
</div>
<div class="col-span-2 flex flex-col gap-8">
<BranchRail :current="2" />
<div class="flex gap-12 items-center"><BranchRail :current="3" compact /><HarnessParts :active="['tools','model','context','loop']" :missing="['guardrails','verify']" /></div>
<div class="flex gap-12 items-center"><HarnessParts /><HarnessParts active="all" :new="['verify']" /></div>
</div>
</div>

<div class="callout note mt-8"><p>These three live in the <strong>deck’s</strong> <code>components/</code> (the talk’s own vocabulary); the theme test deck carries copies. See the theme README for their props.</p></div>

<!--
Deck components: Verdict (3 kinds, note, inline), BranchRail (labels / compact), HarnessParts (dimmed, missing, new, all).
-->

---
layout: two-cols-header
layoutClass: gap-x-12
class: or-code-20
---

# Chips, frame and pins

::left::
```html
<span class="or-chip">NOT the loop</span>
<span class="or-chip pass">PASS</span>
<span class="or-chip fail">FATAL</span>
<span class="or-chip muted">RETRY</span>
<span class="or-chip is-struck">Prompt it harder</span>
<div class="or-frame">The rule: …</div>
<div class="or-pins cols-2">
<p><span class="or-step">1</span> Pin text</p>
</div>
```

::right::
<div class="flex gap-3">
<span class="or-chip">NOT the loop</span>
<span class="or-chip pass"><i class="fas fa-circle-check"></i> PASS</span>
<span class="or-chip fail"><i class="fas fa-ban"></i> FATAL</span>
<span class="or-chip muted"><i class="fas fa-rotate"></i> RETRY</span>
<span class="or-chip is-struck">Prompt it harder</span>
</div>

<div class="or-frame mt-8">The rule: the prompt never changes.</div>

<div class="or-pins cols-2 mt-8">
<p><span class="or-step">1</span> Ask the model, sending the conversation and the tool menu</p>
<p><span class="or-step">2</span> The <strong>only</strong> exit, and it believes the model</p>
</div>

<!--
Classes: or-chip (+ pass / fail / muted / is-struck), or-frame, or-pins + or-step.
-->

---
layout: two-cols-header
layoutClass: gap-x-12
class: or-code-20
---

# Boxes and callouts

::left::
<div class="or-box neutral">

### <i class="fas fa-lock"></i> or-box neutral
<p>Facts, “what you rent”.</p>

</div>

<div class="or-box highlight">

### <i class="fas fa-key"></i> or-box highlight
<p>The key insight or the punchline.</p>

</div>

```html
<div class="callout warning">
<p><strong>Title.</strong> Text…</p>
</div>
```

::right::
<div class="callout info"><p><strong>info.</strong> A takeaway sentence or a fact.</p></div>

<div class="callout warning"><p><strong>warning.</strong> A risk, or the classic failure mode.</p></div>

<div class="callout note">
<p><strong>note.</strong> Several paragraphs work: the callout is a grid, not a flex row.</p>
<p>This second paragraph stays in the text column.</p>
</div>

<div class="callout plain"><p><strong>In plain words:</strong> the strip under every code slide, for non-developers.</p></div>

<!--
Classes: or-box neutral / highlight; callout info (slate: navy is kept for dark moments) / warning / note /
plain (multi-paragraph).
-->

---
layout: two-cols-header
layoutClass: "gap-x-12 surface-mist"
---

# Predictions, stats and small text

::left::
<div class="or-predict is-resolved">
<p><b>A</b> It upvotes the story</p>
<p><b>B</b> It crashes with an error</p>
<p class="is-answer"><b>C</b> It fails, and says it succeeded</p>
</div>

<p class="or-lead mt-8">or-lead: an h2-style lead inside slots</p>
<p class="or-attribution">or-attribution · Tejas Kumar</p>
<p class="or-aside">or-aside: italic 22px captions and asides in the muted colour.</p>

::right::
<div class="or-stats">
<div class="or-stat"><b>383</b><span>lines on branch 0</span></div>
<div class="or-stat"><b>746</b><span>lines on branch 4</span></div>
</div>

<ul class="or-checklist mt-6">
<li>or-checklist: square-check bullets</li>
<li>Used for the builder checklist in the appendix</li>
</ul>

<div class="grid gap-5 mt-8">
<span class="or-meter is-large" style="--v:.51">Branch 0 · 383 lines in agent/</span>
<span class="or-meter is-large" style="--v:1">Branch 4 · 746 lines in agent/</span>
</div>

<!--
Classes on the mist surface: or-predict (`is-resolved` + an `is-answer` row: the answer fills, the others step back
in --or-fg-dim with an --or-line letter frame, no opacity), or-lead, or-attribution, or-aside, or-stats / or-stat
(large orange ink #E85A12), or-checklist, or-meter is-large (the site's skills bar: label on top, 24px bar on the
track, white on mist).
On two-cols-header, surface-mist goes through layoutClass (frontmatter `class` goes to the columns).
-->

---
layout: default
---

# The logo on every surface

<div class="grid grid-cols-3 gap-8 mt-6">
<div class="surface-mist flex flex-col items-center justify-center gap-6 py-12"><img src="/brand/logo-framed-orange.svg" alt="oriolrius.me framed logo, orange" class="h-24" /><img src="/brand/wordmark-ubuntu-orange.svg" alt="oriolrius.me wordmark, orange" class="h-8" /><span class="or-attribution">paper · mist</span></div>
<div class="surface-navy flex flex-col items-center justify-center gap-6 py-12"><img src="/brand/logo-framed-white-orange-frame.svg" alt="oriolrius.me framed logo, white with an orange frame" class="h-24" /><img src="/brand/wordmark-ubuntu-white.svg" alt="oriolrius.me wordmark, white" class="h-8" /><span class="or-attribution">navy</span></div>
<div class="surface-band flex flex-col items-center justify-center gap-6 py-12"><img src="/brand/logo-framed-white.svg" alt="oriolrius.me framed logo, white" class="h-24" /><img src="/brand/wordmark-ubuntu-white.svg" alt="oriolrius.me wordmark, white" class="h-8" /><span class="or-attribution">orange band</span></div>
</div>

<p class="or-aside mt-8">The tiles are surface islands (<code>class="surface-navy"</code> on a div). The theme places the logo itself: cover (white letters, orange frame), footer (the framed logo: orange on paper and mist, white letters with an orange frame on navy and photo dividers, all white on the band), end (white framed logo on the band). The deck’s <code>public/brand/</code> carries every variant for manual use.</p>

<!--
Brand check: the logo variants on light, navy and orange.
-->

---
layout: end
kicker: "THANK YOU · QUESTIONS?"
qr: "https://github.com/TejasQ/basically-ai-harness"
qrLabel: "Run branches 0 → 4 tonight"
---

The model brings the intelligence.<br>The harness is what makes it trustworthy.

Tejas Kumar · “What Is an Agent Harness?” (tej.as, 2026-09-14)

::links::
<a class="or-chip on-band" href="https://oriolrius.me"><i class="fas fa-globe"></i> oriolrius.me</a>
<span class="or-chip on-band"><i class="fab fa-github"></i> github.com/TejasQ/basically-ai-harness</span>
<span class="or-chip on-band"><i class="fas fa-pen-nib"></i> tej.as/blog/what-is-an-agent-harness</span>

<!--
`end`: the quote is typed WITHOUT marks: `quoted` (default) adds “ ” and hangs the opening one in the margin
(typed marks are detected and not doubled). White 64px, 1440px column. Attribution, kicker, on-band chips
(the first is a link: `a.or-chip` has no underline), QR tile (300px, 4-module quiet zone, a real link in
the PDF), Oriol's sign-off bottom-left (avatar + signature), framed white logo.
-->
