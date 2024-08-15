import { todosCol } from "../services/firebase";
import useGetDocument from "./useGetDocument";
import useStreamDocument from "./useStreamDocument";

const useGetTodo = (todoId: string | undefined) => {
	return useStreamDocument(todosCol, todoId);
};

export default useGetTodo;
