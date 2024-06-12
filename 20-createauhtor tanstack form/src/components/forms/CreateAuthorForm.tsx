import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useCreateAuthor from "../../hooks/useCreateAuthor";
import { useForm, SubmitHandler } from "react-hook-form";
import { NewAuthor } from "../../services/BooksAPI.types";

const CreateAuthorForm = () => {
	const {handleSubmit, register, formState: { errors} } = useForm<NewAuthor>();
	const mutateAuthor = useCreateAuthor()

	const onCreateAuthorSubmit: SubmitHandler<NewAuthor> = (data) => {
		console.log("Submitted data", data)
		mutateAuthor.mutate(data)
	}

	return (
		<Form onSubmit={handleSubmit(onCreateAuthorSubmit)}>
			<Form.Group className="mb-3" controlId="name">
				<Form.Label>Author Name</Form.Label>
				<Form.Control
					placeholder="Astrid Lindgren"
					type="text"
					{...register("name", {required: true, minLength: 3})}
				/>
				{errors.name && <span>This field is required and have at least tre chars.</span>}

			</Form.Group>

			<Form.Group className="mb-3" controlId="date_of_birth">
				<Form.Label>Date of Birth</Form.Label>
				<Form.Control
					type="date"
					{...register("date_of_birth", {required: true})}
				/>

				{errors.date_of_birth && <span>Choose correct date</span>}
			</Form.Group>

			<div className="d-flex justify-content-end">
				<Button variant="success" type="submit">
					Create
				</Button>
			</div>
		</Form>
	);
};

export default CreateAuthorForm;
