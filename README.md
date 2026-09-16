# MomoSomo — momosomo.in

Pure HTML, CSS and JavaScript. No build step, no npm install, no framework,
no client-side content loading — every page is a complete, self-contained
HTML file with all its real content already in it. Double-click any `.html`
file (or serve the folder with any static host) and it works.

## Structure

```
index.html, menu.html, contact.html
                    The three pages. Each is a complete, plain HTML file —
                    header, footer, and all content are written directly
                    into every page. Nothing is injected by JavaScript.

assets/
  css/style.css      All site styles — one file, no preprocessor
  js/main.js          Page interactions only: mobile nav open/close, the
                      menu's veg filter + jump-nav highlighting, scroll
                      reveal. It only ever toggles classes/attributes on
                      markup that's already on the page — it never inserts
                      content. Disable JS and every page still reads
                      correctly, just without those interactions.
  img/                Photos (see CREDITS.md) + logo/favicon

CNAME               GitHub Pages custom-domain file — must contain
                    exactly "momosomo.in", nothing else
robots.txt, sitemap.xml
```

The site only has three pages on purpose: the menu is the actual content
people come for, Home leads into it, and Contact is the practical
find-us/call-us page. There's no "Our Story" or "Gallery" page — earlier
drafts had both, filled with placeholder narrative copy and stock photos
that weren't really MomoSomo's, which is exactly the kind of "extra" this
version drops in favour of only showing the real menu.

## Why content is duplicated across the 3 files, on purpose

An earlier version of this site rendered the header, footer, and the menu
content via JavaScript (Web Components + a shared data file) so they only
had to be written once. That's a real convenience, but it has a real cost:
a crawler or link-preview bot that doesn't execute JavaScript — and plenty
don't, reliably — sees an empty `<div>` where the menu should be. For a
restaurant site, the menu is the single most-searched piece of content on
it, so that trade was the wrong one. Every page here now carries its own
complete copy of the header, footer, and its content, in plain HTML, so
it's indexable and shareable with zero JavaScript required.

The cost is real too: **changing the nav, the footer (address/phone/
socials), or a menu item means editing that block in all three `.html`
files.** There's no way around that without reintroducing either a build
step or client-side rendering — both of which were explicitly ruled out.
Search each file for the block you're changing; the markup is identical
across pages (only the active nav link and the page's own main content
differ), so a find-and-replace across all three files works fine for
sitewide changes like the phone number.

## The menu

`menu.html` reflects MomoSomo's actual printed menu cards exactly — Veg
Momo, Chicken Momo, Combos (momo + French fries + mojito), Mojitos, and
French Fries. No prices are shown because the source menu cards don't list
any (they're order-tick sheets, not priced menus) — add `<span
class="menu-item__price">` elements back in if/when real prices exist;
don't invent numbers. Each `<li class="menu-item">` uses
`data-veg="true"/"false"` to drive both the veg-only filter and the
indicator dot colour. The category headers are a plain rule-line style
(bold uppercase title + thin horizontal line) deliberately modelled on the
printed cards' own look, rather than generic stock-photo thumbnails.

## Running it

There's nothing to run. Open any `.html` file directly in a browser, or
point any static file server at this folder (`npx serve .`, VS Code's
"Live Server", Python's `python -m http.server`, or just uploading the
folder to a host). All paths are relative, so it works both ways.

**Live deployment:** this repo is published via GitHub Pages
(`LinuxLuminaries/momosomo` on GitHub) with `momosomo.in` pointed at it
through DNS `A`/`CNAME` records (see the `CNAME` file at the repo root).
Pushing to `main` redeploys automatically — there's no separate build/
upload step. An earlier deployment on InfinityFree's free hosting was
dropped because its shared-server anti-bot layer randomly served a
JavaScript interstitial to real visitors and to WhatsApp/Facebook's
preview crawlers, breaking link previews unpredictably; GitHub Pages
doesn't do this.

## Editing content

Everything is plain HTML inside each page — there's no separate content
file to edit. In each `.html` file:

- **Header / nav / mobile nav:** the `<header class="site-header">` block
  near the top. Identical in all three files except which `.nav__link` /
  `.mobile-nav__link` carries `is-active`.
- **Footer (address, phone, email, socials):** the
  `<footer class="site-footer">` block near the bottom. Identical in all
  three files.
- **Menu items:** `menu.html`, inside the `.menu-category` sections — one
  `<li class="menu-item">` per dish.
- **Homepage "picks" cards:** `index.html`, the `.picks-grid` section.
- **Contact details on the contact page itself:** `contact.html`'s
  `.visit-card` blocks.
- **Colours, type, spacing:** `assets/css/style.css`, organised in labelled
  sections (tokens at the top, then reset, typography, buttons, header,
  hero, menu, footer...).

## Before going live

The phone number (+91 99027 57364) is real and already filled in
everywhere (`tel:` links, `wa.me` links, JSON-LD `telephone`). What's still
a bracketed placeholder — search any file for `TO BE CONFIRMED`:

- Shop address (`[SHOP ADDRESS LINE — TO BE CONFIRMED]`, `[LOCALITY, CITY — TO BE CONFIRMED]`, `[PIN CODE]`)
- Instagram handle (`https://instagram.com/momosomo.in` — confirm it's correct)

These same placeholders also appear inside each page's JSON-LD
`<script type="application/ld+json">` block in `<head>` — update those too
so the structured data search engines read matches the visible page.

Since there's no shared data file, use your editor's "find in files" across
all three `.html` files to update these consistently.

The contact page's map is deliberately a placeholder card, not a fake pin —
replace `.map-placeholder` in `contact.html` with a real Google Maps
`<iframe>` embed once the address is final (see `.map-frame` in the CSS,
ready to receive one).

## Link previews (WhatsApp / Facebook / Instagram / iMessage)

Every page has its own Open Graph and Twitter Card tags in `<head>`
(`og:title`, `og:description`, `og:image`, `og:image:width/height/alt`,
`og:url`, and the `twitter:*` equivalents) — all static, so sharing any
page's link shows a proper title, description and photo preview with no
JavaScript involved. Home and Contact use a landscape hero photo; Menu uses
a landscape combo photo. Keep any replacement image landscape (portrait
photos crop badly in link-preview cards) and update the matching
`og:image:width`/`og:image:height` to its real pixel dimensions.

## Notes

- No JS framework, no CSS preprocessor, no bundler, no `node_modules`.
- Animations respect `prefers-reduced-motion` and are skipped/instant when set.
- Photo credits are in `CREDITS.md` — all images are Unsplash-licensed, and
  none are real MomoSomo photography yet.
