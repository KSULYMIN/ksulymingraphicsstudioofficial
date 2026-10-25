# Marketplace, Veylora, Payments and Search — Research Snapshot

**Research checked:** 25 October 2026  
**Project:** KSULYMIN Graphics Studio Official  
**Scope:** Representative competitor and primary-source benchmark, not an exhaustive crawl of every site in 200+ countries.

## 1. Veylora reference

**Supplied URL:** https://veylora-app.netlify.app/

The URL was fetched read-only and returned HTTP 503 with the Netlify message that the site was paused after reaching its usage limits. Search indexing still describes the product as **“Veylora — Your business. Your store. Your way.”** and positions it as a no-code online-store builder: choose a template, add products, and customize a storefront visually.

Searches for the exact URL, public changelog, GitHub repo and upcoming releases did **not** find a trustworthy public roadmap or confirmed upcoming features. Do not present speculative updates as fact. The product is useful as a *storefront-builder UX reference* (no-code setup, visual customization and store workspace), but it is not itself a freelance designer marketplace.

Official Netlify paused-site guidance: https://docs.netlify.com/manage/accounts-and-billing/billing/resume-paused-projects/

The connected Netlify account did not return a project matching “Veylora”, so this workflow cannot resume that paused project. Restoring it requires its owner/account team to address the usage limit in the account that owns it.

## 2. Representative competitor patterns

| Platform | Publicly documented product pattern | Lessons for KSULYMIN | Primary source |
|---|---|---|---|
| Fiverr | Buyers browse service listings (Gigs), compare packages and reviews, order, track delivery and request revisions. The buyer fee is shown during checkout; Fiverr help documents a 5.5% service fee and an additional $3 for orders under $100. Fiverr's freelancer guide says the freelancer receives 80% of the order amount. Rates/terms can change; re-check before using in a fee model. | Start with productized design packages and clear included concepts, revisions, delivery files, status tracking and transparent fees. | https://help.fiverr.com/hc/en-us/articles/360010558038-How-Fiverr-works-for-clients ; https://help.fiverr.com/hc/en-us/articles/34069565843985-How-Fiverr-works-for-freelancers |
| Upwork | Contract and project marketplace with a freelancer service-fee range documented as 0%–15%, shown before the contract starts. | Show fee math before contracts and distinguish hourly, fixed-price and milestone projects. | https://support.upwork.com/hc/en-us/articles/211062538-Learn-about-the-Freelancer-Service-Fee |
| WorkChest | Pakistan-focused employer/freelancer marketplace covering services, profiles, portfolios, discussions and project proposals/bids. | A local creative MVP could combine fixed-price packages with a separate custom-project brief and proposal flow. | https://workchest.com/how-it-works ; https://workchest.com/faq |
| Guru | SafePay is a funded project-payment arrangement; parties set terms and payment release/dispute handling is a separate workflow. | Manual wallet transfer + receipt upload is not escrow. Protection needs controlled funds, explicit release states, evidence, and dispute operations. | https://www.guru.com/safepay/ ; https://www.guru.com/how-it-works-freelancer/ |
| Freelancer.com | Milestone payments structure releases and connect to the platform's dispute process. | Use clear milestone, review, acceptance, change-request and dispute states instead of one ambiguous “paid” flag. | https://www.freelancer.com/support/payments/how-do-i-get-paid ; https://www.freelancer.com/feesandcharges |

This is an evidence-based, representative sample of the direct platform patterns most relevant to a design studio. It does **not** verify every competitor or every website in more than 200 countries; an exhaustive claim would be misleading.

## 3. Current KSULYMIN payment reality

The live studio presents local wallet instructions for Easypaisa/JazzCash and a form for uploading payment evidence. Repository source and Netlify Forms metadata support this as a **manual payment-verification flow**.

Not established by current evidence:
- integrated card/merchant checkout;
- escrow or protected holding of funds;
- marketplace seller payouts;
- automated refunds/chargebacks;
- verified payment API integration;
- account-based order access and dispute workflow.

Do not market the existing form as an escrow or integrated checkout.

### Payment candidates to investigate

| Candidate | Why it merits a later technical/eligibility check | Official source |
|---|---|---|
| Safepay | Official docs advertise merchant checkout and local payment methods, including Raast-related support; actual feature/fee availability depends on merchant account and current terms. | https://safepay.com.pk/pricing ; https://safepay.com.pk/blog/content/safepay-raast |
| Easypaisa | Has a merchant portal and online payment gateway documentation; confirm merchant eligibility and settlement terms for this business. | https://merchantportal.easypaisa.com.pk/ |
| JazzCash | Offers a merchant gateway path; confirm account onboarding, credentials, production approval, settlement and refund terms. | https://www.jazzcash.com.pk/ |
| Raast / SBP guidance | SBP publishes authorised EMI information and Raast merchant participation material. Wallet authorization is not, by itself, proof a specific merchant gateway is enabled for this site. | https://www.sbp.org.pk/ps/PDF/List-of-EMIs.pdf ; https://www.sbp.org.pk/our-subsidiaries/raast/join-raast |

No payment provider was connected and no live transaction was initiated in this research. Before implementing, verify the studio's merchant account eligibility, provider fees, supported currencies, settlement destination, refunds, chargebacks, KYC/business requirements and sandbox instructions. Use a sandbox first.

## 4. Google Search Console and technical SEO

The current Search Console instructions supplied by the owner include a URL-prefix HTML-file method and a meta-tag method. The feature branch adds:

- `public/google004fbf803b2efe5.html` with the supplied exact filename and verification text;
- a `google-site-verification` meta tag containing the owner's provided token;
- `public/robots.txt` allowing normal crawling and referencing the sitemap;
- `public/sitemap.xml` listing the canonical homepage;
- canonical, Open Graph URL/image and Twitter preview metadata.

**Verification is not complete until the deployed file/tag is accessible and the owner presses Verify in the correct Search Console property.** The DNS TXT record shown by Search Console belongs to Domain-property verification; a `netlify.app` hostname generally isn't a DNS zone the site owner controls. Use one URL-prefix verification route for the actual property and do not claim a verified property before Search Console confirms it.

Google official documentation:
- Verification methods: https://support.google.com/webmasters/answer/9008080
- Sitemaps are a crawl/discovery hint, not a guarantee of indexing: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Requesting recrawl does not guarantee indexing: https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl

The production site's robots and sitemap paths returned 404 during the initial live audit; the files on this branch will only reach the public URL after a branch preview/deployment or merge/deploy. Search Console status, rankings and organic traffic require Search Console/Analytics data and have not been measured.

## 5. Recommended build roadmap

1. **Foundation:** patch dependencies, reproducible lockfile, CI, honest portfolio/trust claims, valid uploads/forms, canonical metadata, robots and sitemap.
2. **Studio workflow:** real portfolio case studies with owner approval; service/package pages; a working inquiry-to-order process; order confirmation/notifications; privacy and retention disclosures.
3. **Client project area:** authenticated project status, briefs, approved deliverables, revision rounds, file delivery and change requests.
4. **Internal studio operations:** role-protected order queue, admin actions, evidence/audit trail and support workflow.
5. **Small marketplace pilot:** onboard a few invited designers; verify the checkout/payout provider first; then add service listings, milestones, accepted delivery, disputes and moderation.
6. **Country expansion:** select specific target markets based on actual seller/buyer need. For each market, research provider eligibility, settlement coverage, currency/FX, tax, consumer rules, privacy obligations, fraud and dispute operations before launch.

A mature Fiverr/Upwork/Guru-scale marketplace is a different product from the current single-page studio site. Avoid a speculative “full clone” rebuild before validating the smaller paid workflow. Keep the present Netlify/TanStack Start stack unless tests or requirements show it is inadequate.

## 6. Explicit research limitations

- No trustworthy public roadmap for the exact Veylora URL was found; its URL currently shows a Netlify usage-limit pause.
- No crawl of all sites in 200+ countries was performed; this is a curated representative benchmark using platform/official primary sources.
- No Search Console ownership/indexing, analytics, ranking, backlink or conversion data has been accessed.
- No production payment transaction, provider integration or customer form submission was tested.
