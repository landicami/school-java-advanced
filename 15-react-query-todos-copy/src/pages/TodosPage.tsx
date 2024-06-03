import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";
import { Link, useLocation } from "react-router-dom";
import AutoDismissingAlert from "../components/AutoDismissingAlert";
import TodoCounter from "../components/TodoCounter";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTodos } from "../services/TodosAPI";
import { useEffect } from "react";

function TodosPage() {
	const location = useLocation();
	// Get QueryClient from the context
	const queryClient = useQueryClient()

	queryClient.invalidateQueries({ queryKey: ['todos'] })

	const todos = useQuery({
		queryKey: ["todos"],
		queryFn: getTodos,
	})

// 	useEffect(()=> {
// 		todos.refetch()
// },[])



	return (
		<>
			<h1>Todos</h1>

			{location.state && location.state.status && (
				<AutoDismissingAlert
					hideAfter={1000}
					variant={location.state.status.type}
				>
					{location.state.status.message}
				</AutoDismissingAlert>
			)}

			{todos.isError && <Alert>{todos.error.message}</Alert>}

			{todos.data && todos.data.length > 0 && (
				<>
					<ListGroup className="todolist">
						{todos.data.map(todo => (
							<ListGroup.Item
								action
								as={Link}
								className={todo.completed ? "done" : ""}
								key={todo.id}
								to={`/todos/${todo.id}`}
							>
								<span className="todo-title">{todo.title}</span>
							</ListGroup.Item>
						))}
					</ListGroup>

					<TodoCounter finished={todos.data.filter(todo => todo.completed).length} total={todos.data.length} />
				</>
			)}

			{todos.data && !todos.data.length && (
				<div className="alert alert-success">You ain't got no todos 🤩!</div>
			)}
		</>
	);
}

export default TodosPage;
