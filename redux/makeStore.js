import { 
	createStore,
	applyMiddleware,
	compose,
	combineReducers 
} from 'redux';

import { apiMiddleware } from 'redux-api-middleware';
import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from './reducers';

export default function initializeStore(initial_state = {}) {

	initial_state = { tap: false }

	return createStore(
		reducer,
		initial_state,
		composeWithDevTools(applyMiddleware(apiMiddleware))
	)
}