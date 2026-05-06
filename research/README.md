# CertiRun Phase One Research Output

## Working Assumptions

- CertiRun is an RFQ-first China sourcing execution site, not a SKU catalog.
- Blog / Insights is already a live site module and should remain in navigation.
- Cross-site routing to CertiSpares is deferred for now. Do not add new CertiSpares CTAs, explanatory copy, or links in phase one.
- Existing production route `/capabilities` currently functions as the Services page. A future `/services` alias can be considered, but phase one should respect current routing unless implementation explicitly includes redirects.

## A. Proposed Astro Content Collection Structure

```text
src/content/
  blog/                 # existing live Insights content
  services/             # future collection for buyer-facing service paths
  industries/           # future collection for standardized industry pages
  cases/                # future collection for evidence-led case patterns
  site/                 # optional shared navigation, CTA, and trust copy
```

Recommended dynamic routes after migration:

```text
src/pages/
  capabilities.astro             # current Services landing route
  services/[slug].astro          # optional future service detail route
  industries/[slug].astro
  cases/[slug].astro             # optional when individual case pages exist
  blog/[slug].astro              # existing
  blog/tag/[tag].astro           # existing
  contact.astro
  about.astro
  how-it-works.astro
```

## B. Page Map

| Page | Current URL | Phase One Role |
|---|---|---|
| Home | `/` | RFQ-first entry, industry triage, service proof, and primary sourcing CTA |
| Services | `/capabilities` | Four buyer-facing service paths plus cross-cutting controls |
| Industries | `/industries` | Hub for five standardized sourcing categories |
| Electronics | `/industries/electronics-electronic-components/` | RFQ fields: part/model, datasheet, voltage/current, packing |
| Machinery | `/industries/machinery-industrial-equipment/` | RFQ fields: machine type, working purpose, capacity, voltage/power/phase |
| Hardware | `/industries/hardware-products/` | RFQ fields: size, material, surface treatment, packaging |
| Vehicle Parts | `/industries/vehicle-parts/` | High-level sourcing capability only; no deep part-number expansion in phase one |
| New Energy | `/industries/new-energy-pv-ev-parts/` | RFQ fields: technical spec, voltage/current/power, certificates/datasheets |
| How It Works | `/how-it-works` | Six-step process with input, action, visible output, decision point |
| Cases | `/cases` | Evidence-led case patterns, no fabricated customer stories |
| Blog / Insights | `/blog` | Live content module for sourcing guides and RFQ education |
| About | `/about` | Founder background translated into operating advantages |
| Contact / RFQ | `/contact` | Structured sourcing request form, not generic message capture |

## C. Frontmatter Schemas

### Services

```ts
{
  title: string;
  slug: string;
  description: string;
  buyerIntent: string;
  outcome: string;
  buyerInputs: string[];
  certirunActions: string[];
  visibleOutputs: string[];
  decisionPoints: string[];
  crossCuttingControls?: string[];
  ctaLabel: string;
  ctaHref: string;
}
```

### Industries

```ts
{
  title: string;
  slug: string;
  description: string;
  eyebrow: string;
  h1: string;
  subtitle: string;
  productScope: string[];
  buyerRequests: string[];
  supportSteps: string[];
  quoteFields: string[];
  risks: string[];
  allowedIntent: string;
  excludedIntent?: string[];
  ctaLabel: string;
  ctaHref: string;
}
```

### Cases

```ts
{
  title: string;
  slug: string;
  description: string;
  category: string;
  startingPoint: string;
  whatWasUnclear: string[];
  whatCertirunOrganized: string[];
  visibleOutputs: string[];
  buyerSideValue: string[];
  evidencePolicy: string;
  containsRealCustomerClaim: boolean;
  qaStatus: "draft" | "needs_review" | "approved_for_publish";
}
```

### Guides / Blog

```ts
{
  title: string;
  date: string;
  updatedDate?: string;
  tag?: string;
  readTime?: string;
  excerpt?: string;
  meta_description?: string;
  keywords?: string[];
  ogImage?: string;
  featured?: boolean;
  intentOwner?: "CertiRun";
  buyerIntent?: string;
  relatedServices?: string[];
  relatedIndustries?: string[];
  claimReviewRequired?: boolean;
}
```

## D. Prioritized Implementation Checklist

1. Audit page titles, H1s, meta descriptions, and `og:site_name` for CertiRun consistency.
2. Upgrade `/contact` from generic message form to structured sourcing request fields.
3. Reframe `/capabilities` as four buyer-facing service paths.
4. Strengthen `/how-it-works` so every step has buyer input, CertiRun action, visible output, and buyer decision point.
5. Review five industry pages for standardized structure and category-specific RFQ fields.
6. Keep Vehicle Parts high-level and avoid part-number, OE, fitment, and SKU-depth expansion.
7. Align `/cases` around case patterns and evidence blocks, with no invented customer claims.
8. Rewrite `/about` around requirement clarification, document/detail control, and traceable coordination.
9. Extend blog frontmatter only when needed for internal linking and intent governance.
10. Defer CertiSpares routing until the business owner explicitly reopens that workstream.
