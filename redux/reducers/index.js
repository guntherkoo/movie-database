import { actionTypes } from '../actions';

// REDUCERS
export const reducer = (state = {}, action) => {
	switch (action.type) {
		case actionTypes.TOGGLE:
			return Object.assign({}, state, {
				tap: !state.tap
			})

		case actionTypes.INCREMENT:
			return Object.assign({}, state, {
				count: state.count + 1
			})
			
		case actionTypes.DECREMENT:
			return Object.assign({}, state, {
				count: state.count - 1
			})

		default:
			return state
	}
}