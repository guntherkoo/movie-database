import { Type } from '../actions';

// REDUCERS
export default function reducer(state = {}, action) {
	switch (action.type) {
		case Type.TOGGLE:
			return Object.assign({}, state, {
				tap: !state.tap
			});

		case 'FETCH_MOVIE_DATA_SUCCESS':
			return Object.assign({}, state, {
				movie_list : action.payload.results
			});

		default:
			return state
	}
}