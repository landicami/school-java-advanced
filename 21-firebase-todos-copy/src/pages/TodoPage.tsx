import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import ConfirmationModal from "../components/ConfirmationModal";
import AutoDismissingAlert from "../components/AutoDismissingAlert";
import useStatusLocation from "../hooks/useStatusLocation";
// import { Todo } from "../types/Todo.types";
// import { CollectionReference, collection, doc, getDoc, getDocs } from "firebase/firestore";
// import { databas, todosCol } from "../services/firebase";
import useGetTodo from "../hooks/useGetTodo";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { todosCol } from "../services/firebase";
import { toast } from "react-toastify";

const TodoPage = () => {
	// const [todo, setTodo]= useState<Todo | null>(null);
	// const [error, setError] = useState(false);
	// const [loading, setLoading] = useState(true);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { id } = useParams();
	const todoId = id;
	const location = useStatusLocation();
	const navigate = useNavigate();

	const { getSingleData: getTodo, data: todo, loading, error } = useGetTodo(todoId!);

	const toggleTodo = async (todoId: string) => {
		const todoRef = doc(todosCol, todoId);
		await updateDoc(todoRef, {
			completed: !todo?.completed,
		});
		console.log(todoRef);
		getTodo();
	};

	const deleteTodo = async (todoId: string) => {
		const todoRef = doc(todosCol, todoId);
		await deleteDoc(todoRef);
		toast.success("Yay you deleted, going back in two");

		setTimeout(() => {
			navigate("/todos");
		}, 2000);
	};

	useEffect(() => {
		getTodo();
	}, [todoId]);

	if (error) {
		return <p>Ooops, bad stuff happend. Try again later?</p>;
	}

	if (loading || !todo) {
		return <p>Loading...</p>;
	}

	return (
		<>
			<h1 title={`Todo #${todoId}`}>{todo.title}</h1>

			{location.state && location.state.status && (
				<AutoDismissingAlert hideAfter={1000} variant={location.state.status.type}>
					{location.state.status.message}
				</AutoDismissingAlert>
			)}

			<p>
				<strong>Status:</strong>{" "}
				{todo.completed ? (
					<span className="completed">Completed</span>
				) : (
					<span className="not-completed">Not completed</span>
				)}
			</p>

			<div className="buttons mb-3">
				<Button onClick={() => toggleTodo(todoId!)} variant="success">
					Toggle
				</Button>

				<Link to={`/todos/${todoId}/edit`} className="btn btn-warning" role="button">
					Edit
				</Link>

				<Button onClick={() => setShowDeleteModal(true)} variant="danger">
					Delete
				</Button>
			</div>

			<ConfirmationModal
				onCancel={() => setShowDeleteModal(false)}
				onConfirm={() => deleteTodo(todoId!)}
				show={showDeleteModal}
				title="Confirm delete"
				variant="danger"
			>
				Delete todo "{todo.title}"?
			</ConfirmationModal>

			<Link to="/todos" className="btn btn-secondary" role="button">
				&laquo; All todos
			</Link>
		</>
	);
};

export default TodoPage;
