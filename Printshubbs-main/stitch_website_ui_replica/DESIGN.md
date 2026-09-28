---
name: Modern Atelier
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45464d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#a73a00'
  on-secondary: '#ffffff'
  secondary-container: '#fd651e'
  on-secondary-container: '#571a00'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#00164e'
  on-tertiary-container: '#6780d3'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#ffdbce'
  secondary-fixed-dim: '#ffb599'
  on-secondary-fixed: '#370e00'
  on-secondary-fixed-variant: '#7f2b00'
  tertiary-fixed: '#dce1ff'
  tertiary-fixed-dim: '#b6c4ff'
  on-tertiary-fixed: '#00164e'
  on-tertiary-fixed-variant: '#264191'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 3.5rem
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: '1.15'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 2.25rem
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 1.75rem
    fontWeight: '600'
    lineHeight: '1.25'
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: '1.35'
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 0.8125rem
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.02em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 0.6875rem
    fontWeight: '500'
    lineHeight: '1.3'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 3rem
  margin-sm: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style
The design system embodies the precision, technical mastery, and tactile luxury of high-end bespoke print production. It targets creative directors, enterprise merchandisers, and discerning consumers who value material craft and typographic excellence. 

The aesthetic is Modern Corporate fused with Contemporary Editorial: structured, disciplined layouts offset by high-energy moments of chromatic warmth. The interface delivers an immediate sense of competence, confidence, and tactile fidelity—evoking the weight of 600gsm cotton stock, crisp foil stamping, and razor-sharp architectural grid alignments.

## Colors
The palette balances authoritative deep indigos and navies against an energetic, industrial printing orange. 

- **Primary (`#0f172a`, `#1e293b`):** Deep Navy anchors navigation, master containers, display typography, and dominant structural frames.
- **Secondary / Accent (`#ea580c`, `#f97316`):** Vibrant Orange reserved strictly for high-priority interactive drivers: checkout conversion buttons, live print status indicators, badge highlights, and active selection states.
- **Tertiary (`#1e3a8a`):** Rich Royal Blue used selectively for secondary links, informational iconography, and interactive state variation.
- **Neutrals & Surfaces (`#ffffff`, `#f8fafc`, `#f1f5f9`, `#e2e8f0`, `#64748b`):** Crisp pure white for cards and print canvases, layered over soft slate background tiers with subtle cool gray line work.

Color distributions must follow an 80/15/5 ratio: 80% slate/white backgrounds with deep navy text, 15% navy structural elements, and 5% targeted orange accents to preserve visual hierarchy.

## Typography
The typographic architecture pairs technical geometry with high readability and print-shop utilitarianism.

- **Headlines (`Space Grotesk`):** Delivers clean mechanical flair with distinctive geometric cuts, establishing a confident contemporary voice. Headings must always maintain tight negative letter spacing to avoid typographic drift.
- **Body (`Hanken Grotesk`):** Provides uncompromised optical legibility across dense spec sheets, product configurations, and long-form editorial descriptions.
- **Metadata & Labels (`JetBrains Mono`):** Imparts a digital-press calibration aesthetic for dimensions, paper weights (GSM), SKU identifiers, pricing figures, and micro-tags. Always render in uppercase when applied to tags and technical pill badges.

## Layout & Spacing
The layout system is founded on a 12-column responsive fluid grid with strict max-width constraints on display monitors (maximum content wrapper: `1440px`).

- **Desktop (1024px+):** 12 columns, `1.5rem` gutters, `3rem` canvas margins. Product configurators adopt an asymmetrical 7/5 split (7 columns for high-fidelity canvas viewport, 5 columns for customization tools).
- **Tablet (768px – 1023px):** 8 columns, `1.5rem` gutters, `2rem` canvas margins. Product cards collapse from 4 columns to 2 columns.
- **Mobile (Below 768px):** 4 columns, `1rem` gutters, `1.25rem` margins. Sticky bottom configuration sheets preserve thumb accessibility.

Use base 8px spacing intervals (`0.5rem`, `1rem`, `1.5rem`, `2.5rem`) for standard flows, reserving `0.25rem` micro-steps solely for compact form labels and metadata pill badges.

## Elevation & Depth
Depth is created through ambient, tinted multi-layered shadows combined with delicate slate outlines, avoiding harsh, un-tinted drop shadows.

- **Level 0 (Flat / Canvas):** Pure background surfaces (`#f8fafc` or `#ffffff`) bounded by a subtle `1px` border in `#e2e8f0`.
- **Level 1 (Cards & Product Tiles):** Single ambient shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)` paired with a crisp `1px` solid border (`#f1f5f9`).
- **Level 2 (Dropdowns, Hovered Cards, Action Panels):** `0 10px 15px -3px rgba(15, 23, 42, 0.06), 0 4px 6px -4px rgba(15, 23, 42, 0.04)`. On card hover, transition smoothly via 200ms cubic-bezier with a subtle `-2px` vertical translate.
- **Level 3 (Modals, Customizer Sheets, Flyout Drawers):** `0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)` overlaying a 40% alpha deep navy backdrop (`#0f172a` with `backdrop-filter: blur(4px)`).

## Shapes
The system uses soft, calibrated geometry (`roundedness: 1`). Interactive elements and cards default to `0.375rem` (6px) to maintain a crisp, engineered profile reminiscent of freshly die-cut paper stock. 

- Form inputs, buttons, and alert callouts use `0.375rem`.
- Large containers and modal dialogs scale to `0.5rem` (`rounded-lg`).
- Filter chips and technical badges use fully rounded pill shapes to distinguish them from actionable square buttons and cards.

## Components

### Buttons
- **Primary:** Background `#ea580c`, text `#ffffff`, border radius `0.375rem`, font `Hanken Grotesk` 600 weight. Hover state: `#c2410c` with subtle Level 1 shadow boost. Active: scale `0.98`.
- **Secondary:** Background `#0f172a`, text `#ffffff`. Hover: `#1e293b`.
- **Outline / Ghost:** Border `1px` solid `#cbd5e1`, background transparent, text `#0f172a`. Hover: `#f8fafc` background with `#0f172a` border.

### Input Fields & Selectors
- Base style: Height `44px`, background `#ffffff`, border `1px` solid `#cbd5e1`, text `#0f172a`, radius `0.375rem`.
- Focus state: Border color `#ea580c`, outer ring shadow `0 0 0 3px rgba(234, 88, 12, 0.15)`, outline none.
- Error state: Border color `#ef4444`, ring shadow `0 0 0 3px rgba(239, 68, 68, 0.15)`.

### Cards & Product Previews
- Canvas-first architecture: Card body `#ffffff`, border `1px` solid `#e2e8f0`, radius `0.375rem`, Level 1 elevation.
- Media container within cards uses `#f8fafc` with an internal inset ratio lock.
- Hover interaction triggers elevation transition to Level 2 and an image zoom of 1.02x within masked bounds.

### Badges & Technical Chips
- **Status & GSM Badges:** Pill-shaped (`9999px` radius), padding `0.25rem 0.625rem`, font `JetBrains Mono` 500, uppercase.
- Neutral variant: Background `#f1f5f9`, text `#334155`.
- Accent/Special Finish variant: Background `rgba(234, 88, 12, 0.1)`, text `#ea580c`, border `1px` solid `rgba(234, 88, 12, 0.2)`.

### Checkboxes & Radio Controls
- Radio controls use concentric circles: checked state features a solid `#ea580c` dot encased by an unselected outer ring.
- Checkboxes use `0.25rem` radius, filling with `#0f172a` upon selection with a crisp white check vector.

### Custom Print Proofing Bar (Domain Specific)
- A specialized bottom-docked status bar displaying resolution safety alerts (DPI count), bleed indicator lines (`#ea580c`), and CMYK color space confirmation tags.