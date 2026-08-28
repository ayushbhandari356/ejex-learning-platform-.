# Implement the Vertex home page reference

## Goal

Replace the current design-system specimen at `/` with a responsive, high-fidelity static implementation of `design/vertex-home.png`. The reference is the source of truth. This slice is the public Vertex landing/home page, presenting the primary navigation, learning-search invitation, course cards, and the decorative lower illustration.

## Skills and documentation read

- Reviewed the repository `AGENTS.md` instructions.
- Reviewed the installed Next.js 16 App Router documentation for the file-system page convention, server-component defaults, global CSS/Tailwind support, metadata, and font handling.
- No Sanity, Clerk, PostHog, Context, or image-generation skill applies: this request is a static visual home-page slice only and introduces no data, authentication, analytics, generated bitmap asset, or backend integration.

## Existing code inspected

- `package.json`: Next.js 16.3.3, React 19.2.8, TypeScript, Tailwind CSS v4; no component/icon library is installed.
- `app/page.tsx`: currently renders a large static Vertex design-system specimen, including inline SVG icons and local helper components.
- `app/globals.css`: already defines Vertex warm-paper colours, display/sans fallbacks, a focus style, and page-surface helpers.
- `app/layout.tsx`: currently has design-system metadata and imports global CSS.
- `design/vertex-home.png`: the supplied 1024px-wide desktop reference.
- `prompts/implement-vertex-design-system.md`: the prior design-system implementation prompt; it confirms the existing visual tokens and static approach.

## Decisions and assumptions

- Replace, rather than extend, the current design-system page because `/` must represent the supplied home screen.
- Keep `/` as a server-rendered page. The search box, navigation, notifications, avatar, course cards, and call-to-action will be semantic interactive-looking controls/links but will not yet call an API or persist data; no destination routes currently exist.
- Build the Vertex mark and all UI glyphs as inline SVG. Use CSS-drawn/gradient course marks and the lower chart-like illustration instead of fetching or generating remote assets. The avatar will be a local presentational gradient/initial treatment unless an existing suitable local asset is discovered during implementation; no external image will be introduced.
- Reuse the existing warm canvas, orange palette, hairline borders, focus treatment, serif display fallback, and sans-serif body fallback. Update sizing and layout to match the home reference rather than preserving the design-system page’s panels.
- Reproduce desktop geometry closely: narrow patterned outer gutters, 965px inner document area at a 1024px viewport, 98px header, tall centred hero, three equal course cards, divider/message band, and peach decorative bars clipped at the bottom.
- Implement responsive behaviour not represented in the reference: compact navigation and header controls, reduced hero type, a full-width search control, one-column course cards, and a safely cropped decorative illustration. Preserve reading order and prevent page-level horizontal scrolling.
- Set page metadata to Vertex home-page content.

## Files expected to change

- `app/page.tsx` — replace the design-system specimen with the semantic static home-page structure, reusable SVG helpers, and course data.
- `app/globals.css` — add or revise home-specific layout, patterned-gutter, course-card, and decorative-illustration styles while retaining global accessibility basics.
- `app/layout.tsx` — update title and description for the Vertex home page.

## Requirements

1. Closely reproduce `design/vertex-home.png` at desktop width, including all visible text, hierarchy, alignment, background/border treatment, whitespace, and proportions.
2. Include a top header with Vertex mark/name, Courses and My Learning navigation, bell control, and avatar treatment.
3. Include the centred hero with the `INTELLIGENT LEARNING` eyebrow, supplied title/copy, orange `Explore Courses` call to action, and large search field with magnifying glass and `⌘ K` key hint.
4. Include the All Courses heading and `View all courses` action; render exactly three course cards with the supplied course names, descriptions, level, duration, and module count:
   - Next.js for Production
   - Docker Essentials
   - TypeScript Deep Dive
5. Include appropriate course identity marks, metadata icons, card borders, and the lower “New courses and lessons added every week.” band with star icon and dividers.
6. Recreate the clipped peach lower decoration with CSS gradients/shapes; it must remain decorative and hidden from assistive technology.
7. Use semantic landmarks, headings, navigation, links/buttons, labelled icon-only controls, decorative `aria-hidden` SVGs, and visible keyboard focus styling.
8. Ensure 375px, 768px, and desktop layouts remain legible with no document-level horizontal overflow.
9. Do not add packages, remote image/font requests, credentials, API routes, client-side secrets, data writes, or backend integrations.

## Security considerations

- This page is static and public: it has no authentication, external calls, user-data processing, server-side write, or untrusted HTML rendering.
- Do not add environment values, third-party embeds, or `dangerouslySetInnerHTML`.
- Do not pretend the visual search input is connected to the future Sanity Context/LLM search API.

## Acceptance criteria

- `/` no longer renders the design-system specimen and instead closely matches the supplied home-page reference.
- Desktop visual details and responsive stacking behaviour agree with the reference and requirements.
- The interactive controls have accessible names and a visible focus style; decorative elements are excluded from the accessibility tree.
- No network dependency, new package, app state write, or secret is introduced.
- `npm run lint`, `npx tsc --noEmit`, and `npm run build` complete successfully.

## Checks to run after implementation

1. `npm run lint`
2. `npx tsc --noEmit`
3. `npm run build`
4. `npm run dev` and local visual inspection of `/` at desktop, tablet, and mobile widths.

## Manual test steps

1. Run `npm run dev` and open `http://localhost:3000`.
2. At a 1024px viewport, compare the header, hero, search field, course row, update band, and lower artwork against `design/vertex-home.png`.
3. Resize to roughly 768px and 375px; confirm the controls remain usable, cards stack appropriately, and the browser has no horizontal scrollbar.
4. Tab through header links, controls, the CTA, search field, and course/view-all links; verify each has a visible focus indicator and icon-only controls have an accessible name.
5. Run the stated checks and report their actual results.
