import fetch from 'cross-fetch';

// ACTIONS
const Type = {
	TOGGLE : 'TOGGLE',
	FETCH_MOVIE_DATA_REQUEST : 'FETCH_MOVIE_DATA_REQUEST',
	FETCH_MOVIE_DATA_SUCCESS : 'FETCH_MOVIE_DATA_SUCCESS',
	FETCH_MOVIE_DATA_FAILURE : 'FETCH_MOVIE_DATA_FAILURE'
}

const Action = {
	toggleTap: () => {
		return { type: Type.TOGGLE }
	},

	fetchMovieDataReduxRequest: () => {
		return {
			type: Type.FETCH_MOVIE_DATA_REQUEST
		}
	},

	fetchMovieDataReduxSuccess: (json) => {
		return {
			type: Type.FETCH_MOVIE_DATA_SUCCESS,
			results: json.results,
			receivedAt: Date.now()
		}
	},

	fetchMovieDataReduxFailure: () => {
		return {
			type: Type.FETCH_MOVIE_DATA_FAILURE
		}
	},

	fetchMovieDataRedux: () => {
		return dispatch => {
			dispatch(Action.fetchMovieDataReduxRequest())
			return fetch('https://api.themoviedb.org/3/keyword/180547-marvel-cinematic-universe/movies?api_key=f7b1557a908d86ec205d705bf4d509fb&region=US')
				.then(res => res.json())
				.then(json => dispatch(Action.fetchMovieDataReduxSuccess(json)))
		}
	}
}

export { Type, Action };