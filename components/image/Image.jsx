import React from 'react';
import PropTypes from 'prop-types';
import { api_img_url } from 'lib/api-config';
import classnames from 'classnames';

import s from './Image.scss';

function Image(props) {
	const {
		className,
		title,
		size,
		url,
		render_overlay,
	} = props;

	return (
		<div className={classnames(s('container'), className)}>
			<img src={`${api_img_url}${size}${url}`} alt={title}/>
			{render_overlay && render_overlay}
		</div>
	)
}

Image.propTypes = {
	title: PropTypes.string.isRequired,
	size: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	release_date: PropTypes.string,
	render_overlay: PropTypes.object,
	className: PropTypes.string,
}

export default Image;