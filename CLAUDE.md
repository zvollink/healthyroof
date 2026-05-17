# HealthyRoof — Project Context for Claude Code

## Project Overview
Marketing website for **HealthyRoof**, a locally owned roofing company in Grand Rapids, MI.
Owners: Chris and Liz Owen. Built by Zach Vollink (Two Rivers Digital).

Live staging: https://healthyroof.vercel.app/

The brand positioning is a trusted, educational guide — not a pushy sales roofer.
Tone: calm clarity, warm professionalism, transparency, long-term thinking.

---

## Stack
- **Framework:** Astro (latest)
- **UI Components:** React islands (`client:load` or `client:visible` depending on need)
- **Styling:** Tailwind CSS v4 + DaisyUI v5
- **Language:** TypeScript
- **Deployment:** Vercel
- **Fonts:** Playfair Display (headings/display) + DM Sans (body) via Google Fonts

---

## File Structure
```
src/
  components/
    Nav.tsx               # React island, sticky header, Services dropdown, mobile menu
    Footer.astro          # Static, 4-column layout
    Hero.astro            # Homepage hero, split layout
    WhyWeExist.astro      # Homepage section 2 — mission statement
    OurProcess.astro      # Homepage section 3 — 4 steps, scroll-activated
    LifecycleSection.astro # Homepage section 4 — wraps LifecycleWheel
    LifecycleWheel.tsx    # Interactive SVG roof lifecycle diagram (React island)
    SocialProof.astro     # Homepage section 5 — reviews, before/after, credentials
    ScheduleCTA.astro     # Homepage section 6 — dark teal CTA, 3-step how it works
  layouts/
    Layout.astro          # Root layout — imports Nav, Footer, global.css
  styles/
    global.css            # Tailwind v4 @theme config + DaisyUI theme
  pages/
    index.astro                        # Homepage
    roof-health-assessment.astro       # /roof-health-assessment
    about.astro                        # /about
    our-process.astro                  # /our-process
    reviews.astro                      # /reviews (hidden from nav until real reviews collected)
    schedule.astro                     # /schedule — Instant Roofer widget + 3-step how it works
    service-area.astro                 # /service-area — Google Maps iframe + city grid
    services/
      roof-rejuvenation.astro          # /services/roof-rejuvenation
      roof-repairs.astro               # /services/roof-repairs
      roof-replacement.astro           # /services/roof-replacement
      maintenance-planning.astro       # /services/maintenance-planning
public/
  images/
    hr-logo-turquoise.png   # Primary logo (used in Nav, Hero)
    hr-logo-yellow.png      # Footer logo (on dark teal background)
```

---

## Brand Colors
Defined as Tailwind v4 `@theme` tokens in `src/styles/global.css`.

| Token | Hex | Usage |
|---|---|---|
| `hr-teal` | `#1A8A84` | Primary brand, CTAs, accents |
| `hr-teal-light` | `#2AA59F` | Hover states, info |
| `hr-teal-dark` | `#126560` | Hover on buttons, footer bg |
| `hr-yellow` | `#E7E238` | Accent dots, highlights, footer text |
| `hr-yellow-dark` | `#CECE20` | Yellow hover states |
| `hr-cream` | `#F8F7F2` | Page background |
| `hr-stone` | `#F2F0E8` | Section backgrounds, borders |
| `hr-text-primary` | `#1C2B2A` | Main body text |
| `hr-text-secondary` | `#4A6360` | Subtext, descriptions |
| `hr-text-muted` | `#7A9E9B` | Labels, metadata |

DaisyUI theme name: `healthyroof` (set on `<html data-theme="healthyroof">` in Layout.astro)

---

## Typography
- **Display/headings:** `font-display` → Playfair Display, 600–700 weight
- **Body:** `font-sans` → DM Sans, 300–700 weight
- Headline style: large, tight leading (`leading-[1.05]`), `tracking-tight`

---

## Component Conventions
- **Static content** → `.astro` components (no JS overhead)
- **Interactive content** → `.tsx` React islands with appropriate `client:` directive
  - `client:load` — immediately interactive (Nav)
  - `client:visible` — hydrates on scroll into view (LifecycleWheel, any mid-page interactive)
- Images in `src/assets/images/` use Astro's `<Image />` component for WebP optimization
- Logos in `public/images/` referenced as `/images/filename.png` (no import needed)
- All components use Tailwind utility classes with `hr-` brand tokens
- Avoid inline styles except for animation delays (`style="animation-delay: Xms"`)

---

## Navigation Structure
```
Home
Roof Health Assessment
Services
  └── Roof Rejuvenation      /services/roof-rejuvenation
  └── Roof Repairs           /services/roof-repairs
  └── Roof Replacement       /services/roof-replacement
  └── Maintenance Planning   /services/maintenance-planning
Our Process
About
Reviews
Service Area
[Schedule Assessment]        /schedule  ← CTA button, always visible
```

---

## Homepage Sections
- [x] Hero — split layout, shingle image right, content left, fade-up animations
- [x] Section 2 — Why We Exist — two-column, floating stat cards, values pills
- [x] Section 3 — Our Process — 4 steps, scroll-activated icon lighting + progress line
- [x] Section 4 — Roof Lifecycle Wheel — LifecycleWheel.tsx React island
- [x] Section 5 — Social Proof — review cards, before/after photos, credentials bar
- [x] Section 6 — Schedule CTA — dark teal bg, 3-step how-it-works, dual CTA buttons

## Pages Status
- [x] Home — /
- [x] Roof Health Assessment — /roof-health-assessment
- [x] Roof Rejuvenation — /services/roof-rejuvenation
- [x] Roof Repairs — /services/roof-repairs
- [x] Roof Replacement — /services/roof-replacement
- [x] Maintenance Planning — /services/maintenance-planning
- [x] Our Process — /our-process
- [x] About — /about
- [x] Reviews — /reviews (hidden from nav — uncomment in Nav.tsx when real reviews ready)
- [x] Service Area — /service-area (Google Maps iframe, city grid, West Michigan weather cards)
- [x] Schedule — /schedule (Instant Roofer widget — pending brand color update from client)

## Pending / Outstanding
- [ ] Instant Roofer widget colors — send #1A8A84 + #D4E233 to Instant Roofer, swap embed src when received
- [ ] Real reviews — collect from client, populate reviews.astro + reviews page, then unhide in Nav
- [ ] Real assets — SVG logo, hi-res photos from client
- [ ] Color pass — bolder teal/yellow sections per Liz's feedback (do on separate branch)

---

## Key Copy & CTAs
- **Primary CTA:** "Schedule a Roof Health Assessment" → `/schedule`
- **Phone:** 616.285.1025 (call or text)
- **Email:** info@thehealthyroof.com
- **Tagline:** "Here, roofs last longer"
- **Sub-tagline:** "Know where your roof stands today so you can plan confidently for tomorrow."
- **No pressure line:** "No pressure. No obligation. Just clear answers." — use frequently under CTAs

---

## Placeholder Images (from existing Squarespace site — replace with real assets later)
```
Shingle beauty shot (hero):
https://images.squarespace-cdn.com/content/v1/67a26190d73f0f1126aa1024/97c792b9-6d62-4b78-9f6d-b1f9be51ca70/OC_TDSDP_StormCloud_intro_beautyshot_tif+%281%29.jpg

House exterior:
https://images.squarespace-cdn.com/content/v1/67a26190d73f0f1126aa1024/28bbc87e-5cf1-4339-9b22-3dba3fc7bd14/unsplash-image-CQz-Oijf4BE.jpg

Job photo 1:
https://images.squarespace-cdn.com/content/v1/67a26190d73f0f1126aa1024/5c5e9a39-4b53-43c5-ae01-6ef52171a692/IMG_8153.jpg

Job photo 2:
https://images.squarespace-cdn.com/content/v1/67a26190d73f0f1126aa1024/90a22a2e-ac1f-4fc8-bef1-a144506e77fb/down-net_http20260319-176-p8byg4.jpg
```

---

## Client Notes
- Chris Owen (co-owner, main contact) — licensed builder, certified inspector, IICRC mold specialist
- Timothy Ridgell (co-owner) — licensed builder, certified inspector
- Still need from client: high-res photos, reviews/testimonials, logo in SVG format
- Service area: Greater Grand Rapids — Grand Rapids, Holland, Ada, Cascade, Grandville, Kentwood, Rockford, Walker, Caledonia, Lowell
- Credentials to display: Locally owned, fully insured, certified home inspectors, drone certified, ICCRC certified mold inspector, licensed builders, BBB certified