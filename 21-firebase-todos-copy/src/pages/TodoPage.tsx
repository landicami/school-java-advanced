import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Link, useParams } from "react-router-dom";
import ConfirmationModal from "../components/ConfirmationModal";
import AutoDismissingAlert from "../components/AutoDismissingAlert";
import useStatusLocation from "../hooks/useStatusLocation";
// import { Todo } from "../types/Todo.types";
// import { CollectionReference, collection, doc, getDoc, getDocs } from "firebase/firestore";
// import { databas, todosCol } from "../services/firebase";
import useGetTodo from "../hooks/useGetTodo";


const TodoPage = () => {
	// const [todo, setTodo]= useState<Todo | null>(null);
	// const [error, setError] = useState(false);
	// const [loading, setLoading] = useState(true);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { id } = useParams();
	const todoId = id;
	const location = useStatusLocation();


	const getTodo = useGetTodo(todoId!);

	// const getTodo = async () => {
	// 	setError(false);
	// 	setLoading(true);
	// 	setTodo(null)

	// 	const docRef = doc(todosCol, todoId)
	// 	const docSnapshot = await getDoc(docRef)


	// 	if(!docSnapshot.exists()) {
	// 		setTodo(null);
	// 		setError(true);
	// 		setLoading(false);
	// 		return;
	// 	}

	// 	const data = {
	// 		...docSnapshot.data(),
	// 		_id: docSnapshot.id

	// }

	// 	setTodo(data);
	// 	setLoading(false)
	// }

	useEffect(()=> {
		getTodo.getTodo();

	}, [todoId]);

	if (getTodo.error) {
		return <p>Ooops, bad stuff happend. Try again later?</p>
	}

	if (getTodo.loading || !getTodo.todo) {
		return <p>Loading...</p>
	}

	return (
		<>
			<h1 title={`Todo #${getTodo.todoId}`}>{getTodo.todo.title}</h1>

			{location.state && location.state.status && (
				<AutoDismissingAlert hideAfter={1000} variant={location.state.status.type}>
					{location.state.status.message}
				</AutoDismissingAlert>
			)}

			<p>
				<strong>Status:</strong>{" "}
				{getTodo.todo.completed ? (
					<span className="completed">Completed</span>
				) : (
					<span className="not-completed">Not completed</span>
				)}
			</p>

			<div className="buttons mb-3">
				<Button onClick={() => console.log("Would toggle todo")} variant="success">
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
				onConfirm={() => console.log("Would delete todo with id:", todoId)}
				show={showDeleteModal}
				title="Confirm delete"
				variant="danger"
			>
				Delete todo "{getTodo.todo.title}"?
			</ConfirmationModal>

			<Link to="/todos" className="btn btn-secondary" role="button">
				&laquo; All todos
			</Link>
		</>
	);
};

export default TodoPage;
