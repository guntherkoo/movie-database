import { Type } from '../actions';
// import { getColorFromURL } from 'color-thief-node';

// (async () => {
// 	try {
// 		const img = 'https://i2-prod.mirror.co.uk/incoming/article7731571.ece/ALTERNATES/s298/Pokemon-charmander.png';
// 		const dominantColor = await getColorFromURL(img);

// 		console.log(dominantColor, '!!!!!!!!')
// 	} catch (error) {
// 		console.log(error)
// 	}
// })()

const handleFetchMovieDataSuccess = (state, action) => {
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