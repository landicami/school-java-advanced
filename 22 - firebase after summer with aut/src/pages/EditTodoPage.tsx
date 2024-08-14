import { doc, updateDoc } from "firebase/firestore";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import TodoForm from "../components/TodoForm";
import useGetTodo from "../hooks/useGetTodo";
import { todosCol } from "../services/firebase";
import { TodoFormData } from "../types/Todo.types";

const EditTodoPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	// Get todo
	const {
		data: todo,
		getData: getTodo,
		loading,
	} = useGetTodo(id);

	// Updates the todo in Firestore
	const updateTodo = async (data: TodoFormData) => {
		if (!id) {
			return;
		}

		// Update the document in Firestore
		const docRef = doc(todosCol, id);
		await toast.promise(updateDoc(docRef, data), {
			pending: "🤔 Saving todo...",
			success: "🤩 Todo saved 🛟",
			error: "😬 Unable to save todo",
		});

		/*
		toast.promise(async () => {
			await updateDoc(docRef, data);
			await getTodo(id);
			await new Promise(r => setTimeout(r, 1500));
		}, {
			pending: "🤔 Saving todo...",
			success: "🤩 Todo saved 🛟",
			error: "😬 Unable to save todo",
		});
		*/

		// Get the updated todo
		await getTodo(id);
	}

	if (loading || !todo) {
		return <p>Loading...</p>
	}

	return (
		<>
			<h1 title={`Todo #${id}`}>Edit: {todo.title}</h1>

			<TodoForm initialValues={todo} onSave={updateTodo} />

			<Button variant="secondary" onClick={() => navigate(-1)}>
				&laquo; Go back
			</Button>
		</>
	);
};

export default EditTodoPage;
