import { PointsAction, PointsActionTypes } from "../reducers/pointsReducer";

// Action Creator for decreasing points
export const decreasePoints = (amount = 1): PointsAction => {
	return { type: PointsActionTypes.DECREMENT, payload: { amount } };
};

// Action Creator for increasing points
export const increasePoints = (amount = 1): PointsAction => {
	return { type: PointsActionTypes.INCREMENT, payload: { amount } };
};

// Action Creator for resetting points
export const resetPoints = () => {
	return { type: PointsActionTypes.RESET };
};
