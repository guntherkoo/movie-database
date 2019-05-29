import { 
	api_endpoint_movies, 
	api_endpoint_keyword, 
	api_token, 
	mcu_keyword 
} from 'lib/api-config';

import { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Action } from '../redux/actions';
import fetch from 'isomorphic-unfetch';

import LandingPage from './LandingPage';

// Global Base Styles + Reset
import GlobalStyles from 'styles/styles.scss';

class Index extends Component {
	static async getInitialProps ({ reduxStore, req }) {
		const isServer = !!req;
		const movie_db = await this.fetchMovieData('now_playing', 'US');

		await reduxStore.dispatch(Action.fetchMovieDataRedux());

		return movie_db;
	}

	static async fetchMovieData(status, region) {
		try {
			// const api = await fetch(`${api_endpoint_movies}${status}?api_key=${api_token}&region=${region}`);
			const api = await fetch(`${api_endpoint_keyword}${mcu_keyword}?api_key=${api_token}&region=${region}`);
			const res = await api.json();

			return res;
		} catch (err) {
			console.log(err, 'Error Fetching Movie Data');
			return err;
		}
	}

	componentDidMount() {
		this.props.fetchMovieDataRedux();
	}

	render() {
		const { results } = this.props;

		// console.log(results);

		return (
			<Fragment>
				<LandingPage results={results} />
			</Fragment>
		)
	}
}

const mapStateToProps = state => {
	return {}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchMovieDataRedux() {
			dispatch(Action.fetchMovieDataRedux());
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
