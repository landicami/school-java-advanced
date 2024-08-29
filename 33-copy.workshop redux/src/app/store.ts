import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../features/account/accountSlice";
// import { accountSlice } from "../features/account/accountSlice";
import todoReducer from "../features/todos/todoSlice";
export const store = configureStore({
	reducer: {
		account: accountReducer,
		// [accountSlice.name]: accountSlice.reducer,
		todos: todoReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
