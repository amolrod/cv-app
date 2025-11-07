# CV Builder Roadmap

## Architecture
- Use App Router with dedicated `/builder` route hosting the editor layout (forms + preview).
- Implement state container via React context + reducer living in `providers/cv-provider.tsx`.
- Persist CV data to `localStorage` (with hydration guard) via utility helper.
- Keep render templates in `components/resume/templates/*` receiving `CVData` + `UIState`.

## UI Libraries & Styling
- Configure Google Fonts (Montserrat + Lato by default) through `next/font/google`.
- Integrate shadcn/ui primitives (button, input, textarea, select, tabs, dialog, tooltip, dropdown, toast).
- Extend Tailwind globals with print styles (`@page`, `.no-print`, `.avoid-break`, `.page-break`).
- Provide theme controls for accent color, typography set, base size, and compact mode.

## Core Features
- Profile form with URL normalization for GitHub/LinkedIn/website.
- Experience editor with add/remove/reorder, bullet assistant modal for action results.
- Education list editor with details textarea.
- Skills & languages inputs using chips + column layout, plus quick insertion from JD Matcher.
- JD Matcher panel analyzing job description to highlight missing keywords and apply them to CV.
- Global controls: template selector, font preset, accent color input, base size slider, compact toggle, JSON import/export, print button.
- Preview pane renders selected template in A4 canvas with accurate typography + spacing.

## Utilities
- `utils/urls.ts` for normalization of social links.
- `utils/jd.ts` for tokenization, stopword filtering, scoring, and difference computation.
- `utils/storage.ts` for client-side persistence wrapper.
- `utils/pdf.ts` stub for potential SSR export endpoint.

## Routing
- `/` simple landing with CTA to `/builder`.
- `/builder` main experience (client component) using `BuilderShell` to coordinate layout.
- `/api/export` optional placeholder returning 501 until implemented.

## Accessibility & UX
- Ensure labels/aria attributes for all inputs.
- Keyboard accessible dialog and reordering controls.
- Apply color contrast by default (accent palette suggestions as presets).
- Provide instructions for printing to PDF near export controls.

## Testing & QA
- Lint + type-check via existing scripts.
- Provide sample data for quick preview and manual QA within builder.
