import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { PanelBody, Button } from '@wordpress/components';

import StarRating from './star-rating';

export default function Edit( { attributes, setAttributes } ) {
	const {
		quote,
		authorName,
		authorTitle,
		avatarUrl,
		avatarAlt,
		rating,
	} = attributes;

	const blockProps = useBlockProps( {
		className: 'wp-block-jdyach-testimonial-card',
	} );

	const onSelectAvatar = ( media ) => {
		setAttributes( {
			avatarUrl: media?.url || '',
			avatarAlt: media?.alt || '',
			avatarId: media?.id || 0,
		} );
	};

	const onRemoveAvatar = () => {
		setAttributes( { avatarUrl: '', avatarAlt: '', avatarId: 0 } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Avatar', 'testimonial-card-block' ) }>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ onSelectAvatar }
							allowedTypes={ [ 'image' ] }
							value={ attributes.avatarId }
							render={ ( { open } ) => (
								<Button variant="secondary" onClick={ open }>
									{ avatarUrl
										? __( 'Replace image', 'testimonial-card-block' )
										: __( 'Select image', 'testimonial-card-block' ) }
								</Button>
							) }
						/>
					</MediaUploadCheck>
					{ avatarUrl && (
						<Button
							variant="link"
							isDestructive
							onClick={ onRemoveAvatar }
							style={ { display: 'block', marginTop: '0.5rem' } }
						>
							{ __( 'Remove image', 'testimonial-card-block' ) }
						</Button>
					) }
				</PanelBody>
				<PanelBody title={ __( 'Rating', 'testimonial-card-block' ) }>
					<p>
						{ __(
							'Click a star to set the rating, or click the currently-set star again to hide the rating entirely.',
							'testimonial-card-block'
						) }
					</p>
					<StarRating
						rating={ rating }
						onChange={ ( value ) =>
							setAttributes( { rating: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<blockquote { ...blockProps }>
				<RichText
					tagName="p"
					className="wp-block-jdyach-testimonial-card__quote"
					value={ quote }
					onChange={ ( value ) => setAttributes( { quote: value } ) }
					placeholder={ __(
						'Add the customer’s quote…',
						'testimonial-card-block'
					) }
					allowedFormats={ [ 'core/bold', 'core/italic' ] }
				/>

				<footer className="wp-block-jdyach-testimonial-card__footer">
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ onSelectAvatar }
							allowedTypes={ [ 'image' ] }
							value={ attributes.avatarId }
							render={ ( { open } ) => (
								<button
									type="button"
									onClick={ open }
									className="wp-block-jdyach-testimonial-card__avatar wp-block-jdyach-testimonial-card__avatar--button"
								>
									{ avatarUrl ? (
										<img src={ avatarUrl } alt={ avatarAlt || '' } />
									) : (
										<span className="wp-block-jdyach-testimonial-card__avatar-placeholder">
											{ __( 'Add photo', 'testimonial-card-block' ) }
										</span>
									) }
								</button>
							) }
						/>
					</MediaUploadCheck>

					<div className="wp-block-jdyach-testimonial-card__byline">
						<RichText
							tagName="cite"
							className="wp-block-jdyach-testimonial-card__author-name"
							value={ authorName }
							onChange={ ( value ) =>
								setAttributes( { authorName: value } )
							}
							placeholder={ __( 'Author name', 'testimonial-card-block' ) }
							allowedFormats={ [] }
						/>
						<RichText
							tagName="span"
							className="wp-block-jdyach-testimonial-card__author-title"
							value={ authorTitle }
							onChange={ ( value ) =>
								setAttributes( { authorTitle: value } )
							}
							placeholder={ __(
								'Title, company (optional)',
								'testimonial-card-block'
							) }
							allowedFormats={ [] }
						/>
						{ rating > 0 && <StarRating rating={ rating } /> }
					</div>
				</footer>
			</blockquote>
		</>
	);
}
