import React from 'react';
import PropTypes from 'prop-types';
import { api_img_url } from 'lib/api-config';

import Date from 'components/date';

import s from './Image.scss';

function overlayCaption(props) {
	const {
		title,
		release_date
	} = props;

	return (
		<div className={s('caption-overlay')}>
			<h1>
				{title}
			</h1>
			<Date
				date={release_date}
			/>
		</div>
	)
}

function Image(props) {
	const {
		title,
		size,
		url,
		overlay
	} = props;

	return (
		<div className={s('container')}>
			<img src={`${api_img_url}${size}${url}`} alt={title}/>
			{overlay &&
				overlayCaption(props)
			}
		</div>
	)
}

Image.propTypes = {
	title: PropTypes.string.isRequired,
	size: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	release_date: PropTypes.string,
	overlay: PropTypes.bool,
}

export default Image;