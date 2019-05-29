import { 
	api_endpoint_movies, 
	api_endpoint_keyword, 
	api_token, 
	mcu_keyword 
} from 'lib/api-config';

import { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Action, fetchMovieDataRedux } from '../redux/actions';
import fetch from 'isomorphic-unfetch';

import LandingPage from './LandingPage';

// Global Base Styles + Reset
import GlobalStyles from 'styles/styles.scss';

class Index extends Component {
	static async getInitialProps ({ reduxStore, req }) {
		const isServer = !!req;
		// const movie_list = await reduxStore.dispatch(Action.fetchMovieDataRedux('now_playing', 'US'));

		const promise = Promise.resolve()
			.then(() => reduxStore.dispatch(Action.fetchMovieDataRedux('now_playing', 'US')));

		return promise;
	}

	static propTypes = {
		fetchMovieDataRedux: PropTypes.func,
	}

	render() {
		const { results } = this.props;

		console.log(results);

		return (
			<Fragment>
				<LandingPage results={results} />
			</Fragment>
		)
	}
}

const mapStateToProps = state => {
	return {
		movie_list: state.movie_list
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchLiveBlogStreams(status, region) {
			dispatch(Action.fetchMovieDataRedux(status, region));
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
