import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import  Container  from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { HackerResponse } from "../types/HackerNewstypes";
import { getQuery } from "../services/SearchApi";

const Searchpage = () => {
	const [searchNews, setIsSearchNews] = useState<HackerResponse | null>(null);
	const [error, setError] = useState<string | false>(false);
	const [inputNewSearch, setinputNewSearch] = useState("");
	const [isSearching, setIsSearching ] = useState(false);

	const getNews = async (searchQuery: string) => {
		try {
			const data = await getQuery(searchQuery);
			setIsSearchNews(data);
			console.log("searching for", searchQuery)
			setIsSearching(false);
		} catch (err){
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("ERROR: We've reached an unreachable state. Anything is possible. The limits were in our heads all along. Follow your dreams.");
			}
		}
	}

	const handleSubmit = (e: React.FormEvent) => {
		setIsSearching(true)
		e.preventDefault();
		const search = inputNewSearch;
		getNews(search)
	}


	return (
	<Container>
		<h1>This is where u search</h1>

		<Form onSubmit={handleSubmit} className="form">
			<Form.Group className="mb-3" controlId="formBasicEmail">
				<Form.Label>Search for hacked news</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter your search here"
						onChange={e => setinputNewSearch(e.target.value)}
						value={inputNewSearch}
					/>
						<Form.Text className="text-muted">
							Search for whatever, whenever with Hacker bae.
						</Form.Text>
			</Form.Group>
				<Button variant="primary" type="submit">Search
				</Button>
    	</Form>

		{error && (<p>error</p>)}

		{isSearching && <p>Searching...</p>}

		{searchNews &&
			<>
				<div>
					<h3>This is your queries:</h3>
				</div>
					<Container className="bg-white p-2 rounded">
					{searchNews.hits.map(
					data =>

						<div className="news" key={data.objectID}>
						<a className="link" href={data.url}>{data.title}</a>
						<p> {data.points} points <span className="bold">by</span> {data.author} | {data.created_at}</p>
						</div>
					)}
					</Container>
			</>

		}

	</Container>
  )
}

export default Searchpage
