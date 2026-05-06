# CertiRun Content Collections Plan

## Current State

The site currently has an Astro content collection for `blog` only:

```text
src/content/blog/
src/content/config.ts
```

Phase one should preserve the current blog collection and extend collection usage only where it reduces repetition and improves governance.

## Recommended Collections

### blog

Existing collection. Add governance fields only when implementation needs them.

### services

Use for the four buyer-facing service paths if `/capabilities` is broken into reusable sections or detail pages.

### industries

Use if the five industry pages migrate from `src/data/industryPages.ts` into content collections.

### cases

Use when individual case pages or structured case records are added.

### site

Optional collection for shared CTA copy, trust copy, navigation labels, or repeated evidence snippets.

## Migration Priority

1. Keep blog stable.
2. Improve Contact, Services, How It Works, Cases, and About page copy/structure first.
3. Migrate industry data to a collection only if the current `src/data/industryPages.ts` becomes limiting.
4. Add case collection before publishing individual case pages.

## Schema Governance

Every collection that may include objective claims should include a QA or review field. Avoid publishing unsupported facts as confirmed claims.
