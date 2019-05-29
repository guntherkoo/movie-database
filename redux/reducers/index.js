import { Type } from '../actions';

const handleFetchMovieDataSuccess = (state, action) => {
	return {
		...state,
		movie_list: action.results,
	}
}

// REDUCERS
export default function reducer(state = {}, action) {
	switch (action.type) {
		case Type.TOGGLE:
			return Object.assign({}, state, {
				tap: !state.tap
			});

		case 'FETCH_MOVIE_DATA_SUCCESS':
			return handleFetchMovieDataSuccess(state, action);

		default:
			return state
	}
}