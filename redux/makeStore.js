import { 
	createStore,
	applyMiddleware,
	combineReducers 
} from 'redux';

import 'isomorphic-unfetch';
import thunk from 'redux-thunk'
import { apiMiddleware } from 'redux-api-middleware';
import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from './reducers';

export default function initializeStore(initial_state = {}) {


	const middlewares = [thunk, apiMiddleware];

	const createStoreWithMiddleware = composeWithDevTools(applyMiddleware(thunk, apiMiddleware))(createStore);

	// return createStore(
	// 	reducer,
	// 	initial_state,
	// 	composeWithDevTools(applyMiddleware(apiMiddleware))
	// )

	const store = createStoreWithMiddleware(reducer, initial_state);

	return store;
}