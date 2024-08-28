import { Reducer, useReducer } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

enum PointsActionTypes {
	DECREMENT = "decrement",
	INCREMENT = "increment",
	RESET = "reset",
}

interface PointsAction {
	type: PointsActionTypes;
	antal?: number;
}

interface PointsState {
	points: number;
	game: string;
}

const initialState: PointsState = {
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
const pointsReducer = (state: PointsState, action: PointsAction) => {
	// state == current state
	// action = { type: "increment" } | { type: "decrement" }

	switch (action.type) {
		case PointsActionTypes.DECREMENT:
			return {
				...state,
				points: state.points - action.antal!,
			};

		case PointsActionTypes.INCREMENT:
			return {
				...state,
				points: state.points + action.antal!,
			};
		case PointsActionTypes.RESET:
			return { ...state, points: initialState.points };

		default:
			console.error("Unknown action:", action);
			throw new Error(`Unknown action: ${action.type}`);
	}
};

// Action Creator for decreasing points
const decreasePoints = (amount: number) => {
	return { type: PointsActionTypes.DECREMENT, antal: amount };
};

// Action Creator for increasing points
const increasePoints = (amount: number) => {
	return { type: PointsActionTypes.INCREMENT, antal: amount };
};

const resetPoints = () => {
	return { type: PointsActionTypes.RESET };
};

const ReducerCounter = () => {
	const [state, dispatch] = useReducer<Reducer<PointsState, PointsAction>>(pointsReducer, initialState);

	return (
		<div className="counter">
			{/* Decrease points */}
			<ButtonGroup>
				<Button onClick={() => dispatch(decreasePoints(10))} variant="warning">
					-10
				</Button>
				<Button onClick={() => dispatch(decreasePoints(5))} variant="warning">
					-5
				</Button>
				<Button onClick={() => dispatch(decreasePoints(1))} variant="warning">
					-
				</Button>
			</ButtonGroup>

			{/* Current points */}
			<span className="points">{state.points}</span>

			{/* Increase points */}
			<ButtonGroup>
				<Button onClick={() => dispatch(increasePoints(1))} variant="success">
					+
				</Button>
				<Button onClick={() => dispatch(increasePoints(5))} variant="success">
					+5
				</Button>
				<Button onClick={() => dispatch(increasePoints(10))} variant="success">
					+10
				</Button>
			</ButtonGroup>

			{/* Reset state */}
			<Button className="ms-3" onClick={() => dispatch(resetPoints())} variant="danger">
				<span role="img" aria-description="broom">
					🧹
				</span>
			</Button>
		</div>
	);
};

export default ReducerCounter;
