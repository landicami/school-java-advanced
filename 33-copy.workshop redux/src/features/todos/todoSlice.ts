import { Todo } from "./Todo.types";
import { dummyTodos } from "../../data/todos";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
	name: "todos",
	initialState: dummyTodos,
	reducers: {
		add: (state, action: PayloadAction<Todo>) => {
			state.push({
				id: action.payload.id,
				title: action.payload.title,
				completed: false,
			});
		},
		toggle: (state, action: PayloadAction<string>) => {
			const todo = state.find((todo) => todo.id === action.payload);
			if (!todo) {
				return;
			}
			todo.completed = !todo?.completed;
		},
		remove: (state, action: PayloadAction<string>) => {
			return state.filter((todo) => todo.id !== action.payload);
		},
	},
});

export const { add, toggle, remove } = todoSlice.actions;
export default todoSlice.reducer;
