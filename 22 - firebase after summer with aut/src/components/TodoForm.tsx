import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { SubmitHandler, useForm } from "react-hook-form";
import { TodoFormData } from "../types/Todo.types";

interface TodoFormProps {
	initialValues?: TodoFormData;
	onSave: (data: TodoFormData) => Promise<void>;
}

const TodoForm: React.FC<TodoFormProps> = ({ initialValues, onSave }) => {
	const { handleSubmit, register, reset, formState: { errors, isSubmitSuccessful } } = useForm<TodoFormData>({
		defaultValues: {
			...initialValues,
			completed: initialValues?.completed ?? false,
		},
	});

	const onFormSubmit: SubmitHandler<TodoFormData> = (data) => {
		console.log("Yay form passed validation", data);
		// Pass form data along to parent component
		onSave(data);
	}

	// Reset form when submit is successful
	if (isSubmitSuccessful) {
		reset();
	}

	return (
		<Form onSubmit={handleSubmit(onFormSubmit)} className="mb-3">
			<Form.Group className="mb-3" controlId="title">
				<Form.Label>Title</Form.Label>
				<Form.Control
					type="text"
					{...register("title", {
						required: "You have to write at least something...",
						minLength: {
							value: 5,
							message: "That's too short to be a todo, better do it right now!",
						},
					})}
				/>
				{errors.title && <p className="invalid">{errors.title.message ?? "Invalid title value"}</p>}
			</Form.Group>

			<Form.Group className="mb-3" controlId="completed">
				<Form.Label>Completed</Form.Label>
				<Form.Check
					type="checkbox"
					{...register("completed")}
				/>
				{errors.completed && <p className="invalid">{errors.completed.message ?? "Invalid completed value"}</p>}
			</Form.Group>

			<Button variant="success" type="submit">
				Save
			</Button>
		</Form>
	)
}

export default TodoForm;
