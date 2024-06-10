import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

import React, { useState } from 'react'
import { Book } from "../services/BooksAPI.types";

interface BooksProps {
	books: Book[]
}

type SortKeys = keyof Book

const BSBooktable: React.FC<BooksProps> = ( {books} ) => {
	const [sortKey, setSortKey] = useState<string | null>(null)
	const [sortAscending, setSortAscending] = useState(true)
	const [sortedInfo, setSortedInfo] = useState<Book[] | null>(null)

	const sortBy = (key: SortKeys) => {
	// 1. If we don't already sort by this key, sort by this key
		console.log("this is the key", key);
		if(sortKey === key) {
			const reverseSort = [...books].sort((a, b) => b.title.localeCompare(a.title));
			setSortAscending(true)
			setSortedInfo(reverseSort);
			console.log("Descending", reverseSort);

		} else {
			setSortKey(key)

			// 2. If we already sort by this key, reverse the order

			// 3. If we already sort by this key and in reverse order, don't sort'
			const sortedBookByTitle = [...books].sort((a,b) => a.title.localeCompare(b.title));
			setSortAscending(true);
			console.log("Ascendning", sortedBookByTitle);
			setSortedInfo(sortedBookByTitle)
		}
	}

	if(!books.length){
		return <p>No Boooks For ya</p>
	}
	return (
		<Container className="col-10">
		<Table responsive bordered hover>
			<thead>
				<tr>
					<th onClick ={() => sortBy("title")}>Title</th>
					<th onClick={() => sortBy("author")}>Author</th>
					<th onClick={() => sortBy("pages")}>Pages</th>
					<th onClick={() => sortBy("published")}>Published</th>
				</tr>
			</thead>
			<tbody>
				{sortAscending && sortedInfo && sortedInfo.map(title =>
					<tr key={title.id}>
						<td>{title.title}</td>
						<td><Link to={`/authors/${title.authorId}`}>{title.author.name}</Link></td>
						<td className="text-end">{title.pages}</td>
						<td className="text-end">{title.published}</td>
					</tr>)}



				{!sortedInfo && books.map(book =>
					<tr key={book.id}>
						<td>{book.title}</td>
						<td><Link to={`/authors/${book.authorId}`}>{book.author.name}</Link></td>
						<td className="text-end">{book.pages}</td>
						<td className="text-end">{book.published}</td>
					</tr>
				)}
			</tbody>
		</Table>
		</Container>
  	)
}

export default BSBooktable
