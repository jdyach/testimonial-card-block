# Testimonial Card — a custom Gutenberg block

A custom WordPress plugin adding one block, **Testimonial Card**: a customer quote with an avatar, byline, and star rating, displayed as a styled card.

This is a companion piece to [Recent Posts Grid](https://github.com/jdyach/recent-posts-grid-block), a dynamic (PHP-rendered) block. This one is deliberately the other kind — a **static** block, so together the two repos cover both major block-rendering approaches in WordPress.

## What it demonstrates

- **A `save()`-based static block.** Markup is generated once in the editor and serialized into post content — no PHP rendering involved. `src/save.js` and `src/edit.js` share the same structure and the same `StarRating` component so the two stay in sync by construction, not by convention.
- **`RichText`** for the quote and author fields, each with matching `RichText.Content` output in `save()`.
- **`MediaUpload` / `MediaUploadCheck`** for the avatar image — selectable from the Inspector or by clicking the avatar directly in the canvas, following the pattern WordPress core blocks use for image selection.
- **A hand-built control.** The star rating isn't a form field that happens to fit — it's a small custom component (`src/star-rating.js`) shared between the editor (interactive, click-to-set) and the front end (the same markup, rendered inert), built directly on `@wordpress/components` primitives.
- **Block Supports** for color, border, spacing, and typography — declared in `block.json`, with zero custom UI code. WordPress core adds the entire "Styles" section of the Inspector for you.
- **Block styles.** Two visual variants (**Card**, **Minimal**) registered via block.json's `styles` field and switchable from the block toolbar — no JS registration needed for that either.

## Project structure

```
testimonial-card-block/
├── testimonial-card-block.php   # Plugin bootstrap — registers the block from build/
├── src/                          # Source (edit this)
│   ├── block.json                # Block metadata: attributes, supports, styles
│   ├── index.js                  # Registers the block
│   ├── edit.js                   # Editor UI: RichText, MediaUpload, rating control
│   ├── save.js                   # Serialized front-end markup
│   ├── star-rating.js            # Shared interactive/static star control
│   ├── editor.scss                # Editor-only styles
│   └── style.scss                # Front-end + editor styles, incl. the Minimal style
├── build/                        # Compiled output (checked in so the plugin runs as-is)
├── .github/workflows/ci.yml      # Build + PHP lint on every push
├── .phpcs.xml.dist               # WordPress Coding Standards config
└── readme.txt                    # WordPress.org-style plugin readme
```

## Using it

The compiled `build/` directory is committed, so the plugin works without a Node toolchain:

1. Copy (or clone) this folder into `wp-content/plugins/`.
2. Activate **Testimonial Card Block** under **Plugins**.
3. Add the **Testimonial Card** block from the inserter and fill in a quote, byline, and rating.

Requires WordPress 6.5+ and PHP 7.4+.

## Developing

```bash
npm install
npm run start   # watch mode for local development
npm run build   # production build into build/
npm run lint:css
npm run plugin-zip   # produces a WordPress.org-ready zip using .distignore
```

As with the Recent Posts Grid repo, `npm run lint:js` is wired up but left out of CI here — there's an unresolved upstream version conflict inside `@wordpress/eslint-plugin`'s own dependency tree that breaks ESLint's plugin loading, unrelated to this project's code. `npm run build` and `npm run lint:css` both run clean.

## License

GPLv2 or later, in keeping with WordPress plugin conventions. See [LICENSE](LICENSE).
