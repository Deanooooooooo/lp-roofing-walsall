# L.P Roofing, Walsall - QA

## Source Audit

- Business name: PASS, Facebook metadata shows `L.P Roofing | Walsall`.
- Verified profile/social: PASS, `https://www.facebook.com/LPRoofing`.
- Services: PASS, Facebook metadata lists new roofs, re-roofs, dry systems and maintenance.
- Location: PASS, Facebook metadata identifies Walsall.
- Phone: not found in accessible public source.
- Email: no verified business email found. Per Dean's latest rule, the premium form remains email-first and uses this build recipient: `enquiries@siteforge.local`.
- Map: PASS, Walsall service-area search embed used rather than a fabricated street address.
- Footer social/profile: PASS, Facebook appears in footer.

## Review Audit

- Google reviews: no accessible Google review profile found during this build pass.
- Facebook reviews: PASS, visible Facebook review screenshot in the conversation showed 4 reviews; 3 proper written snippets selected.
- Testimonials: PASS, 3 proper written Facebook review snippets used.
- No review count or invented rating/review claims are displayed.

## Image Audit

- Hero: generated high-resolution roofing atmosphere, not presented as real L.P Roofing work.
- Verified business image: Facebook profile image included.
- Gallery/media: generated service visuals and the verified Facebook profile image; customer-facing copy avoids claiming these are completed project media.
- Image dimensions: PASS, hero 1672x941; generated service visuals 1448x1086; Facebook profile 720x717.

## Local QA Checklist

- Premium stack: Next/React, motion, GSAP ScrollTrigger, Lenis, lucide-react.
- One H1: PASS.
- One primary form: PASS.
- Hero form present: PASS.
- SEO H1 includes service and location: PASS, `Roofing contractor in Walsall...`.
- Email-first enquiry route: PASS, `mailto:` route present with fallback recipient documented above.
- Footer Facebook: PASS.
- No unsupported upload CTA: PASS.
- No internal rejected phrases: PASS.
- Desktop/mobile screenshots: PASS, `qa-hero-desktop.png`, `qa-hero-mobile.png`, `qa-gallery-desktop.png`, `qa-proof-desktop.png`, `qa-contact-footer-desktop.png`.
- Live deployment: PASS, `https://deanooooooooo.github.io/lp-roofing-walsall/`.

## Live QA

- GitHub Pages status: PASS, built from `gh-pages`.
- Live HTML: PASS, HTTP 200 and contains latest L.P Roofing Walsall markers.
- CSS: PASS, HTTP 200.
- Hero image: PASS, HTTP 200.
- One H1: PASS.
- One form: PASS.
- Hero form present: PASS.
- Email route: PASS, `mailto:` links present.
- Footer Facebook: PASS.
- Bad phrase grep: PASS.
- Live screenshots: PASS, `qa-live-hero-desktop.png`, `qa-live-hero-mobile.png`, `qa-live-contact-footer-desktop.png`.
