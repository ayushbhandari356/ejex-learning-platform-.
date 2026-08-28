# Implement the Vertex design-system reference

## Goal

Replace the starter homepage with a responsive, high-fidelity implementation of the supplied `design/vertex-designsystem.png` reference. This is a design-system specimen page at `/`, not the learning product UI itself. It should visually document Vertex's colors, typography, spacing, radii, shadows, icons, buttons, inputs, badges, status indicators, progress bar, cards, navigation, and principles.

## Skills and documentation read

- Reviewed the current `AGENTS.md` project instructions.
- Reviewed the installed Next.js 16 App Router documentation for project structure, pages/layouts, server/client component boundaries, CSS, and fonts.
- Did not use a Sanity, Clerk, PostHog, or Context skill: this requested slice is a static design-system implementation and does not touch content, auth, analytics, search, or server data boundaries.

## Existing code inspected

- `package.json`: Next.js 16.3.3, React 19.2.8, TypeScript, Tailwind CSS v4; no component or icon library is installed.
- `app/page.tsx`: unmodified Create Next App starter page.
- `app/layout.tsx`: root layout uses Geist and Geist Mono; starter metadata.
- `app/globals.css`: Tailwind import and starter light/dark variables.
- `design/vertex-designsystem.png`: the visual source of truth.

## Decisions and assumptions

- Implement one static server-rendered route at `/`. No client component is required because the reference illustrates states rather than requiring working control behavior.
- Use Playfair Display for editorial display headings and Inter for interface/body typography via `next/font/google`, matching the reference. If the build environment cannot obtain a font at build time, retain a close system-serif/system-sans fallback without changing the layout.
- Use no additional package. Implement the small specimen icons as accessible inline SVGs and use CSS/Tailwind utilities for all other UI.
- Preserve the reference's warm off-white canvas, hairline borders, orange primary scale, compact uppercase section labels, card geometry, shadow specimens, and 1, 2, and 3-column responsive behavior.
- Buttons, controls, pagination, and navigation are visual specimens. They will include appropriate semantic elements and keyboard focus styles but will not navigate or mutate application state.
- No product routes, Sanity content model, Clerk integration, PostHog, API route, environment value, external image, or backend work is in scope.

## Files expected to change

- `app/page.tsx` — replace the starter with semantically grouped design-system sections and reusable local data arrays/components where useful.
- `app/globals.css` — replace starter global/dark styling with the required design tokens, baseline styles, responsive refinements, and only the custom CSS that Tailwind utilities cannot express cleanly.
- `app/layout.tsx` — set Vertex metadata and load the Inter/Playfair font variables used by the page.

## Requirements

1. Reproduce the desktop reference's overall composition: a centered, rounded, softly bordered sheet on an off-white page, with section panels ordered 01 through 14.
2. Include every illustrated system area and its representative specimen values/content:
   - Vertex mark/name, Design System intro, version/date
   - Primary and neutral swatches with labels/hex values
   - Playfair Display and Inter typography samples plus the type-scale table
   - Spacing blocks, radius samples, and shadow samples
   - Outline and filled icon rows, icon specs
   - Button states/specs, search input, select, and field specs
   - Video/lesson/popular badges; status indicators; progress bar
   - Course, video lesson, lesson, and resource cards
   - Navigation, breadcrumbs, pagination, and four principles
3. Create sensible mobile behavior without inventing a separate design: panels stack, dense token rows wrap/scroll safely, cards become a single column, and text remains readable without horizontal page overflow.
4. Use semantic landmarks and headings; icon-only controls must receive an `aria-label`; decorative SVGs must be hidden from assistive technology; input/select must have programmatic labels.
5. Use visible `:focus-visible` treatment for interactive specimen controls and retain adequate color contrast.
6. Remove the starter dark-mode override so this reference remains faithful to its provided light design.
7. Keep implementation static and local—no network requests, new credentials, client-side secrets, or data writes.

## Security considerations

- The page has no authenticated surfaces, API calls, user input processing, or server-side writes.
- Do not add tokens, environment variables, remote embeds, or untrusted HTML.
- Treat all rendered example labels as hard-coded display data; do not use `dangerouslySetInnerHTML`.

## Acceptance criteria

- `/` no longer shows Create Next App content and closely matches `design/vertex-designsystem.png` at desktop width.
- The reference's visual hierarchy, palette, typography pairing, borders, spacing, and section arrangement are present.
- At 375px, 768px, and desktop widths, no content causes document-level horizontal scrolling and the layout remains ordered and legible.
- The page is keyboard navigable with visible focus indicators and has no unlabeled icon-only controls.
- `npm run lint` and `npm run build` complete successfully.

## Checks to run after implementation

1. `npm run lint`
2. `npx tsc --noEmit`
3. `npm run build`
4. `npm run dev` and visually inspect the route locally.

## Manual test steps

1. Start the app with `npm run dev` and open `http://localhost:3000`.
2. Compare the wide desktop viewport to `design/vertex-designsystem.png`, checking all 14 sections and their order.
3. Resize to approximately 768px and 375px; verify columns stack or wrap cleanly and no horizontal browser scrollbar appears.
4. Use Tab and Shift+Tab through buttons, input, select, pagination, and icon controls; verify focus is visible and every icon-only control has an accessible name.
5. Run the listed automated checks and confirm their actual output before reporting completion.
