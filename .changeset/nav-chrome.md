---
'@ryancalacsan/caliper-ui': minor
---

Add the navigation & chrome layer: `AppHeader` (sticky, condenses to a glass bar
on scroll), `NavLink` (active state + `aria-current`), `Link` (styled, with
`asChild`), `Drawer` (focus-trapped side menu built on the Modal hooks),
`ThemeToggle` (reads the theme after mount, so no hydration mismatch),
`BackToTop`, `SkipLink`, and `VisuallyHidden`. The interactive ones are
`"use client"`; the links and utilities stay server-renderable.
