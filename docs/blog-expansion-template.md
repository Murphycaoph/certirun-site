# Blog Expansion Template

This document defines the standard framework for expanding blog posts under `src/content/blog`.

Use this template for all future edits so the blog grows with a consistent structure, stronger internal linking, and clearer B2B buyer intent.

## Goals

- expand each article into a more complete topical page
- improve readability with clearer section hierarchy
- strengthen internal links between related articles
- add stronger buyer-oriented commercial value
- keep tone professional, practical, and easy for global B2B readers

## Frontmatter Rules

Keep existing frontmatter when it is already good. Update only when needed.

Required fields:

```md
---
title: "..."
date: "YYYY-MM-DD"
tag: "Sourcing Knowledge"
readTime: "7 min read"
excerpt: "..."
---
```

Optional fields to add when useful:

```md
meta_description: "..."
keywords:
  - "keyword 1"
  - "keyword 2"
  - "keyword 3"
featured: true
```

Frontmatter guidance:

- `title`: clear, direct, keyword-focused, not vague
- `excerpt`: 140 to 170 characters is a good target
- `meta_description`: add when the topic has clear search intent
- `keywords`: use only when they are specific and useful
- `readTime`: update if article length grows materially

## Standard Article Structure

Not every article needs every block, but this is the default target structure.

```md
---
frontmatter
---

Intro paragraph 1

Intro paragraph 2

Cluster/context paragraph with 2 to 4 internal links

---

## 1. Core section

Explanation paragraph

- practical point
- practical point
- practical point

---

## 2. Core section

Explanation paragraph

---

## 3. Core section

Explanation paragraph

---

## 4. Buyer-focused section

This section should help buyers make a decision, reduce risk, or inspect suppliers/products better.

- checkpoint
- checkpoint
- checkpoint

---

## 5. Common mistakes or risk points

Short practical guidance.

---

## 6. Checklist / what to confirm

- item to confirm
- item to confirm
- item to confirm

---

## FAQ

### Question 1

Short answer.

### Question 2

Short answer.

### Question 3

Short answer.

---

## Related articles

- [Related page title](/blog/slug)
- [Related page title](/blog/slug)
- [Related page title](/blog/slug)
```

## Section Writing Rules

Each expanded post should usually include:

1. A stronger intro
2. A topic-positioning paragraph with internal links
3. Four to six main H2 sections
4. At least one buyer-oriented section
5. One checklist or action section
6. One FAQ section
7. One related articles section

Recommended article size after expansion:

- `Sourcing Knowledge`: 1,200 to 1,800 words
- `Product Insight`: 1,100 to 1,700 words
- `China Supply Chain`: 1,200 to 1,900 words

## Recommended Expansion Blocks

Choose the blocks that best fit the topic.

### Universal blocks

- What this topic means
- Why it matters for buyers
- Common mistakes
- What to confirm before ordering
- FAQ
- Related articles

### Sourcing Knowledge blocks

- supplier evaluation points
- quotation comparison logic
- payment or shipping implications
- documentation requirements
- audit or inspection checkpoints
- buyer risk-control checklist

### Product Insight blocks

- how the part works
- common failure modes
- inspection points
- replacement timing
- material or manufacturing considerations
- sourcing implications for buyers

### China Supply Chain blocks

- region or cluster background
- why the area matters commercially
- product specialization by region
- logistics implications
- sourcing advantages and limits
- when buyers should choose that region

## Internal Link Rules

Every expanded article should include `3 to 5` internal links, ideally from the same topic cluster plus one adjacent cluster.

Preferred link pattern:

- 2 to 3 links to closely related articles
- 1 link to a broader pillar article
- 1 link to a commercial page when natural, such as `/contact`, `/sourcing`, `/how-it-works`, or `/product`

Examples:

- sourcing article -> supplier, audit, quotation, payment pages
- brake drum article -> testing, inspection, lifespan, supplier pages
- suspension article -> failure, component, metallurgy, wheel-end pages
- supply chain article -> region, logistics, industrial cluster, sourcing pages

Do not force links into every paragraph. Keep them natural.

## Tone and Style Rules

- write in clear business English
- keep tone practical, not academic
- use short to medium paragraphs
- explain terms simply for international buyers
- avoid exaggerated sales language
- make the article feel useful for importers, distributors, and fleet-related buyers

Use this voice:

- confident
- practical
- buyer-oriented
- specific

Avoid:

- empty generalities
- keyword stuffing
- long blocks with no structure
- overpromising claims

## SEO and Conversion Rules

For each article, aim to cover:

- one primary topic
- two to four supporting subtopics
- one comparison, checklist, or decision angle
- one FAQ cluster

Commercial intent should be subtle but clear. Good places to add conversion intent:

- intro context paragraph
- buyer checklist section
- closing paragraph before related links

Useful CTA styles:

- invite buyers to compare sourcing options
- suggest factory-audit or inspection planning
- direct readers to product or sourcing pages
- invite inquiry for specific truck-parts categories

## H2 and H3 Rules

- use `##` for main sections
- use `###` mainly inside FAQ or when one H2 needs clearer sub-structure
- keep headings descriptive and readable
- avoid vague headings like `Overview` or `Conclusion` unless they add real value

Good heading examples:

- `## How Buyers Should Compare Supplier Quotations`
- `## Common Failure Modes in Heavy Truck Suspension Systems`
- `## What to Check Before Shipment`

## Daily Editing Workflow

Use this workflow each day when updating one article.

1. Read the full article and identify its current cluster role.
2. Keep what is already strong. Do not rewrite just for the sake of rewriting.
3. Expand the intro and topic-positioning paragraph.
4. Add missing buyer-value sections.
5. Add 3 to 5 internal links.
6. Add or improve FAQ.
7. Tighten heading structure and readability.
8. Update frontmatter if excerpt, keywords, or read time need revision.
9. Check that the article still matches the site tone and target audience.

## Final Quality Checklist

Before finishing an article, confirm:

- the title is clear and search-friendly
- the intro explains why the topic matters
- the article has enough depth, not just surface explanation
- there is at least one buyer-facing decision section
- there are 3 to 5 internal links
- the FAQ is useful and not repetitive
- the page is easy to scan
- the article supports the wider topic cluster

## Lightweight Copy Template

Use this as the starting skeleton when expanding an article.

```md
---
title: "..."
date: "YYYY-MM-DD"
tag: "..."
readTime: "7 min read"
excerpt: "..."
---

Opening paragraph explaining the topic.

Second paragraph explaining why it matters for B2B buyers.

This article fits into the broader topic cluster. Link to 2 to 4 related pages here.

---

## 1. What It Is / Core Concept

Explain the core concept clearly.

---

## 2. Why It Matters

Explain commercial, technical, or sourcing importance.

---

## 3. Key Risks / Differences / Process Points

- point
- point
- point

---

## 4. What Buyers Should Check

- checkpoint
- checkpoint
- checkpoint

---

## 5. Common Mistakes

Explain the most common errors and how to avoid them.

---

## FAQ

### Question

Answer.

### Question

Answer.

### Question

Answer.

---

## Related Articles

- [Article title](/blog/slug)
- [Article title](/blog/slug)
- [Article title](/blog/slug)
```

## Cluster-Specific Notes For This Site

Use these priorities when expanding existing CertiRun articles.

### Sourcing Knowledge

Prioritize:

- supplier credibility
- quotation comparison
- inspection and audit logic
- commercial terms
- buyer risk reduction

### Product Insight

Prioritize:

- function
- failure and wear
- inspection
- replacement judgment
- sourcing impact

### China Supply Chain

Prioritize:

- industrial cluster logic
- regional specialization
- lead time and inland logistics
- material and upstream supply
- why the region matters for sourcing outcomes

## Execution Note

When we update future posts, default to this template first, then adapt to the article type rather than writing from scratch each time.
