import { useState } from "react";
import { Todo } from "../types/Todo.types";
import { todosCol } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import useGetDocument from "./useGetDocument";

const useGetTodo = (todoId: string) => {
	const { getSingleData, data, error, loading } = useGetDocument(todosCol, todoId);
	return { getSingleData, todoId, data, error, loading };
};

export default useGetTodo;
