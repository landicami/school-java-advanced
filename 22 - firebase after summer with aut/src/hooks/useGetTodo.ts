import { todosCol } from "../services/firebase";
import useGetDocument from "./useGetDocument";

const useGetTodo = (todoId: string | undefined) => {
	return useGetDocument(todosCol, todoId);
}

export default useGetTodo;
