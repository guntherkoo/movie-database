import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Action } from '../redux/actions';
import fetch from 'isomorphic-unfetch';

import { api_endpoint_keyword, api_token, mcu_keyword } from 'lib/api-config';

import Image from 'components/image';

// Global Base Styles + Reset
import GlobalStyles from 'styles/styles.scss';

class Index extends Component {
	static async getInitialProps ({ reduxStore, req }) {
		const isServer = !!req;
		const movie_db = await this.fetchMovieData('keyword', 'now_playing', 'US');

		return {
			movie_data : movie_db
		}
	}

	static async fetchMovieData(get, status, region) {
		try {
			const api = await fetch(`${api_endpoint_keyword}${mcu_keyword}?api_key=${api_token}&region=${region}`);
			const res = await api.json();

			return res;
		} catch (err) {
			console.log(err, 'Error Fetching Movie Data');
			return err;
		}
	}

	render() {
		const { results } = this.props.movie_data;

		console.log(results);

		return (
			<section>
				<div>
					{results && results.map((item, i) => {
						return (
							<div key={i}>
								<Image
									title={item.title}
									size='original'
									url={item.backdrop_path}
									release_date={item.release_date}
									overlay={true}
								/>
							</div>
						)
					})}
				</div>
			</section>
		)
	}
}

const mapStateToProps = state => {
	return {}
}

const mapDispatchToProps = dispatch => {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
