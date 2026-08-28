# Validate and refine Vertex home-page responsiveness

## Goal

Validate the implemented Vertex home page against standard device viewport widths and update it where the layout, overflow handling, text wrapping, touch targets, or visual hierarchy fail. Keep the provided desktop reference (`design/vertex-home.png`) unchanged at its target desktop size while making sensible responsive adaptations below it.

## Skills and documentation read

- Reviewed the repository `AGENTS.md` instructions.
- Reused the relevant installed Next.js 16 App Router guidance already read for the implementation: this remains a server-rendered static page with global Tailwind/CSS styling.
- No other project skill applies: this is responsive styling and visual validation only, with no CMS, search, authentication, analytics, image generation, or backend scope.

## Existing code inspected

- `app/page.tsx`: static Home page with a desktop header, hero/search area, three course cards, update banner, and decorative bar illustration.
- `app/globals.css`: desktop styles plus breakpoints at 760px and 480px; it currently converts cards to one column below 760px and hides primary navigation below 480px.
- `prompts/implement-vertex-home-page.md`: its acceptance criteria require no horizontal overflow and readable layouts at 375px, 768px, and desktop widths.
- No Playwright/Puppeteer runtime is installed in the app dependencies, so validation will use the running local app plus available browser/viewport inspection rather than adding a test dependency for this small static slice.

## Decisions and assumptions

- Treat the home reference as desktop-only and preserve its exact visual intent at 1024px and wider.
- Cover standard widths: 320px, 360px, 375px, 390px, 412px, 768px, 820px, 1024px, 1280px, and 1440px. Test both short and tall mobile viewport heights where the browser tooling permits.
- Use a three-tier layout: mobile (up to 599px), tablet (600px–899px), and desktop (900px+). Tablet may use one or two course columns based on actual card readability; mobile uses one column.
- Maintain all content and reading order. A compact header is allowed at narrow widths; controls must remain visible, tappable, and labelled.
- Keep all changes local to the current static home page. Do not add a package, remote asset, API, routing feature, or client-side search implementation.

## Files expected to change

- `app/globals.css` — revise breakpoint ranges, spacing, typography, header composition, cards, metadata wrapping, and decorative-art clipping according to validation findings.
- `app/page.tsx` — only if a semantic wrapper or a small structural hook is necessary to fix a validated responsive issue.
- `prompts/validate-vertex-home-responsiveness.md` — this implementation record.

## Requirements

1. Verify no document-level horizontal overflow at every target width.
2. Preserve desktop layout at 1024px: patterned outer gutters, single-line header navigation, centred hero, three-card course row, and bottom decoration.
3. At tablet widths, ensure header controls do not collide; hero title/copy/search have comfortable line lengths; cards are not too narrow; metadata never clips.
4. At mobile widths, ensure only intentional content is hidden (desktop navigation and keyboard hint if necessary), headings/copy wrap cleanly, input placeholder remains usable, and cards/messages fit within the viewport.
5. Preserve a visible focus style and practical touch targets for links and buttons.
6. Keep the bottom decorative bars clipped to their section without introducing horizontal scrolling or covering readable content.
7. Re-run lint, TypeScript, production build, and local route smoke test after changes.

## Security considerations

- This remains a local static public UI. Do not introduce tokens, environment variables, external resources, user-state writes, or unsafe HTML.

## Acceptance criteria

- The page is visually intact and free of horizontal overflow across the stated standard viewport widths.
- Navigation/header, hero/search, course cards, update message, and decoration remain readable and usable at each responsive tier.
- Desktop fidelity to the supplied reference is maintained.
- `npm.cmd run lint`, `npx.cmd tsc --noEmit`, and `npm.cmd run build` succeed.

## Checks and manual test steps

1. Run the dev server and open `/` locally.
2. Use responsive viewport tools at 320×568, 360×800, 375×812, 390×844, 412×915, 768×1024, 820×1180, 1024×768, 1280×800, and 1440×900.
3. At each size, check header collision, horizontal scrollbar, hero text/input fit, card spacing and metadata wrapping, update-banner fit, and artwork overlap.
4. Test keyboard focus and at least one tap/click target at mobile width.
5. Run the automated checks and report their exact results.
