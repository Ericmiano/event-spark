# AAK Members Portal — Event Experience Redesign

A minimalist-modern, highly animated rebuild of the event-facing pages of members.aak.or.ke, built here as a working React reference that maps cleanly onto WordPress later.

## Design direction

Keep the existing AAK palette pulled from the live page: crimson red header/accent, deep navy headings, white surfaces, muted grey text, green booking CTA. Nothing new invented — the same hues, applied with more restraint and air.

The current page is dense and utilitarian: full-bleed red bar, cramped left/right split, bordered table blocks. The redesign keeps that information intact but moves to a calm editorial layout: generous whitespace, one clear accent per section, thin hairline dividers instead of boxes, and a sticky slim nav that condenses on scroll.

Motion is a first-class layer (you asked for the highest level):
- Section reveals on scroll (staggered fade + rise, respecting reduced-motion)
- Sticky hero with parallax poster and a shrinking title
- Animated countdown digits that roll on each tick
- Ticket rows that expand in place with a smooth height transition
- Page-to-page crossfade transitions
- Magnetic/underline hover states on nav and CTAs
- Scroll progress indicator on long content

Performance guardrails: transform/opacity-only animations, GPU-friendly, lazy-loaded posters with correct dimensions to avoid layout shift, motion library code-split so it never blocks first paint.

## Pages

Event-centric set, using the real AAK Annual Convention 2026 content and assets from the live page:

1. **Events list** — cards for upcoming events with date, venue, price-from, CPD badge, status chip.
2. **Event detail** — hero (title, organiser, venue, price-from, Book Now), countdown, CPD/category/type strip, ticket tiers table, About/Theme/Topics, Accommodation & Tours, Programme download, Speakers section (shows an empty state, as the live page does). Sub-nav (About / Accommodation & Tours / Programme / Speakers) becomes a sticky in-page tab rail.
3. **Booking / checkout** — ticket selection, attendee details, order summary, payment step as a stepped flow with animated progress.
4. **View booking** — booking lookup and confirmation/summary view with ticket details.
5. **Event login** — minimal split-screen sign-in for existing registrants.

Shared chrome: slim sticky header with AAK mark + nav, and a minimal footer. Every page shares the same tokens, spacing scale, and motion vocabulary so the design reads as one system.

## Replicability in WordPress

The build deliberately avoids anything hard to reproduce in WordPress:
- All colors, radii, spacing, and type scale live as CSS variables in one stylesheet — copy-pasteable into a WP theme or Elementor global styles.
- Layouts use plain CSS grid/flex sections that map one-to-one to WP blocks/rows.
- Animations use scroll-triggered class toggles and CSS transitions/keyframes, so they can be reproduced with a lightweight scroll library or a plugin such as AOS/GSAP in WordPress.
- No exotic canvas/WebGL effects.

## Technical notes

- Routes: `/` (events list), `/events/$eid` (detail), `/events/$eid/book`, `/booking`, `/login` — TanStack Router file routes, each with its own head() metadata.
- Content: convention copy, ticket tiers, and poster/logo image URLs from the live page kept in a typed data module so a real API can replace it later.
- Motion: Motion for React (framer-motion successor), lazy-loaded; `prefers-reduced-motion` honored globally.
- Tokens added to `src/styles.css` under the existing `@theme inline` system — AAK crimson, navy, ink, muted, and CTA green as semantic tokens; no hardcoded color utilities in components.
- No backend in this phase; forms validate client-side and show success states.

## Out of scope

The live subdomain is a hosted membership platform, so this build cannot change it directly — it is the design reference you replicate in WordPress. Member profile, payments history, and CPD records pages are not included in this pass.
