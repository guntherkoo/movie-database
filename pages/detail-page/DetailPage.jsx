import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Action, fetchMovieDataRedux } from 'redux-store/actions';
import { api_img_url } from 'lib/api-config';

import { ColorExtractor } from 'react-color-extractor';

import s from './DetailPage.scss';

class DetailPage extends Component {
	static async getInitialProps ({ reduxStore, req, query }) {
		const isServer = !!req;
		// const movie_details = await this.fetchMovieDetails(query.id, 'US');

		// return movie_details;

		const fetch_promise = Promise.resolve()
			.then(() => reduxStore.dispatch(Action.fetchMovieDataRedux('movie', query.id, 'US')));

		return fetch_promise;
	}

	static propTypes = {
		fetchMovieDataRedux: PropTypes.func,
	}

	state = { colors: [] }

	getColors = (colors) => {
		let color_list = [];

		// Select only darker colors
		colors.forEach((item, i) => {
			if (item[0] < 100) {
				color_list.push(item);
			}
		});

		this.setState({ colors: color_list });
	}

	getColorExtraction = (backdrop_path) => {
		return (
			<ColorExtractor
				rgb
				src={`https:${api_img_url}w500${backdrop_path}`}
				maxColors={64}
				getColors={colors => this.getColors(colors)}
			/>
		)
	}

	render() {
		const {
			title,
			tagline,
			backdrop_path
		} = this.props.results;

		const hero_styles = {
			backgroundImage: `url(${api_img_url}w1280${backdrop_path})`
		}

		const color_bg = {
			backgroundColor: `rgb(${this.state.colors[0]})`
		}

		console.log(this.props)

		return (
			<section className={s('container')}>
				{this.getColorExtraction(backdrop_path)}
				<div className={s('hero-container')} style={hero_styles}>
					<div className={s('color-bg')} style={color_bg}></div>
					<div className={s('content-container')}>
						<div className={s('content')}>
							<h1>
								{title}
							</h1>
							<h3>
								{tagline}
							</h3>
						</div>
					</div>
				</div>
			</section>
		)
	}
}

const mapStateToProps = state => {
	return {
		data: state.data
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchLiveBlogStreams(type, source, region) {
			dispatch(Action.fetchMovieDataRedux(type, source, region));
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);
