import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { Todo, TodoFormData } from "../types/Todo.types";
import useGetTodo from "../hooks/useGetTodo";
import { SubmitHandler, useForm } from "react-hook-form";
import { doc, updateDoc } from "firebase/firestore";
import { todosCol } from "../services/firebase";
import { toast } from "react-toastify";

const EditTodoPage = () => {
	const [inputNewTodoTitle, setInputNewTodoTitle] = useState("");
	const { id } = useParams();
	const todoId = id;
	const navigate = useNavigate();
	const { getSingleData: getTodo, data: todo, loading, error } = useGetTodo(todoId!);

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<TodoFormData>();

	const onFormSubmit: SubmitHandler<TodoFormData> = async (data) => {
		const todoRef = doc(todosCol, todoId);
		await updateDoc(todoRef, {
			title: data.title,
		});
		console.log(todoRef);
		getTodo();
		toast.success("Yay you updated, going back in two");

		setTimeout(() => {
			navigate("/todos");
		}, 2000);
	};

	useEffect(() => {
		getTodo();
	}, [todoId]);

	return (
		<>
			{todo && <h1 title={`Todo #${todoId}`}>Edit: {todo.title}</h1>}

			<Form onSubmit={handleSubmit(onFormSubmit)} className="mb-3">
				<Form.Control
					type="text"
					className="form-control"
					aria-label="The title of the new todo"
					placeholder={todo ? todo.title : "Write here"}
					{...register("title", {
						required: true,
						minLength: {
							value: 5,
							message: "MOAR CHARACHTERS at least five",
						},
					})}
				/>

				{errors.title && (
					<div className="form-text text-danger">
						{errors.title.message ?? "Please enter some chars or more"}
					</div>
				)}

				<Button variant="primary" type="submit">
					Save
				</Button>
			</Form>

			<Button variant="secondary" onClick={() => navigate(-1)}>
				&laquo; Go back
			</Button>

			{/* <Form onSubmit={handleSubmit} className="mb-3">
				<Form.Group className="mb-3" controlId="title">
					<Form.Label>Title</Form.Label>
					<Form.Control
						type="text"
						placeholder={todo ? todo.title : "Write here"}
						onChange={(e) => setInputNewTodoTitle(e.target.value)}
						value={inputNewTodoTitle}
					/>
				</Form.Group>

				<Button variant="primary" type="submit">
					Save
				</Button>
			</Form>

			<Button variant="secondary" onClick={() => navigate(-1)}>
				&laquo; Go back
			</Button> */}
		</>
	);
};

export default EditTodoPage;
