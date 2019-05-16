
// ACTIONS
const Type = {
	TOGGLE : 'TOGGLE',
}

const Action = {
	toggleTap: () => {
		return { type: Type.TOGGLE }
	},
}

export { Type, Action };