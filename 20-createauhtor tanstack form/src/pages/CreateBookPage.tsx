import React, { useState } from 'react'
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import CreateAuthorBookForm from '../components/forms/CreateAuthorBookForm';
import Dropdown from 'react-bootstrap/Dropdown';
import useAuthors from '../hooks/useAuthors';
import CreateBookForm from '../components/forms/CreateBookForm';


const CreateBookPage = () => {
	const { data: authors, isError, isLoading } = useAuthors();
	const [selectedAuthorId, setSelectedAuthorId] = useState(0);


	const handleAuthor = (id: number) => {
	setSelectedAuthorId(id)
};

  return (
		<Card>
			<Card.Body>
			<Card.Title>Create a new book</Card.Title>


				<Form.Select
				aria-label="Select author breed"
				className="mb-3"
				onChange={(event) => {
					const selectedAuthorId = event.target.value; // Hämta det valda värdet
					if (selectedAuthorId) {
						handleAuthor(Number(selectedAuthorId)); // Anropa handleAuthor med det valda värdet
					}}}
			>
				<option value="">Choose author</option>
				{authors && authors.map(author => (
					<option key={author.id} value={author.id}>{author.name}</option>
				))}
			</Form.Select>

				<CreateBookForm
				authorId={selectedAuthorId} />

			</Card.Body>
		</Card>
	)
}

export default CreateBookPage

{/* <Dropdown onSelect={(eventKey: string | null) => {
				if(eventKey){
					handleAuthor(Number(eventKey))
				}
				console.log(eventKey);
			}}> */}
				{/* <Dropdown.Toggle variant="success" id="dropdown-basic">
					Choose writer to add book too
				</Dropdown.Toggle>

				<Dropdown.Menu>
					{authors && authors.map(author =>
					<Dropdown.Item
					key={author.id}
					eventKey={author.id.toString()}
					>{author.name}</Dropdown.Item>
					)}


				</Dropdown.Menu>
				</Dropdown> */}
