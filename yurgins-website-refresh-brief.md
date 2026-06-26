# Yurgin's Lawn Care — Website Refresh Brief

*Prepared June 23, 2026. Single source of truth for rebuilding yurginslawncare.com. Anything marked `⚠️ CONFIRM` must be verified with the owner before launch — the build should render these as visible placeholders (e.g. `[[PHONE]]`) and list them in `TODO-before-launch.md`.*

---

## 1. BUILD PROMPT (paste-ready for Claude Code)

> **Build a new marketing website for Yurgin's Lawn Care, a family-owned lawn care and landscaping company in Monroeville, NJ serving Salem & Gloucester counties (South Jersey).**
>
> **Stack & architecture**
> - Static site generator (Astro preferred; Next.js static export acceptable) + **Tailwind CSS**. No backend/database.
> - Content lives in editable collections (Markdown/MDX or JSON) so the owner can add items without touching layout: `services`, `service-areas` (towns), `testimonials`, `blog`. Keep one schema per collection.
> - **No custom payment capture and no booking backend.** Quote requests post to a simple form handler (Formspree/Netlify Forms/Basin) that emails `[[INFO_EMAIL]]`. Phone is the primary conversion path. If an online-booking step is wanted later, hand off to a third-party (Jobber/Thryv) link — do not build a scheduler.
> - Mobile-first, accessible (WCAG AA), and tuned for Core Web Vitals: lazy-load images, preconnect fonts, no heavy JS. Target Lighthouse 90+ on mobile.
> - SEO baseline on every page: title/meta/OpenGraph, `LocalBusiness` JSON-LD schema (with `areaServed`, hours, geo, phone), sitemap.xml, robots.txt, canonical tags.
>
> **Brand**
> - Use the existing logo at `assets/images/logo.jpg` (bull mascot + wordmark). **Request a transparent PNG/SVG** of the logo for dark/green sections — note this in the launch TODO.
> - Palette (from logo): turf green `#3E8E2E`, deep green `#2E6B22`, bull brown `#8A3B2A`, cream `#F4F1E6`, gold `#E8901F`, near-black `#1A1A1A`, white. Green = primary, gold = accent/CTA.
> - Voice: confident, friendly, local, hard-working. The mascot lets the brand be a little bold and fun — lean into "crisp, clean, done right" pride. Tagline options: **"Leave your lawn care to us."** / **"Transforming lawns across South Jersey."**
>
> **Global UI**
> - Sticky header on every page: logo, nav, click-to-call `[[PHONE]]` button, and a high-contrast **"Get a Free Quote"** button (gold). Show the phone number as tappable on mobile.
> - Persistent mobile sticky footer bar: "Call" + "Free Quote".
> - Footer: NAP (name/address/phone), hours, service-area list, social links, "Licensed & Insured", copyright, privacy/TOU links.
>
> **Pages** (see sitemap §7): Home, Services overview + 5 service detail pages (Lawn Maintenance & Mowing, Property Cleanups, Mulch Installation, Snow Removal, Holiday Lighting), Service Areas hub + town pages, About, Our Work (gallery), Reviews, Careers, Contact / Free Quote, Blog index + post template, Privacy/Terms.
>
> **Images:** reference local files in `assets/` — do NOT hotlink remote URLs. Where real photography doesn't exist yet (most of the site), insert clearly-labeled placeholder blocks (`[[PHOTO: before/after lawn edging]]`) sized to the final layout, and add every one to `TODO-before-launch.md`. The only real images currently available are `assets/images/logo.jpg`.
>
> **Placeholders:** use `[[DOUBLE_BRACKET]]` tokens for every `⚠️ CONFIRM` item in this brief (phone, email, hours, owner name, years in business, license #, pricing). Generate `TODO-before-launch.md` listing every placeholder and every missing photo, grouped by page.
>
> **Animations — model the motion on casperscaviar.com (full spec in §8.5).** Use **GSAP + ScrollTrigger + SplitText + Flip** plus a smooth-scroll library (**Lenis** preferred; Locomotive Scroll acceptable). Implement: (1) site-wide smooth/inertia scroll; (2) **masked line-by-line heading reveals** (SplitText, `yPercent:110→0`, `ease:"expo.out"`); (3) **staggered fade-up content reveals** on cards/lists (`y:2rem→0`, `autoAlpha:0→1`, 200ms stagger, `expo.out`); (4) a **scroll-scrubbed logo** that starts large in the hero and shrinks into the sticky header over the first ~500px; (5) a **scroll-synced showcase** (adapt their featured-products pattern) for services/before-after. **Hard requirements:** all motion gated to desktop (`min-width:768px`) with instant-visible fallback on mobile; honor `prefers-reduced-motion`; trigger text reveals after `document.fonts.ready`; never hide content if JS fails (animate from a visible base / add a no-JS class). GSAP and all its plugins (incl. SplitText, Flip) are free as of GSAP 3.13.

---

## 2. Homepage wireframe (section by section)

Design base: clean, photo-forward, conversion-first (see §8). Each section below maps to that direction.

1. **Sticky header** — logo left; nav (Services ▾, Service Areas, Our Work, Reviews, About, Contact); right side: `[[PHONE]]` click-to-call + gold **"Get a Free Quote"**.

2. **Hero** — full-bleed photo of a freshly mowed/edged South Jersey property (placeholder for now). Overlaid headline + subhead + dual CTA.
   - H1: *"South Jersey's lawn, done right."* or *"Crisp lawns. Clean lines. Zero hassle."*
   - Sub: *"Family-owned lawn care & landscaping in Monroeville, NJ — serving Salem & Gloucester counties. Reliable weekly service, fast quotes, and a complete clean-up every visit."*
   - Buttons: **Get a Free Quote** (gold) · **Call [[PHONE]]**
   - Trust strip under hero: "★★★★★ 5.0 rated · Licensed & Insured · Family-Owned · Complete clean-up every job".

3. **Services grid** — 5–6 cards with icon + photo + one line, linking to detail pages: Lawn Maintenance & Mowing · Property Cleanups · Mulch Installation · Hedge Trimming · Snow Removal · Holiday Lighting. Copy idea: *"Everything your property needs, all year — from weekly mowing to winter snow."*

4. **Why Yurgin's** — 6 trust points from the current site, as icon tiles: Experienced team · Licensed & insured · Fast response & reliable scheduling · Complete clean-up after every job · Family-owned & customer-focused · Great communication & follow-through.

5. **Before/After or work gallery teaser** — 3–4 images (placeholder) + "See our work" → gallery. *Strongly recommend real before/after photos here; it's the highest-converting block for lawn care.*

6. **How it works** — 3 steps: 1) Request a free quote 2) We assess & schedule 3) Sit back — we handle it, clean-up included. (Adapt the 4-step process copy from the Property Cleanups page.)

7. **Reviews** — 3 rotating testimonials (verbatim from current site, §4) + "★ 5.0 on Yelp & Angi" + link to Reviews page.

8. **Service area** — short map/graphic + town list (Monroeville + 20-mile radius across Salem & Gloucester). Link to Service Areas hub. *"Based in Monroeville — serving a 20-mile radius across Salem & Gloucester counties."*

9. **Seasonal/retention band** — "Already a customer? Lock in Snow Removal & Holiday Lighting before winter." Enrollment CTA.

10. **Final CTA band** (green, gold button) — *"Ready for a lawn you're proud of? Get your free quote today."* — form or **Call [[PHONE]]**.

11. **Footer** — NAP, hours `[[HOURS]]`, service areas, social, Licensed & Insured, Careers link, privacy/TOU.

---

## 3. Business snapshot

| Field | Detail |
|---|---|
| Name | Yurgin's Lawn Care LLC |
| Type | Family-owned lawn care & landscaping (residential + commercial) |
| Based | 449 Bridgeton Pike, Monroeville, NJ 08343 |
| Service area | 20-mile radius — Salem & Gloucester counties |
| Phone | (856) 538-1755 (confirmed — shown on the branded truck) |
| Email | info@yurginslawncare.com |
| Hours | Mon–Sat 8:00 AM–5:00 PM, Sun closed `⚠️ CONFIRM` |
| Owner | "Brett" (named repeatedly in reviews) `⚠️ CONFIRM full name & title` |
| Rating | 5.0 (Yelp, Angi) |
| Payments | Accepts credit cards (Visa/MC/Amex/Discover) |
| Current platform | Thryv/Duda website builder |
| Logo | Bull mascot + wordmark (have it) |

**One-line positioning:** *The hard-working, detail-obsessed local crew that makes Salem & Gloucester County lawns the crispest on the block — and handles everything from weekly mowing to winter snow.*

**Key differentiators to lead with:** family-owned & genuinely local · complete clean-up after every job · fast response & reliable scheduling · licensed & insured · year-round (mowing → cleanups → mulch → snow → holiday lights) · memorable brand/mascot none of the competitors have.

---

## 4. Current-site content inventory (preserve & improve)

**Keep this strong copy verbatim** (it's good and on-brand):

Homepage intro: *"We take pleasure in being recognized as Salem County's top lawn care company at Yurgin's Lawn Care. With many years of hands-on experience, we've earned a reputation for dependable, detail-oriented service for both homeowners and businesses…"*

Testimonials (reuse all — attribute as on current site):
- *"I called for a mulch quote. I got a fast response, quote and install. Looks great. I'll definitely use Yurgin's again."* — Jim G.
- *"Fantastic service. Always timely and does a great job. His trimming skills are of the best and my home never looked so good."* — Anna F.
- *"Yurgin's Lawn Care took care of a nightmare weeding job at my house. Brett did an amazing job and left us very pleased!"* — Lea F.
- *"…all of the guys are very professional and their attention to detail is second to none. They even go above and beyond the normal service."* — Jillian N. (commercial/office client)
- *"…come home and see your house edged perfectly and looking crispier than all the neighbors! I'd recommend Yurgins to everyone I know in South Jersey…"* — E.S.
- *"Awesome service and Brett is amazing to deal with. Highly recommended."* — Michael Y.
- *"…meticulous and professional. I would highly recommend their services to anyone."* — Bryant D.

**Services & detail copy to carry over (rewrite lightly, keep substance):**
- **Lawn Maintenance & Mowing** — residential + commercial; mowing, edging (driveways/sidewalks/beds), hedge trimming, blowing/clean-up, lawn-health inspection; weekly & bi-weekly plans.
- **Property Cleanups** — spring & fall packages, bed maintenance, debris removal, bush trimming, weeding, leaf removal, dead-limb removal, green-waste disposal, pruning. Includes the **4-step process** (On-site assessment → Debris/green-waste removal → Pruning/trimming/bed maintenance → Seasonal services & ongoing care) and the hedge-trimming FAQ (how often, best time, cost, clean-up).
- **Mulch Installation** — bed prep (weeding/debris), even placement, edging, final walkthrough; residential + commercial.
- **Winter Services** — *Residential Snow Removal* (Dec–Mar, **enrollment-only**, completed within 24 hrs after snowfall ends, salt/ice-melt add-on); *Holiday Lighting Installation* (install + takedown, **customer supplies lights**, labor only — not a design service).

**Service-area town list (from site):** Franklinville, Elmer, Glassboro, Clayton, Mullica Hill, Pitman, Malaga, Woodstown, Sewell, Newfield, Williamstown, Mantua, Wenonah, Mickleton, Clarksboro, Alloway, Oak Valley, Winslow, Hammonton. (Facebook also lists Swedesboro & Pilesgrove.)

**Existing pages:** Home · Lawn Maintenance · Property Cleanups · Mulch Installation · Winter Services · "Lawn Mowing Monroeville" + "Lawn Mowing Clayton" (local SEO pages) · Blog · Careers (Jobs) · Get Mowing Estimate (contact).

**Things to fix:** no real photography anywhere; thin/duplicated body copy across service pages; a typo'd URL slug (`lanw-maintenance-service`); no About/owner story; no consolidated reviews page; no proper gallery; generic builder look that doesn't use the great mascot brand.

`⚠️ CONFIRM`: years in business ("many years"), license/insurance numbers, whether they serve commercial + residential equally, current pricing/packages (none public), whether credit-card payment is online or in-person.

---

## 5. Competitor landscape & gaps to own

| Competitor | What they do well | Weakness Yurgin's can exploit |
|---|---|---|
| **Green Lawn Fertilizing** (regional) | Programmatic **local SEO landing pages** (Gloucester County, Mullica Hill), packaged fertilization **programs**, strong reviews, online quote | Big/impersonal, fertilization-focused; not a local family crew |
| **The Grounds Guys of Mullica Hill** (Neighborly franchise) | Very polished UX, **"Request Free Estimate" on every page**, online booking, brand trust | Corporate/generic, no local personality or owner story |
| **Greentree Nursery Lawn & Landscape** (Glassboro/Sewell) | Full-service breadth (landscaping, hardscape, irrigation, nursery), established | Broad/garden-center feel; lawn-maintenance not the hero |
| **APL Landscaping** (local) | Modern, online requests via **Jobber Client Hub** | Extremely thin content, no story/proof |
| **J&J / J&R Lawn Care** (local) | Service-area SEO pages | Basic sites, little differentiation |

**Gaps Yurgin's can own:**
1. **Personality + brand** — the bull mascot is far more memorable than any competitor's logo. Make it a brand asset, not a footer afterthought.
2. **Real proof of work** — before/after galleries and crew photos. Competitors are thin here; Yurgin's can win on visible craftsmanship ("crispier than the neighbors").
3. **Authentic local family story** — name the owner (Brett), the Monroeville roots, the crew.
4. **Frictionless quote + fast-response promise** — match Grounds Guys' "Free Estimate everywhere," but faster and more personal.
5. **Year-round relationship** — snow removal + holiday lighting keep customers engaged off-season; merchandise this prominently.
6. **Hyper-local SEO** — town pages for every Salem & Gloucester community served (expand beyond the 2 existing ones).

---

## 6. Best-practice requirements for the build (2026)

- **Mobile-first & fast** — most lawn-care traffic is mobile; pass Core Web Vitals, lazy-load imagery, minimal JS.
- **Conversion on every page** — sticky header CTA + click-to-call; mobile sticky call/quote bar; a "Get a Free Quote" button repeated down the homepage; low-friction quote form (name, phone, address, service, message).
- **Real, recent photography beats stock** — plan a shoot (see §9); use authentic before/after shots as the primary trust driver.
- **Trust & social proof** — 5.0 rating, testimonials, "Licensed & Insured," years in business, Google/Yelp/Angi links and review embeds.
- **Clear services + seasonal framing** — distinct service pages with what's included; surface seasonal offerings (spring/fall cleanups, snow, lights) at the right times.
- **Local SEO** — `LocalBusiness` schema, consistent NAP, Google Business Profile link, one indexable landing page per served town, fast hosting.
- **Accessibility** — semantic HTML, alt text, AA contrast (watch gold-on-white for text).
- **Analytics** — GA4 + call tracking; track quote-form submits and click-to-calls as conversions.

---

## 7. Recommended sitemap

```
/                         Home
/services                 Services overview
  /services/lawn-maintenance       (mowing, edging, trimming, blowing, hedges)
  /services/property-cleanups      (spring/fall, beds, debris, pruning, leaves)
  /services/mulch-installation
  /services/snow-removal           (enrollment)
  /services/holiday-lighting
/service-areas            Hub (map + town list)
  /service-areas/monroeville-nj
  /service-areas/mullica-hill-nj
  /service-areas/glassboro-nj
  /service-areas/clayton-nj
  /service-areas/{…each served town}
/our-work                 Gallery / before-after
/reviews                  Testimonials + review links
/about                    Family story, owner (Brett), crew, licensed & insured
/careers                  Join the team (port existing Jobs form)
/contact                  Free Quote form + phone/email/map/hours
/blog                     Index + post template
/privacy  /terms
```

---

## 8. Design direction & Awwwards references

**Overall direction:** clean, photo-forward, high-contrast, conversion-first — *not* a heavy WebGL agency piece (those hurt speed and conversion for a local service). Big full-bleed lawn photography, generous whitespace, chunky confident headings, green primary with gold CTAs, and the mascot used playfully (e.g. small mascot accents, a friendly "meet the crew" moment) without becoming cartoonish.

**Motion direction:** rich-but-performant scroll animation **modeled on [casperscaviar.com](https://casperscaviar.com/)** (full implementation spec in §8.5). Casper's uses GSAP scroll reveals + smooth scroll + a logo-shrink effect — all CSS/JS, **no WebGL** — so it's tasteful and fast, exactly the level Yurgin's should hit. The bull-mascot logo shrinking into the navbar on scroll is a perfect on-brand signature moment.

The closest Awwwards category is **garden/landscape design** (which skews high-end and animated), so borrow selectively rather than copying:

- **Primary base — OneAbode by North2** (Awwwards Honorable Mention): https://www.awwwards.com/sites/oneabode
  *Why:* elegant, clean, big full-bleed nature imagery, calm whitespace, large type, project-led storytelling. **Borrow:** the full-bleed hero photography approach, restrained palette + lots of breathing room, and letting the work (photos) carry the page. **Adapt:** add strong, repeated conversion CTAs Yurgin's needs that OneAbode doesn't.

- **Alternate — Spike Jackson Garden Design**: https://www.awwwards.com/sites/spike-jackson-garden-design
  *Why:* bright, colorful, photo-forward, single-page fluid flow. **Borrow:** confident use of bold color (pairs well with Yurgin's green/gold) and a single-page-feel anchored-section layout — a good fit for an SMB where most visitors just want services + quote.

- **Alternate (motion inspiration only) — Immersive Garden**: https://www.awwwards.com/immersivegarden/
  *Why:* best-in-class scroll/motion craft. **Borrow:** the *feel* of polished, subtle scroll reveals and micro-interactions — but keep it lightweight. Do **not** replicate full WebGL; it's wrong for a fast local-service site.

*Note:* these award sites are animation-heavy and won't screenshot cleanly — open the live links to judge feel. For directly comparable **lawn-care** execution (layout/conversion patterns, not design awards), review the curated lists in §10 sources (Service Autopilot, Jobber).

---

## 8.5. Animation system (modeled on Casper's Caviar)

Reverse-engineered from [casperscaviar.com](https://casperscaviar.com/) (Awwwards Honorable Mention). Their stack: **GSAP 3 + ScrollTrigger + SplitText + Flip + Locomotive Scroll** — no WebGL, no Three.js. Recreate these five effects with the exact parameters below. Build them as small, reusable modules driven by `data-` attributes so any section can opt in.

**Engine & global rules**
- **Smooth scroll** site-wide. Casper's uses Locomotive Scroll; **Lenis** is the lighter modern equivalent and is recommended. Sync it to ScrollTrigger (`lenis.on('scroll', ScrollTrigger.update)`).
- **Desktop only:** wrap every effect in `gsap.matchMedia()` `"(min-width: 768px)"`. On `≤767px`, set everything `autoAlpha:1` immediately (no transforms) — mobile gets a clean static site.
- **Accessibility:** honor `prefers-reduced-motion: reduce` → skip animations, show content.
- **No FOUC / no JS-trap:** wait for `document.fonts.ready` before text splits; animate `gsap.from()` a *visible* base so content still shows if JS fails.

**1. Masked heading reveal** *(their `text-reveal.js` + SplitText)* — the hero/section-title signature.
- Mark headings `data-split="heading"`, optional `data-split-reveal="lines|words|chars"` (default `lines`), `data-split-start` (default `clamp(top 80%)`), `data-split-delay`.
- SplitText with `mask:"lines"` (text rises from behind a clip mask), animate `yPercent: 110 → 0`, `ease: "expo.out"`, `scrollTrigger.once: true`.
- Timing: **lines** dur 2s / stagger 0.2 · **words** 1.5s / 0.15 · **chars** 1s / 0.03.
- Use on: hero H1 (lines), every section heading.

**2. Staggered content reveal** *(their `content-reveal.js`)* — for cards, lists, grids.
- Wrap a group in `data-reveal-group`; optional `data-stagger` (ms, default 200), `data-distance` (default `2rem`), `data-start` (`clamp(top 80%)`), `data-delay`. Supports nested groups via `data-reveal-group-nested`.
- Each child: `y: 2rem → 0`, `autoAlpha: 0 → 1`, dur 1s, `ease: "expo.out"`, staggered; `once:true`; `clearProps` on complete.
- Use on: services grid, "Why Yurgin's" tiles, testimonials, gallery items, footer columns.

**3. Scroll-scrubbed logo → navbar** *(their `logo-flip.js` + ScrollTrigger scrub)* — the standout moment.
- Logo starts large in the hero (`data-flip-element="wrapper-hero"`) and, over `start:"top top" → end:"500px top"` with `scrub:true`, scales + translates to the small nav slot (`wrapper-nav`). Computes end scale/offset from the two elements' bounding rects; `ease:"none"`.
- **Yurgin's fit:** the bull mascot logo shrinks into the sticky header as you scroll — playful and on-brand. (Casper's animates a dotLottie; for Yurgin's a transparent-PNG/SVG logo is fine — another reason to get the transparent logo, see §9.) Pair with a header light/dark theme swap as sections change (their `header-theme.js`).

**4. Parallax depth** *(Locomotive `data-scroll-speed`)*.
- Background/hero layers move at different rates: `data-scroll-speed` values from `-0.5` to `0.1` (negative = slower than scroll). With Lenis, replicate via ScrollTrigger `scrub` tweens on `yPercent`.
- Use on: hero photo, large section background images, oversized mascot accents.

**5. Scroll-synced showcase** *(their `featured-products-scroll.js`)* — adapt the e-commerce pattern.
- Casper's: a **fixed info panel** (title/price/subtitle) whose text swaps as you scroll through stacked product rows — each swap is `yPercent:-20 + fade out` (`power2.in`) → change text → `yPercent:0 + fade in` (`power2.out`), staggered 0/0.05/0.1; ScrollTrigger per row at `start:"top center"`.
- **Yurgin's adaptation:** a pinned **"Our Work"** or **"Services"** section — left side a fixed panel (service name + one-liner + "Get a quote"), right side stacked before/after photos; as each photo scrolls through center, the panel text swaps with that same slide-up-fade. Great way to show range without a long page.

**Implementation note:** GSAP and *all* plugins (SplitText, Flip, ScrollTrigger, etc.) are **100% free as of GSAP 3.13 (2025)** — no Club license needed. Load from the official CDN or npm. Keep total JS lean; lazy-init below-the-fold ScrollTriggers.

---

## 9. Asset inventory

Saved in `assets/` (see `assets/IMAGE-MANIFEST.md` for full detail + brand color hexes):

- `assets/images/logo.jpg` — primary logo, 1920×1282 (bull mascot + wordmark). **Only real image currently available.**

**Could not auto-download:** the single Yelp job photo (link in manifest) and Facebook post photos (behind login).

**⚠️ Photography is still the #1 gap.** A full re-scrape found the current site is ~95% **licensed stock** (Getty/Adobe/Thinkstock — do not reuse on the rebuild). Only **three genuinely owned photos** exist (logo aside): a striped freshly-mowed home (hero), a crew member mowing on a zero-turn, and the branded F-150 truck. Use these three; URLs and notes are in `assets/IMAGE-MANIFEST.md`. Beyond them, commission a shoot:
- Before/after lawns (mowing + edging) — the hero conversion asset
- Edging close-ups (their signature "crisp lines")
- Mulch beds, hedge trimming, cleanups
- The crew + branded truck/equipment (with the mascot)
- A portrait of the owner for the About page
- A few seasonal shots (fall cleanup, snow removal, holiday lights) for the seasonal blocks

Also request a **transparent PNG/SVG** of the logo (only a white-background JPG exists) so the mascot can sit on green/dark sections.

---

## 10. Build notes & open questions for the owner

**Build notes**
- Generate `TODO-before-launch.md` listing every `[[PLACEHOLDER]]` and every missing photo, grouped by page.
- Keep all `⚠️ CONFIRM` data as placeholders until verified — do not invent phone, hours, license #, pricing, or years in business.
- Reference local `assets/` paths only; no remote hotlinks.
- Set up `LocalBusiness` schema, GA4, and call tracking before launch.
- Migrate the existing Careers/Jobs form and the two existing local pages (Monroeville, Clayton) so no SEO is lost; 301 old URLs (including the misspelled `lanw-maintenance-service`).

**Open questions for the owner (pre-launch checklist)**
1. Owner's full name & title? (reviews say "Brett") — for the About page.
2. Exact business hours? (Yelp/Angi suggest Mon–Sat 8–5 — confirm.)
3. How many years in business / founding year?
4. License & insurance numbers to display?
5. Residential vs. commercial — equal focus, or lead with one?
6. Any pricing/packages you'd publish (e.g. starting mowing price, cleanup tiers)?
7. Do you want online booking (Jobber/Thryv link), or keep phone/quote-form only?
8. Confirm full list of towns to build local pages for (Salem + Gloucester).
9. Photo shoot — can you provide before/after photos, or should one be arranged?
10. Preferred primary tagline: "Leave your lawn care to us" vs. "Transforming lawns across South Jersey"?
11. Social links to feature (Facebook confirmed; Instagram?).
12. Confirm credit-card payment details and whether online payment is wanted.

---

## Sources
- [Yurgin's Lawn Care — official site](https://www.yurginslawncare.com/) (home, lawn maintenance, property cleanups, mulch, winter services, careers, contact pages)
- [Yurgin's Lawn Care — Yelp](https://www.yelp.com/biz/yurgins-lawn-care-monroeville)
- [Yurgin's Lawn Care — Facebook](https://www.facebook.com/p/Yurgins-Lawn-Care-100091727316909/)
- [Yurgin's Landscaping — Angi](https://www.angi.com/companylist/us/nj/monroeville/yurgins-landscaping-reviews-1.htm)
- Competitors: [Green Lawn Fertilizing — Gloucester County](https://www.greenlawnfertilizing.com/lawn-care/new-jersey/gloucester-county), [The Grounds Guys of Mullica Hill](https://www.groundsguys.com/mullica-hill/), [Greentree Nursery Lawn & Landscape](https://www.greentreenursery.net/), [APL Landscaping](https://apllandscaping.com/), [J&J LawnCare](https://jandjlawncareservicellc.com/service-areas/gloucester-county-nj)
- Best practices: [Service Autopilot — best lawn care website designs](https://www.serviceautopilot.com/lawn-care/best-landscaping-lawn-care-website-designs/), [Jobber — best landscaping websites](https://www.getjobber.com/academy/landscaping/best-landscaping-websites/), [BuiltRight Digital — landscaping website design guide 2026](https://builtrightdigital.com/landscaping-website-design-guide/)
- Design refs: [OneAbode (Awwwards)](https://www.awwwards.com/sites/oneabode), [Spike Jackson Garden Design (Awwwards)](https://www.awwwards.com/sites/spike-jackson-garden-design), [Immersive Garden (Awwwards)](https://www.awwwards.com/immersivegarden/)
- Animation reference: [Casper's Caviar](https://casperscaviar.com/) ([Awwwards](https://www.awwwards.com/sites/caspers-caviar)) — GSAP + ScrollTrigger + SplitText + Flip + Locomotive Scroll (analyzed from their `text-reveal.js`, `content-reveal.js`, `logo-flip.js`, `featured-products-scroll.js`, `locomotive.js`)
