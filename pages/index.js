import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Action } from '../redux/actions';
import fetch from 'isomorphic-unfetch';

import GlobalStyles from 'styles/styles.scss';

class Index extends Component {
	static async getInitialProps ({ reduxStore, req }) {
		const isServer = !!req;
		const movie_db = await this.fetchMovieData('now_playing', 'US');

		console.log(movie_db)

		return {
			movie_data : movie_db
		}
	}

	static async fetchMovieData(status, region) {
		try {
			const api = await fetch(`//api.themoviedb.org/3/movie/${status}?api_key=f7b1557a908d86ec205d705bf4d509fb&region=${region}`);
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
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Index);
