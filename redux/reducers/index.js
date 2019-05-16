import { Type } from '../actions';

// Handle Movie Data Response
const handleFetchMovieDataSuccess = (state, action) => {
	const results = action.payload.results;

	return Object.assign({}, state, {
		movie_results: results
	})
}

// REDUCERS
export default function reducer(state = {}, action) {
	switch (action.type) {
		case Type.TOGGLE:
			return Object.assign({}, state, {
				tap: !state.tap
			})

		case 'FETCH_MOVIE_DATA_SUCCESS':
			return handleFetchMovieDataSuccess(state, action);

		default:
			return state
	}
}