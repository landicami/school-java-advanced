import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { TodoFormData } from '../types/Todo.types';
import { SubmitHandler, useForm } from 'react-hook-form';

interface AddNewTodoFormProps {
	onAddTodo: (todo: TodoFormData) => void;
}

const AddNewTodoForm: React.FC<AddNewTodoFormProps> = ({ onAddTodo }) => {
	const { handleSubmit, register, reset, formState: { errors, isSubmitSuccessful } } = useForm<TodoFormData>();

	const onFormSubmit: SubmitHandler<TodoFormData> = (data) => {
		console.log("Yay form passed validation", data);
		// Pass form data along to parent component
		onAddTodo(data);
	}

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
							message: "That's too short to be a todo, better do it right now!",
						},
					})}
				/>

				<Button
					variant="success"
					type="submit"
				>👶🏻</Button>
			</InputGroup>

			{errors.title && <p className="invalid">{errors.title.message ?? "Invalid value"}</p>}
		</Form>
	)
}

export default AddNewTodoForm
