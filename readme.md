# Webinar Registration Funnel

A two-page registration funnel for the free live training **"How to Turn Your Treatments into High-Ticket Cash Programs"** (Wednesday, November 4, 2026, 9:00 to 10:30 PM ET).

- **`/`**: Opt-in page with sales copy, a video, a live countdown and the registration form
- **`/confirmation`**: Thank-you page with an orientation video, next steps, calendar links and testimonials

Built with Vite, React (TypeScript), Tailwind CSS v4, `react-router-dom`, `react-hook-form` and `lucide-react`.

---

## Getting started

```bash
npm install
cp .env.example .env   # then fill in the values below
npm run dev            # local dev server
npm run build          # type-check + production build into /dist
npm run preview        # serve the production build locally
```

### Environment variables

| Variable | What it does | Fallback if unset |
|---|---|---|
| `VITE_PIXEL_ID` | Meta Pixel ID | `TEST_PIXEL_ID` (logs a warning in the console) |
| `VITE_WEBHOOK_URL` | Where form submissions are POSTed | `https://eo12345.m.pipedream.net` (mock) |
| `VITE_PRECALL_FORM_URL` | Link for step 3 on the confirmation page | `#` |

Vite bakes these in at build time, so rebuild after changing them.

---

## Project structure

```
index.html                  Fonts, meta tags, no-flash theme script
src/
├── main.tsx                Router + app mount
├── App.tsx                 Routes, background, Meta Pixel PageView tracking
├── index.css               Theme colors (light/dark) + liquid glass styles
├── lib/
│   ├── event.ts            Webinar title, start/end times, labels (single source of truth)
│   ├── pixel.ts            Meta Pixel: pageview() and event()
│   └── theme.ts            Light/dark theme store and useTheme() hook
├── components/
│   ├── Background.tsx      Fixed backdrop behind every page
│   ├── Brand.tsx           Logo (swaps image per theme) + company name
│   ├── ThemeToggle.tsx     Sun/moon switch in the nav
│   ├── Countdown.tsx       Live countdown (sm, lg and inline sizes)
│   ├── Form.tsx            Registration form, validation, webhook, Lead event
│   ├── SaveSeatButton.tsx  "Save my seat" button that scrolls to the form
│   ├── StickyCTA.tsx       Mobile-only bottom bar with countdown + button
│   ├── VideoPlaceholder.tsx Video block with thumbnail support
│   ├── CalendarButtons.tsx Google, Outlook and Apple (.ics) links
│   ├── Testimonials.tsx    Testimonial cards (edit the TESTIMONIALS array)
│   └── Footer.tsx
└── pages/
    ├── OptIn.tsx
    └── Confirmation.tsx
public/images/              logo.png (dark mode), dlogo.png (light mode), video covers
```

---

## How it works

### Registration form
Fields: first name, email, phone, practice type, monthly revenue. All are required, and errors show under each field.

On a valid submit, the form:
1. POSTs JSON to `VITE_WEBHOOK_URL` with this exact shape:
   ```json
   { "first_name": "", "email": "", "phone": "", "practice_type": "", "monthly_revenue": "" }
   ```
2. Fires the Meta Pixel `Lead` event.
3. Sends the visitor to `/confirmation`, greeting them by first name.

If the webhook fails, the error is logged and the visitor is still redirected, so they are never stuck on the form. Check the webhook logs to catch failures.

### Meta Pixel
`lib/pixel.ts` loads the pixel once and exposes `pageview()` and `event(name, options)`. `PageView` fires on every route change, and `Lead` fires on form submit. In development, every pixel call is also logged to the browser console.

### Event timing
Everything reads from `lib/event.ts`. US daylight saving time ends on November 1, 2026, so the event runs on EST (UTC−5): 9:00 PM ET is 02:00 UTC on November 5. The countdown and all three calendar links use these values, so update times there only.

### Light and dark mode
- Colors are defined twice in `index.css`, once under `[data-theme="dark"]` and once under `[data-theme="light"]`.
- Components use theme-aware classes: `text-ink` (text), `bg-canvas` (page background), `text-danger` (errors). Use these instead of `white`/`black` in new code.
- A script in `index.html` sets the theme before the page draws (saved choice, otherwise the device setting), so there is no flash on load.
- The visitor's choice is saved in the browser.
- To force dark as the default for everyone, replace the `matchMedia` line in that script with `t = 'dark';`.

### Liquid glass styles
Four reusable classes live in `index.css`:

| Class | Used for |
|---|---|
| `glass` | Cards, list rows, timer tiles, pills |
| `glass-strong` | Form, nav bar, calendar block, closing CTA |
| `glass-field` | Inputs and dropdowns |
| `btn-primary` | Main "Save my seat" buttons |

Raise the `blur(...)` values for more frost, or the white opacity values for milkier panels.

### Layout
- **Laptop (1024px and up):** two columns. Copy on the left, registration form pinned on the right while scrolling.
- **Mobile:** one column. Hero with a button on the first screen, then the video, a short testimonial, the form, then the long copy. A sticky bottom bar with a countdown and a "Save my seat" button appears once the visitor scrolls past the hero button, and hides while the form is on screen.

---

## Changelog

### Monday, October 19, 2026
- **Initial build:** both pages, routing, form with validation, webhook POST, Meta Pixel tracking, countdown, calendar links, testimonials.
- **Redesign:** black-and-white liquid glass look across the whole site, Geist font, ambient background.
- **Light mode:** full light theme, sun/moon toggle in the nav on both pages, no-flash loading, choice remembered per visitor.
- **Branding:** logo swaps between `logo.png` (dark) and `dlogo.png` (light); company name set to Conek Media.
- **Video:** thumbnail/cover support on the video component.
- **Copy:** host bio template added (placeholders still in brackets).
- **Mobile conversion pass** (laptop layout unchanged):
  - First "Save my seat" button moved onto the first screen (about 520px from the top, previously about 1,100px).
  - Header reduced to one slim row on phones; countdown moved into the hero.
  - Form inputs set to 16px on phones to stop iPhones zooming in on tap.
  - Short testimonial added directly above the form.
  - New sticky bottom bar with countdown and button (`StickyCTA.tsx`).

---

## Before launch

- [ ] Replace placeholder testimonials in `Testimonials.tsx` with real, permissioned ones (the mobile proof line above the form uses the first one).
- [ ] Fill in the host bio brackets in `OptIn.tsx` and update the `HN` initials (or swap in a headshot).
- [ ] Set `VITE_PIXEL_ID`, `VITE_WEBHOOK_URL` and `VITE_PRECALL_FORM_URL` in the hosting environment.
- [ ] Add the real videos and cover images.
- [ ] Add a single-page-app rewrite on the host so `/confirmation` loads directly instead of returning a 404:
  - Netlify: `public/_redirects` containing `/*  /index.html  200`
  - Vercel: `vercel.json` with `{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }`
- [ ] Test the full flow on a real iPhone and Android phone: submit the form, confirm the webhook receives it, and check the `Lead` event in Meta Events Manager.
- [ ] Test the Apple Calendar button on iOS Safari. It uses a `.ics` data link, which some iOS versions won't open. If it fails, host a static `.ics` file in `/public` and link to that instead.

## Measuring results
Compare PageView to Lead in Meta Events Manager, split by device. If mobile converts noticeably lower than desktop, the next candidate test is a two-step form (name and email first, then the qualifying questions).