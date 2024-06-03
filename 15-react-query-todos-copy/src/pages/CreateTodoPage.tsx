import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import { Link, useNavigate } from "react-router-dom";
import AddNewTodoForm from "../components/AddNewTodoForm"
import * as TodosAPI from "../services/TodosAPI";
import { NewTodo, Todo } from "../services/TodosAPI.types";
import { useMutation } from "@tanstack/react-query";

const CreateTodoPage = () => {
	// const [createdTodo, setCreatedTodo] = useState<Todo | null>(null);
	// const [error, setError] = useState<string | false>(false);
	const navigate = useNavigate();

	const mutation = useMutation({
		mutationFn: (todo: NewTodo) => TodosAPI.createTodo(todo)
	})

	const addTodo = async (todo: NewTodo) => {
		mutation.mutate(todo)
		setTimeout(()=> {
			navigate("/todos")
		},2000)

	}

	return (
		<>
			<h1>Create a new Todo</h1>

			{mutation.error && <Alert variant="warning">{mutation.error.message}</Alert>}

			<AddNewTodoForm
				onAddTodo={addTodo}
			/>

			{mutation.data && (
				<Alert variant="success">
					<h2 className="h5">Created todo successfully</h2>
					<p>Redirecting back to all todos in 2 seconds...</p>

					<Link to={`/todos/${mutation.data.id}`} className="btn btn-success" role="button">
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
