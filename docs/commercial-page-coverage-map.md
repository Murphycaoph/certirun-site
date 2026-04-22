# Commercial Page Coverage Map

Updated: 2026-04-11

## Purpose

This document tracks the first completed phase of CertiRun' commercial-page system.

The goal is to keep three layers aligned:

- core service pages
- commercial landing pages under `/product/`
- blog articles that now route informational traffic toward those commercial pages

This file is meant to support the next stages of work:

- reverse-link planning
- duplicate-id cleanup
- future brand and part-category expansion

---

## Core Structure

### Core service pages

- `/`
  Value proposition page
- `/sourcing/`
  Main sourcing-service page
- `/capabilities/`
  Capability proof page
- `/how-it-works/`
  Workflow page
- `/contact/`
  RFQ conversion page

### Product entry logic

- `/product/`
  Pivot-style entry page for inquiry-based sourcing
- `/product/brand/[brand]/`
  Brand-led commercial pages
- `/product/part/[part-category]/`
  Part-system commercial pages

Important constraint:

- CertiRun does not present a public SKU or OE database.
- Matching remains inquiry-based through OE number, VIN, part list, photos, dimensions, quantities, and vehicle details.

---

## Brand Landing Pages

### Domestic and China-linked truck brands

- `/product/brand/howo/`
- `/product/brand/shacman/`
- `/product/brand/dongfeng/`
- `/product/brand/foton/`
- `/product/brand/faw/`
- `/product/brand/jac/`

### International truck brands supported through China-based sourcing

- `/product/brand/man/`
- `/product/brand/volvo-truck/`
- `/product/brand/mercedes-benz-truck/`

### Current gap

- `Sinotruk` does not yet exist as a separate brand landing page.

---

## Part-System Landing Pages

- `/product/part/engine-parts/`
- `/product/part/brake-system-parts/`
- `/product/part/air-system-parts/`
- `/product/part/suspension-parts/`
- `/product/part/steering-parts/`
- `/product/part/axle-and-wheel-end-parts/`
- `/product/part/clutch-and-transmission-parts/`
- `/product/part/electrical-parts/`
- `/product/part/cooling-system-parts/`
- `/product/part/rubber-and-bushing-parts/`

---

## Completed Blog-to-Commercial Routing

The first routing phase has been completed in three content layers:

- product-knowledge layer
- system/material layer
- sourcing-decision layer

### A. Product and wear-category layer

- `/blog/common-wear-parts-commercial-vehicles-replacement-cycle/`
  Routes toward:
  - `/product/part/brake-system-parts/`
  - `/product/part/suspension-parts/`
  - `/product/part/axle-and-wheel-end-parts/`
  - `/product/part/rubber-and-bushing-parts/`
  - `/product/part/clutch-and-transmission-parts/`
  - `/product/`

- `/blog/wheel-hub-heavy-truck-structure-function/`
  Routes toward:
  - `/product/part/axle-and-wheel-end-parts/`
  - `/sourcing/`

- `/blog/leaf-springs-in-heavy-trucks-function-failure-and-replacement/`
  Routes toward:
  - `/product/part/suspension-parts/`
  - `/product/part/rubber-and-bushing-parts/`
  - `/contact/`

- `/blog/truck-brake-pads-vs-brake-linings-whats-the-difference/`
  Routes toward:
  - `/product/part/brake-system-parts/`
  - `/product/`
  - `/contact/`

### B. System and material-control layer

- `/blog/metallurgy-and-material-control-in-heavy-truck-parts/`
  Routes toward:
  - `/product/part/engine-parts/`
  - `/product/part/suspension-parts/`
  - `/product/part/axle-and-wheel-end-parts/`
  - `/capabilities/`
  - `/contact/`

- `/blog/how-steel-supply-affects-truck-parts-manufacturing/`
  Routes toward:
  - `/product/part/engine-parts/`
  - `/product/part/suspension-parts/`
  - `/product/part/axle-and-wheel-end-parts/`
  - `/sourcing/`
  - `/contact/`

- `/blog/stabilizer-bars-in-heavy-trucks-structure-and-purpose/`
  Routes toward:
  - `/product/part/suspension-parts/`
  - `/product/part/rubber-and-bushing-parts/`
  - `/product/`

- `/blog/torque-rods-in-commercial-vehicles-what-buyers-should-know/`
  Routes toward:
  - `/product/part/suspension-parts/`
  - `/product/part/rubber-and-bushing-parts/`
  - `/contact/`

### C. Commercial and sourcing-decision layer

- `/blog/oem-vs-aftermarket-truck-parts-in-china-what-global-buyers-should-know/`
  Routes toward:
  - `/product/brand/man/`
  - `/product/brand/howo/`
  - `/product/brand/shacman/`
  - `/product/part/engine-parts/`
  - `/product/part/brake-system-parts/`
  - `/product/part/air-system-parts/`
  - `/sourcing/`

- `/blog/minimum-order-quantity-moq-explained-for-auto-parts-buyers/`
  Routes toward:
  - `/product/part/brake-system-parts/`
  - `/product/part/engine-parts/`
  - `/product/part/clutch-and-transmission-parts/`
  - `/product/`
  - `/contact/`

- `/blog/trading-company-vs-manufacturer-in-china/`
  Routes toward:
  - `/product/`
  - `/product/brand/howo/`
  - `/product/brand/man/`
  - `/product/part/engine-parts/`
  - `/contact/`

- `/blog/how-to-build-a-reliable-supplier-network-in-china/`
  Routes toward:
  - `/product/`
  - `/product/brand/howo/`
  - `/product/part/brake-system-parts/`
  - `/sourcing/`

- `/blog/how-to-avoid-quality-disputes-when-importing-auto-parts/`
  Routes toward:
  - `/product/`
  - `/product/part/air-system-parts/`
  - `/sourcing/`
  - `/contact/`

---

## Commercial Pages Already Supported by Existing Blog Traffic

### Strongest support so far

- `/product/part/brake-system-parts/`
- `/product/part/suspension-parts/`
- `/product/part/air-system-parts/`
- `/product/part/engine-parts/`
- `/product/part/axle-and-wheel-end-parts/`
- `/product/part/rubber-and-bushing-parts/`
- `/product/brand/howo/`
- `/product/brand/man/`

### Medium support so far

- `/product/brand/shacman/`
- `/product/part/clutch-and-transmission-parts/`
- `/product/`

### Still weaker and likely to need future routing

- `/product/brand/dongfeng/`
- `/product/brand/foton/`
- `/product/brand/faw/`
- `/product/brand/jac/`
- `/product/brand/volvo-truck/`
- `/product/brand/mercedes-benz-truck/`
- `/product/part/electrical-parts/`
- `/product/part/cooling-system-parts/`
- `/product/part/steering-parts/`

---

## Build Status

Current known state after this phase:

- `npm run build` passes
- site currently builds to 74 pages
- sitemap generation succeeds

Known deferred issue:

- Astro `Duplicate id` warnings still appear intermittently on recently edited blog files
- cleanup has been intentionally deferred to a later concentrated pass

---

## Recommended Next Phase

### Option 1: Finish coverage gaps

Add blog-routing support for weaker commercial pages, especially:

- steering-related blogs -> `/product/part/steering-parts/`
- electrical or service-item blogs -> `/product/part/electrical-parts/`
- cooling or wear-related blogs -> `/product/part/cooling-system-parts/`
- regional or buyer-intent pages -> selected international brand pages

### Option 2: Concentrated cleanup pass

- clear Astro cache
- remove duplicate-id warnings
- verify no accidental duplicate content registration remains

### Option 3: Commercial-page interlink refinement

- improve cross-links among brand pages
- improve cross-links among part-system pages
- define stronger brand-to-part and part-to-brand navigation paths
