<?php
/**
 * Plugin Name:       Testimonial Card Block
 * Plugin URI:        https://github.com/jdyach/testimonial-card-block
 * Description:       A custom Gutenberg block for displaying a customer testimonial or review as a styled card: quote, avatar, byline, and star rating. Built as a demonstration of a static (save()-based) block with rich block supports.
 * Version:           1.0.0
 * Requires at least: 6.5
 * Requires PHP:      7.4
 * Author:            Jacqui Dyach
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       testimonial-card-block
 *
 * @package TestimonialCardBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // No direct access.
}

define( 'TCB_VERSION', '1.0.0' );
define( 'TCB_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );

/**
 * Register the block using the metadata in `build/block.json`.
 *
 * This is a static block — its markup is generated once in the editor
 * by src/save.js and stored in post content, so registration only needs
 * to point at the compiled build directory; there's no render_callback
 * or render.php involved.
 */
function tcb_register_block() {
	$build_dir = TCB_PLUGIN_DIR . 'build';

	if ( ! file_exists( $build_dir . '/block.json' ) ) {
		add_action( 'admin_notices', 'tcb_missing_build_notice' );
		return;
	}

	register_block_type( $build_dir );
}
add_action( 'init', 'tcb_register_block' );

/**
 * Admin notice shown if the plugin is activated without running the
 * build step (i.e. `build/block.json` doesn't exist yet).
 */
function tcb_missing_build_notice() {
	?>
	<div class="notice notice-error">
		<p>
			<?php
			echo wp_kses_post(
				sprintf(
					/* translators: %s: build command. */
					__( 'Testimonial Card Block: no build found. Run %s from the plugin directory, then reload this page.', 'testimonial-card-block' ),
					'<code>npm install && npm run build</code>'
				)
			);
			?>
		</p>
	</div>
	<?php
}
