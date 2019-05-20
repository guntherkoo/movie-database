import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import s from './Date.scss';

function Date({date, tag}) {
	const Tag = tag;
	
	return (
		<React.Fragment>
			<Tag>
				Release Date: {dayjs(date).format('dddd - MMM D, YYYY')}
			</Tag>
		</React.Fragment>
	)
}

Date.propTypes = {
	date: PropTypes.string.isRequired,
	tag: PropTypes.string
}

Date.defaultProps = {
	tag: 'p'
}

export default Date;