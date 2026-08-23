# KSULYMIN Graphics Studio

## Architecture

This is a single-page marketing and lead-generation site built with TanStack Start, React 19, TypeScript, Vite, Tailwind CSS 4, and custom CSS. It deploys to Netlify and uses Netlify Forms for all user submissions.

## Key Directories

- `src/routes/index.tsx` contains the full studio page, content data, interactive behavior, and form components.
- `src/routes/__root.tsx` defines global metadata, font loading, structured data, and the document shell.
- `src/styles.css` contains the design system, responsive layouts, theme variables, and animations.
- `public/__forms.html` is the required static form registration file for Netlify Forms.
- `netlify.toml` configures the TanStack output and Netlify Image CDN remote image allowlist.

## Conventions

- Preserve the established black, warm-paper, acid-green, and orange brand palette.
- Use `DM Sans` for interface text and `Fraunces` for expressive display typography.
- Keep interactive state local to the page unless a new feature clearly requires shared state.
- Add new form fields to both the React form and `public/__forms.html` with identical names.
- Submit forms to `/__forms.html`; posting to `/` is intercepted by TanStack Start SSR.
- Optimize remote imagery through `/.netlify/images` and update the allowlist before adding a new image host.
- Use semantic HTML, visible focus styles, descriptive labels, and reduced-motion support.

## Non-Obvious Decisions

- Reviews are curated site content; visitor feedback is captured privately through Netlify Forms rather than published automatically.
- Payment confirmation stores uploaded screenshots as Netlify Form submissions, avoiding a separate database for a workflow that is reviewed manually.
- Light and dark themes share the same brand accents so theme switching does not change the studio identity.

## Local Development

- Install dependencies with `pnpm install`.
- Run the Netlify-aware local environment with `netlify dev --port 8889`.
- Production validation is handled by the deployment pipeline.
