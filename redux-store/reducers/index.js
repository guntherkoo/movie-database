import { Type } from '../actions';
import { api_img_url } from 'lib/api-config';
import { getColorFromURL } from 'color-thief-node';

const getColor = async (img) => {
	try {
		const dominantColor = await getColorFromURL(img);
		return dominantColor;
	} catch (error) {
		console.log(error)
	}
}

const handleFetchMovieDataSuccess = (state, action) => {
	const data = action.results;

	if (data.backdrop_path) {
		const img = `https:${api_img_url}w500${data.backdrop_path}`;
		const color = getColor(img);

		console.log(color)

		return Object.assign({}, state, {
			color: color,
			data: action.results,
		});
	}

	return {
		...state,
		data: action.results,
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