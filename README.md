# Siphiwe Linda Ngwaluko — Personal Portfolio

A single-page personal portfolio built with vanilla HTML, CSS, and JavaScript.

## Sections

- **Hero** — intro, stats, and CTA buttons
- **About** — bio with an animated solar system of tech badges orbiting SLN initials
- **Skills** — glassmorphism skill cards with staggered pill animations
- **Experience** — timeline covering Ixio Analytics, Takealot, and UJ
- **Projects** — Stone Ocean (SA data role scraper) and Matla BI dashboard
- **Education** — BSc Information Technology, University of Johannesburg
- **Contact** — clickable email, phone, LinkedIn, and a working contact form

## Tech

- Vanilla HTML / CSS / JavaScript — no frameworks
- Google Fonts: DM Serif Display, DM Mono, Syne
- CSS custom properties for design tokens
- IntersectionObserver API for scroll-reveal animations
- CSS keyframe animations for hero load, orbit, and stat count-up
- [Formspree](https://formspree.io) for contact form email delivery

## Contact Form

Form submissions are delivered to `lindangwaluko6@gmail.com` via Formspree. The form uses a fetch-based AJAX submission so the page never reloads, and shows a success message on delivery.

## Running Locally

No build step required — open `index.html` in any modern browser.

```bash
# With VS Code Live Server or any static server:
npx serve .
```

## License

All rights reserved © Siphiwe Linda Ngwaluko
