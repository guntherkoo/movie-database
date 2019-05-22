import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
import Image from 'components/image';

import { api_endpoint_movies, api_token } from 'lib/api-config';

import s from './DetailPage.scss';

class DetailPage extends Component {
	static async getInitialProps ({ reduxStore, req, query }) {
		console.log(query)
		const isServer = !!req;
		const movie_details = await this.fetchMovieDetails(query.id, 'US');

		return movie_details;
	}

	static async fetchMovieDetails(query, region) {
		try {
			const api = await fetch(`${api_endpoint_movies}${query}?api_key=${api_token}&region=${region}`);
			const res = await api.json();

			console.log(api)

			return res;
		} catch (err) {
			console.log(err, 'Error Fetching Movie Data');
			return err;
		}
	}

	render() {
		const {
			title,
			poster_path
		} = this.props;

		console.log(this.props)
		return (
			<section className={s('container')}>
				<Image
					title={title}
					size='original'
					url={poster_path}
				/>
			</section>
		)
	}
}

export default DetailPage;