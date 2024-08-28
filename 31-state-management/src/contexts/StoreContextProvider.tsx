import { createContext, PropsWithChildren, Reducer, useReducer } from "react";
import { initialState, PointsAction, pointsReducer, PointsState } from "../reducers/pointsReducer";

interface StoreContextType {
	state: PointsState;
	dispatch: React.Dispatch<PointsAction>;
}

// Create the store context
export const StoreContext = createContext<StoreContextType | null>(null);

const StoreContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer<Reducer<PointsState, PointsAction>>(pointsReducer, initialState);

	return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
};

export default StoreContextProvider;
