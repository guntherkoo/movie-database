// ACTIONS
export const actionTypes = {
	TOGGLE: 'TOGGLE',
	INCREMENT: 'INCREMENT',
	DECREMENT: 'DECREMENT'
}

export const toggleTap = () => {
	return { type: actionTypes.TOGGLE }
}

export const incrementCount = () => {
	return { type: actionTypes.INCREMENT }
}

export const decrementCount = () => {
	return { type: actionTypes.DECREMENT }
}