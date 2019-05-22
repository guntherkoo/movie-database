import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Image from 'components/image';

import s from './LandingPage.scss';

class LandingPage extends PureComponent {
	render() {
		const { results } = this.props;

		return (
			<div className={s('container')}>
				{results && results.map((item, i) => {
					return (
						<a href={`/movie/${item.id}`} className={s('item')} key={i}>
							<Image
								title={item.title}
								size='w500'
								url={item.backdrop_path}
								release_date={item.release_date}
								overlay={true}
							/>
						</a>
					)
				})}
			</div>
		)
	}
}

export default LandingPage;