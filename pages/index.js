import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Action } from '../redux/actions';
import fetch from 'isomorphic-unfetch';

import { api_endpoint, api_token } from 'lib/api-config';

import Image from 'components/image';
import Date from 'components/date';

// Global Base Styles + Reset
import GlobalStyles from 'styles/styles.scss';

class Index extends Component {
	static async getInitialProps ({ reduxStore, req }) {
		const isServer = !!req;
		const movie_db = await this.fetchMovieData('now_playing', 'US');

		return {
			movie_data : movie_db
		}
	}

	static async fetchMovieData(status, region) {
		try {
			const api = await fetch(`${api_endpoint}${status}?api_key=${api_token}&region=${region}`);
			const res = await api.json();

			return res;
		} catch (err) {
			console.log(err, 'Error Fetching Movie Data');
			return err;
		}
	}

	toggle = () => {
		const { toggleTap } = this.props
		toggleTap()
	}

	render() {
		const { tap } = this.props;
		const { results } = this.props.movie_data;

		console.log(results);

		return (
			<section>
				<div style={{marginBottom: '20px'}}>
					<button onClick={this.toggle}>
						{tap ? 'Hide Popularity' : 'Show Popularity'}
					</button>
				</div>
				<div>
					{results && results.map((item, i) => {
						return (
							<div key={i}>
								<Image
									alt={item.title}
									size='w500'
									url={item.backdrop_path}
								/>
								<p>
									<strong>{item.title}</strong> <br/>
									<span>Popularity: {tap && item.popularity}</span>
									
								</p>
								<Date
									date={item.release_date}
								/>
								<br/>
							</div>
						)
					})}
				</div>
			</section>
		)
	}
}

const mapStateToProps = state => {
	return {
		tap: state.tap,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		toggleTap() {
			dispatch(Action.toggleTap());
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
