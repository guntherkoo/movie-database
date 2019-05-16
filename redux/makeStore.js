import { 
	createStore,
	applyMiddleware,
	combineReducers 
} from 'redux';

// import { apiMiddleware } from 'redux-api-middleware';
import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from './reducers';

export default function initializeStore(initial_state = {}) {

	const createStoreWithMiddleware = composeWithDevTools(applyMiddleware())(createStore);

	initial_state = { tap: false }

	// return createStore(
	// 	reducer,
	// 	initial_state,
	// 	composeWithDevTools(applyMiddleware(apiMiddleware))
	// )

	const store = createStoreWithMiddleware(reducer, initial_state);

	return store;
}