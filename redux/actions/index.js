import { 
	api_endpoint_movies, 
	api_endpoint_keyword, 
	api_token, 
	mcu_keyword 
} from 'lib/api-config';
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

	fetchMovieDataRedux: (status, region) => {
		const endpoint = `${api_endpoint_keyword}${mcu_keyword}?api_key=${api_token}&region=${region}`;

		return dispatch => {
			dispatch(Action.fetchMovieDataReduxRequest())
			return fetch(endpoint)
				.then(res => res.json())
				.then(json => dispatch(Action.fetchMovieDataReduxSuccess(json)))
		}
	}
}

export { Type, Action };