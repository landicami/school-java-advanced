import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { SubmitHandler, useForm } from 'react-hook-form'
import { NewBook } from '../../services/BooksAPI.types'
import useCreateBook from '../../hooks/useCreateBook'
import { useParams } from "react-router-dom";

const currentYear =  new Date().getFullYear();

const CreateAuthorBookForm = () => {
	const {id} = useParams();
	const authorId = Number(id);
	const {handleSubmit, register, formState: {errors}} = useForm<NewBook>()
	const mutateBook = useCreateBook();

	const onCreateBookSubmit: SubmitHandler<NewBook> = (data) => {
		const newData = { ...data, authorId };

		mutateBook.mutate(newData)

	}
	return (
		<Form onSubmit={handleSubmit(onCreateBookSubmit)}>
			<Form.Group controlId='title'>
				<Form.Label>Book title</Form.Label>
				<Form.Control
					placeholder='Write a book title'
					type="text"
					{...register("title", {required: true, minLength: 3})}
				/>
				{errors.title && <span className="text-danger">This field is required and have at least tre chars.</span>}

			</Form.Group>

			<Form.Group className='mt-2' controlId='pages'>
				<Form.Label>Book pages</Form.Label>
				<Form.Control
					placeholder='Fill in how many pages the book has'
					type="number"
					{...register("pages", {required: true, min: 1})}
				/>
				{errors.pages && <span className="text-danger">Don't use negative numbers.</span>}

			</Form.Group>

			<Form.Group className='mt-2' controlId='published'>
				<Form.Label>Published this year (xxxx)</Form.Label>
				<Form.Control
					placeholder='Published'
					type="number"
					{...register("published", {required: true, min: 1455, max: currentYear})}
				/>
				{errors.published && <span className="text-danger">Year of publication has to be between 1455 and current year</span>}

			</Form.Group>

			<div className="mt-2 d-flex justify-content-end">
				<Button variant="success" type="submit">
					Create
				</Button>
			</div>
		</Form>
  )
}

export default CreateAuthorBookForm
