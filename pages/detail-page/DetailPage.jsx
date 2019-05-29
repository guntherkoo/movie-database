import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';

import { splashy } from 'splashy';
import { ColorExtractor } from 'react-color-extractor';
import { api_endpoint_movies, api_token, api_img_url } from 'lib/api-config';

import s from './DetailPage.scss';

// (async () => {
//   const splashy = require('splashy')
//   const got = require('got')

//   const url = 'https://kikobeats.com/images/avatar.jpg'
//   const { body } = await got(url, { encoding: null })
//   const palette = await splashy(body)

//   console.log(palette)
//   // => [ '#941c1c', '#841c16', '#aa695e', '#ca866c', '#6c5444', '#cca4a4' ]
// })()
console.log(splashy)

class DetailPage extends Component {
	static async getInitialProps ({ reduxStore, req, query }) {
		const isServer = !!req;
		const movie_details = await this.fetchMovieDetails(query.id, 'US');

		return movie_details;
	}

	static async fetchMovieDetails(query, region) {
		try {
			const api = await fetch(`${api_endpoint_movies}${query}?api_key=${api_token}&region=${region}`);
			const res = await api.json();

			return res;
		} catch (err) {
			console.log(err, 'Error Fetching Movie Data');
			return err;
		}
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
		} = this.props;

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

export default DetailPage;