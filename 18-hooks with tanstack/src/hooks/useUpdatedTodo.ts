import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getTodos, updateTodo } from "../services/TodosAPI";
import { Todo } from "../services/TodosAPI.types";

const useUpdatedTodo = (todoId: number) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: Partial<Todo>) => updateTodo(todoId, data),
		onSuccess: async (updatedTodo) => {
			// set the response from the mutation as the query cache for this todo
			queryClient.setQueryData(["todo", { id: todoId }], updatedTodo);

			// prefetch ["todos"] query as it is very likely that the user will
			// return to the list of all todos as their next step
			await queryClient.prefetchQuery({
				queryKey: ["todos"],
				queryFn: getTodos,
				staleTime: 0,   // always prefetch, even if the existing data is considered fresh 🌱
			});


		}
	});
}

export default useUpdatedTodo
