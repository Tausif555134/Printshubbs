# Printhubbs — Token-Driven UI Guidelines
### E-commerce storefront · Business Cards, Flyers, Banners, Invitations Printing

---

## 1. Context and Goals

**Design intent (one sentence):** A minimal, utility-first, accessibility-prioritized monochrome storefront where black ink on white paper — not decoration — carries the brand.

- **Surface:** e-commerce storefront (catalog, PDP configurator, design studio, cart/checkout).
- **Audience:** online shoppers and consumers (B2C + SOHO). Dense link inventory (~970 links, 96 buttons, 29 lists, 3 navs, 2 inputs, 1 card grid) demands strict token discipline: every one-off is a defect.
- **Target:** WCAG 2.2 AA. Keyboard-first. No hidden focus. No low-contrast text.
- **Deliverables style:** rules use **must**; guidance uses **should**.

---

## 2. Design Tokens and Foundations

### 2.1 Color (semantic — never raw hex in component code)

| Token | Value | Role |
|---|---|---|
| `color.surface.base` | `#000000` | Ink surfaces: announcement bar, trust strip, footer, primary buttons |
| `color.text.secondary` | `#ffffff` | Text/lines on `surface.base`; page background on light surfaces |
| `color.surface.raised` | `#e6e6e6` | Hover fill, secondary emphasis, section bands |
| `color.surface.strong` | `#f3f3f3` | Image wells, selected-option fill, price pills |
| `color.border` | `#d9d9d9` | Hairline card/divider borders |
| `color.text.muted` | `#595959` | Secondary text (AA 7.0:1 on white) |
| `color.text.disabled` | `#8c8c8c` | Disabled states only — never body copy |

**Rules**
- Teams **must** reference semantic tokens, not hex literals. Tailwind arbitrary values `bg-black`, `bg-[#f3f3f3]`, `border-[#d9d9d9]` map 1:1 to tokens.
- Chromatic color **must not** be reintroduced without a documented semantic token addition.
- On dark surfaces, secondary text **must** be `white/70` minimum opacity (≥ 4.5:1).

### 2.2 Typography

| Token | Value |
|---|---|
| `font.family.primary` | `Inter` (Graphik-metric substitute), stack `Inter, Graphik, sans-serif` |
| `font.size.base / md` | `16px` · `font.weight.base` = `700` · `line-height.base` = `22.4px` |
| Scale | xs `12px` · sm `14px` · md `16px` · lg `18.72px` · xl `20px` · 2xl `28px` · 3xl `48px` |

- Hero H2s **must** use `3xl` (48px) at `lg` breakpoint with 1.05 line-height.
- Section headings **must** use the `.section-heading` component (ink kicker bar + `2xl`/`lg`).
- Weights: 700 (headings, CTAs, prices), 600 (labels), 500 (body emphasis), 400 (body).
- No font outside the stack; studio template fonts **must** declare `Inter` defaults.

### 2.3 Spacing, Radius, Shadow, Motion

| Token | Value |
|---|---|
| `space` | 1=`2px` 2=`4px` 3=`8px` 4=`12px` 5=`14px` 6=`16px` 7=`18.72px` 8=`20px` |
| `radius` | xs/base = **8px** everywhere (`.rounded-lg`, `rounded-[8px]`); full = pills only |
| `shadow.1` | `rgba(0,0,0,0) 0 0 0 1px inset` — hairline |
| `shadow.2` | `rgba(0,0,0,.09) 0 -1px 1px 0 inset, rgb(0,0,0) 0 0 0 1px inset` — resting input/secondary |
| `shadow.3` | `rgba(0,0,0,.09) 0 -1px 1px 0 inset, rgba(0,0,0,.26) 0 0 0 1px inset` — hover |
| `shadow.4` | `rgba(0,0,0,.09) 0 -1px 1px 0 inset, rgb(17,112,245) 0 0 0 1px inset` — input focus |
| `motion` | `instant=200ms` (hover/press), `fast=300ms` (enter/exit: drawer, reveal, toast) |

- Shadows are **inset rings**, not drop shadows. Drop shadows are permitted only on floating layers (drawer, toast, back-to-top).
- All transitions **must** use `motion.duration.instant` or `motion.duration.fast` — no other durations.

---

## 3. Component-Level Rules

Every interactive component **must** implement: `default · hover · focus-visible · active · disabled · loading · error`, plus responsive/edge-case behavior and keyboard/pointer/touch interaction.

### 3.1 Button — Primary (`.btn-primary`)
- **Anatomy:** black fill · white label (700) · `radius 8px` · padding ≥ `12px 24px` for CTAs.
- **States:** hover `#1a1a1a` | focus-visible 2px black outline offset 2px | active `scale(0.98)` | disabled `surface.raised` + `text.disabled`, `cursor: not-allowed` | loading: label swaps to spinner, `aria-busy="true"`, pointer blocked | error: unchanged (errors surface at form level).
- **Keyboard:** Enter/Space activate. **Pointer:** full-target click. **Touch:** min 44×44 hit area.
- **Usage:** one primary per view region — PDP add-to-cart, checkout, submit.

### 3.2 Button — Secondary (`.btn-secondary`) / Outline (`.btn-outline`)
- **Anatomy:** white fill + `shadow.2` inset ring (secondary) or 1px `#d9d9d9` border (outline); black label 700.
- **States:** hover `surface.raised` + `shadow.3` (secondary) / black border (outline); focus/active/disabled/loading/error per 3.1.
- **Usage:** secondary = "Design in Studio", drawer close. Outline = utility (save project, toggle).

### 3.3 Product Card (`.product-card`)
- **Anatomy:** price pill (JetBrains Mono 12px on `surface.strong`, `shadow.1`) · image on `surface.strong` · name 700 14px · rating + "Customize →" footer divided by hairline.
- **States:** hover: 3px lift + black border + `Customize →` underline; card is fully clickable (`onclick` route to PDP); **focus-within** shows 2px outline; active 1px lift. Wishlist heart inside **must** `stopPropagation()`, expose `aria-pressed`, and carry a descriptive `aria-label`.
- **Long content:** name `line-clamp-1`, subtitle `line-clamp-2` — no card may grow with content.
- **Keyboard/Touch:** whole card activates on Enter when focused; 44px minimum for inner controls.

### 3.4 Radio/Option Cards (PDP configurator)
- **States:** unselected `border #d9d9d9` → hover black border; **selected:** black border + `ring-2 ring-black` + `surface.strong` fill; native radio `accent-black` stays in DOM for a11y.
- **Keyboard:** arrow keys cycle radios natively; label is the hit target.
- **Error:** price recalculation failure **must** show inline text at `text.muted`, never color-only.

### 3.5 Inputs (`.input-atelier`)
- **States:** resting `shadow.2` | hover `shadow.3` | focus `shadow.4` (blue focus ring token — the only non-mono color, reserved exclusively for text-caret focus) | disabled `surface.strong` + `text.disabled` | `aria-invalid` red inset ring + inline message | loading n/a.
- Placeholders **must** be examples, never the only label; every input **must** have a bound `<label>`.

### 3.6 Navigation
- **Announcement bar (black):** static centered offer; hover reveals ticker (reduced-motion: ticker only, static hidden). Sticky `top-0 z-50`.
- **Category nav:** `.nav-link` 2px black underline sweeps on hover/focus-visible (`scaleX 0→1`, `200ms`).
- **Responsive:** category rail scrolls horizontally with hidden scrollbar; **must** remain swipeable (touch) and reachable via keyboard scroll (focus container + arrows).

### 3.7 Overlays (cart drawer, modals, toasts)
- Drawer opens `300ms` with `black/50` + blur overlay; overlay click and Escape **must** close; body scroll locks while open.
- Toast: black, icon disc, `toastIn/toastOut 250ms`, auto-dismiss 4s, `z-60`, manual dismiss button.
- Modals: `rgba(0,0,0,.65)` backdrop; close button **must** carry `aria-label`.

---

## 4. Accessibility Requirements — Testable Acceptance Criteria

| # | Criterion | Pass check | Fail signal |
|---|---|---|---|
| A1 | Focus visible | Tab through header→footer; every stop shows 2px outline (black on light, white on dark) | Any stop with `outline: none` |
| A2 | Contrast — text | Body/muted ≥ 4.5:1 (`#595959` on white = 7.0:1; `white/70` on black = 8.4:1) | Any text below 4.5:1 |
| A3 | Contrast — UI parts | Borders/rings ≥ 3:1 against adjacent (black ring on white = 21:1) | `#e6e6e6` border as sole affordance on white |
| A4 | Keyboard path | Sign-in → search → category → PDP → configure → cart → checkout, all via keyboard | Any dead end |
| A5 | Reduced motion | `prefers-reduced-motion: reduce` kills marquee/reveal/transitions | Animation persists |
| A6 | Toggle state | Wishlist hearts and filter tabs expose `aria-pressed` | State conveyed by color alone |
| A7 | Escape closes | ESC closes drawer, then any open modal | ESC no-op |
| A8 | Labels | Close buttons and inputs have programmatic labels | Icon-only unlabeled ✕ |
| A9 | Target size | Interactive targets ≥ 44×44 or spacing-separated | Sub-24px tap targets |
| A10 | Disabled semantics | Disabled controls use `disabled`/`aria-disabled` + `text.disabled` | Grey styling only |

---

## 5. Content and Tone Standards

- **Concise, confident, implementation-focused.** "Shop Now", "Add to Cart", "Design in Studio" — verb-first, no ambiguity ("Submit", "Customize →").
- Prices **must** include the offer frame: "100 Custom Cards starting at **₹200**" (price underlined ink).
- Badges **must** state concrete specs: "350 GSM", "300 DPI PRE-PRESS READY", "3MM BLEED".
- Emojis are permitted only in the marquee ticker, never in CTAs, headings, or labels.
- Help/support copy states the rule then the proof: guarantee → 14-day reprint/refund window.

## 6. Anti-Patterns (Prohibited)

1. **Chromatic reintroduction** — no orange/amber/emerald accents; color is not an affordance.
2. **Raw hex in components** — tokens only; hex lives in the token layer (`tailwind.config`, `:root`).
3. **One-off spacing/typography** — no ad-hoc padding or font sizes outside the scale.
4. **Hidden focus** — never `outline: none` without an equal-or-stronger `:focus-visible` replacement.
5. **Drop-shadow stacking** — elevation via inset rings; outer shadows reserved for floating layers.
6. **Color-only state** — selected/disabled/error states pair color with ring/underline/label.
7. **Radius drift** — 8px everywhere; 4px/999px appear only in legacy pay chips and true pills.
8. **Low-contrast muted text** — `#8c8c8c` is for disabled only.

## 7. Migration Notes

- `Space Grotesk`/`Hanken Grotesk` → `Inter` (Tailwind config, `.font-display`, studio templates). Canvas render strings **should** follow.
- Navy `#0f172a` → pure `#000000`. Orange `#ea580c` family → ink (`#000000`) on light, white on dark; prices underlined instead of colored.
- Button hierarchy swapped: primary = ink fill; the former navy "secondary" is now white + inset ring.
- Studio canvas guides (bleed/trim/safe) are monochrome dashed ink/gray — pre-press **must not** rely on them for print color decisions.

## 8. QA Checklist

- [ ] Zero chromatic classes in `index.html`, `css/custom.css`, `js/*.js` (audit: `grep -E "#ea580c|orange-|amber-|emerald-"`)
- [ ] All buttons/inputs expose default, hover, focus-visible, active, disabled (+loading where async)
- [ ] A1–A10 acceptance criteria each verified with a pass/fail check
- [ ] 320px viewport: announcement truncates, hero stacks, rails swipe, footer stacks
- [ ] Keyboard-only purchase path completes (A4)
- [ ] Reduced-motion query: no marquee, no reveals, hover states still distinct
- [ ] PDP selected option shows black ring + surface.strong; radio natively focusable
- [ ] Cart drawer: overlay click + ESC close; scroll locked while open
- [ ] Console clean (only the Tailwind CDN dev warning is tolerated)
- [ ] `node -c` passes on all four JS bundles

*Version 1.0 — monochrome token release.*
