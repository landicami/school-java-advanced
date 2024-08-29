import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "./Todo.types";
import { dummyTodos } from "../../data/todos";

// const initialState: Todo[] = [];
const initialState = dummyTodos;

export const todosSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {
		add: (state, action: PayloadAction<Todo>) => {
			state.push(action.payload);
		},
		remove: (state, action: PayloadAction<string>) => {
			return state.filter((todo) => todo.id !== action.payload);
		},
		toggle: (state, action: PayloadAction<string>) => {
			const todo = state.find((todo) => todo.id === action.payload);
			if (todo) {
				todo.completed = !todo.completed;
			}
		},
	},
});

// Action creators are generated for each reducer function
export const { add, remove, toggle } = todosSlice.actions;

// Export the reducer
export default todosSlice.reducer;
