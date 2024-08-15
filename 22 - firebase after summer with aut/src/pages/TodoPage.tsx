import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link, useNavigate, useParams } from "react-router-dom";
import ConfirmationModal from "../components/ConfirmationModal";
import AutoDismissingAlert from "../components/AutoDismissingAlert";
import useStatusLocation from "../hooks/useStatusLocation";
import useGetTodo from "../hooks/useGetTodo";
import { deleteDoc, doc } from "firebase/firestore";
import { todosCol } from "../services/firebase";
import { toast } from "react-toastify";

const TodoPage = () => {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const navigate = useNavigate();
	const { id } = useParams();
	const { data: todo, error, loading } = useGetTodo(id as string);
	const location = useStatusLocation();

	const handleDelete = async () => {
		// Get a reference to the document to delete
		const docRef = doc(todosCol, id);

		// Delete the document
		await deleteDoc(docRef);

		// 🥂
		toast.success("💣 Todo deleted");

		// Redirect user to todos list
		// and replace the current history entry for this page
		navigate("/todos", {
			replace: true,
		});
	};

	if (error) {
		return <p>Ooops, bad stuff happend. Try again later?</p>;
	}

	if (loading || !todo) {
		return <p>Loading...</p>;
	}

	return (
		<Container className="py-3">
			<h1 title={`Todo #${todo._id}`}>{todo.title}</h1>

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
				<Button onClick={() => console.log("Would toggle todo")} variant="success">
					Toggle
				</Button>

				<Link to={`/todos/${id}/edit`} className="btn btn-warning" role="button">
					Edit
				</Link>

				<Button onClick={() => setShowDeleteModal(true)} variant="danger">
					Delete
				</Button>
			</div>

			<ConfirmationModal
				onCancel={() => setShowDeleteModal(false)}
				onConfirm={handleDelete}
				show={showDeleteModal}
				title="Confirm delete"
				variant="danger"
			>
				Delete todo "{todo.title}"?
			</ConfirmationModal>

			<Link to="/todos" className="btn btn-secondary" role="button">
				&laquo; All todos
			</Link>
		</Container>
	);
};

export default TodoPage;
