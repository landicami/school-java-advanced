import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { SubmitHandler, useForm } from 'react-hook-form'
import { NewBook } from '../../services/BooksAPI.types'
import useCreateBook from '../../hooks/useCreateBook'
import { useEffect } from "react";

interface CreateBookProps{
	authorId: number;
}

const CreateBookForm: React.FC<CreateBookProps> = ({ authorId } ) => {
	const {handleSubmit, register, formState: {errors, isSubmitSuccessful}, reset} = useForm<NewBook>()
	const mutateBook = useCreateBook();

	const onCreateBookSubmit: SubmitHandler<NewBook> = (data) => {
		const newData = { ...data, authorId };
		mutateBook.mutate(newData)
		// mutateBook.mutate(newData, {
		// 	onSuccess: () => {
		// 		reset();
		// 	}
		// })


	}

	useEffect(()=> {
		reset();
	},[isSubmitSuccessful, reset])

	return (
		<Form onSubmit={handleSubmit(onCreateBookSubmit)}>
			<Form.Group controlId='title'>
				<Form.Label>Book title</Form.Label>
				<Form.Control
					placeholder='Write a book title'
					type="text"
					{...register("title", {required: true, minLength: 3})}
				/>
				{errors.title && <span>This field is required and have at least tre chars.</span>}

			</Form.Group>

			<Form.Group className='mt-2' controlId='pages'>
				<Form.Label>Book pages</Form.Label>
				<Form.Control
					placeholder='Fill in how many pages the book has'
					type="number"
					{...register("pages", {required: true, minLength: 1})}
				/>
				{errors.pages && <span>This field is required and have at least 1 char.</span>}

			</Form.Group>

			<Form.Group className='mt-2' controlId='published'>
				<Form.Label>Published this year (xxxx)</Form.Label>
				<Form.Control
					placeholder='Published'
					type="number"
					{...register("published", {required: true, minLength: 1})}
				/>
				{errors.published && <span>This field is required and have at least 1 char.</span>}

			</Form.Group>

			<div className="mt-2 d-flex justify-content-end">
				<Button variant="success" type="submit" disabled={mutateBook.isPending}>
					Create
				</Button>
			</div>
		</Form>
  )
}

export default CreateBookForm
