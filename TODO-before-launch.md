# TODO Before Launch — Yurgin's Lawn Care site

Everything that must be resolved before this site goes live, grouped by type. Placeholder tokens render visibly on the site (orange dashed highlight) so nothing ships unnoticed. They're centralized in `src/data/business.ts`.

---

## 1. Confirm with the owner → replace placeholder tokens

| Token | Where it appears | Action |
|---|---|---|
| `[[OWNER_NAME]]` | About page | Owner's full name (reviews say "Brett") |
| `[[OWNER_TITLE]]` | (available, not yet shown) | Owner's title for the About page if wanted |
| `[[YEARS]]` | Homepage intro, About page | Years in business / founding year |
| `[[LICENSE_NUMBER]]` | (available, not yet shown) | License/insurance # if you want it displayed; add to footer/About |
| `[[INSTAGRAM_URL]]` | Footer (icon hidden until set) | Instagram URL, or leave blank to keep it hidden |
| `[[FORM_ENDPOINT]]` | Contact + Careers forms | See §3 (form delivery) |

Also confirm: residential vs. commercial emphasis · any pricing/packages to publish · credit-card / online-payment details · online-booking link (Jobber/Thryv) if wanted.

Set values in **`src/data/business.ts`**.

---

## 2. Brand video & logo

- [ ] **Replace the hero video.** Current `public/assets/video/hero.mp4` is the bull "mow-to-reveal" animation, but its **final frame carries an AI-generator watermark** (hidden on the site by overlaying the clean logo PNG on freeze). Drop in the clean **`HeroVideoPro.mp4`** when ready — just overwrite `public/assets/video/hero.mp4`.
- [ ] **Compress the video.** It's ~6.2 MB (desktop-only, lazy-loaded after page load, so it doesn't affect mobile or first paint). Re-encode smaller + add a `.webm` source for best performance.
- [ ] **Seamless final frame.** Confirm the video ends exactly on the clean logo so the freeze→header-logo hand-off is perfect. The clean logo used for the freeze + header + footer is `Yurgins logo new final frame.png` (in `src/assets/images/logo.png`).
- [ ] *(Optional)* A transparent PNG/SVG logo is still nice for any future dark/green placements, though the current white-bg logo blends cleanly on the white header.

---

## 3. Forms (no backend yet)

Both the **Contact/Free Quote** and **Careers** forms are built, validated (inline errors, accessible), and **Netlify-Forms ready** (`data-netlify`, honeypot). They currently show an inline success message instead of submitting.

- [ ] Wire a real endpoint: deploy on **Netlify** (forms work automatically) **or** set `PLACEHOLDER.FORM_ENDPOINT` in `src/data/business.ts` to a **Formspree/Basin** URL and remove the demo success shim in `src/scripts/forms.ts`.
- [ ] Confirm submissions email `info@yurginslawncare.com`.

---

## 4. Photography to capture (placeholders are live on these pages)

Each `[[PHOTO]]` block on the site is sized to the final layout, so dropping in a real image won't shift anything.

- [ ] **Homepage** — before/after lawn edging (work teaser)
- [ ] **About** — owner portrait (family story)
- [ ] **Our Work** — before/after edging · edging close-ups (crisp lines) · fresh mulch beds · hedge trimming before/after · fall cleanup in progress
- [ ] **Contact** — service-area map of Salem & Gloucester counties
- [ ] *Already used (real, owned):* striped-lawn hero photo, crew mowing, branded truck — on Home, About, Our Work.

> Beyond the placeholders, a full shoot (before/after sets, edging close-ups, mulch, hedges, seasonal: fall cleanup / snow / holiday lights) remains the highest-impact investment.

---

## 5. Legal

- [ ] Finalize **Privacy Policy** (`/privacy`) and **Terms of Use** (`/terms`) — currently placeholder boilerplate (marked `noindex`). Carry over the existing legal text from the current site and have the owner/an attorney confirm.

---

## 6. Technical pre-launch

- [ ] Point `site` in `astro.config.mjs` to the real production domain (currently `https://www.yurginslawncare.com`).
- [ ] Add **GA4 + call tracking**; track quote-form submits and click-to-calls as conversions.
- [ ] **301 redirects** from old URLs (including the misspelled `lanw-maintenance-service`) → new equivalents.
- [ ] Verify **Google Business Profile** link + consistent NAP.
- [x] `LocalBusiness` JSON-LD with confirmed `openingHoursSpecification` (Mon–Fri 8:30–5, Sat 8:30–2, Sun closed).
- [ ] Confirm geo coordinates in `business.ts` (currently approximate Monroeville).
- [ ] **Address:** the site displays "Monroeville, NJ" publicly; the full street address (449 Bridgeton Pike, 08343) is kept in the JSON-LD schema for local SEO. Confirm this matches the Google Business Profile, or remove the street from `business.ts` if you don't want it indexed.
- [ ] `sitemap-index.xml`, `robots.txt`, OpenGraph image are generated — replace `/public/og-default.jpg` with a purpose-built 1200×630 share image.
- [ ] Re-run Lighthouse on the deployed URL (local build: SEO 100 / Best-Practices 100 / Accessibility ~100).

---

## Built & verified
Astro + Tailwind static site · 42 pages (Home, Services + 5 details, ~20 town pages, About, Our Work, Reviews, Careers, Contact, Blog + 5 posts, Privacy/Terms, 404) · GSAP + Lenis motion (hero reveal, masked headings, staggered reveals, parallax) gated to desktop with reduced-motion + no-JS fallbacks · WebP image optimization · LocalBusiness schema + sitemap.
