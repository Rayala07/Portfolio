# Rayala Viswanath — Portfolio

A dark, interaction-rich personal portfolio built with Next.js 16 and Framer Motion. Features a scroll-driven word reveal, an animated dot grid, custom cursor, smooth Lenis scrolling, and a multi-step conversational contact form.

**Live →** [rayala-viswanath-portfolio.vercel.app](https://rayala-viswanath-portfolio.vercel.app)

---

## Screenshots

| Hero | About | Projects |
|------|-------|----------|
| Dot grid canvas with magnetic buttons | Scroll-pinned word-by-word reveal | Card hover with running gradient border |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | JavaScript (React 19) |
| Animation | [Motion / Framer Motion](https://motion.dev) v12 |
| Smooth Scroll | [Lenis](https://lenis.darkroom.engineering) v1 |
| Styling | Tailwind CSS v4 + inline styles |
| UI Primitives | Radix UI, shadcn/ui |
| Icons | Hackernoon Pixel Icon Library |
| Validation | Zod v4 |
| Deployment | Vercel |

---

## Features

- **Animated dot grid** — canvas-based repulsion field that reacts to cursor position with spring physics
- **Custom cursor** — dot + ring that morphs on hover; automatically disabled on touch devices
- **Scroll-pinned word reveal** — About section pins for 180vh while each word fades in as you scroll
- **Gradient border sweep** — running conic-gradient light animation on achievement card hover
- **Hamburger → X morph** — three animated bars that interpolate into a close icon
- **Slide-from-top mobile menu** — full-screen overlay with staggered link entrance
- **Conversational contact form** — three-step chip-based questionnaire before email capture
- **Responsive across all viewports** — mobile-first layout, 44px touch targets, no horizontal overflow

---

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── globals.css        # Design tokens, Tailwind config, film grain overlay
│   │   ├── layout.js          # Root layout — CustomCursor + SmoothScroll
│   │   └── page.js            # Single-page composition
│   ├── components/
│   │   ├── HeroSection.jsx    # Dot grid canvas, magnetic buttons, reveal animation
│   │   ├── AboutSection.jsx   # Sticky scroll-driven word reveal
│   │   ├── Skills/            # Tabbed skill tiles + Applied AI list
│   │   ├── Projects/          # Project cards with screenshot hover zoom
│   │   ├── AchievementsSection.jsx
│   │   ├── ContactSection.jsx # Multi-step conversational form
│   │   ├── Navbar.jsx         # Floating pill nav, mobile overlay menu
│   │   ├── CustomCursor.jsx   # Dot + ring cursor (pointer:fine only)
│   │   └── SmoothScroll.jsx   # Lenis initialisation wrapper
│   └── lib/
│       └── lenis-instance.js  # Singleton accessor for Lenis instance
└── public/
    └── projects/              # Project screenshots + card backgrounds
```

---

## Design System

| Token | Value |
|---|---|
| Background | `#050505` |
| Text primary | `#F5F3F0` |
| Accent | `#A89BF2` (lavender) |
| Border | `#1A1A1A` |
| Heading font | Bricolage Grotesque |
| Display font | Plus Jakarta Sans |
| Body font | Inter |
| Accent italic | Cormorant Garamond |

---

## Sections

| Section | Highlight |
|---|---|
| **Hero** | Interactive dot grid, letter-by-letter heading reveal, email copy button |
| **About** | 280vh sticky container, scroll-progress word colour animation |
| **Skills** | Category tabs — Languages, Frameworks, Tools, Applied AI |
| **Projects** | Relic · DataPilot — screenshot zoom on hover, arrow affordance on touch |
| **Achievements** | Top Best Pitchers — Startup Build Hackathon 2026 |
| **Contact** | Three-step conversational form (reason → scope → timeline → email) |

---

## Deployment

Deployed on **Vercel** with automatic deployments on push to `main`.

```bash
# One-time setup (if not already linked)
npx vercel link

# Deploy to production
npx vercel --prod
```

---

## Connect

- **Portfolio** — [rayala-viswanath-portfolio.vercel.app](https://rayala-viswanath-portfolio.vercel.app)
- **GitHub** — [@Rayala07](https://github.com/Rayala07)
- **LinkedIn** — [rayala07](https://www.linkedin.com/in/rayala07/)

---

## License

MIT © 2026 Rayala Viswanath
