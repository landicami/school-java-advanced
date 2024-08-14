import { useEffect, useRef, useState } from "react";
import { NewTodo, TodoFormData } from "../types/Todo.types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { SubmitHandler, useForm } from "react-hook-form";

interface AddNewTodoFormProps {
	onAddTodo: (todo: NewTodo) => void;
}

const AddNewTodoForm: React.FC<AddNewTodoFormProps> = ({ onAddTodo }) => {
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors, isSubmitSuccessful },
	} = useForm<TodoFormData>();

	const onFormSubmit: SubmitHandler<TodoFormData> = (data) => {
		onAddTodo(data);
	};
	// Reset form when successfully created a todo
	if (isSubmitSuccessful) {
		reset();
	}
	return (
		<Form onSubmit={handleSubmit(onFormSubmit)} className="mb-3">
			<InputGroup>
				<Form.Control
					type="text"
					className="form-control"
					aria-label="The title of the new todo"
					{...register("title", {
						required: true,
						minLength: {
							value: 5,
							message: "MOAR CHARACHTERS at least five",
						},
					})}
				/>

				<Button variant="success" type="submit">
					👶🏻
				</Button>
			</InputGroup>

			{errors.title && (
				<div className="form-text text-danger">{errors.title.message ?? "Please enter some chars or more"}</div>
			)}
		</Form>
	);
};

export default AddNewTodoForm;
