import { RSAA, getJSON } from 'redux-api-middleware';

// ACTIONS
const Type = {
	TOGGLE : 'TOGGLE',
	FETCH_MOVIE_DATA : 'FETCH_MOVIE_DATA'
}

const Action = {
	toggleTap: () => {
		return { type: Type.TOGGLE }
	},

	fetchMovieData: (status, region) => {
		const endpoint = `https://api.themoviedb.org/3/movie/${status}?api_key=f7b1557a908d86ec205d705bf4d509fb&region=${region}`;

		return {
			[RSAA]: {
				endpoint,
				method: 'GET',
				types: [
					{
						type: `${Type.FETCH_MOVIE_DATA}_REQUEST`,
					},
					{
						type: `${Type.FETCH_MOVIE_DATA}_SUCCESS`,
						meta: {
							status,
							region,
						},
						payload: (action, state, res) => {
							const has_content = res.status !== 204;
							return has_content ? getJSON(res).then(json => json, err => undefined) : undefined;
						}
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
	}
}

export { Type, Action };