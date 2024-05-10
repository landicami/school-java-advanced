import { useEffect, useState } from "react";
import AddNewTodoForm from "../src/components/AddNewTodoForm";
import TodoCounter from "../src/components/TodoCounter";
import * as TodosAPI from "../src/services/TodosAPI";
import { NewTodo, Todo } from "../src/types/Todo";
import  ListGroup  from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";

function TodosPage() {
	const [todos, setTodos] = useState<Todo[]>([]);

	// One of two use-cases for useRef - save a value between renders without triggering a re-render
	/*
	const renderCountRef = useRef(0);
	renderCountRef.current++;
	console.log("I have rendered this many times:", renderCountRef.current);
	*/

	const addTodo = async (todo: NewTodo) => {
		// const newTodo = await TodosAPI.createTodo(todo);
		// setTodos([...todos, newTodo]);
		await TodosAPI.createTodo(todo);
		getTodos();
	}

	const getTodos = async () => {
		setTodos([]);

		// make request to api
		const data = await TodosAPI.getTodos();

		setTodos(data);
	}
// ska flyttas till en annan sida
	// const handleDeleteTodo = async (todo: Todo) => {
	// 	await TodosAPI.deleteTodo(todo.id);
	// 	getTodos();
	// }

	// const handleToggleTodo = async (todo: Todo) => {
	// 	await TodosAPI.updateTodo(todo.id, {
	// 		completed: !todo.completed,
	// 	});
	// 	getTodos();
	// }

	const finishedTodos = todos.filter(todo => todo.completed);

	console.log("Component is rendering");

	useEffect(() => {
		getTodos();
	}, []);

	return (
		<>
			<h1>Todos</h1>

			<AddNewTodoForm
				onAddTodo={addTodo}
			/>

			{todos.length > 0 && (
				<>
					<ListGroup className="todolist">
						{todos.map(todo => (
							<ListGroup.Item
								action
								as={Link}
								key={todo.id}
								className={todo.completed ? "done" : ""}
								to={`/todos/${todo.id}`}
							>
								<span className="todo-title">{todo.title}</span>
							</ListGroup.Item>
						))}
					</ListGroup>

					<TodoCounter finished={finishedTodos.length} total={todos.length} />
				</>
			)}

			{!todos.length && (
				<div className="alert alert-success">You ain't got no todos 🤩!</div>
			)}
		</>
	);
}

export default TodosPage;
