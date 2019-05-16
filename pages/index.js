import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Action } from '../redux/actions';

import GlobalStyles from 'styles/styles.scss';

class Index extends Component {
	static getInitialProps ({ reduxStore, req }) {
		const isServer = !!req;

		const fetch_movie_promise = Promise.resolve()
			.then(() => reduxStore.dispatch(Action.fetchMovieData('now_playing', 'US')));
			
		return fetch_movie_promise;
	}

	toggle = () => {
		const { toggleTap } = this.props
		toggleTap()
	}

	render() {
		const { tap } = this.props;
		const { results } = this.props.payload;

		return (
			<section>
				<h1>
					Now Playing Movies
				</h1>
				<div style={{marginBottom: '20px'}}>
					<button onClick={this.toggle}>
						{tap ? 'Hide Popularity' : 'Show Popularity'}
					</button>
				</div>
				<div>
					{results && results.map((item, i) => {
						const img_url = 'https://image.tmdb.org/t/p/w500';

						return (
							<div key={i}>
								<img src={`${img_url}${item.poster_path}`} style={{maxWidth: '320px'}}/>
								<p>
									<strong>{item.title}</strong> <br/>
									<span>Popularity: {tap && item.popularity}</span>
								</p>
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
		},
		fetchMovieData(status, region) {
			dispatch(Action.fetchMovieData(status, region));
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Index);
