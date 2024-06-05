import { useMutation, useQueryClient } from "@tanstack/react-query";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import AddNewTodoForm from "../components/AddNewTodoForm"
import { createTodo, getTodos } from "../services/TodosAPI";
import { Todo } from "../services/TodosAPI.types";

const CreateTodoPage = () => {
	const queryClient = useQueryClient();

	const createTodoMutation = useMutation({
		mutationFn: createTodo,
		onSuccess: async (newTodo) => {
			// get ["todos"] from the cache if it exists and is fresh,
			// otherwise fetch it from the API
			const cachedTodos = await queryClient.fetchQuery({
				queryKey: ["todos"],
				queryFn: getTodos,
			});

			// instead of invalidating the ["todos"] query, we can construct new data
			// based on the previous data + newly created todo from the create Todo request
			// **ONLY** append the new todo if it's not already in the cache
			if (!cachedTodos.find(todo => todo.id === newTodo.id)) {
				queryClient.setQueryData<Todo[]>(["todos"], (oldTodos) => {
					return [
						...oldTodos ?? [],
						newTodo,
					];
				});
			}

			// also insert the new todo into the query cache
			queryClient.setQueryData(["todo", { id: newTodo.id }], newTodo);
		}
	});

	return (
		<>
			<h1>Create a new Todo</h1>

			{createTodoMutation.isError && <Alert variant="warning">{createTodoMutation.error.message}</Alert>}

			<AddNewTodoForm
				onAddTodo={createTodoMutation.mutate}
			/>

			{createTodoMutation.isSuccess && (
				<Alert variant="success">
					<h2 className="h5">Created todo successfully</h2>

					<Link to={`/todos/${createTodoMutation.data.id}`} className="btn btn-success" role="button">
						Go to todo &raquo;
					</Link>
				</Alert>
			)}

			<Link to="/todos" className="btn btn-secondary" role="button">
				&laquo; Back to all todos
			</Link>
		</>
	)
}

export default CreateTodoPage