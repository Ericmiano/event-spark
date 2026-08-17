# AAK Events Platform — Comprehensive Design Prompt

## Project Overview
This is an event discovery, booking, and management platform for the Architectural Association of Kenya (AAK). The site showcases upcoming conventions, summits, and CPD-accredited professional development sessions for architects, engineers, planners, surveyors, and construction managers. The platform facilitates browsing events, booking tickets, viewing accommodations, managing tours, and tracking existing reservations.

---

## Design System Foundation

### Color Palette (All colors use OKLCH format for consistent perception)

#### Primary AAK Brand Colors (sampled from members.aak.or.ke)
- **Crimson** (Primary action): `oklch(0.468 0.176 21.5)` — Rich, deep red-burgundy used for CTAs, accents, and highlights
- **Crimson Soft** (Accent background): `oklch(0.955 0.02 20)` — Very pale warm accent for tag backgrounds and soft highlights
- **Navy** (Primary text): `oklch(0.268 0.062 264)` — Deep navy blue used for main text, headlines, and primary content
- **Ink** (Secondary text): `oklch(0.32 0.02 260)` — Slightly lighter navy for secondary body text
- **Sand** (Background accent): `oklch(0.982 0.004 90)` — Off-white/cream, very subtle warm neutral
- **Hairline** (Borders): `oklch(0.9 0.006 260)` — Extremely light cool-neutral for borders and dividers
- **Success** (Positive state): `oklch(0.62 0.16 150)` — Vibrant green for confirmations and positive indicators
- **Success Foreground**: `oklch(0.99 0 0)` — Off-white for text on success backgrounds

#### Semantic Color Mapping (Light Mode by default)
- **Background**: Pure white (`oklch(1 0 0)`)
- **Foreground**: Navy (`oklch(0.268 0.062 264)`)
- **Card**: White with navy text
- **Primary**: Crimson buttons with off-white text
- **Primary Foreground**: Off-white (`oklch(0.99 0 0)`)
- **Secondary**: Sand/cream (`oklch(0.982 0.004 90)`)
- **Secondary Foreground**: Navy
- **Muted**: Light cool gray (`oklch(0.972 0.004 260)`)
- **Muted Foreground**: Medium cool gray (`oklch(0.52 0.02 260)`)
- **Accent**: Crimson Soft background with Crimson foreground
- **Border**: Hairline (`oklch(0.9 0.006 260)`)
- **Input**: Hairline
- **Ring** (Focus state): Crimson

#### Dark Mode (Secondary Support)
- **Background**: Deep navy (`oklch(0.129 0.042 264.695)`)
- **Foreground**: Off-white
- **Card**: Medium navy (`oklch(0.208 0.042 265.755)`)
- **Primary**: Light border/text (desaturated)
- **Border**: Slightly transparent white (`oklch(1 0 0 / 10%)`)
- **Input**: Slightly transparent white with higher opacity (`oklch(1 0 0 / 15%)`)

#### Chart Colors (Recharts compatibility)
Five distinct colors for data visualization (e.g., charts, progress indicators)

### Typography System

#### Font Families
- **Display Font**: "Archivo" (weights: 500, 600, 700)
  - Used for: H1, H2, H3, H4 headings, large numbers (countdown), price displays, badge labels
  - Characteristics: Geometric, modern, confident sans-serif
  - Features: OpenType `ss01` feature enabled for stylistic alternates

- **Body Font**: "Manrope" (weights: 400, 500, 600)
  - Used for: Body text, labels, UI controls, navigation
  - Characteristics: Friendly, rounded humanist sans-serif
  - Features: Excellent readability at all sizes

- **System Fallback**: `ui-sans-serif, system-ui, sans-serif`

#### Font Weights
- 400: Regular body text, small labels
- 500: Body emphasis, medium buttons, small headers
- 600: Large body text, medium headers, bold labels
- 700: Large headers (H1, H2)

#### Text Rendering & Features
- `-webkit-font-smoothing: antialiased` for sharper text on macOS
- `font-feature-settings: "ss01"` enables stylistic alternates in Archivo
- `text-wrap: balance` on all headings for optimal line breaking
- `letter-spacing: -0.02em` on all headings for tighter spacing

#### Selection Color
- Background: Crimson
- Text: Off-white
- Creates high-contrast text selection experience

### Spacing & Rhythm
- **Border Radius Base**: 1px (0.25rem)
  - `radius-sm`: -4px from base = -3px (negative radius not practical, likely unused)
  - `radius-md`: -2px from base = -1px (practical minimum)
  - `radius-lg`: 1px (default, sharp corners)
  - `radius-xl`: +4px = 5px
  - `radius-2xl`: +8px = 9px
  - `radius-3xl`: +12px = 13px
  - `radius-4xl`: +16px = 17px

- **Padding & Margins**: Standard Tailwind scale (4px, 8px, 12px, 16px, 20px, 24px, etc.)
- **Gap System**: Flexible gaps (3, 4, 6, 8, etc. in rem)

### Layout Structure

#### Container Width
- **Max Width**: `max-w-6xl` (1152px content width with padding)
- **Horizontal Padding**: `px-6` (24px on each side) on all main sections
- **Margin**: `mx-auto` to center content

#### Section Spacing
- **Section Padding**: Vertical padding ranges from `py-16` to `py-28`
  - Hero sections: `py-20 sm:py-28` (80px / 112px)
  - Standard sections: `py-20` (80px)
  - Compact sections: `py-16` (64px)

#### Grid Systems
- **Two-column grid**: `lg:grid-cols-[1.1fr_0.9fr]` or `lg:grid-cols-[0.85fr_1.15fr]`
  - Text on left (primary), visual element on right (secondary)
  - Responsive: Single column on mobile, full width below lg breakpoint
  - Gap: `gap-8` or `gap-12` between columns

- **Event card grid**: Single column with `space-y-6` on mobile
  - Desktop uses `sm:grid-cols-[220px_1fr_auto]` with `gap-8`

- **Media gallery grid**: `grid-cols-2 gap-3` or `sm:grid-cols-3 gap-3`
  - Four-column variant: `sm:grid-cols-4`

---

## Component Library & Patterns

### Navigation & Header
**Sticky header** (`sticky top-0 z-50`)
- **Base state**: `py-4`, shows full brand name + subtitle
- **Condensed state** (scrolled): `py-2`, hides subtitle with opacity transition
- **Styling**: Semi-transparent backdrop (`bg-background/85 backdrop-blur-md`), subtle border below
- **Border**: `border-b border-border/70`
- **Transition**: All property changes animate over 500ms with smooth easing

**Logo/Brand**
- Font: Display family, `text-lg font-semibold tracking-tight`
- Color: Navy
- Links to homepage

**Navigation Menu** (Desktop: visible on md+, Mobile: collapsible)
- **Desktop nav items**: `gap-8`, text-sm, navy with hover-to-crimson transition
- **Active state**: Crimson text with underline animation (`.rule-link`)
- **Login button**: Navy border, white background, navy text
  - Hover: Navy background with white text (inverted)
  - Styling: `px-4 py-2`, `text-xs uppercase tracking-[0.18em]`, no rounded corners (minimal radius)

**Mobile Menu**
- Toggle button with hamburger/close icons (lucide-react `Menu` / `X`)
- Animated collapse/expand: `grid-rows-[0fr] opacity-0` when closed, `grid-rows-[1fr] opacity-100` when open
- Transition: 500ms duration
- Menu items stack vertically with `gap-4`

**Sticky Header Navigation Rail** (secondary, on event detail pages)
- Positioned: `sticky top-[57px] z-40` (below main header)
- Full width with padding: `py-4`
- Background: `bg-background/90 backdrop-blur-md` with border below
- Horizontal scroll on mobile: `overflow-x-auto whitespace-nowrap`
- Item styling: `gap-7` between sections, text-sm
- Active section: Crimson text with underline, inactive: muted-foreground

### Footer
**Site Footer** (`mt-24 border-t border-border`)
- Layout: Flex row on desktop (`sm:flex-row sm:items-center sm:justify-between`), column on mobile
- Content: Brand name on left, links on right
- Text: Tiny uppercase (`text-xs uppercase tracking-[0.22em]`)
- Link styling: `.rule-link` with hover-to-crimson
- Links: Home, My Booking, aak.or.ke (external)

### Cards & Containers

**Event Listing Card** (`.lift` utility applied)
- **Layout**: Three-column grid on desktop (`sm:grid-cols-[220px_1fr_auto]`)
  - Left: Poster image
  - Center: Event details
  - Right: Price and metadata

- **Styling**:
  - Border: `border border-border`
  - Padding: `p-6 sm:p-8`
  - Background: `bg-card` (white)
  - `.lift` hover effect: Lifts 4px up, shadow: `0 18px 40px -24px navy/0.35`

- **Image Container**:
  - Overflow hidden: `overflow-hidden`
  - Background: `bg-secondary` (sand)
  - Aspect ratio: Portrait (4:5)
  - Height: `h-48` on mobile, full `h-full` on desktop
  - Hover effect: Image scales 1.04x, smooth 700ms transition

- **Category Badge**:
  - Background: `bg-accent` (crimson-soft)
  - Text: `text-accent-foreground` (crimson)
  - Styling: `px-2 py-1`, `text-[11px] uppercase tracking-[0.2em]`

- **Title**: Font-display, `text-2xl sm:text-3xl`, navy, semibold
- **Tagline**: `text-sm leading-relaxed`, muted-foreground
- **Metadata** (date, location): `flex gap-2`, icons from lucide-react (Calendar, MapPin), crimsons icons

- **Price Display** (bottom right):
  - Label: "From", tiny uppercase, muted-foreground
  - Amount: Font-display, `text-xl` font-semibold, navy
  - "View event" link: text-sm, crimson, with arrow icon that animates on hover (+1px right, -1px up)

### Booking/Information Cards
- **Border**: All four sides: `border border-border`
- **Padding**: `p-6 sm:p-8`
- **Background**: `bg-card`
- **Used for**: Booking confirmation, accommodation info, tour details

### Button Styles

**Primary Button (CTAs)**
- Background: Crimson
- Text: Off-white, uppercase, `text-sm`, `tracking-[0.18em]`
- Padding: `px-7 py-3.5` or `px-4 py-2`
- Hover: Background transitions to navy
- Outline: `.inline-flex items-center gap-3` for icon + text

**Secondary Button (Outlined)**
- Border: Navy or current text color
- Background: Transparent (or background on hover)
- Text: Navy or current color
- Styling: `px-6 py-3` or `px-4 py-2`, uppercase, `text-xs tracking-[0.18em]`
- Hover: Background fills with border color, text becomes light/inverted

**Link Styles** (`.rule-link` utility)
- Base: Relative positioning, regular text color
- Underline: Hidden by default, positioned 3px below text, `scaleX(0)`, full width
- Hover/Active: Underline animates in from left: `scaleX(1)`
- Transition: 350ms cubic-bezier(0.16, 1, 0.3, 1)

### Forms & Input Elements

**Form Sections**
- Focus state: Border animates from `border-border` to `border-crimson`
- Typically positioned with label above and input below
- Input: Transparent background with navy text, muted-foreground placeholder
- Full width unless constrained

**Specific Form Examples**
- Booking reference lookup: `flex items-end gap-4` with search button
- Ticket selection: Expandable sections with quantity increment/decrement

### Media Gallery
**Grid Display**
- Default: `grid-cols-2 gap-3`
- Responsive: `sm:grid-cols-3` (or `sm:grid-cols-4` for hero gallery)
- Aspect ratio: `aspect-[4/3]` (landscape)

**Gallery Items**
- Image: Full width, `h-full w-full object-cover`
- Hover: Scale 1.06x over 700ms
- Video overlay: `bg-navy/20` with play icon, hover darkens to `bg-navy/35`
- Placeholder (no media yet): Bordered dashed area with camera icon + "Photos coming soon" label

**Lightbox Modal**
- Dialog overlay with transparent styling
- Content: `max-w-3xl`, `border-0 bg-transparent p-0 shadow-none`
- Media scaling: Images `max-h-[80vh] w-full object-contain`, videos `aspect-video w-full`
- Supports YouTube, Vimeo, and native video embeds

### Countdown Timer
**Display Format**: Four columns (Days, Hours, Minutes, Seconds)
- Layout: Grid with `divide-x divide-border` (vertical dividers), `border-y border-border` top/bottom
- Each column: Centered, `px-2 py-5`

**Number Animation** (`.digit-roll` utility)
- Animation: Rolls up from 60% offset with fade-in
- Duration: 450ms cubic-bezier(0.16, 1, 0.3, 1)
- Font: Display family, `text-2xl sm:text-3xl`, font-semibold, navy
- Monospace numbers: `tabular-nums` for consistent width

**Label** (under each number)
- Tiny uppercase: `text-[10px] uppercase tracking-[0.24em]`
- Color: Muted-foreground
- Margin: `mt-1`

---

## Animation & Motion

### Scroll Progress Bar
- **Position**: Fixed top, full width: `fixed inset-x-0 top-0 z-[60] h-[2px]`
- **Color**: Crimson
- **Effect**: Horizontal scale from left, calculated as `(scrollY / maxScroll) * 100%`
- **Transform origin**: `origin-left` for left-to-right fill
- **Performance**: Uses `requestAnimationFrame` and `will-change: transform`

### Reveal/Fade-in Animation (`.reveal` utility)
- **Initial state**: `opacity-0 translate3d(0, 18px, 0)` (transparent, shifted 18px down)
- **Animation**: 0.7s cubic-bezier(0.16, 1, 0.3, 1) on both opacity and transform
- **Trigger**: IntersectionObserver watches for element entering viewport
- **Threshold**: 12% visibility required
- **Root margin**: Bottom margin of -8% (starts animation slightly before fully visible)
- **Stagger effect**: Child elements can have `--reveal-delay` CSS variable for cascading reveals
  - Delays typically: 0ms, 70ms, 80ms, 90ms, etc. (incremental)
- **Accessibility**: Respects `prefers-reduced-motion` (animations disabled)

### Hover Effects
**Image Scaling** (`.group-hover:scale-[1.04]` or `1.06`)
- Scale factor: 1.04x to 1.06x depending on context
- Duration: 700ms
- Easing: Linear (default, no curve specified)
- Use case: Event card images, gallery items

**Lift Effect** (`.lift` utility)
- Hover: `transform translate3d(0, -4px, 0)`
- Shadow: `box-shadow: 0 18px 40px -24px oklch(0.268 0.062 264 / 0.35)`
- Duration: 400ms cubic-bezier(0.16, 1, 0.3, 1)
- Applied to: Event cards, buttons

**Color Transitions**
- Link hover: Navy → Crimson over default duration
- Button hover: Primary → Navy or inverse fill
- Transition: 300ms cubic-bezier(0.16, 1, 0.3, 1) (default)

### Icon Animations
**Arrow Icons** on hover
- Translate: `translate-x-1 -translate-y-1` (1px right, 1px up)
- Duration: 300ms
- Used on CTA links like "View event", "Book now"

**Underline Animation** (`.rule-link`)
- Draws from left to right
- Transform origin: `left`
- Duration: 350ms cubic-bezier(0.16, 1, 0.3, 1)

### Header Scroll Behavior
- **Scroll behavior**: `scroll-behavior: smooth` on HTML element
- **Sticky positioning**: Header remains at top while scrolling
- **Parallax effect**: Event poster image translates down slightly as user scrolls
  - Offset: `Math.min(60, scrollY * 0.08)`
  - Scale: 1.03x
  - Uses `will-change-transform` for GPU acceleration

---

## Page Structure & Layout Patterns

### Homepage (Events Index)
**Hero Section**
- Layout: Full width, centered content to `max-w-6xl`
- Spacing: `border-b border-border py-20 sm:py-28`
- Eyebrow: Text-[11px] uppercase, crimson, tracking-[0.28em]
- Headline: Font-display, `text-4xl sm:text-6xl`, font-semibold, navy, `max-w-3xl`
- Subheadline: `text-base leading-relaxed`, muted-foreground, `max-w-xl`
- All elements use Reveal animation with staggered delays (0ms, 80ms, 160ms)

**Events List Section**
- Section heading: "Upcoming" in tiny uppercase
- Layout: Vertical list (`space-y-6`) of event cards
- Each card: See "Event Listing Card" component details above
- Reveal animations: Staggered by index (`i * 90`)

### Event Detail Page
**Sticky Scroll Progress**: Red line at top represents page scroll position

**Hero Section** (with two-column layout on desktop)
- Left column:
  - Category eyebrow (crimson, small)
  - Large headline with event title (navy, font-display)
  - Italic tagline (muted-foreground)
  - Date/time/location with icon (Clock, MapPin, Ticket icons in crimson)
  - CTA buttons: "Book now" (crimson, primary) and "Already registered?" (rule-link)
  - Countdown timer below

- Right column (lg breakpoint and above):
  - Sticky positioning: `lg:sticky lg:top-28 lg:self-start`
  - Event poster image with parallax scroll effect
  - Metadata below: CPD points and event type (tiny uppercase, muted-foreground)

**Section Navigation Rail** (sticky below main header)
- Sections: About, Tickets, Accommodation & Tours, Programme, Speakers
- Horizontally scrollable on mobile
- Active section indicator uses rule-link underline
- Color: Muted-foreground (inactive), Crimson (active)

**Section: About**
- Heading with index: "01" in display font, crimson
- Two-column layout: Text on left, theme box on right
- Theme box: Large heading with subtitle (crimson italic), body paragraphs below
- Topic list: Numbered items in small font with hover translate effect

**Section: Tickets**
- Ticket tiers displayed as expandable cards
- Open tiers (sale active) vs closed tiers (sold out)
- Quantity selector with +/- buttons

**Section: Accommodation & Tours**
- Similar two-column pattern
- Location and booking details on left
- Media gallery on right

**Section: Programme**
- Link to downloadable programme (PDF or external page)

**Section: Speakers**
- List of speakers with name and role

### Tours/Accommodation Page
**Page Structure**: Similar hero to event detail, then sections for each event

**Accommodation Section**
- Title with event name eyebrow
- Text intro on left, media gallery on right
- "View event" button linking to full event detail
- Media gallery: 2-3 columns with 4:3 aspect ratio

**Technical Tours Section**
- Hero media gallery: 4-column grid showcasing tour destinations
- List of destinations below, each with:
  - Destination name and description
  - Media gallery (2-3 columns)
  - Tour details (if applicable)

### Booking Lookup Page
**Page Layout**: Centered, `max-w-3xl`, full height

**Search Form**
- Title: "View your booking"
- Label: "Booking reference or email"
- Input: Full width, transparent background, navy text
- Button: Search icon + "Find" text
- Border animation: Crimson on focus

**Results Section** (hidden by default, animated in)
- Booking card with confirmed status badge
- Details table (Reference, Ticket, Amount, Dates, Venue, CPD points)
- Each row: Definition list with `py-4` spacing

### Login Page
- Simple authentication form (not detailed in exploration, but follows same patterns)

---

## Easing Functions & Timing

### Primary Easing Curve
`cubic-bezier(0.16, 1, 0.3, 1)`
- Used for: Reveal animations, hover transitions, link underlines, scroll effects
- Characteristic: Smooth ease-out with slight overshoot, feels elegant and responsive

### Alternative Easing
- Linear: Some image hover scales
- Transition defaults: 300ms, 350ms, 400ms, 500ms, 700ms depending on context

### Accessibility
- `prefers-reduced-motion: reduce` respected throughout
  - Sets all animation-duration and transition-duration to 0.001ms
  - Disables smooth scroll behavior
  - Applies globally with `!important`

---

## Responsive Design Breakpoints

Using Tailwind's default breakpoints:
- **sm**: 640px (landscape phones, small tablets)
- **md**: 768px (tablets)
- **lg**: 1024px (desktops, large tablets)
- **xl**: 1280px (large desktops)
- **2xl**: 1536px (very large screens)

### Mobile-First Approach
- Base styles are mobile (single column, full-width)
- Progressive enhancement at `sm`, `md`, `lg` breakpoints
- Header: Hidden nav menu on mobile, visible at `md` and above
- Layout: Single column below `lg`, multi-column at `lg` and above
- Font sizes: Smaller on mobile (`text-4xl sm:text-6xl`)
- Images: Full width on mobile, constrained in columns on desktop
- Sticky headers adjust height and spacing based on scroll position

---

## UI Library & Dependencies

### Radix UI Components (Primitives)
All accessible base components from Radix UI, styled with custom CSS and Tailwind:
- Dialog, Dropdown Menu, Popover, Select, Tabs
- Accordion, Collapsible, Context Menu
- Hover Card, Navigation Menu, Pagination
- Radio Group, Switch, Toggle, Toggle Group
- Checkbox, Slider, Progress
- Alert Dialog, Sheet, Sidebar
- Skeleton, Separator, Scroll Area
- Label, Input, Textarea, Form (via react-hook-form)

### Icons
- **Library**: Lucide React
- **Common icons used**:
  - Navigation: Menu, X
  - Information: Clock, MapPin, Ticket, Camera, Download
  - Actions: ArrowUpRight, ArrowRight, Search
  - Media: PlayCircle
  - Plus/Minus for quantity selection

### Additional Libraries
- **React Hook Form**: Form state management
- **React Query (@tanstack/react-query)**: Server state and caching
- **React Router (@tanstack/react-router)**: Client-side routing and navigation
- **TanStack Start**: Full-stack React framework (SSR)
- **Motion**: Animation library (for advanced animations if needed)
- **Recharts**: Data visualization for charts
- **Embla Carousel**: Carousel/slider functionality
- **Date-fns**: Date manipulation and formatting

---

## Color Application Examples

### Text Colors
- **Primary text**: Navy (headings, body)
- **Secondary text**: Ink (slightly lighter navy)
- **Muted text**: Muted-foreground (labels, helpers)
- **Interactive text**: Crimson (links, CTAs, hover states)
- **Inverted text**: Off-white on dark backgrounds

### Background Colors
- **Page background**: White (background color)
- **Card backgrounds**: White (card color)
- **Secondary backgrounds**: Sand/cream (secondary color, used sparingly)
- **Badge/Tag backgrounds**: Crimson-soft (light accent)
- **Overlay backgrounds**: Navy with opacity (semi-transparent for modals)

### Border Colors
- **Primary borders**: Hairline (oklch(0.9 0.006 260))
- **Subtle borders**: Hairline with opacity (border-border/70)
- **Focus borders**: Crimson

### State Colors
- **Success**: Green (oklch(0.62 0.16 150)) for confirmations
- **Destructive**: Red-orange (oklch(0.577 0.245 27.325))
- **Input focus**: Crimson ring/outline

---

## Interaction Patterns

### Link Behavior
All navigation links styled with `.rule-link`:
- Underline appears on hover/active state
- No immediate underline in default state
- Smooth animation from left to right

### Button Behavior
- **Hover**: Scale or color change based on button type
- **Focus**: Crimson ring outline (via Tailwind focus ring)
- **Active**: Color deepens, no visual lift (press-down effect)

### Form Behavior
- **Focus state**: Border animates to crimson
- **Placeholder text**: Muted foreground color
- **Error state**: Could use destructive color (not detailed, but available in system)

### Scroll Behavior
- Page scrolls smoothly (not instant)
- Scroll progress bar fills from left to right at top
- Sticky header condenses after small scroll (24px)
- Section navigation updates active state based on viewport position

---

## Typography Hierarchy

### Display (Headlines)
- **H1**: `font-display text-4xl sm:text-6xl font-semibold` — Navy
- **H2**: `font-display text-2xl sm:text-3xl font-semibold` — Navy
- **H3**: `font-display text-xl font-semibold` — Navy
- **H4**: `font-display font-semibold` — Navy

### Accents (Subtitles, Emphasis)
- Italic taglines: `text-lg italic` — Muted-foreground or navy
- Accent subtitle: Font-display, Crimson, italic

### Body Text
- **Large body**: `text-base leading-relaxed` — Ink or navy
- **Standard body**: `text-sm leading-relaxed` — Ink
- **Small body**: `text-xs` — Muted-foreground

### Labels & UI Text
- **Eyebrow/Label**: `text-[11px] uppercase tracking-[0.28em]` or `tracking-[0.2em]` — Crimson or muted-foreground
- **Button text**: `text-sm uppercase tracking-[0.18em]` — Off-white on crimson, navy on outline
- **Tiny metadata**: `text-[10px] uppercase tracking-[0.24em]` — Muted-foreground

### Numeric Text
- **Large numbers** (price, countdown): Font-display, `text-2xl sm:text-3xl`, `tabular-nums`
- **Small numbers**: Same features, smaller size

---

## Data & Content Patterns

### Event Information Display
- **Category/Type**: Badge in accent colors
- **Date/Time**: Structured list with icons
- **Location**: Map pin icon + venue name, city
- **Price**: "From {amount}" with display font
- **CPD Points**: Badge or metadata line
- **Tagline**: Italic, slightly larger than body

### Ticket Tiers Table
- Expandable rows showing: Tier name, audience, price, days remaining
- Active tiers: Days left countdown or availability indicator
- Sold-out tiers: Greyed out or marked unavailable

### Booking Confirmation Display
- Status badge: Success color, uppercase label
- Details: Definition list format with term-definition pairs
- Clear alignment for readability

---

## Performance Considerations

### Image Optimization
- Lazy loading: `loading="lazy" decoding="async"` on most images
- Eager loading: Event poster on detail pages loads immediately
- Aspect ratios: Maintained with HTML attributes or CSS aspect ratio
- Optimization: Width/height attributes to prevent layout shift

### Animation Performance
- GPU acceleration: `will-change` on transformed elements
- RequestAnimationFrame: Used for scroll-based animations
- Debouncing: Scroll listeners use passive flag and RAF batching
- CSS transforms preferred over JS position changes

### Bundle Optimization
- TanStack Start provides SSR and code splitting
- Radix UI components tree-shake well
- Lucide icons are individually importable

---

## Accessibility Features

### Semantic Structure
- Proper heading hierarchy (H1 → H2 → H3)
- Definition lists for metadata (dt/dd pairs)
- Main element for content
- Navigation landmarks (header, nav, footer)

### Color Contrast
- Text colors meet WCAG AA standards
- 4.5:1 minimum contrast on body text
- 3:1 minimum on UI components

### Motion
- `prefers-reduced-motion` respected globally
- Animations disabled for users who prefer reduced motion
- Smooth scroll behavior can be overridden

### Form Accessibility
- Labels associated with inputs via `<label>` elements
- ARIA attributes where needed (aria-label on icon buttons)
- Focus indicators visible and clear

### Interactive Elements
- Buttons are keyboard accessible
- Links are understandable without color alone
- Dialog modals properly manage focus

---

## Implementation Notes

### CSS Architecture
- Tailwind CSS v4 with custom theme
- Custom utilities defined in @utility layer
- CSS custom properties for design tokens (colors, fonts, radii)
- Inline @theme block for Tailwind class generation
- Layer organization: @theme, @layer utilities, @layer base

### Component Patterns
- React functional components with hooks
- Server components for static content (TanStack Start)
- Client components for interactive elements
- Custom hooks for reusable logic (useScroll, useReveal patterns in effects)

### Styling Approach
- Utility-first CSS with Tailwind
- Semantic CSS custom properties for brand colors
- Minimal custom CSS (only essential animations and utilities)
- Consistent naming conventions (class names follow pattern)

---

## Summary of Visual Feel

The site embodies **professional elegance with modern sophistication**. It's designed for an architecture and design audience, so every visual choice emphasizes quality and clarity. The crimson accent provides energy against the calm navy and white palette. Typography is confident and distinctive (Archivo for display, Manrope for body). Motion is smooth and intentional—scroll triggers reveal content in cascading animations that feel sophisticated, not flashy. Spacing is generous, borders are subtle, and the layout breathes with white space. The overall impression is **trustworthy, contemporary, and culturally grounded** (drawing from AAK's visual identity).

