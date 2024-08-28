export enum PointsActionTypes {
	DECREMENT = "decrement",
	INCREMENT = "increment",
	RESET = "reset",
}

export interface PointsAction {
	type: PointsActionTypes;
	payload?: {
		amount: number;
	};
}

export interface PointsState {
	points: number;
	game: string;
}

export const initialState: PointsState = {
	points: 5,
	game: "Hackers vs n00bs",
};

/**
 * Reduce a new state based on the action and current state
 *
 * @param state Current state
 * @param action Action to take on the state
 * @returns New state
 */
export const pointsReducer = (state: PointsState, action: PointsAction) => {
	// state == current state
	// action = { type: "increment" } | { type: "decrement" }

	switch (action.type) {
		case PointsActionTypes.DECREMENT:
			return {
				...state,
				points: state.points - (action.payload?.amount ?? 1),
			};

		case PointsActionTypes.INCREMENT:
			return {
				...state,
				points: state.points + (action.payload?.amount ?? 1),
			};

		case PointsActionTypes.RESET:
			return {
				...state,
				points: initialState.points,
			};

		default:
			console.error("Unknown action:", action);
			throw new Error(`Unknown action: ${action.type}`);
	}
};
