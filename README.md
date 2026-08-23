# KSULYMIN Graphics Studio

A polished, mobile-first website for KSULYMIN Graphics Studio. The site presents the studio’s services and portfolio while giving prospective and existing customers clear ways to request work, verify payments, leave feedback, and contact the studio.

## Key Features

- Responsive portfolio, pricing, reviews, testimonial slider, FAQ, statistics, search, and theme switching
- Netlify Forms for project orders, customer feedback, newsletter signups, and payment screenshot uploads
- Easypaisa and JazzCash payment instructions with copy-to-clipboard support
- Netlify Image CDN optimization for remote portfolio imagery
- Accessible navigation, keyboard interactions, reduced-motion support, semantic labels, and visible focus states
- SEO metadata and structured business data

## Technology

- TanStack Start and TanStack Router
- React 19 and TypeScript
- Vite and Tailwind CSS 4
- Lucide React icons
- Netlify Forms and Netlify Image CDN

## Run Locally

```bash
pnpm install
netlify dev --port 8889
```

Netlify Forms are detected during deployment through `public/__forms.html`. Form submissions should be tested on a deployed preview because local form handling does not exactly match production.
