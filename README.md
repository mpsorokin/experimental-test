# MARÉ — Crewing Homepage, 2026

A responsive, editorial-style homepage concept for a **maritime crewing / seafarer recruitment platform**. The design is a fictional brand made for demonstrating a modern website, not an operating crewing agency.

## Preview locally

No dependencies or build step are required.

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080` (or open `index.html` directly in your browser).

## Included

- Responsive 2026-style visual direction: oversized editorial typography, deep marine colors, expressive serif accents, subtle animations, modular layouts.
- Hero artwork authored as inline SVG so the main visual works offline, without remote stock imagery.
- Accessible mobile menu, skip link, native dialogs, keyboard support and `prefers-reduced-motion` support.
- Filterable sample jobs by department and vessel type.
- Job details dialog and sample partnership form (client-side validation only).
- All job/salary content is clearly designated as **illustrative**.

## Project structure

```text
index.html          Homepage markup & SVG art
styles.css          Responsive design system and animations
script.js           UI interactions, sample listing filters, form states
assets/favicon.svg  Brand mark
```

## Deployment

This project is static and can be hosted on GitHub Pages, Cloudflare Pages, Netlify, Vercel, or a static web server. With GitHub Pages, use the root directory as the publishing source. It needs no environment variables or server runtime.

## Limitations and next steps

This is a **frontend concept**, not a production crewing marketplace. Replace sample listings with a real API/CMS, build authentication and applications, add an ATS/CRM integration, set up backend handling and anti-spam controls for forms, and validate legal/recruitment copy before launch. Do not treat illustrative salaries as real offers.

## Design rationale

The brand is intentionally fictional (`MARÉ`). It emphasizes the human side of maritime crewing rather than a generic logistics template, with clear entry points for seafarers and shipowners. Native web interactions are used instead of heavyweight libraries to keep it fast and portable.