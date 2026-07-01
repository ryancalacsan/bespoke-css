# Caliper UI

[![CI](https://github.com/ryancalacsan/caliper-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/ryancalacsan/caliper-ui/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/@ryancalacsan/caliper-ui.svg)](https://www.npmjs.com/package/@ryancalacsan/caliper-ui)
[![License: MIT](https://img.shields.io/badge/license-MIT-black.svg)](./LICENSE)

**[Live demo](https://caliper-ui.vercel.app)** · **[Component docs (Storybook)](https://caliper-ui.vercel.app/storybook/)**

![The Caliper UI demo landing, drawn as a technical spec sheet on warm paper: a ruler rail, a crop-mark frame, and a big grotesque headline reading "A component system, drawn to spec." dimensioned like an engineering drawing with crosshair marks and a width annotation, in ink with one construction-orange accent.](.github/assets/hero.png)

An accessible React component library and design system. WCAG 2.2 AA out of the
box, two themes from a single token layer, server-component ready, and zero
runtime dependencies. Styling is hand-written SCSS with BEM, and the design
tokens flow from one source into both the CSS you ship and Figma variables.

## Features

- **41 components** — actions and forms, overlays, layout primitives, typography,
  content and data display, navigation chrome, and the Spec Sheet motifs.
- **Accessible by contract** — real semantic elements, always-visible focus,
  focus traps, full ARIA wiring, and `prefers-reduced-motion` support. Every color
  pairing is verified against WCAG 2.2 AA by a script, not by eye.
- **Two themes, one token layer** — light and dark are one set of role names with
  two sets of values. Switch with a `data-theme` attribute, or follow the OS.
- **Tokens, code ↔ Figma** — one W3C DTCG source generates the published CSS and a
  Figma variable export, so code and design stay in lockstep.
- **Server-component ready** — ships ESM with types; only interactive components
  are marked `"use client"`.
- **Zero runtime dependencies** — React is the only peer dependency. Import one
  stylesheet and tree-shake the rest.
- **Published with provenance** — releases are signed via npm Trusted Publishing
  (OIDC).

## Install

```bash
npm install @ryancalacsan/caliper-ui
```

React 18 or newer is a peer dependency (your app provides it). The package ships
ESM with types and is safe to use in React Server Components.

## Usage

Import the stylesheet once at your app root, then use the components:

```tsx
import '@ryancalacsan/caliper-ui/styles.css';
import { Button } from '@ryancalacsan/caliper-ui';

export function Example() {
  return <Button onClick={() => alert('hi')}>Save changes</Button>;
}
```

Themes switch by a `data-theme` attribute on `<html>` (`"light"` or `"dark"`);
with no attribute set, the OS `prefers-color-scheme` decides. Want only the
tokens (the CSS custom properties), without component styles? Import
`@ryancalacsan/caliper-ui/tokens.css` instead.

A consumer can override any token by redefining its custom property (for example
`:root { --color-signal: #2347ff; }`) after the import.

### Next.js App Router

The styling is global CSS, so import it once in the root layout. Interactive
components (`Modal`, `Select`, `Tabs`, `Tooltip`, `Checkbox`, `RadioGroup`,
`TextField`) are marked `"use client"`; `Button` renders on the server.

```tsx
// app/layout.tsx
import '@ryancalacsan/caliper-ui/styles.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body>{children}</body>
    </html>
  );
}
```

To set the theme from the user's choice with no flash on first paint, set
`data-theme` before React hydrates with a tiny inline script in `<head>`:

```tsx
<head>
  <script
    dangerouslySetInnerHTML={{
      __html:
        "try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}catch(e){}",
    }}
  />
</head>
```

## Components

Import components by name; import the stylesheet once. Every component has typed
props and a usage doc with live controls in
[Storybook](https://caliper-ui.vercel.app/storybook/).

- **Actions & forms** — Button, TextField, Select, Checkbox, RadioGroup
- **Overlays & disclosure** — Modal, Drawer, Tooltip, Tabs
- **Layout** — Container, Section, Stack, Inline, Grid, Spacer, Divider, AspectRatio
- **Typography** — Heading, Text, Eyebrow, Prose, Mark
- **Content & data** — Card, Badge, Stat, StatGroup, Callout, Icon
- **Navigation & chrome** — AppHeader, NavLink, Link, ThemeToggle, BackToTop, SkipLink, VisuallyHidden
- **Spec Sheet motifs** — Frame, GridBackdrop, Crosshair, DimensionLine, SheetHeader, MeasureFrame

## Class names and collisions

Caliper emits unprefixed BEM class names (`button`, `card`, `prose`, and so on).
If your app defines its own top-level class with one of these names, the
library's styles will apply to it too. The reserved top-level block class names:

> `app-header`, `aspect-ratio`, `back-to-top`, `badge`, `button`, `callout`,
> `card`, `checkbox`, `container`, `crosshair`, `dimension-line`, `divider`,
> `drawer`, `eyebrow`, `frame`, `grid`, `grid-backdrop`, `heading`, `icon`,
> `inline`, `link`, `mark`, `measure-frame`, `modal`, `nav-link`, `prose`,
> `radio-group`, `section`, `select`, `sheet-header`, `skip-link`, `spacer`,
> `stack`, `stat`, `stat-group`, `tabs`, `text`, `text-field`,
> `theme-toggle`, `tooltip`, `visually-hidden`

Avoid these names for your own elements, or scope your own styles (CSS Modules, a
prefix, or a cascade layer). A future major release will prefix every emitted
class with `cui-` so the library is collision-proof by default.

## Design tokens (code ↔ Figma)

The tokens are authored once, in a tool-agnostic format, and everything else is
generated from that one source. So the CSS the code ships and the variables a
designer uses in Figma come from the same place, by construction.

**Source of truth.** `tokens/*.json` holds the tokens in the W3C
[DTCG](https://www.designtokens.org/) format (`$value` / `$type`), grouped by
category (color, space, text, radius, shadow, motif, and so on). Colors are
authored once per theme in `theme.light.json` / `theme.dark.json`; the semantic
roles alias the primitive ramps in `primitives.json`.

**Build.** Style Dictionary resolves the aliases and renders two outputs, both
committed and both checked in CI:

- `tokens/tokens.css` (published as `@ryancalacsan/caliper-ui/tokens.css`) - the
  custom properties, with the two themes as `:root` / `[data-theme="dark"]` and a
  `prefers-color-scheme` fallback.
- `src/tokens/_generated.scss` - the SCSS maps the components compile against, so
  the component CSS draws from the same source.

A CI drift check (`npm run tokens:check`) rebuilds from the source and fails if
either output has changed without a rebuild.

**Figma.** The same source feeds Figma, with **light and dark as the two modes**
of a single `Caliper` variable collection:

- `npm run build:figma` writes `tokens/figma/light.json` and `dark.json` (one
  resolved DTCG file per mode) for Figma's native variable import, plus
  `tokens/figma/tokens-studio.json` - a single file with both modes as token
  sets and a `$themes` block wiring a `Caliper` collection - to load in
  [Tokens Studio](https://tokens.studio/). (Exporting themes as Figma _modes_
  from Tokens Studio needs its Pro tier, and multiple modes in one collection
  needs a paid Figma plan; on the free tiers, export a single set as one mode.)
- `npm run figma:push` imports/updates the variables directly through the Figma
  Variables REST API - the plugin-free path. It is gated on `FIGMA_TOKEN` +
  `FIGMA_FILE_ID` and hard-codes no secrets:

  ```bash
  node scripts/figma-push.mjs --dry-run          # print the payload, no network
  FIGMA_TOKEN=… FIGMA_FILE_ID=… npm run figma:push
  ```

  Colors convert to Figma's 0..1 RGBA, dimensions become pixel floats, and fluid,
  font, easing, and shadow values stay strings. Figma's Variables **write** REST
  API needs an Enterprise org seat; on other plans, use the native import or
  Tokens Studio with the per-mode files.

## Recipes

**Measure a specific element with `DimensionLine`.** The line is `width: 100%` of
its parent, so to dimension one element (rather than its container), put the
element and the line together in a `fit-content` wrapper. `MeasureFrame` does
exactly this around a headline, with the dashed frame and crop marks; reach for
it directly, or replicate the pattern for other content.

**Equal-height cards in a grid.** Put the cards in a `Grid` (its items stretch by
default) and set `fill` on each card. The body grows so the footers line up
across the row, with no consumer CSS:

```tsx
<Grid minItemWidth="16rem" gap="md">
  {projects.map((p) => (
    <Card key={p.id} fill footer={<Link href={p.href}>View</Link>}>
      ...
    </Card>
  ))}
</Grid>
```

**A whole card as a link.** Set `interactive` on the `Card` and `stretch` on the
title `Link`. The link's hit area covers the card, so a click anywhere follows
it, while footer actions stay clickable:

```tsx
<Card
  interactive
  header={
    <Heading level={3}>
      <Link stretch tone="inherit" underline="none" href={p.href}>
        {p.title}
      </Link>
    </Heading>
  }
  footer={<Button>Share</Button>}
>
  ...
</Card>
```

**Use with next-themes (or another theme store).** Caliper reads `data-theme` on
`<html>`. next-themes writes a class by default, so set it to write both:

```tsx
<ThemeProvider attribute={['class', 'data-theme']} defaultTheme="system" enableSystem>
```

Let next-themes own the theme (it handles persistence and the no-flash script).
Either keep your existing toggle, or use Caliper's `ThemeToggle` in controlled
mode so it defers to the store instead of managing `data-theme` itself:

```tsx
'use client';
import { useTheme } from 'next-themes';
import { ThemeToggle } from '@ryancalacsan/caliper-ui';

export function Toggle() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <ThemeToggle
      theme={resolvedTheme as 'light' | 'dark' | undefined}
      onThemeChange={setTheme}
    />
  );
}
```

## Styling and accessibility

**Hand-written SCSS, no utility framework.** Components are styled with BEM class
names and reference design tokens (`var(--color-primary)`, `var(--space-md)`) -
never raw values. Change a token once and the whole system moves with it. The CSS
stays legible and is yours to extend or re-skin: the dark theme is nothing but a
second set of token values, and a new skin would be added the same way.

**Color roles, not raw colors.** Primitives are the raw ramps (a warm neutral
ramp from paper to ink, a construction-orange signal, plus danger and success);
semantic roles (`text`, `primary`, `danger`, `border-strong`) are what components
use. Every text-on-surface pairing meets WCAG 2.2 AA, verified by
`npm run test:contrast` rather than by eye.

**Accessibility is part of each component's contract:**

- Components render real semantic elements. The Button is a `<button>`, so
  keyboard activation and focus come from the platform.
- Focus is always visible: a shared `:focus-visible` ring shows for keyboard users
  without flashing on mouse clicks.
- Modal traps focus while open, closes on Escape, restores focus to the trigger,
  locks background scroll, and exposes `role="dialog"` with `aria-modal` and a
  linked title.
- TextField wires `htmlFor`/`id`, `aria-describedby` for help and error text,
  `aria-invalid` in the error state, and a live region so errors are announced -
  with a non-color error cue so it does not rely on seeing red.
- Motion respects `prefers-reduced-motion`, with a global reduced-motion reset as
  a backstop.

Storybook ships with the axe addon enabled, so these checks run against every
story in the Accessibility panel.

## Contributing

Development setup, testing, project structure, and the full script reference live
in [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

[MIT](./LICENSE) © Ryan Calacsan
