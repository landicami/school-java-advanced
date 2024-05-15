import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import  Container  from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { HackerResponse } from "../types/HackerNewstypes";
import { getQuery as APIQuery } from "../services/SearchApi";

const Searchpage = () => {
	const [searchNews, setIsSearchNews] = useState<HackerResponse | null>(null);
	const [error, setError] = useState<string | false>(false);
	const [inputNewSearch, setinputNewSearch] = useState("");
	const [isSearching, setIsSearching ] = useState(false);
	const queryRef = useRef("");
	const focusRef = useRef<HTMLInputElement>(null);


	const getNews = async (searchQuery: string) => {
		setError(false); //nollställ error om vi hade något innan!
		setIsSearching(true); //sätt sökning till sant så vi visar Loading
		setIsSearchNews(null); //sätt sökning till null föra tt gömma tidigare resultat

		queryRef.current = searchQuery; //spara ner sökningen i en variabel

		try {
			const data = await APIQuery(searchQuery);
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

		setIsSearching(false);
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const search = inputNewSearch.trim();
		getNews(search)
	}

	useEffect(() => {
		focusRef.current?.focus();
	}, []);


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
						required
						ref={focusRef}

					/>
						<Form.Text className="text-muted">
							Search for whatever, whenever with Hacker bae.
						</Form.Text>
			</Form.Group>
				<Button
				variant="primary"
				type="submit"
				disabled={inputNewSearch.trim().length < 3}>Search
				</Button>
    	</Form>

		{error && (<p>error</p>)}

		{isSearching && <p>Searching...</p>}

		{searchNews &&
			<>
				<div>
					<h3>Here is {searchNews.nbHits} queries for {queryRef.current}</h3>
				</div>
					{searchNews.hits.length > 0 &&
					<Container className="bg-white p-2 mb-3 rounded">
					{searchNews.hits.map(
					data =>

						<div className="news" key={data.objectID}>
						<a className="link" href={data.url}>{data.title}</a>
						<p> {data.points} points <span className="bold">by</span> {data.author} | {data.created_at}</p>
						</div>
					)}
					</Container>}

					<div className="d-flex justify-content-between align-items-center">
						<div className="prev">
							<Button variant="primary">Previous Page</Button>
						</div>

						<div className="page">{searchNews.page + 1}</div>

						<div className="next">
							<Button variant="primary">Next Page</Button>
						</div>
					</div>
			</>

		}

	</Container>
  )
}

export default Searchpage
