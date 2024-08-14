import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AutoDismissingAlert from "../components/AutoDismissingAlert";
import TodoCounter from "../components/TodoCounter";
import TodoForm from "../components/TodoForm";
import { firebaseTimestampToString } from "../helpers/time";
import useGetTodos from "../hooks/useGetTodos";
import useStatusLocation from "../hooks/useStatusLocation";
import { newTodosCol } from "../services/firebase";
import { TodoFormData } from "../types/Todo.types";

function TodosPage() {
	const {
		data: todos,
		getData: getTodos,
		loading,
	} = useGetTodos();
	const location = useStatusLocation();

	// Create a new todo document in the "todos" collection
	const addTodo = async (todo: TodoFormData) => {
		// Add a new document with a generated ID
		const docRef = doc(newTodosCol);

		// Set the contents of the document
		await setDoc(docRef, {
			...todo,
			completed: todo.completed ?? false,
			created_at: serverTimestamp(),
			updated_at: serverTimestamp(),
		});

		// Update list of todos
		await getTodos();

		// 🥂
		toast.success("Yay, even MORE stuff to do... 😬");
	};

	return (
		<>
			<div className="d-flex justify-content-between align-items-start">
				<h1 className="mb-3">Todos</h1>
				<Button variant="primary" onClick={() => getTodos()}>Reload</Button>
			</div>

			{location.state && location.state.status && (
				<AutoDismissingAlert hideAfter={1000} variant={location.state.status.type}>
					{location.state.status.message}
				</AutoDismissingAlert>
			)}

			<TodoForm onSave={addTodo} />

			<hr className="my-4" />

			{loading && <p>Loading...</p>}

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
								<span className="todo-created">{firebaseTimestampToString(todo.created_at)}</span>
							</ListGroup.Item>
						))}
					</ListGroup>

					<TodoCounter
						finished={todos.filter((todo) => todo.completed).length}
						total={todos.length}
					/>
				</>
			)}

			{todos && !todos.length && (
				<div className="alert alert-success">You ain't got no todos 🤩!</div>
			)}
		</>
	);
}

export default TodosPage;
