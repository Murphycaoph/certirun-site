# CertiRun Blog Guidelines

## Status

Blog / Insights is already live and should be treated as a first-class site module.

## Role

The blog supports CertiRun's sourcing-service intent. It should educate buyers and move them toward clearer RFQs, better supplier comparison, and safer sourcing decisions.

## Good Topics

- RFQ preparation
- supplier comparison
- China sourcing risk
- QC checklist basics
- packing and document control
- shipment follow-up
- payment terms and Incoterms
- MOQ and trial orders
- mixed-supplier coordination
- category-specific sourcing notes for electronics, machinery, hardware, and new energy

## Avoid Topics

- part-number long-tail pages
- OE and cross-reference pages
- public fitment databases
- copied supplier marketing copy
- thin AI-generated articles made mainly for ranking
- unsupported price, stock, MOQ, lead-time, certification, or authorization claims

## Internal Link Rules

- Link from articles to relevant service, industry, and contact pages.
- Link article clusters through tags or related posts.
- Keep every article attached to one clear buyer intent.
- Do not add CertiSpares links in phase one.

## Suggested Additional Frontmatter

```ts
intentOwner?: "CertiRun";
buyerIntent?: string;
relatedServices?: string[];
relatedIndustries?: string[];
claimReviewRequired?: boolean;
```
