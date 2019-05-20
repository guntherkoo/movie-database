import React from 'react';
import PropTypes from 'prop-types';
import { api_img_url } from 'lib/api-config';

import s from './Image.scss';

function Image({alt, size, url}) {
	return (
		<React.Fragment>
			<img src={`${api_img_url}${size}${url}`} alt={alt}/>
		</React.Fragment>
	)
}

Image.propTypes = {
	alt: PropTypes.string.isRequired,
	size: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
}

export default Image;