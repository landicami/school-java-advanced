import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Account } from "../../types/Account.types";

const initialState: Account = {
	balance: 666,
};
export const accountSlice = createSlice({
	name: "account",
	initialState,
	reducers: {
		deposit: (state) => {
			state.balance += 1; // state.balance = state.balance + 1
		},
		withdraw: (state) => {
			state.balance -= 1;
		},
		withdrawByAmont: (state, action: PayloadAction<number>) => {
			state.balance -= action.payload;
		},
		depositByAmont: (state, action: PayloadAction<number>) => {
			state.balance += action.payload;
		},
	},
});

export const { deposit, withdraw, withdrawByAmont, depositByAmont } = accountSlice.actions;
export default accountSlice.reducer;
