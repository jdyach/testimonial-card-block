import { __, sprintf } from '@wordpress/i18n';
import { Button } from '@wordpress/components';

const MAX_RATING = 5;

/**
 * A single star glyph. Kept as a plain inline SVG (rather than pulling a
 * named icon from @wordpress/icons) so it renders identically in the
 * editor and on the front end without depending on which icons a given
 * WordPress version happens to bundle.
 */
function Star( { filled } ) {
	return (
		<svg
			className="wp-block-jdyach-testimonial-card__star"
			width="18"
			height="18"
			viewBox="0 0 20 20"
			aria-hidden="true"
			focusable="false"
		>
			<path
				fill={ filled ? 'currentColor' : 'none' }
				stroke="currentColor"
				strokeWidth="1.25"
				strokeLinejoin="round"
				d="M10 1.6l2.47 5.24 5.77.62-4.3 3.96 1.18 5.69L10 14.9l-5.12 2.21 1.18-5.69-4.3-3.96 5.77-.62L10 1.6z"
			/>
		</svg>
	);
}

/**
 * Renders a row of five stars representing `rating`.
 *
 * In read-only mode (`onChange` omitted, used by save.js) this is plain,
 * inert markup — no buttons, no attached handlers — since save() output
 * must be static HTML. In the editor, passing `onChange` turns each star
 * into a click target so authors can set the rating without a separate
 * number field.
 */
export default function StarRating( { rating, onChange } ) {
	const stars = Array.from( { length: MAX_RATING }, ( _, index ) => index + 1 );
	const isInteractive = typeof onChange === 'function';

	return (
		<div
			className="wp-block-jdyach-testimonial-card__rating"
			role="img"
			aria-label={ sprintf(
				/* translators: 1: number of filled stars, 2: total stars. */
				__( 'Rated %1$d out of %2$d', 'testimonial-card-block' ),
				rating,
				MAX_RATING
			) }
		>
			{ stars.map( ( starValue ) =>
				isInteractive ? (
					<Button
						key={ starValue }
						className="wp-block-jdyach-testimonial-card__star-button"
						label={ sprintf(
							/* translators: %d: star number being set. */
							__( 'Set rating to %d', 'testimonial-card-block' ),
							starValue
						) }
						onClick={ () =>
							onChange( starValue === rating ? 0 : starValue )
						}
					>
						<Star filled={ starValue <= rating } />
					</Button>
				) : (
					<Star key={ starValue } filled={ starValue <= rating } />
				)
			) }
		</div>
	);
}
