import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTodo, getTodos } from '../services/TodosAPI';
import { useNavigate } from 'react-router-dom';
import { Todo } from '../services/TodosAPI.types';

const useDeleteTodo = (todoId: number,
	disableQueries: () => void = () => {},
	) => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();


  return useMutation({
	mutationFn: () => deleteTodo(todoId),
	onSuccess: async () => {
		// disable query for this specific single todo
		// setQueryEnabled(false);
		disableQueries();

		// make sure we have ["todos"] in the cache
		await queryClient.prefetchQuery({
			queryKey: ["todos"],
			queryFn: getTodos,
		});

		// remove the current query from the cache
		queryClient.removeQueries({ queryKey: ["todo", { id: todoId }] });

		// construct new data where the deleted todo is removed
		// and set it as the ["todos"] data
		queryClient.setQueryData<Todo[]>(["todos"], (oldTodos) => {
			return oldTodos?.filter(todo => todo.id !== todoId) ?? [];
		});

		// Redirect to "/todos"
		navigate("/todos", {
			replace: true,
			state: {
				status: {
					message: `Todo was deleted`,
					type: "success",
				}
			}
		});
	},
});
}

export default useDeleteTodo
