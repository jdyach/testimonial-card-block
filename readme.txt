=== Testimonial Card Block ===
Contributors: jdyach
Tags: block, gutenberg, block editor, testimonial, review
Requires at least: 6.5
Tested up to: 6.6
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

A custom Gutenberg block for displaying a customer testimonial or review as a styled card.

== Description ==

Testimonial Card adds one block: a quote, an author byline, an optional avatar, and a star rating, saved as a single self-contained card. It's built as a companion demonstration to a *dynamic* block (see [Recent Posts Grid](https://github.com/jdyach/recent-posts-grid-block)) — this one is a *static* block, showing the other half of block development:

* A `save()` function whose output is serialized directly into post content, versus rendering on every request via PHP.
* `RichText` for the quote and byline fields, with `RichText.Content` mirroring that markup in `save()`.
* `MediaUpload` / `MediaUploadCheck` for the avatar, selectable either from the sidebar or by clicking the avatar placeholder directly in the canvas.
* A small custom control — the star rating — built from scratch with `@wordpress/components`, rather than reaching for a form field that doesn't quite fit the interaction (click a star to set the rating; click it again to clear it).
* Block Supports for color, border, spacing, and typography, which hands the whole "Styles" section of the Inspector to WordPress core automatically — no custom UI code needed for any of that.
* Two block styles (**Card** and **Minimal**) via block.json's `styles` field, switchable from the block toolbar.

== Installation ==

1. Upload the plugin folder to `/wp-content/plugins/`, or install the zip via **Plugins → Add New → Upload Plugin**.
2. Activate the plugin through the **Plugins** screen.
3. Add the **Testimonial Card** block from the block inserter.

== Frequently Asked Questions ==

= Why does this block need a `save()` function when the other one didn't? =

This is a *static* block: its HTML is generated once, in the editor, and stored in the post — unlike a dynamic block (rendered by PHP on every request), a static block's markup doesn't change unless someone edits it again in the editor. That's the right choice here since a testimonial's content doesn't need to reflect live site data the way a "recent posts" list does.

= What happens if I update the plugin's markup later? =

Static blocks validate their saved markup against the current `save()` output. If you change `save()` in a way that alters the markup, WordPress will flag existing instances of the block as invalid and offer to let you resolve the difference — this is expected behavior for any static block, not specific to this plugin.

== Changelog ==

= 1.0.0 =
* Initial release.
