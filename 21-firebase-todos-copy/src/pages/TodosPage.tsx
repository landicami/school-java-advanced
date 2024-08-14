import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import AddNewTodoForm from "../components/AddNewTodoForm";
import AutoDismissingAlert from "../components/AutoDismissingAlert";
import TodoCounter from "../components/TodoCounter";
import useStatusLocation from "../hooks/useStatusLocation";
import { NewTodo } from "../types/Todo.types";
// import { databas, todosCol } from "../services/firebase";
import { useEffect } from "react";
// import { CollectionReference, collection,getDocs } from "firebase/firestore";
import useGetTodos from "../hooks/useGetTodos";
import { newTodosCol, todosCol } from "../services/firebase";
import { Timestamp, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

function TodosPage() {
	const location = useStatusLocation();

	const { getData: getTodos, data: todos } = useGetTodos();

	useEffect(() => {
		getTodos();
	}, []);

	// Create a new todo in the API
	const addTodo = async (todo: NewTodo) => {
		// 👻
		console.log("Would add a new todo:", todo);
		const docRef = doc(newTodosCol);
		await setDoc(docRef, { ...todo, completed: todo.completed ?? false, timestamp: serverTimestamp() });

		toast.success("That's added");
	};

	const formatTimestamp = (timestamp?: Timestamp): string => {
		if (!timestamp) {
			return "No timestamp available";
		}

		// Konvertera Timestamp till Date
		const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);

		// Formatera till en läsbar sträng
		return date.toLocaleString();
	};

	return (
		<>
			<div className="d-flex justify-content-between align-items-start">
				<h1 className="mb-3">Todos</h1>
				<Button variant="primary" onClick={() => getTodos()}>
					Reload
				</Button>
			</div>

			{location.state && location.state.status && (
				<AutoDismissingAlert hideAfter={1000} variant={location.state.status.type}>
					{location.state.status.message}
				</AutoDismissingAlert>
			)}

			<AddNewTodoForm onAddTodo={addTodo} />

			{todos && todos.length > 0 && (
				<>
					<ListGroup className="todolist">
						{todos.map((todo) => (
							<ListGroup.Item
								action
								as={Link}
								className={todo.completed ? "done" : ""}
								key={todo._id}
								to={`/todos/${todo._id}`}
							>
								<span className="todo-title">{todo.title}</span>
								<span className="timestamp">{formatTimestamp(todo.timestamp)}</span>
							</ListGroup.Item>
						))}
					</ListGroup>

					<TodoCounter finished={todos.filter((todo) => todo.completed).length} total={todos.length} />
				</>
			)}

			{todos && !todos.length && <div className="alert alert-success">You ain't got no todos 🤩!</div>}
		</>
	);
}

export default TodosPage;
