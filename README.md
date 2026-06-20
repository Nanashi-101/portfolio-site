# Soumyadip Sanyal — Personal Portfolio

A minimalist, editorial portfolio for a full-stack web developer — built around a warm
grey/ink/gold palette, big lowercase typography, generous whitespace, and tasteful motion.

🔗 **Live:** https://portfolio-site-olive-two.vercel.app

---

## ✨ Highlights

- **Editorial hero** — B&W portrait inside a gold circle with a gentle float, animated
  cursor-following gold glow (static over the hero, follows the cursor past it).
- **Light & dark mode** — the whole palette runs on CSS variables that flip with a
  `.dark` class; toggle lives in the nav (and the mobile sheet).
- **Custom cursor** — a gold dot + trailing ring that reacts to interactive elements
  (desktop / fine-pointer only; disabled on touch & mobile).
- **Smooth scrolling** — Lenis, synced with GSAP ScrollTrigger, plus a gold scroll
  progress bar and a scroll-follower rail.
- **GSAP + Framer Motion** — GSAP powers smooth scroll, the progress bar and section
  heading reveals; Framer Motion handles component-level animation.
- **Interactive projects** — an editorial hover list where each title reveals a
  cursor-following preview card (with a clean card fallback on mobile).
- **Sections** — Hero, Skills, Projects, Blog, Experience (animated timeline),
  About (split gold card), Contact (server-action email form).
- **Fully responsive** — desktop layouts gracefully reduce to mobile, with a
  bottom-sheet mobile navigation.

---

## 🛠 Tech Stack

| Area | Tools |
|------|-------|
| Framework | Next.js 14 (App Router, Server Actions) |
| Language | TypeScript |
| Styling | Tailwind CSS (CSS-variable design tokens) |
| Animation | Framer Motion, GSAP + ScrollTrigger |
| Smooth scroll | Lenis |
| Email | React Email + Resend |
| Timeline | react-vertical-timeline-component |
| Icons | react-icons |
| Hosting | Vercel |

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Environment variables
Create a `.env.local` in the project root:
```bash
RESEND_API_KEY=your_resend_api_key   # required for the contact form
```

### 3. Run the dev server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

### 4. Build for production
```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
app/
  layout.tsx        Root layout — providers, background, cursor, smooth scroll
  page.tsx          Section composition
  globals.css       Design tokens (light/dark), Lenis & cursor CSS
components/
  Intro.tsx         Hero
  Header.tsx        Top nav + mobile bottom sheet
  Skills.tsx        Skill category cards
  Projects.tsx      Hover-list + cursor-following preview
  blog.tsx          Blog feature band
  Experience.tsx    Animated vertical timeline
  About.tsx         Split gold card
  Contact.tsx       Contact form (Resend server action)
  CursorGlow.tsx    Gold hue that follows the cursor
  CustomCursor.tsx  Custom cursor (desktop)
  ScrollProgress.tsx / ScrollFollower.tsx / SmoothScroll.tsx
  section-heading.tsx, section-divider.tsx, footer.tsx, submit-btn.tsx
actions/sendEmail.ts  Server action for the contact form
context/              Active-section + theme providers
lib/data.ts           Projects, experience, skills, nav links
public/               Images & assets
```

---

## 🎨 Theming

Colors are defined as CSS variables in `app/globals.css` and exposed to Tailwind as
`surface`, `ink`, and `gold`. Changing the accent everywhere is a one-line edit:

```css
:root  { --gold: 208 160 58; }   /* #d0a03a */
.dark  { --gold: 226 186 92; }   /* brighter for dark mode */
```

---

## 📝 Notes

- The custom cursor and scroll-follower are desktop-only by design.
- The contact form requires a valid `RESEND_API_KEY`; without it, sending will fail.

---

© 2026 Soumyadip Sanyal. Built with React & Next.js, TypeScript, Tailwind CSS,
Framer Motion, GSAP, Lenis, React Email & Resend.
