# Design Tokens — PGB Planner Website

These are the CSS custom properties defined in `src/styles/main.css`.
Claude Code must use these tokens for all styling — never hardcode values.

---

## Colors

| Token | Value | Use |
|-------|-------|-----|
| --color-primary | #265284 | Dark blue — headings, CTAs, primary buttons |
| --color-secondary | #4baa96 | Teal — accents, links, hover states |
| --color-l-blue | #3b73b4 | Light blue — secondary accents |
| --color-bg | #f9f2ea | Warm beige — page background |
| --color-bg-icon | #dbeeea | Light cyan — icon backgrounds |
| --color-black | #414040 | Body text |
| --color-body-text | #4b5563 | Secondary/paragraph text |
| --color-alert | #e27a7a | Red — problem/alert icons |
| --color-orange | #ed9008 | Highlights, attention |
| --color-form-btn | #02007f | Form submit button |

## Typography

| Token | Value | Use |
|-------|-------|-----|
| --font-primary | Inter | Body text |
| --font-heading | Lexend Deca | Headings (h1–h6) |
| — | BBH Sans Hegarty | Decorative use only |

### Type scale (fluid with clamp)

| Element | Size | Notes |
|---------|------|-------|
| h1 | clamp(1.8rem, 4.5vw, 2.5rem) | Page hero titles |
| h2 | — | Section headings |
| h3 | — | Card/subsection headings |
| h4–h6 | down to 0.8rem | Rarely used |

Exact clamp values for h2–h5 are defined in main.css — refer to the file for specifics.

## Layout

| Token | Value | Use |
|-------|-------|-----|
| --container-w | 1200px | Max content width |
| --header-h | 72px | Header height (used for scroll offset) |
| --radius | 12px | Border radius for cards, buttons |
| --shadow-soft | 0 4px 12px rgba(0,0,0,0.06) | Card shadows |

## Responsive breakpoints

| Breakpoint | Use |
|------------|-----|
| 400px | Small phone adjustments |
| 480px | Phone landscape |
| 640px | Large phone / small tablet |
| 768px | Tablet |
| 1024px | Desktop |
| 1280px+ | Wide desktop |

## Utility classes

Key reusable classes defined in main.css:

| Class | Purpose |
|-------|---------|
| .container | Standard content width (--container-w) |
| .container-large | Wider variant |
| .container-small | Narrower variant |
| .container-block | Section-level wrapper with vertical padding |
| .btn-primary | Primary button style |
| .btn-secondary | Secondary/outlined button style |
| .flex-center | Flexbox centering helper |
| .cta-block | Call-to-action section wrapper |
| .skip-link | Accessibility skip navigation link |

## Accessibility

- `.skip-link` for keyboard navigation
- `@media (prefers-reduced-motion: reduce)` is respected
- Focus ring styles are defined globally

---

## Rules

1. Always use CSS custom properties — never hardcode color or font values
2. Use existing utility classes before writing new CSS
3. New tokens may only be added to main.css with explicit approval
4. Component-scoped styles go in `<style>` blocks, not in main.css (Astro convention)
5. When in doubt, check main.css — it is the single source of truth for tokens
```

---

Dat zijn alle drie de bestanden. Hier is je volledige structuur nu:
```
pgbplanner-website/
├── CLAUDE.md
├── docs/
│   ├── archive/
│   │   └── project-analysis-2026-04-01.md
│   ├── prompts/
│   ├── sitemap.md
│   └── design-tokens.md