# Tekton Talent Solutions

A complete rebuild of tektontalentglobal.com as a Next.js App Router site:
every piece of content from the original, a new design system, and no Wix.

```
Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS 3
Framer Motion · GSAP ScrollTrigger · Lenis · Zod · Server Actions
```

---

## Getting started

```bash
npm install
cp .env.example .env.local   # optional, see "Forms" below
npm run dev                  # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint       # ESLint (next/core-web-vitals + next/typescript)
npm run typecheck  # tsc --noEmit
```

Node 18.18 or newer.

---

## Design decisions

**Type is the design.** The system runs on extreme scale contrast and nothing in
between: display type set uppercase at viewport scale with sub-1 line-height
(`0.78`), against a light 300-weight body face. Mid-sized type is what makes a
layout read as corporate, so there is deliberately very little of it.

Both voices are **one variable family**. Archivo's width axis is pushed to
`wdth 62` for display and left at `100` for body, so a page that appears to use
two typefaces still makes a single font request.

**Headlines are fitted, not sized.** `FitText` measures the glyph widths of a
line and derives the font size from the box it has to fill, so each line can
declare what fraction of the measure it should occupy (`fills` in `Hero` and
`PageHero`). The uneven column that results *is* the composition — and because
the size is computed from the text, a headline cannot overflow or wrap
unexpectedly at a viewport nobody tested. Anything placed inside a fitted line
must size in `em` (see `Sticker`'s `scaleWithText`), or it breaks the
measurement.

**Colour.** Four grounds — paper, mist, forest, ink — alternated so no two
adjacent sections share both a background and a layout. Accent colour appears
only on rotated `Sticker` annotation tags, which is what keeps it meaning
something.

**Layout.** No centred max-width container. Sections are full-bleed bands with
edge padding (`.edge`) and content positioned on a grid inside them, which is
what allows display type to be set at viewport scale in the first place.

**Motion.** One easing curve (`lib/motion.ts`) across every reveal, hover and
overlay. Display type rises out of masks; body copy uses a quieter rise; images
are uncovered with a clip-path rather than faded. Everything is gated on
`prefers-reduced-motion`, and hover-only behaviour is bound to
`(hover: hover)` rather than a width breakpoint so touch devices never inherit
an interaction they cannot undo.

**Smooth scroll and GSAP.** Lenis drives scrolling and is disabled entirely for
reduced-motion visitors and coarse pointers. `SmoothScroll` marries it to
ScrollTrigger — Lenis runs off GSAP's ticker, ScrollTrigger updates on Lenis's
scroll event — because without both halves pinned content drifts a frame behind.
The held-word sequence in `ProcessPinned` pins with CSS `position: sticky`
rather than a JS pin, which cannot desynchronise from Lenis; ScrollTrigger is
used there only to report which step is active.

## Architecture

```
app/
  layout.tsx              root shell, fonts, metadata, JSON-LD
  template.tsx            per-route transition (remounts on navigation)
  page.tsx                homepage composition
  about|services|expertise|women-and-work|leadership|careers|contact/
  opengraph-image.tsx     generated social card
  icon.svg  robots.ts  sitemap.ts  not-found.tsx  globals.css
components/
  animations/             FitText, SplitTextReveal, ScrollReveal, ImageReveal,
                          ParallaxImage, MagneticButton, CursorFollower,
                          MarqueeText, Counter
  layout/                 Header, MenuOverlay, Footer, Logo, SmoothScroll
  sections/               one file per homepage chapter, reused across pages
  ui/                     Section, PageHero, Sticker, JsonLd
  graphics/               PortraitPlate
  forms/                  Field primitives, HiringForm, CareerForm
hooks/                    useMediaQuery (+ useHasHover, useIsCoarsePointer)
data/                     site, navigation, services, technology-domains,
                          leadership, stats, standards, imagery
lib/                      actions (server), validation (zod), metadata, motion,
                          gsap (single plugin registration), utils
types/                    shared content types
```

Everything on the page comes from `data/`. Adding a service or a technology
domain is a data edit; no component changes, and the sitemap, JSON-LD, careers
dropdown and footer pick it up automatically.

Client components are kept to the ones that genuinely need state: the header,
the two interactive lists, the counters, the forms, the graphics and the scroll
utilities. Every page shell, section wrapper and content block is a server
component.

---

## Forms

Both forms are React 19 **server actions** (`lib/actions.ts`) validated with Zod
(`lib/validation.ts`) — the validation runs on the server, so it cannot be
bypassed. Each form has a honeypot field, field-level error messages wired with
`aria-invalid` / `aria-describedby`, a live status region, and a pending state.
The careers form accepts a CV (PDF/DOC/DOCX, 5 MB cap, type and size checked
server-side).

There is one outbound seam, `deliver()`. Set `TEKTON_ENQUIRY_WEBHOOK` to any
HTTPS endpoint — a Supabase Edge Function, Zapier, Make, n8n, your own API — and
every submission arrives there as JSON, optionally signed with
`TEKTON_ENQUIRY_SECRET` in an `x-tekton-signature` header. With no webhook set,
submissions are validated and logged to the server console, so the site is safe
to deploy before the backend exists.

To store submissions in Supabase, replace the body of `deliver()` with an insert
against a `enquiries` table; the payload shape is already flat and typed.

---

## Content

All copy was taken from the live site, reorganised, and corrected for grammar and
consistency (sentence case, Indian English, "ISO 9001:2015" and "CMMI Level 3"
spelled correctly — the original had "ISO IAF, CMMI Levle3"). No achievement,
certification, client or statistic was invented.

### Content requiring verification

Two items need Tekton's confirmation before launch:

1. **`app/expertise/page.tsx` → `INDUSTRIES`.** The source site says Tekton
   "supports clients across multiple industries" without naming them. The eight
   listed are a plausible reading of the practice, not a claim from the source.
   Confirm, trim or replace. Marked with a comment in the file.
2. **Leadership portraits.** Photographs on the previous site are hosted on Wix
   and their licensing is unclear, so nothing was copied. `PortraitPlate` renders
   a designed monogram plate until real files are added — see
   `public/images/README.md`. Stock photographs are deliberately *not* used here:
   an unrelated person standing in for a named executive would misrepresent them,
   which is a different thing from a placeholder.

### Photography

Section imagery is referenced from Unsplash under the Unsplash Licence
(`data/imagery.ts`, allow-listed in `next.config.mjs`). None of it shows
Tekton's own offices, staff or clients, and no caption implies otherwise — alt
text describes only what is in the frame. Swap the entries in `data/imagery.ts`
for Tekton's own photography when it exists.

Social links point at platform home pages, exactly as the original site did.
Replace the URLs in `data/site.ts` with the real profiles when they exist.

### Content inventory (source → destination)

| Source content | Where it lives now |
| --- | --- |
| Headline, sub-copy, hero CTAs | `components/sections/Hero.tsx` |
| Service line (IT Services, FTE, C2H, C2C, RPO) | Hero marquee |
| 500+ placements, PAN India, Est. 2021, CMMI, ISO | `data/stats.ts` → `ImpactStats` |
| Four service descriptions | `data/services.ts` (+ two capabilities the About block listed but the services grid did not: contract staffing, technical training) |
| Six technology domains and categories | `data/technology-domains.ts` |
| Women / WFH initiative | `WomenAndWork` section + `/women-and-work` |
| Success stories, CSR, inclusive culture | `data/standards.ts` → `Culture` |
| Operational excellence, expert vetting, scale, precision | `data/standards.ts` → `Standards` |
| About paragraph, core capabilities list | `AboutBlock` + `/about` |
| Saikarthik NCH, Harika NCH bios | `data/leadership.ts` |
| Address, email, phone, both CTAs | `data/site.ts` → `FinalCta`, `Footer`, `/contact` |

---

## Accessibility

Semantic landmarks, a skip link, one `h1` per page and a sensible heading order.
Interactive lists are real buttons with `aria-expanded` / `aria-pressed`, so hover
behaviour is fully reachable by keyboard. Focus rings are visible on both tones.
Display headings animate as masked lines but the full string is always in the
DOM, so screen readers and crawlers read ordinary text. All motion respects
`prefers-reduced-motion`; the site is complete and usable with animation off.

## Performance

One variable webfont carries both the display and the body voice, self-hosted
through `next/font` with `display: swap`, so there is no third-party font
request and no layout shift. Photography goes through `next/image` (AVIF/WebP,
explicit `sizes`). No carousel, video or analytics bundle.

Framer Motion is tree-shaken via `optimizePackageImports`, and GSAP is imported
only by `ProcessPinned`, so Next's code splitting keeps it on the homepage
chunk alone — interior routes never download it. The marquee and every hover
transition are CSS, not JS.

Hover-only machinery (the custom cursor, the floating service preview, the
magnetic buttons) is mounted behind `(hover: hover)`, and Lenis is skipped on
coarse pointers, so phones do not pay for desktop effects.

## SEO

Per-page metadata with canonicals, Open Graph and Twitter cards
(`lib/metadata.ts`), a generated OG image, `sitemap.xml`, `robots.txt`, and JSON-LD
for the organisation (`ProfessionalService` with address, credentials and
`knowsAbout`) plus an `ItemList` of services on the homepage and services page.
Copy and page titles target the brief's keyword set: IT recruitment, technology
recruitment, contract staffing, IT staffing, technology consulting, workforce
solutions, PAN India recruitment, Hyderabad IT recruitment.

## Deployment

Deploys to Vercel with no configuration; `npm run build` also produces a standard
Node server for any other host. Set `NEXT_PUBLIC_SITE_URL` in the production
environment so canonicals, the sitemap and social cards use the live domain.
