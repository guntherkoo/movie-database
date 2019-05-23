import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Image from 'components/image';
import Date from 'components/date';

import s from './LandingPage.scss';

class LandingPage extends PureComponent {
	renderImageOverlay = (title, release_date) => {
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

	render() {
		const { results } = this.props;

		return (
			<div className={s('container')}>
				{results && results.map((item, i) => {
					const {
						title,
						backdrop_path,
						release_date
					} = item;

					return (
						<a href={`/movie/${item.id}`} className={s('item')} key={i}>
							<Image
								className={s('image-container')}
								title={title}
								size='w500'
								url={backdrop_path}
								release_date={release_date}
								render_overlay={this.renderImageOverlay(title, release_date)}
							/>
						</a>
					)
				})}
			</div>
		)
	}
}

export default LandingPage;