import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import Edit from './edit';
import save from './save';
import metadata from './block.json';
import './editor.scss';
import './style.scss';

registerBlockType( metadata.name, {
	...metadata,
	title: __( 'Testimonial Card', 'testimonial-card-block' ),
	description: __(
		'A customer quote with an avatar, byline, and star rating.',
		'testimonial-card-block'
	),
	edit: Edit,
	save,
} );
