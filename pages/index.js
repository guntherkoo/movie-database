import { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Action, fetchMovieDataRedux } from 'redux-store/actions';
import { mcu_keyword } from 'lib/api-config';

import LandingPage from './LandingPage';

// Global Base Styles + Reset
import GlobalStyles from 'styles/styles.scss';

class Index extends Component {
	static async getInitialProps ({ reduxStore, req }) {
		const isServer = !!req;
		const fetch_promise = Promise.resolve()
			.then(() => reduxStore.dispatch(Action.fetchMovieDataRedux('movie', 'now_playing', 'US')));

		return fetch_promise;
	}

	static propTypes = {
		fetchMovieDataRedux: PropTypes.func,
	}

	render() {
		const { results } = this.props.data;

		console.log('*** '+this.props.type+' ***', results);

		return (
			<Fragment>
				<LandingPage results={results} />
			</Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(Index);
