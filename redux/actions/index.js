import { RSAA, getJSON } from 'redux-api-middleware';

// ACTIONS
const Type = {
	TOGGLE : 'TOGGLE',
	FETCH_MOVIE_DATA : 'FETCH_MOVIE_DATA',
}

const Action = {
	toggleTap: () => {
		return { type: Type.TOGGLE }
	},

	fetchMovieDataRedux: () => {
		const endpoint = 'https://api.themoviedb.org/3/keyword/180547-marvel-cinematic-universe/movies?api_key=f7b1557a908d86ec205d705bf4d509fb&region=US';
		
		return {
			[RSAA]: {
				endpoint,
				method: 'GET',
				headers: {},
				types: [
					{
						type: `${Type.FETCH_MOVIE_DATA}_REQUEST`,
					},
					{
						type: `${Type.FETCH_MOVIE_DATA}_SUCCESS`,
						payload: (action, state, res) => {
							return getJSON(res).then(json => json, err => undefined);
						},
						meta: {},
					},
					{
						type: `${Type.FETCH_MOVIE_DATA}_FAILURE`,
						meta: (action, state, res) => {
							if (res) {
								return {
									status: res.status,
									statusText: res.statusText
								};
							}

							return {
								status: 'Network request failed'
							};
						}
					},
				]
			}
		};
	},
}

export { Type, Action };