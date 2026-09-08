# MomoSomo — momosomo.in

Pure HTML, CSS and JavaScript. No build step, no npm install, no framework,
no client-side content loading — every page is a complete, self-contained
HTML file with all its real content already in it. Double-click any `.html`
file (or serve the folder with any static host) and it works.

## Structure

```
index.html, menu.html, about.html, gallery.html, contact.html
                    The five pages. Each is a complete, plain HTML file —
                    header, footer, and all content are written directly
                    into every page. Nothing is injected by JavaScript.

assets/
  css/style.css      All site styles — one file, no preprocessor
  js/main.js          Page interactions only: mobile nav open/close, the
                      menu's veg filter + jump-nav highlighting, scroll
                      reveal, the gallery lightbox. It only ever toggles
                      classes/attributes on markup that's already on the
                      page — it never inserts content. Disable JS and
                      every page still reads correctly, just without
                      those interactions.
  img/                Photos (see CREDITS.md) + favicon.svg

robots.txt, sitemap.xml
```

## Why content is duplicated across the 5 files, on purpose

An earlier version of this site rendered the header, footer, and the menu/
gallery content via JavaScript (Web Components + a shared data file) so
they only had to be written once. That's a real convenience, but it has a
real cost: a crawler or link-preview bot that doesn't execute JavaScript —
and plenty don't, reliably — sees an empty `<div>` where the menu should
be. For a restaurant site, the menu is the single most-searched piece of
content on it, so that trade was the wrong one. Every page here now carries
its own complete copy of the header, footer, and its content, in plain
HTML, so it's indexable and shareable with zero JavaScript required.

The cost is real too: **changing the nav, the footer (address/hours/phone/
socials), or a menu item means editing that block in all five `.html`
files.** There's no way around that without reintroducing either a build
step or client-side rendering — both of which were explicitly ruled out.
Search each file for the block you're changing; the markup is identical
across pages (only the active nav link and the page's own main content
differ), so a find-and-replace across all five files works fine for
sitewide changes like the phone number.

## Running it

There's nothing to run. Open any `.html` file directly in a browser, or
point any static file server at this folder (`npx serve .`, VS Code's
"Live Server", Python's `python -m http.server`, or just uploading the
folder to a host). All paths are relative, so it works both ways.

To deploy: upload this entire folder as-is to momosomo.in's host root
(Netlify, Vercel, GitHub Pages, or a plain Apache/Nginx/cPanel host all
work — it's just static files).

## Editing content

Everything is plain HTML inside each page — there's no separate content
file to edit. In each `.html` file:

- **Header / nav / mobile nav:** the `<header class="site-header">` block
  near the top. Identical in all five files except which `.nav__link` /
  `.mobile-nav__link` carries `is-active`.
- **Footer (address, hours, phone, email, socials):** the
  `<footer class="site-footer">` block near the bottom. Identical in all
  five files.
- **Menu items/prices:** `menu.html`, inside the `.menu-category` sections
  — one `<li class="menu-item">` per dish. `data-veg="true"/"false"` drives
  both the veg-only filter and the visual indicator dot.
- **Gallery photos/captions:** `gallery.html`, one `<figure class="gallery-item">`
  per photo.
- **Homepage "picks" cards:** `index.html`, the `.picks-grid` section.
- **Contact details on the contact page itself:** `contact.html`'s
  `.visit-card` blocks.
- **Colours, type, spacing:** `assets/css/style.css`, organised in labelled
  sections (tokens at the top, then reset, typography, buttons, header,
  hero, menu, gallery, footer...).

## Before going live

Business details are bracketed placeholders throughout — search any file
for `TO BE CONFIRMED` (they appear in the header's mobile call button, the
footer, the homepage "visit us" section, and the contact page):

- Phone number (`tel:+910000000000` hrefs and the visible `[PHONE NUMBER — TO BE CONFIRMED]` text)
- WhatsApp number (`https://wa.me/910000000000` — replace the digits)
- Shop address (`[SHOP ADDRESS LINE — TO BE CONFIRMED]`, `[LOCALITY, CITY — TO BE CONFIRMED]`, `[PIN CODE]`)
- Opening hours (currently sample hours)
- Instagram handle (`https://instagram.com/momosomo.in` — confirm it's correct)

These same placeholders also appear inside each page's JSON-LD
`<script type="application/ld+json">` block in `<head>` — update those too
so the structured data search engines read matches the visible page.

Since there's no shared data file, use your editor's "find in files" across
all five `.html` files to update these consistently.

The contact page's map is deliberately a placeholder card, not a fake pin —
replace `.map-placeholder` in `contact.html` with a real Google Maps
`<iframe>` embed once the address is final (see `.map-frame` in the CSS,
ready to receive one).

## Link previews (WhatsApp / Facebook / Instagram / iMessage)

Every page has its own Open Graph and Twitter Card tags in `<head>`
(`og:title`, `og:description`, `og:image`, `og:image:width/height/alt`,
`og:url`, and the `twitter:*` equivalents) — all static, so sharing any
page's link shows a proper title, description and photo preview with no
JavaScript involved. Each page uses a **landscape-oriented** photo for its
preview image specifically (portrait photos crop badly in link-preview
cards); swap `og:image`/`twitter:image` for a different photo per page if
you want, but keep it landscape and update the matching `og:image:width`/
`og:image:height` to its real pixel dimensions.

## Notes

- No JS framework, no CSS preprocessor, no bundler, no `node_modules`.
- Animations respect `prefers-reduced-motion` and are skipped/instant when set.
- Photo credits are in `CREDITS.md` — all images are Unsplash-licensed.
