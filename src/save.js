import { useBlockProps, RichText } from '@wordpress/block-editor';

import StarRating from './star-rating';

export default function save( { attributes } ) {
	const { quote, authorName, authorTitle, avatarUrl, avatarAlt, rating } =
		attributes;

	const blockProps = useBlockProps.save( {
		className: 'wp-block-jdyach-testimonial-card',
	} );

	return (
		<blockquote { ...blockProps }>
			<RichText.Content
				tagName="p"
				className="wp-block-jdyach-testimonial-card__quote"
				value={ quote }
			/>

			<footer className="wp-block-jdyach-testimonial-card__footer">
				{ avatarUrl && (
					<div className="wp-block-jdyach-testimonial-card__avatar">
						<img src={ avatarUrl } alt={ avatarAlt || '' } />
					</div>
				) }

				<div className="wp-block-jdyach-testimonial-card__byline">
					<RichText.Content
						tagName="cite"
						className="wp-block-jdyach-testimonial-card__author-name"
						value={ authorName }
					/>
					<RichText.Content
						tagName="span"
						className="wp-block-jdyach-testimonial-card__author-title"
						value={ authorTitle }
					/>
					{ rating > 0 && <StarRating rating={ rating } /> }
				</div>
			</footer>
		</blockquote>
	);
}
