import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import * as TodosAPI from "../services/TodosAPI";
import { Todo } from "../services/TodosAPI.types";
import { useQuery } from "@tanstack/react-query";

const EditTodoPage = () => {
	// const [error, setError] = useState<string | false>(false);
	// const [isLoading, setIsLoading] = useState(true);
	// const [todo, setTodo] = useState<Todo | null>(null);
	const [inputNewTodoTitle, setInputNewTodoTitle] = useState("");
	const { id } = useParams();
	const todoId = Number(id);
	const navigate = useNavigate();


	const todo = useQuery({
		queryKey: ["todo", todoId],
		queryFn: () => TodosAPI.getTodo(todoId),
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!todo.data) {
			return;
		}

		// Call TodosAPI and update the todo
		await TodosAPI.updateTodo(todo.data?.id, {
			title: inputNewTodoTitle,
		});

		// Redirect user to /todos/:id
		navigate(`/todos/${todo.data?.id}`, {
			state: {
				status: {
					message: `Todo "${todo.data?.title}" was deleted`,
					type: "success",
				}
			}
		});
	}

	useEffect(() => {
		TodosAPI.getTodo(todoId);
	}, [todoId]);

	if (todo.error) {
		return (
			<Alert variant="warning">
				<h1>Something went wrong!</h1>
				<p>{todo.error.message}</p>

				<Button variant="primary" onClick={() => TodosAPI.getTodo(todoId)}>TRY HARDER!!!</Button>
			</Alert>
		)
	}

	if (todo.isFetching || !todo) {
		return <p>Loading...</p>
	}

	return (
		<>
			<h1 title={`Todo #${todo.data?.id}`}>Edit: {todo.data?.title}</h1>

			<Form onSubmit={handleSubmit} className="mb-3">
				<Form.Group className="mb-3" controlId="title">
					<Form.Label>Title</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter the new title"
						onChange={e => setInputNewTodoTitle(e.target.value)}
						value={inputNewTodoTitle}
					/>
				</Form.Group>

				<Button variant="primary" type="submit">
					Save
				</Button>
			</Form>

			<Button variant="secondary" onClick={() => navigate(-1)}>
				&laquo; Go back
			</Button>
		</>
	)
}

export default EditTodoPage;
