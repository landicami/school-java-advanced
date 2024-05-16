import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import  Container  from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { HackerResponse } from "../types/HackerNewstypes";
import { getQuery as APIQuery } from "../services/SearchApi";
import Pagination from "../components/Pagination";

const Searchpage = () => {
	const [searchNews, setIsSearchNews] = useState<HackerResponse | null>(null);
	const [error, setError] = useState<string | false>(false);
	const [inputNewSearch, setinputNewSearch] = useState("");
	const [isSearching, setIsSearching ] = useState(false);
	const [page, setPage] = useState(0)
	const queryRef = useRef("");
	const focusRef = useRef<HTMLInputElement>(null);


	const getNews = async (searchQuery: string, page: number) => {
		setError(false); //nollställ error om vi hade något innan!
		setIsSearching(true); //sätt sökning till sant så vi visar Loading
		setIsSearchNews(null); //sätt sökning till null föra tt gömma tidigare resultat

		queryRef.current = searchQuery; //spara ner sökningen i en variabel
		console.log("page in getnews is", page)

		try {
			const data = await APIQuery(searchQuery, page);
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
		setPage(0)
		getNews(search, 0)
	}

	console.log(searchNews);
	console.log("page outside functions is", page );

	const addpage = () => {
		if(!searchNews){
			return;
		};

		setPage(searchNews?.page + 1); // Uppdatera sidan med det nya värdet
		console.log("hey this is addpage number", page); // Här kommer page fortfarande att vara det gamla värdet
		const nextPage = page + 1; // Använd det nya värdet
		const search = inputNewSearch.trim();
		getNews(search, nextPage);
	}


	const backPage = () => {
		if(!searchNews){
			return;
		};
		setPage(searchNews?.page - 1)
		console.log("hey this is backpage number", page)
		const prevPage = page - 1
		const search = inputNewSearch.trim();
		getNews(search, prevPage)
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

		{isSearching && <p>Loading...</p>}

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

					< Pagination
						backPage={backPage}
						addpage={addpage}
						data={searchNews}
						page={page} />

			</>

		}

	</Container>
  )
}

export default Searchpage
