import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { deleteTodo, getTodo, getTodos, updateTodo } from "../services/TodosAPI";
import ConfirmationModal from "../components/ConfirmationModal";
import AutoDismissingAlert from "../components/AutoDismissingAlert";
import { Todo } from "../services/TodosAPI.types";

const TodoPage = () => {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { id } = useParams();
	const todoId = Number(id);
	const location = useLocation();
	const navigate = useNavigate();

	const [queryEnable, setQueryEnable ] = useState(true)
	//state för att inte återhämta den deleteade datan

	const queryClient = useQueryClient();

	const prefetchTodos = async () => {
		// The results of this query will be cached like a normal query
		await queryClient.prefetchQuery({
		  queryKey: ['todos'],
		  queryFn: getTodos,
		  staleTime: 0, //always prefetch even if existing data isnt stale
		})
	  };

	const {
		data: todo,
		error,
		isError,
		isLoading,
		isSuccess,
	} = useQuery({
		queryKey: ["todo", { id: todoId }],
		queryFn: () => getTodo(todoId),
		enabled: queryEnable
	});

	const deleteTodoMutation = useMutation({
		mutationFn: () => deleteTodo(todoId),
		onSuccess: () => {
			setQueryEnable(false);
			prefetchTodos();
			queryClient.removeQueries({queryKey: ["todos", { id: todoId}]});
			queryClient.setQueryData<Todo[]>(["todos"], (oldTodos = []) => {

				const newTodos = oldTodos.filter(todo => todo.id !== todoId);
				return newTodos;
			});
			// queryClient.invalidateQueries({queryKey: ["todos"]})
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

	const updateTodoCompletedMutation = useMutation({
		mutationFn: (completed: boolean) => updateTodo(todoId, { completed }),
		onSuccess: (data) => {
			queryClient.setQueryData(["todo", {id: todoId}], data);
			// queryClient.invalidateQueries({queryKey: ["todos"]})
			prefetchTodos();
		}
	});

	if (isLoading) {
		return <p>Loading...</p>
	}

	if (isError) {
		return (
			<Alert variant="warning">{error.message}</Alert>
		)
	}

	return isSuccess && (
		<>
			<h1 title={`Todo #${todo.id}`}>{todo.title}</h1>

			{location.state && location.state.status && (
				<AutoDismissingAlert
					hideAfter={1000}
					variant={location.state.status.type}
				>
					{location.state.status.message}
				</AutoDismissingAlert>
			)}

			<p>
				<strong>Status:</strong> {todo.completed
					? <span className="completed">Completed</span>
					: <span className="not-completed">Not completed</span> }
			</p>

			<div className="buttons mb-3">
				<Button
					disabled={updateTodoCompletedMutation.isPending || deleteTodoMutation.isPending}
					onClick={() => updateTodoCompletedMutation.mutate(!todo.completed)}
					variant="success"
				>Toggle</Button>

				<Link to={`/todos/${todoId}/edit`} className="btn btn-warning" role="button">Edit</Link>

				<Button
					disabled={deleteTodoMutation.isPending}
					onClick={() => setShowDeleteModal(true)}
					variant="danger"
				>Delete</Button>
				<ConfirmationModal
					onCancel={() => setShowDeleteModal(false)}
					onConfirm={deleteTodoMutation.mutate}
					show={showDeleteModal}
					title="Confirm delete"
					variant="danger"
				>
					Delete todo "{todo.title}"?
				</ConfirmationModal>
			</div>

			<Link to="/todos" className="btn btn-secondary" role="button">
				&laquo; All todos
			</Link>
		</>
	)
}

export default TodoPage;
