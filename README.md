# KSULYMIN Graphics Studio

A polished, mobile-first website for KSULYMIN Graphics Studio. The site presents the studio’s services and portfolio while giving prospective and existing customers clear ways to request work, verify payments, and stay in touch.

## Key Features

- Responsive portfolio, pricing, reviews, testimonial slider, FAQ, statistics, search, and theme switching
- Netlify Forms for project orders, customer feedback, newsletter signups, and payment screenshot uploads
- Manual Easypaisa and JazzCash payment instructions with transaction ID and screenshot submission
- Saved project reference codes to help link client enquiries and payment proofs
- Payment method and project tracking details for manual wallet verification
- Form-level duplicate-submit guards, progress states, browser validation, file-type checks, and accessible status feedback
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

## Payment boundary

The current payment section supports manual wallet transfers and proof submission only. It does not create charges, validate a transfer directly with Easypaisa/JazzCash, or automatically mark an invoice as paid. Never request or store a customer's PIN, password, or OTP.

For real gateway integration, a provider-hosted or API-based checkout must be added only after the merchant account, API credentials, callback verification, fraud controls, refund/dispute flow, and compliance checks are configured and tested.

## Payment workflow

- Client chooses a payment method and sends the amount
- Client saves the project reference from the order form
- Client submits the payment-proof form with the exact transaction ID and screenshot
- Studio verifies the transfer manually and replies on WhatsApp or email
- No direct wallet PIN, password, or OTP collection occurs in the site
