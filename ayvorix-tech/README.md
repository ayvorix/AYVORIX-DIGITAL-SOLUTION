# AYVORIX - Premium Frontend Foundation

AYVORIX is an elite web development and software engineering company. This repository contains the production-ready static frontend foundation.

## 🚀 Project Overview

The website features a white luxury SaaS design aesthetic, built utilizing semantic HTML5, modular CSS3 custom variables, and vanilla ES6 JavaScript. It functions instantly out of the box via the `file://` protocol and achieves high performance with sub-second page loads.

## 📁 Folder Structure

```
ayvorix-tech/
├── index.html
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── README.md
├── pages/
│   ├── about.html
│   ├── services.html
│   ├── portfolio.html
│   ├── pricing.html
│   ├── contact.html
│   ├── case-study.html
│   ├── privacy-policy.html
│   └── terms.html
└── assets/
    ├── css/
    │   ├── style.css (imports all stylesheets below)
    │   ├── variables.css
    │   ├── reset.css
    │   ├── utilities.css
    │   ├── navbar.css
    │   ├── hero.css
    │   ├── services.css
    │   ├── portfolio.css
    │   ├── process.css
    │   ├── pricing.css
    │   ├── testimonials.css
    │   ├── faq.css
    │   ├── footer.css
    │   └── responsive.css
    ├── js/
    │   ├── main.js
    │   ├── theme.js
    │   ├── navbar.js
    │   ├── animations.js
    │   ├── faq.js
    │   └── portfolio.js
    └── images/
        ├── hero/
        ├── portfolio/
        ├── clients/
        ├── services/
        ├── team/
        └── backgrounds/
```

## 🛠 Installation & Usage

No build step is required.
1. Download or clone this repository.
2. Double-click `index.html` to open it in your browser (works immediately under CORS restrictions).
3. If running locally with hot-reloading:
   ```bash
   # Using VS Code Live Server extension, or:
   npx browser-sync start --server --files "css/*.css, js/*.js, *.html"
   ```

## 📐 Coding Standards

- **Semantic Tags**: Use HTML5 elements (e.g. `<header>`, `<main>`, `<article>`, `<footer>`) with correct ARIA properties (`aria-expanded`, `aria-label`).
- **Spacing Grid**: Strictly follow the 8px baseline spacing variables (`--space-1` to `--space-32`) for padding/margins.
- **Card Radius**: Keep cards and structural rounded corners between `16px` (`--radius-md`) and `24px` (`--radius-lg`).
- **Class Naming**: Consistent BEM-like naming convention. Keep utilities distinct from structural classes.

## 🚀 Deployment

The site is optimized for static hosting platforms. Simply link your repository to:
- **Vercel** or **Netlify**
- **Cloudflare Pages**
- **GitHub Pages**

## 💡 Future Migration Plan

The code is architected to allow easy extraction of page sections into modern components:
1. **React Migration**: Convert HTML files to JSX. Extract inline SVG graphics and structural wrappers (e.g. header/footer) into reusable React components.
2. **Next.js Transition**: Port components into the Pages or App Router directory. Leverage static generation (SSG) for fast performance.
3. **Headless CMS**: Bind portfolio cards (`portfolio.js`) to dynamic API outputs from headless systems like Sanity or Strapi.

## 📄 License

Proprietary © 2026 AYVORIX. All rights reserved.
