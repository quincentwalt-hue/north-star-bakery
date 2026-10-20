# North Star Bakery Website — Touchstone 3

A four-page HTML website for North Star Bakery with a shared responsive CSS design system.

## Files

- `index.html` — Home page with welcome message, featured Signature Loaf, store hours/location, image cards, and behind-the-scenes video.
- `products.html` — Product categories, price ranges, and responsive featured image using `<picture>`.
- `about.html` — Bakery story, sourcing philosophy, team highlights, and audio welcome message.
- `contact.html` — Contact/pre-order form with labels, fieldsets, legends, and HTML built-in validation.
- `style.css` — Shared visual system, Flexbox layouts, and responsive media queries.
- `media/` — Provided logo, product/store images, welcome audio, and an optimized copy of the short behind-the-scenes video.

## Design system

- Colors: cream `#FFF8EF`, cocoa `#3D2B24`, terracotta `#B85C38`, sage `#66785F`.
- Typography: Georgia for headings and Arial/Helvetica for body content.
- Layout: mobile-first Flexbox; desktop navigation and content columns activate at 720px and wider.
- Accessibility: descriptive alt text, semantic landmarks, skip link, visible keyboard focus, meaningful link text, labels, and fallback copy for video/audio.

## Run locally

Open `index.html` in a browser, or use the Live Server extension in VS Code/Codespaces to preview the site. All links are relative paths within this folder.

## GitHub submission

Create or use a GitHub repository, upload all files and the `media` folder, then paste the repository URL into the Touchstone 3 Design Explanation document before submitting.

The contact form is front-end HTML only; it validates required fields in the browser but does not send or store responses until a form-processing service is connected.

## Color contrast note

The cocoa text and terracotta action color are darkened enough to remain distinct against the cream background. Keyboard users can see focus outlines, and the navigation marks the current page with `aria-current="page"`.
